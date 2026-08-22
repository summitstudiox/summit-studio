import { useMemo, type CSSProperties } from "react";
import nexusUnifiedFlowSource from "./sources/nexus-unified-flow";

export const NEUFORM_CRAFT_DEFAULTS = {
  hue: 0,
  saturation: 1,
  brightness: 1,
} as const;

type EffectMode = "dark" | "light";

export type NeuformCraftEffectProps = {
  mode?: EffectMode;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

type CraftEffectDefinition = {
  title: string;
  source: string;
  background: string | ((mode: EffectMode) => string);
  targets: { selector: string; role: string; width?: string }[];
};

const nexusUnifiedFlow: CraftEffectDefinition = {
  title: "Nexus unified halftone flow",
  source: nexusUnifiedFlowSource,
  background: "#000000",
  targets: [{ selector: "#glcanvas", role: "background" }],
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function resolveBackground(background: string | ((mode: EffectMode) => string), mode: EffectMode) {
  return typeof background === "function" ? background(mode) : background;
}

function buildCraftDocument(definition: CraftEffectDefinition, mode: EffectMode) {
  const background = resolveBackground(definition.background, mode);
  const targetsJson = JSON.stringify(definition.targets).replace(/</g, "\\u003c");

  const styleTag = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${background} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
[data-threeui-role="ui"] { position: relative !important; z-index: 1 !important; width: min(calc(100% - 32px), var(--threeui-target-width, 1040px)) !important; max-width: none !important; max-height: calc(100% - 32px) !important; margin: auto !important; overflow: auto !important; opacity: 1 !important; transform: none !important; filter: none !important; flex: none !important; box-sizing: border-box !important; }
</style>`;

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
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
</script>`;

  return definition.source
    .replace(/<\/head>/i, `${styleTag}</head>`)
    .replace(/<\/body>/i, `${focusScript}</body>`);
}

function CraftEffectFrame({
  definition,
  mode = "dark",
  hue = NEUFORM_CRAFT_DEFAULTS.hue,
  saturation = NEUFORM_CRAFT_DEFAULTS.saturation,
  brightness = NEUFORM_CRAFT_DEFAULTS.brightness,
  className,
  style,
}: NeuformCraftEffectProps & { definition: CraftEffectDefinition }) {
  const resolvedMode = mode === "light" ? "light" : "dark";
  const background = resolveBackground(definition.background, resolvedMode);
  const documentSrc = useMemo(
    () => buildCraftDocument(definition, resolvedMode),
    [definition, resolvedMode],
  );

  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);
  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  return (
    <iframe
      className={className}
      data-mode={resolvedMode}
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

function createCraftEffect(definition: CraftEffectDefinition) {
  return function CraftEffect(props: NeuformCraftEffectProps) {
    return <CraftEffectFrame {...props} definition={definition} />;
  };
}

export const HalftoneFlow = createCraftEffect(nexusUnifiedFlow);
