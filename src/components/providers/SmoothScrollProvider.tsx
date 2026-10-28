"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Smooth scroll dengan pengaturan aman untuk Safari (lerp lebih tinggi, syncTouch mati).
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, syncTouch: false });
    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
