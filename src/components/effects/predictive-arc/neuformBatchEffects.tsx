import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import amberHalftoneSource from "./sources/amber-halftone";
import signalParticlesSource from "./sources/signal-particles";
import overrideGridSource from "./sources/override-grid";

export type NeuformMode = "dark" | "light";
export type NeuformModePreference = NeuformMode | "auto";

type BakeKnobs = {
  variant: string;
  size: number;
  gap: number;
  length: number;
  density: number;
  strokeWidth: number;
  mode: NeuformMode;
};

export type NeuformBatchEffectProps = {
  variant?: string;
  mode?: NeuformModePreference;
  speed?: number;
  size?: number;
  gap?: number;
  length?: number;
  density?: number;
  strokeWidth?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

export const NEUFORM_BATCH_DEFAULTS = {
  mode: "dark",
  speed: 1,
  size: 1,
  gap: 2,
  length: 1,
  density: 1,
  strokeWidth: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
} as const;

const LIGHT_BACKGROUND = "#eef1f6";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function scaledRound(value: number, factor: number, min = 1) {
  return Math.max(min, Math.round(value * factor));
}

function fixedNumber(value: number, decimals = 3) {
  const text = Number(value).toFixed(decimals);
  return text.includes(".") ? text : `${text}.0`;
}

function normalizeMode(mode: unknown, fallback: NeuformMode): NeuformMode {
  return mode == null
    ? fallback
    : mode === "light" || mode === 1 || mode === "1"
      ? "light"
      : "dark";
}

function detectSchemeMode(): NeuformMode {
  if (typeof document === "undefined" || typeof window === "undefined") return "dark";
  const root = document.documentElement;
  const scheme = root.dataset["scheme"] ?? root.dataset["theme"];
  if (scheme === "light" || scheme === "dark") return scheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function useAutoSchemeMode(enabled: boolean | undefined): NeuformMode {
  const [mode, setMode] = useState(detectSchemeMode);

  useEffect(() => {
    if (!enabled || typeof document === "undefined" || typeof window === "undefined") return;
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const refresh = () => setMode(detectSchemeMode());
    const observer = new MutationObserver(refresh);
    observer.observe(root, { attributes: true, attributeFilter: ["data-scheme", "data-theme"] });
    media.addEventListener("change", refresh);
    refresh();
    return () => {
      observer.disconnect();
      media.removeEventListener("change", refresh);
    };
  }, [enabled]);

  return mode;
}

function resolveBackground(
  background: string | ((mode: NeuformMode) => string),
  mode: NeuformMode,
) {
  return typeof background === "function" ? background(mode) : background;
}

type BatchEffectDefinition = {
  title: string;
  source: string;
  supportsMode?: boolean;
  defaultMode?: NeuformModePreference;
  background: string | ((mode: NeuformMode) => string);
  targets: { selector: string; role: string; width?: string }[];
  patch?(source: string, knobs: BakeKnobs): string;
};

const signalParticles: BatchEffectDefinition = {
  title: "Signal Particles",
  source: signalParticlesSource,
  supportsMode: true,
  background: (mode) => (mode === "light" ? LIGHT_BACKGROUND : "#0a0a0a"),
  targets: [{ selector: "#particle-canvas", role: "background" }],
  patch(source, { size, length, mode }) {
    let next = source
      .replace(
        "const spacing = 16;",
        `const spacing = ${Math.max(6, Math.round(16 / Math.max(0.35, length)))};`,
      )
      .replace("const dotRadius = 1.5;", `const dotRadius = ${Number((1.5 * size).toFixed(2))};`)
      .replace(
        "time += 0.02;",
        "time += 0.02 * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);",
      );
    if (mode === "light") {
      next = next
        .replace(
          "ctx.fillStyle = '#3b82f6'; // Blue highlight",
          "ctx.fillStyle = '#1d4ed8'; // Blue highlight",
        )
        .replace(
          "ctx.fillStyle = '#8b5cf6'; // Purple highlight",
          "ctx.fillStyle = '#5b21b6'; // Purple highlight",
        )
        .replace(
          "ctx.fillStyle = `rgba(148, 163, 184, ${alpha})`;",
          "ctx.fillStyle = `rgba(36, 48, 68, ${alpha})`;",
        );
    }
    return next;
  },
};

const overrideGrid: BatchEffectDefinition = {
  title: "Override Grid",
  source: overrideGridSource,
  supportsMode: true,
  background: (mode) => (mode === "light" ? LIGHT_BACKGROUND : "#050505"),
  targets: [{ selector: "#grid-canvas", role: "background" }],
  patch(source, { size, gap, mode }) {
    const blockSize = Math.max(8, Math.round(size));
    const blockGap = Math.max(0, Math.round(gap));
    let next = source
      .replace("const blockSize = 48;", `const blockSize = ${blockSize};`)
      .replace("const blockGap = 2;", `const blockGap = ${blockGap};`)
      .replace(
        "time += 0.04;",
        "time += 0.04 * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);",
      );
    if (mode === "light") {
      next = next.replace(
        "ctx.fillStyle = `rgba(249, 115, 22, ${alpha})`;",
        "ctx.fillStyle = `rgba(194, 65, 12, ${alpha * 1.35})`;",
      );
    }
    return next;
  },
};

const amberHalftone: BatchEffectDefinition = {
  title: "Amber Halftone",
  source: amberHalftoneSource,
  supportsMode: true,
  background: (mode) => (mode === "light" ? LIGHT_BACKGROUND : "#0A0A0A"),
  targets: [{ selector: "#webgl-halftone", role: "background" }],
  patch(source, { size, length, density, mode }) {
    const cellSpacing = Number((0.085 / Math.max(0.25, density)).toFixed(4));
    const gridCount = Math.max(12, Math.ceil(2.8 / cellSpacing));
    const pointSize = Number((9 * size).toFixed(2));
    const waveFrequency = Number((6 * length).toFixed(2));
    let next = source
      .replace("const gridSize = 20;", `const gridSize = ${gridCount};`)
      .replace(
        "positions.push(x * 0.15, y * 0.15, 0);",
        `positions.push(x * ${cellSpacing}, y * ${cellSpacing}, 0);`,
      )
      .replace(
        "float animatedScale = scale * (sin(dist * 6.0 - time * 2.5) * 0.5 + 0.5);",
        `float animatedScale = scale * (sin(dist * ${fixedNumber(waveFrequency, 2)} - time * 2.5) * 0.5 + 0.5);`,
      )
      .replace(
        "gl_PointSize = animatedScale * 5.0;",
        `gl_PointSize = animatedScale * ${fixedNumber(pointSize, 2)};`,
      )
      .replace(
        "material.uniforms.time.value = clock.getElapsedTime();",
        "material.uniforms.time.value = clock.getElapsedTime() * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);",
      );
    if (mode === "light") {
      next = next
        .replace("renderer.setClearColor(0x0A0A0A, 1);", "renderer.setClearColor(0xeef1f6, 1);")
        .replace(
          "color1: { value: new THREE.Color(0xFBBF24) },",
          "color1: { value: new THREE.Color(0xB45309) },",
        )
        .replace(
          "color2: { value: new THREE.Color(0xFFFFFF) }",
          "color2: { value: new THREE.Color(0x1a1f2a) }",
        );
    }
    return next;
  },
};

function buildBatchDocument(
  definition: BatchEffectDefinition,
  knobs: BakeKnobs & {
    speed: number;
    opacity: number;
  },
) {
  const mode = knobs.mode;
  const background = resolveBackground(definition.background, mode);
  const targetsJson = JSON.stringify(definition.targets).replace(/</g, "\\u003c");
  const controlsJson = JSON.stringify({
    mode,
    speed: knobs.speed,
    size: knobs.size,
    gap: knobs.gap,
    length: knobs.length,
    density: knobs.density,
    strokeWidth: knobs.strokeWidth,
    opacity: knobs.opacity,
  }).replace(/</g, "\\u003c");

  const patchedSource = definition.patch
    ? definition.patch(definition.source, {
        variant: knobs.variant,
        size: knobs.size,
        gap: knobs.gap,
        length: knobs.length,
        density: knobs.density,
        strokeWidth: knobs.strokeWidth,
        mode,
      })
    : definition.source;

  const styleTag = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${background} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
[data-threeui-role="ui"] { position: relative !important; z-index: 1 !important; width: min(calc(100% - 32px), var(--threeui-target-width, 1040px)) !important; max-width: none !important; max-height: calc(100% - 32px) !important; margin: auto !important; overflow: auto !important; opacity: 1 !important; transform: none !important; filter: none !important; flex: none !important; box-sizing: border-box !important; }
</style>`;

  // Virtual clock: rewrites performance.now/Date.now inside the frame so a
  // single `speed` scalar scales every authored animation uniformly.
  const controlsScript = `<script data-threeui-controls>
(function () {
  var controls = ${controlsJson};
  window.__SF_CONTROLS = controls;
  var origin = performance.now();
  var virtual = 0;
  var last = origin;
  var performanceNow = performance.now.bind(performance);
  var dateNow = Date.now.bind(Date);
  var dateOrigin = dateNow();
  performance.now = function () {
    var real = performanceNow();
    virtual += (real - last) * (controls.speed || 1);
    last = real;
    return origin + virtual;
  };
  Date.now = function () {
    return dateOrigin + (performance.now() - origin);
  };
  var raf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = function (callback) {
    return raf(function () {
      callback(performance.now());
    });
  };
  function applyVisual() {
    var opacity = controls.opacity == null ? 1 : controls.opacity;
    var size = controls.size == null ? 1 : controls.size;
    Array.prototype.forEach.call(document.querySelectorAll('[data-threeui-role]'), function (element) {
      element.style.opacity = String(opacity);
      if (element.getAttribute('data-threeui-role') === 'ui') {
        element.style.transform = 'scale(' + size + ')';
        element.style.transformOrigin = 'center center';
      }
    });
  }
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'threeui-controls') return;
    var next = event.data.controls || {};
    Object.keys(next).forEach(function (key) { controls[key] = next[key]; });
    applyVisual();
  });
  window.__SF_APPLY_CONTROLS = applyVisual;
})();
</script>`;

  const focusScript = `<script data-threeui-focus>
(function () {
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${targetsJson};
    var roots = [];
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (spec.width) element.style.setProperty('--threeui-target-width', spec.width);
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) { document.body.appendChild(root); });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    if (window.__SF_APPLY_CONTROLS) window.__SF_APPLY_CONTROLS();
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
</script>`;

  return patchedSource
    .replace(/<head([^>]*)>/i, `<head$1>${controlsScript}${styleTag}`)
    .replace(/<\/body>/i, `${focusScript}</body>`);
}

function BatchEffectFrame({
  definition,
  variant = "cube",
  mode,
  speed = NEUFORM_BATCH_DEFAULTS.speed,
  size = NEUFORM_BATCH_DEFAULTS.size,
  gap = NEUFORM_BATCH_DEFAULTS.gap,
  length = NEUFORM_BATCH_DEFAULTS.length,
  density = NEUFORM_BATCH_DEFAULTS.density,
  strokeWidth = NEUFORM_BATCH_DEFAULTS.strokeWidth,
  opacity = NEUFORM_BATCH_DEFAULTS.opacity,
  hue = NEUFORM_BATCH_DEFAULTS.hue,
  saturation = NEUFORM_BATCH_DEFAULTS.saturation,
  brightness = NEUFORM_BATCH_DEFAULTS.brightness,
  className,
  style,
}: NeuformBatchEffectProps & { definition: BatchEffectDefinition }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const preference = mode ?? definition.defaultMode ?? NEUFORM_BATCH_DEFAULTS.mode;
  const systemMode = useAutoSchemeMode(preference === "auto");
  const resolvedMode =
    preference === "auto" ? systemMode : normalizeMode(preference, NEUFORM_BATCH_DEFAULTS.mode);
  const background = resolveBackground(definition.background, resolvedMode);

  const safeSpeed = clamp(speed, 0, 3);
  const safeSize = clamp(size, 0.05, 200);
  const safeGap = clamp(gap, 0, 64);
  const safeLength = clamp(length, 0.35, 2.5);
  const safeDensity = clamp(density, 0.25, 2.5);
  const safeStrokeWidth = clamp(strokeWidth, 0.25, 8);
  const safeOpacity = clamp(opacity, 0.05, 1);
  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);

  const documentSrc = useMemo(
    () =>
      buildBatchDocument(definition, {
        variant,
        mode: resolvedMode,
        speed: NEUFORM_BATCH_DEFAULTS.speed,
        size: safeSize,
        gap: safeGap,
        length: safeLength,
        density: safeDensity,
        strokeWidth: safeStrokeWidth,
        opacity: NEUFORM_BATCH_DEFAULTS.opacity,
      }),
    [
      definition,
      resolvedMode,
      safeDensity,
      safeGap,
      safeLength,
      safeSize,
      safeStrokeWidth,
      variant,
    ],
  );

  useEffect(() => {
    const frameWindow = frameRef.current?.contentWindow;
    frameWindow?.postMessage(
      {
        type: "threeui-controls",
        controls: {
          mode: resolvedMode,
          speed: safeSpeed,
          size: safeSize,
          gap: safeGap,
          length: safeLength,
          density: safeDensity,
          strokeWidth: safeStrokeWidth,
          opacity: safeOpacity,
        },
      },
      "*",
    );
  }, [
    resolvedMode,
    safeDensity,
    safeGap,
    safeLength,
    safeOpacity,
    safeSize,
    safeSpeed,
    safeStrokeWidth,
    documentSrc,
  ]);

  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  return (
    <iframe
      ref={frameRef}
      className={className}
      title={definition.title}
      srcDoc={documentSrc}
      sandbox="allow-scripts"
      loading="eager"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background,
        filter,
        ...style,
      }}
    />
  );
}

function createBatchEffect(definition: BatchEffectDefinition) {
  return function BatchEffect(props: NeuformBatchEffectProps) {
    return <BatchEffectFrame {...props} definition={definition} />;
  };
}

export const SignalParticles = createBatchEffect(signalParticles);
export const OverrideGrid = createBatchEffect(overrideGrid);
export const AmberHalftone = createBatchEffect(amberHalftone);
