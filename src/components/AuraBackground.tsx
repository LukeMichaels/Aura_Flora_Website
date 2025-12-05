// src/components/AuraBackground.tsx
import type { FC } from "react";
import { useEffect, useRef } from "react";

export type AuraPattern = "flow" | "pulse" | "spark";

interface AuraBackgroundProps {
  pattern: AuraPattern;
}

const AuraBackground: FC<AuraBackgroundProps> = ({ pattern }) => {
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

    const cols = 32;
    const rows = 18;
    const baseHue1 = 180; // teal
    const baseHue2 = 310; // magenta
    const baseHue3 = 60;  // amber-ish
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

          let intensity = 0;
          let hue = baseHue1;
          let alpha = 0.3;

          if (pattern === "flow") {
            const wave1 =
              Math.sin((x / cols) * Math.PI * 4 + t * 1.2) * 0.5 + 0.5;
            const wave2 =
              Math.sin((y / rows) * Math.PI * 3 - t * 0.8) * 0.5 + 0.5;
            const wave3 =
              Math.sin(((x + y) / (cols + rows)) * Math.PI * 6 + t * 0.6) *
                0.5 +
              0.5;

            intensity = wave1 * 0.4 + wave2 * 0.35 + wave3 * 0.25;
            hue = baseHue1 * (1 - wave3 * 0.6) + baseHue2 * (wave3 * 0.6);
            alpha = 0.2 + intensity * 0.7;
          } else if (pattern === "pulse") {
            const centerX = cols / 2;
            const centerY = rows / 2;
            const dx = x - centerX;
            const dy = y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const ring = Math.sin(dist * 0.9 - t * 2.2) * 0.5 + 0.5;
            const slowPulse = Math.sin(t * 0.9) * 0.5 + 0.5;

            intensity = ring * 0.7 + slowPulse * 0.3;
            hue =
              baseHue2 * (0.6 + 0.4 * slowPulse) +
              baseHue3 * (0.4 - 0.4 * slowPulse);
            alpha = 0.15 + intensity * 0.75;
          } else if (pattern === "spark") {
            const noise =
              Math.sin((x * 1.7 + t * 4.0) + (y * 2.3 - t * 3.2)) * 0.5 + 0.5;
            const flicker =
              Math.sin((x + y) * 0.8 + t * 7.0) * 0.5 + 0.5;

            intensity = noise * 0.5 + flicker * 0.5;
            hue =
              baseHue1 * (0.5 + 0.5 * noise) +
              baseHue2 * (0.5 - 0.5 * noise);
            alpha = 0.1 + intensity * 0.9;
          }

          const minIntensity = 0.4;
          const minAlpha = 0.35;

          intensity = minIntensity + intensity * (1 - minIntensity);
          alpha = Math.max(alpha, minAlpha);

          const sizeFactor = 0.9 + intensity * 0.5;

          ctx.beginPath();
          ctx.fillStyle = `hsla(${hue}, 90%, 60%, ${alpha})`;
          ctx.arc(
            cx,
            cy,
            radius * sizeFactor,
            0,
            Math.PI * 2
          );
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
  }, [pattern]);

  return (
    <div className="aura-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default AuraBackground;
