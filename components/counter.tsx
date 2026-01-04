"use client";

import { useEffect, useState } from "react";

interface CounterProps {
  start?: number;
  end: number;
  duration?: number;
}

export default function Counter({
  start = 0,
  end,
  duration = 2000,
}: CounterProps) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentCount = Math.floor(start + (end - start) * progress);
      setCount(currentCount);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [start, end, duration]);

  return <span>{count}</span>;
}
