import { useEffect, useRef } from "react";
import { RIBBON_FIELD_VERTEX_SHADER, RIBBON_FIELD_FRAGMENT_SHADER } from "./ribbonFieldShaders";

export const RIBBON_FIELD_DEFAULTS = {
  speed: 1,
  pointerAmount: 1,
  smoothing: 0.035,
  brightness: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
} as const;

export type RibbonFieldBackgroundProps = Partial<typeof RIBBON_FIELD_DEFAULTS> & {
  className?: string;
};

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create Axiom shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "Axiom shader compilation failed");
  }
  return shader;
}

export function RibbonFieldBackground({ className = "", ...props }: RibbonFieldBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef({ ...RIBBON_FIELD_DEFAULTS, ...props });
  propsRef.current = { ...RIBBON_FIELD_DEFAULTS, ...props };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, RIBBON_FIELD_VERTEX_SHADER);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, RIBBON_FIELD_FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) ?? "Axiom program link failed");
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "resolution");
    const timeLocation = gl.getUniformLocation(program, "time");
    const pointerLocation = gl.getUniformLocation(program, "pointer");

    // Pointer starts at the authored default (0.72, 0.42); target follows input.
    let pointerX = 0.72;
    let pointerY = 0.42;
    let targetX = 0.72;
    let targetY = 0.42;
    let frameId = 0;
    let isVisible = true;
    const startedAt = performance.now();

    const handlePointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      targetX =
        0.72 +
        ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.72) *
          propsRef.current.pointerAmount;
      targetY =
        0.42 +
        (1 - (event.clientY - rect.top) / Math.max(rect.height, 1) - 0.42) *
          propsRef.current.pointerAmount;
    };

    const resizeCanvas = () => {
      const rect = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    };

    const renderFrame = (now: number) => {
      const options = propsRef.current;
      pointerX += (targetX - pointerX) * options.smoothing;
      pointerY += (targetY - pointerY) * options.smoothing;
      gl.uniform1f(timeLocation, (now - startedAt) * 1e-3 * options.speed);
      gl.uniform2f(pointerLocation, pointerX, pointerY);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameId = isVisible && !document.hidden ? requestAnimationFrame(renderFrame) : 0;
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? true;
      if (isVisible && !frameId) frameId = requestAnimationFrame(renderFrame);
      if (!isVisible && frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    });

    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    host.addEventListener("pointermove", handlePointerMove, { passive: true });
    resizeCanvas();
    frameId = requestAnimationFrame(renderFrame);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener("pointermove", handlePointerMove);
      gl.deleteBuffer(buffer);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
    };
  }, []);

  const options = propsRef.current;

  return (
    <div
      ref={hostRef}
      className={`threeui-background ribbon-field${className ? ` ${className}` : ""}`}
    >
      <canvas
        ref={canvasRef}
        style={{
          opacity: options.opacity,
          filter: `hue-rotate(${options.hue}deg) saturate(${options.saturation}) brightness(${options.brightness})`,
        }}
      />
    </div>
  );
}
