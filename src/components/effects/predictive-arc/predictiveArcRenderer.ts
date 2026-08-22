export type PredictiveArcMode = "dark" | "light";

export type PredictiveArcOptions = {
  mode: PredictiveArcMode;
  speed: number;
  spacing: number;
  dotSize: number;
  archHeight: number;
  thickness: number;
  brightness: number;
  hue: number;
  saturation: number;
};

export const PREDICTIVE_ARC_DEFAULTS: PredictiveArcOptions = {
  mode: "dark",
  speed: 1,
  spacing: 5,
  dotSize: 6,
  archHeight: 0.7,
  thickness: 1,
  brightness: 1,
  hue: 0,
  saturation: 1,
};

function normalizeMode(mode: unknown): PredictiveArcMode {
  return mode === "light" || mode === 1 || mode === "1" ? "light" : "dark";
}

export function createPredictiveArcRenderer(
  canvas: HTMLCanvasElement,
  getOptions: () => PredictiveArcOptions,
): { resize: (nextWidth: number, nextHeight: number) => void; render: () => void } | null {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return null;

  let width = 1;
  let height = 1;
  let time = 0;

  return {
    resize(nextWidth: number, nextHeight: number) {
      width = Math.max(1, nextWidth);
      height = Math.max(1, nextHeight);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    },
    render() {
      const options = getOptions();
      const isLight = normalizeMode(options.mode) === "light";

      ctx.fillStyle = isLight ? "#eef1f6" : "#030303";
      ctx.fillRect(0, 0, width, height);

      time += 0.015 * options.speed;

      const centerX = width / 2;
      const archBaseY = height * 0.35;
      const archSpanX = width * 1.5;
      const archHeightPx = height * options.archHeight;

      ctx.globalCompositeOperation = isLight ? "source-over" : "lighter";

      for (let x = 0; x < width; x += options.spacing) {
        const nx = (x - centerX) / (archSpanX / 2);
        const arcY = archBaseY + nx * nx * archHeightPx;

        for (let y = 0; y < height; y += options.spacing) {
          const dist = Math.abs(y - arcY);
          const bandHalf = (140 + (1 - Math.abs(nx)) * 80) * options.thickness;
          if (dist >= bandHalf) continue;

          let intensity = 1 - dist / bandHalf;
          const wobbleA = Math.sin(x * 0.015 + time);
          const wobbleB = Math.cos(y * 0.02 + time);

          intensity = intensity * 0.7 + wobbleA * wobbleB * 0.3 * intensity;
          intensity *= Math.max(0, 1 - Math.pow(Math.abs(nx), 2.5));
          if (intensity <= 0.02) continue;

          let r: number, g: number, b: number;
          if (isLight) {
            r = Math.min(255, 48 * intensity + 70 * Math.pow(intensity, 3));
            g = Math.min(255, 28 * intensity + 45 * Math.pow(intensity, 4));
            b = Math.min(255, 120 * intensity + 110 * Math.pow(intensity, 2));
            if (intensity > 0.7) {
              const boost = (intensity - 0.7) * 3.3;
              r = Math.min(255, r + 90 * boost);
              g = Math.min(255, g + 70 * boost);
              b = Math.min(255, b + 110 * boost);
            }
          } else {
            r = Math.min(255, 60 * intensity + 100 * Math.pow(intensity, 3));
            g = Math.min(255, 20 * intensity + 60 * Math.pow(intensity, 4));
            b = Math.min(255, 120 * intensity + 135 * Math.pow(intensity, 2));
            if (intensity > 0.7) {
              const boost = (intensity - 0.7) * 3.3;
              r = Math.min(255, r + 150 * boost);
              g = Math.min(255, g + 150 * boost);
              b = Math.min(255, b + 150 * boost);
            }
          }

          ctx.fillStyle = `rgb(${Math.floor(r * options.brightness)}, ${Math.floor(
            g * options.brightness,
          )}, ${Math.floor(b * options.brightness)})`;
          ctx.fillRect(x, y, options.dotSize * intensity, options.dotSize * intensity);
        }
      }

      ctx.globalCompositeOperation = "source-over";
    },
  };
}
