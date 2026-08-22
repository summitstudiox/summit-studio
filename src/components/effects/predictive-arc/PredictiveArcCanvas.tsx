import { Suspense, lazy, useEffect, useRef } from "react";
import { DataPixelArcCanvas, type DataPixelArcCanvasProps } from "./DataPixelArcCanvas";
import {
  PREDICTIVE_ARC_DEFAULTS,
  createPredictiveArcRenderer,
  type PredictiveArcMode,
  type PredictiveArcOptions,
} from "./predictiveArcRenderer";

export type { PredictiveArcMode } from "./predictiveArcRenderer";
import type { NeuformBatchEffectProps } from "./neuformBatchEffects";

const LazySignalParticles = lazy(() =>
  import("./neuformBatchEffects").then((mod) => ({ default: mod.SignalParticles })),
);
const LazyOverrideGrid = lazy(() =>
  import("./neuformBatchEffects").then((mod) => ({ default: mod.OverrideGrid })),
);

export type PredictiveArcVariant =
  "predictive" | "data-pixel" | "signal-particles" | "override-grid";

type PredictiveVariantProps = Partial<Omit<PredictiveArcOptions, "mode">> & {
  mode?: PredictiveArcMode;
  className?: string;
  variant?: "predictive";
};
type DataPixelVariantProps = DataPixelArcCanvasProps & { variant: "data-pixel" };
type BatchVariantProps = NeuformBatchEffectProps & {
  variant: "signal-particles" | "override-grid";
};

export type PredictiveArcCanvasCoreProps =
  PredictiveVariantProps | DataPixelVariantProps | BatchVariantProps;

export function PredictiveArcCanvasCore({
  className = "",
  ...props
}: PredictiveArcCanvasCoreProps) {
  if (props.variant === "data-pixel") {
    const { variant, ...rest } = props;
    return <DataPixelArcCanvas {...rest} />;
  }
  if (props.variant === "signal-particles") {
    const { variant, ...rest } = props;
    return (
      <Suspense fallback={<div className="threeui-background predictive-arc" />}>
        <LazySignalParticles {...rest} />
      </Suspense>
    );
  }
  if (props.variant === "override-grid") {
    const { variant, ...rest } = props;
    return (
      <Suspense fallback={<div className="threeui-background predictive-arc" />}>
        <LazyOverrideGrid {...rest} />
      </Suspense>
    );
  }
  const { variant: _variant, ...rest } = props as PredictiveVariantProps;
  return <PredictiveArcSurface className={className} {...rest} />;
}

function PredictiveArcSurface({ className = "", ...props }: PredictiveVariantProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optionsRef = useRef<PredictiveArcOptions>({ ...PREDICTIVE_ARC_DEFAULTS, ...props });
  optionsRef.current = { ...PREDICTIVE_ARC_DEFAULTS, ...props };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const renderer = createPredictiveArcRenderer(canvas, () => optionsRef.current);
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
      className={`threeui-background predictive-arc predictive-arc--${options.mode}${className ? ` ${className}` : ""}`}
      data-mode={options.mode}
    >
      <canvas
        ref={canvasRef}
        style={{ filter: `hue-rotate(${options.hue}deg) saturate(${options.saturation})` }}
      />
    </div>
  );
}
