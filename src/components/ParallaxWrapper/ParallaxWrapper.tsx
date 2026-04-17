"use client";

import { useEffect, useRef } from "react";

export default function ParallaxWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;

      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;

      if (ref.current) {
        ref.current.style.transform = `
          rotateX(${-y}deg)
          rotateY(${x}deg)
        `;
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      className="transition-transform duration-200 ease-out will-change-transform"
    >
      {children}
    </div>
  );
}