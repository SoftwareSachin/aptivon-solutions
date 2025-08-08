"use client";

import { cn } from "@/lib/utils";
import { useEffect, useId, useRef, useState } from "react";

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
}

export default function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  maxOpacity = 0.3,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const id = useId();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const newWidth = width || rect.width;
      const newHeight = height || rect.height;
      
      setCanvasSize({ width: newWidth, height: newHeight });
      canvas.width = newWidth;
      canvas.height = newHeight;
    };

    updateCanvasSize();

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [width, height]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInView) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width: canvasWidth, height: canvasHeight } = canvasSize;
    if (!canvasWidth || !canvasHeight) return;

    const cols = Math.floor(canvasWidth / (squareSize + gridGap));
    const rows = Math.floor(canvasHeight / (squareSize + gridGap));

    const squares = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.random())
    );

    let animationId: number;

    const updateSquares = () => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (Math.random() < flickerChance) {
            squares[i][j] = Math.random();
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const opacity = squares[i][j] * maxOpacity;
          ctx.fillStyle = color.replace("rgb(", "rgba(").replace(")", `, ${opacity})`);
          
          const x = j * (squareSize + gridGap);
          const y = i * (squareSize + gridGap);
          
          ctx.fillRect(x, y, squareSize, squareSize);
        }
      }
    };

    const animate = () => {
      updateSquares();
      draw();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [
    canvasSize,
    isInView,
    squareSize,
    gridGap,
    flickerChance,
    color,
    maxOpacity,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="size-full"
        width={canvasSize.width}
        height={canvasSize.height}
      />
    </div>
  );
}