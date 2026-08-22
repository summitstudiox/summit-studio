export type DataPixelArcMode = "dark" | "light";

export type DataPixelArcOptions = {
  mode: DataPixelArcMode;
  speed: number;
  pixelSize: number;
  arcCenter: number;
  arcDrop: number;
  thickness: number;
  brightness: number;
  hue: number;
  saturation: number;
};

export const DATA_PIXEL_ARC_DEFAULTS: DataPixelArcOptions = {
  mode: "dark",
  speed: 1,
  pixelSize: 8,
  arcCenter: 0.4,
  arcDrop: 0.9,
  thickness: 0.35,
  brightness: 1,
  hue: 0,
  saturation: 1,
};

function normalizeMode(mode: unknown): DataPixelArcMode {
  return mode === "light" || mode === 1 || mode === "1" ? "light" : "dark";
}

export function createDataPixelArcRenderer(
  canvas: HTMLCanvasElement,
  getOptions: () => DataPixelArcOptions,
): { resize: (nextWidth: number, nextHeight: number) => void; render: () => void } | null {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return null;

  let width = 1;
  let height = 1;
  let time = 0;
  let lightGradient: CanvasGradient | null = null;

  return {
    resize(nextWidth: number, nextHeight: number) {
      width = Math.max(1, nextWidth);
      height = Math.max(1, nextHeight);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      lightGradient = ctx.createLinearGradient(0, 0, 0, height);
      lightGradient.addColorStop(0, "#f8faf6");
      lightGradient.addColorStop(0.58, "#f3f6f1");
      lightGradient.addColorStop(1, "#edf1ec");
    },
    render() {
      const options = getOptions();
      const isLight = normalizeMode(options.mode) === "light";

      ctx.fillStyle = isLight && lightGradient ? lightGradient : "#030308";
      ctx.fillRect(0, 0, width, height);

      const cols = Math.ceil(width / options.pixelSize);
      const rows = Math.ceil(height / options.pixelSize);
      const arcY = height * options.arcCenter;
      const dropPx = height * options.arcDrop;
      const bandHalf = height * options.thickness;

      for (let col = 0; col < cols; col += 1) {
        for (let row = 0; row < rows; row += 1) {
          const px = col * options.pixelSize;
          const py = row * options.pixelSize;
          const nx = (px / width) * 2 - 1;
          const arcRowY = arcY + Math.pow(Math.abs(nx), 1.8) * dropPx;

          let intensity = Math.max(0, 1 - Math.abs(py - arcRowY) / bandHalf);
          if (intensity <= 0.01) continue;

          const rippleA = Math.sin(nx * 4 - time * 1.5) * 0.1;
          const rippleB = Math.cos(py * 0.01 + time) * 0.1;
          intensity = Math.max(0, Math.min(1, intensity + rippleA + rippleB));
          intensity *= Math.max(0, 1 - Math.pow(Math.abs(nx), 2.5));
          if (intensity <= 0.02) continue;

          const cubed = Math.pow(intensity, 3);
          const pow15 = Math.pow(intensity, 1.5);

          let r: number, g: number, b: number;
          if (isLight) {
            const shade = Math.pow(intensity, 0.78);
            const brightnessClamped = Math.max(0.45, Math.min(1.35, options.brightness));
            const paper: [number, number, number] = [238, 242, 237];
            const ink: [number, number, number] = [
              192 - 172 * shade - 10 * cubed,
              204 - 88 * shade + 18 * cubed,
              193 - 132 * shade + 4 * cubed,
            ];
            r = Math.max(
              0,
              Math.min(255, Math.round(paper[0] + (ink[0] - paper[0]) * brightnessClamped)),
            );
            g = Math.max(
              0,
              Math.min(255, Math.round(paper[1] + (ink[1] - paper[1]) * brightnessClamped)),
            );
            b = Math.max(
              0,
              Math.min(255, Math.round(paper[2] + (ink[2] - paper[2]) * brightnessClamped)),
            );
          } else {
            r = Math.floor((30 * intensity + 100 * cubed) * options.brightness);
            g = Math.floor((220 * pow15 + 40 * cubed) * options.brightness);
            b = Math.floor((80 * intensity + 50 * cubed) * options.brightness);
          }

          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.globalAlpha = isLight
            ? Math.min(1, 0.22 + Math.pow(intensity, 0.68) * 0.78)
            : intensity;
          ctx.fillRect(px, py, options.pixelSize - 1, options.pixelSize - 1);
        }
      }

      ctx.globalAlpha = 1;
      time += 0.02 * options.speed;
    },
  };
}
