// src/components/AuraBackground.tsx
import type { FC } from "react";
import { useEffect, useRef } from "react";

const AuraBackground: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const cols = 32; // “LEDs” across
    const rows = 18; // “LEDs” down
    const baseHue1 = 180; // teal/blue
    const baseHue2 = 310; // magenta
    const startTime = performance.now();

    const draw = (time: number) => {
      const t = (time - startTime) / 1000;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      ctx.clearRect(0, 0, width, height);

      const cellW = width / cols;
      const cellH = height / rows;
      const radius = Math.min(cellW, cellH) * 0.8;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const cx = (x + 0.5) * cellW;
          const cy = (y + 0.5) * cellH;

          // Layered sine waves to simulate flowing data / “mood”
          const wave1 =
            Math.sin((x / cols) * Math.PI * 4 + t * 1.2) * 0.5 + 0.5;
          const wave2 =
            Math.sin((y / rows) * Math.PI * 3 - t * 0.8) * 0.5 + 0.5;
          const wave3 =
            Math.sin(((x + y) / (cols + rows)) * Math.PI * 6 + t * 0.6) *
              0.5 +
            0.5;

          const intensity = (wave1 * 0.4 + wave2 * 0.35 + wave3 * 0.25);
          const hue =
            baseHue1 * (1 - wave3 * 0.6) + baseHue2 * (wave3 * 0.6);
          const alpha = 0.2 + intensity * 0.7;

          ctx.beginPath();
          ctx.fillStyle = `hsla(${hue}, 90%, 60%, ${alpha})`;
          ctx.arc(cx, cy, radius * (0.7 + intensity * 0.5), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="aura-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default AuraBackground;
