import { Suspense, lazy } from "react";
import {
  PredictiveArcCanvasCore,
  type PredictiveArcCanvasCoreProps,
  type PredictiveArcVariant as PredictiveArcCoreVariant,
} from "./PredictiveArcCanvas";
import type { NeuformBatchEffectProps } from "./neuformBatchEffects";
import type { NeuformIsolatedEffectProps } from "./neuformIsolatedEffects";
import type { NeuformCraftEffectProps } from "./neuformCraftEffects";
import type { RibbonFieldBackgroundProps } from "./RibbonFieldBackground";
// HalftoneFlow is the only variant actually used on a live page (the home
// hero) — imported eagerly, unlike the others below, so it doesn't wait on
// its own lazy chunk fetch after mount for what's above-the-fold content.
import { HalftoneFlow } from "./neuformCraftEffects";

const LazyRibbonField = lazy(() =>
  import("./RibbonFieldBackground").then((mod) => ({ default: mod.RibbonFieldBackground })),
);
const LazyVoidField = lazy(() =>
  import("./neuformIsolatedEffects").then((mod) => ({ default: mod.VoidField })),
);
const LazyAmberHalftone = lazy(() =>
  import("./neuformBatchEffects").then((mod) => ({ default: mod.AmberHalftone })),
);

export type PredictiveArcVariant =
  PredictiveArcCoreVariant | "ribbon-field" | "void-field" | "halftone-flow" | "amber-halftone";

type RibbonFieldVariantProps = RibbonFieldBackgroundProps & { variant: "ribbon-field" };
type VoidFieldVariantProps = NeuformIsolatedEffectProps & { variant: "void-field" };
type HalftoneFlowVariantProps = NeuformCraftEffectProps & { variant: "halftone-flow" };
type AmberHalftoneVariantProps = NeuformBatchEffectProps & { variant: "amber-halftone" };

export type PredictiveArcCanvasProps =
  | PredictiveArcCanvasCoreProps
  | RibbonFieldVariantProps
  | VoidFieldVariantProps
  | HalftoneFlowVariantProps
  | AmberHalftoneVariantProps;

/**
 * Public entry point for the Predictive Arc collection. Selects one of eight
 * authored scenes with the `variant` prop; only the selected variant loads.
 */
export function PredictiveArcCanvas(props: PredictiveArcCanvasProps) {
  if (props.variant === "ribbon-field") {
    const { variant, ...rest } = props;
    return (
      <Suspense fallback={<div className="threeui-background predictive-arc" />}>
        <LazyRibbonField {...rest} />
      </Suspense>
    );
  }
  if (props.variant === "void-field") {
    const { variant, ...rest } = props;
    return (
      <Suspense fallback={<div className="threeui-background predictive-arc" />}>
        <LazyVoidField {...rest} />
      </Suspense>
    );
  }
  if (props.variant === "halftone-flow") {
    const { variant, ...rest } = props;
    return <HalftoneFlow {...rest} />;
  }
  if (props.variant === "amber-halftone") {
    const { variant, ...rest } = props;
    return (
      <Suspense fallback={<div className="threeui-background predictive-arc" />}>
        <LazyAmberHalftone {...rest} />
      </Suspense>
    );
  }
  return <PredictiveArcCanvasCore {...props} />;
}
