import { useEffect, useRef } from "react";
import {
  DATA_PIXEL_ARC_DEFAULTS,
  createDataPixelArcRenderer,
  type DataPixelArcOptions,
} from "./dataPixelArcRenderer";

export type DataPixelArcMode = "dark" | "light";

export type DataPixelArcCanvasProps = Partial<Omit<DataPixelArcOptions, "mode">> & {
  mode?: DataPixelArcMode;
  className?: string;
};

export function DataPixelArcCanvas({ className = "", ...props }: DataPixelArcCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optionsRef = useRef<DataPixelArcOptions>({ ...DATA_PIXEL_ARC_DEFAULTS, ...props });
  optionsRef.current = { ...DATA_PIXEL_ARC_DEFAULTS, ...props };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const renderer = createDataPixelArcRenderer(canvas, () => optionsRef.current);
    if (!renderer) return;

    let frameId = 0;
    let isVisible = true;

    const resizeAndRender = () => {
      const rect = host.getBoundingClientRect();
      renderer.resize(rect.width, rect.height);
      renderer.render();
    };

    const renderFrame = () => {
      renderer.render();
      frameId = isVisible && !document.hidden ? requestAnimationFrame(renderFrame) : 0;
    };

    const resizeObserver = new ResizeObserver(resizeAndRender);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? true;
      if (isVisible && !frameId) frameId = requestAnimationFrame(renderFrame);
      if (!isVisible && frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    });

    const handleVisibilityChange = () => {
      if (document.hidden && frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      } else if (!document.hidden && isVisible && !frameId) {
        frameId = requestAnimationFrame(renderFrame);
      }
    };

    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resizeAndRender();
    frameId = requestAnimationFrame(renderFrame);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const options = optionsRef.current;

  return (
    <div
      ref={hostRef}
      className={`threeui-background data-pixel-arc data-pixel-arc--${options.mode}${className ? ` ${className}` : ""}`}
      data-mode={options.mode}
    >
      <canvas
        ref={canvasRef}
        style={{ filter: `hue-rotate(${options.hue}deg) saturate(${options.saturation})` }}
      />
    </div>
  );
}
