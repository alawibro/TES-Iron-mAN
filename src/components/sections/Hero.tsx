"use client";

import { useEffect, useRef, useState } from "react";
import { BEATS, BRAND, FRAME_COUNT, TAGLINE, framePath } from "@/lib/content";

// Hero: canvas yang di-scrub oleh posisi scroll. Frame di-preload dulu,
// semua update per-frame lewat ref (bukan React state) supaya tidak jank.
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const barRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const redrawRef = useRef<(() => void) | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const loaded = loadedCount >= FRAME_COUNT;
  const percent = Math.round((loadedCount / FRAME_COUNT) * 100);

  // Preload semua frame. Error juga dihitung agar loader tidak macet.
  useEffect(() => {
    let cancelled = false;
    let count = 0;
    const tick = () => {
      if (cancelled) return;
      count++;
      setLoadedCount(count);
    };
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = tick;
      img.onerror = tick;
      img.src = framePath(i);
      imgs.push(img);
    }
    framesRef.current = imgs;
    return () => {
      cancelled = true;
    };
  }, []);

  // Gambar frame, resize canvas (DPR-aware), dan hubungkan scroll.
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastIndex = -1;
    let ticking = false;

    const drawFrame = (index: number) => {
      const img = framesRef.current[index];
      if (!img || !img.complete || !img.naturalWidth) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      let dw: number;
      let dh: number;
      // cover-fit, sama seperti object-fit: cover
      if (w / h > imgRatio) {
        dw = w;
        dh = w / imgRatio;
      } else {
        dh = h;
        dw = h * imgRatio;
      }
      // Di mobile subjek di-zoom sedikit agar lebih terbaca.
      if (w <= 768) {
        dw *= 1.3;
        dh *= 1.3;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(Math.max(0, lastIndex));
    };
    redrawRef.current = resize;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const range = section.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / range));

      const index = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
      if (index !== lastIndex) {
        lastIndex = index;
        drawFrame(index);
      }

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      if (titleRef.current) {
        titleRef.current.style.opacity = String(Math.max(0, 1 - progress / 0.15));
      }
      BEATS.forEach((beat, i) => {
        const el = beatRefs.current[i];
        if (!el) return;
        const on = progress >= beat.show && progress < beat.hide;
        el.style.opacity = on ? "1" : "0";
        el.style.transform = on ? "translateY(0)" : "translateY(16px)";
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    resize();
    update();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      redrawRef.current = null;
    };
  }, []);

  // Setelah semua frame siap, gambar ulang frame yang sekarang terlihat.
  useEffect(() => {
    if (loaded) redrawRef.current?.();
  }, [loaded]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-[400vh] max-md:h-[350vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        {/* Scrim agar teks tetap terbaca di atas frame apa pun. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />

        <div
          ref={titleRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-white/80">
            Selamat datang
          </p>
          <h1 className="text-6xl font-semibold tracking-tighter md:text-8xl">
            {BRAND}
          </h1>
          <p className="mt-6 max-w-[40ch] text-white/80">{TAGLINE}</p>
        </div>

        {BEATS.map((beat, i) => (
          <div
            key={beat.id}
            ref={(el) => {
              beatRefs.current[i] = el;
            }}
            className="absolute bottom-16 left-6 right-6 max-w-xl text-white transition-all duration-500 md:left-16"
            style={{ opacity: 0 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/70">
              {beat.label}
            </p>
            <p className="mt-3 text-2xl font-medium leading-snug md:text-3xl">
              {beat.quote}
            </p>
          </div>
        ))}

        <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20">
          <div
            ref={barRef}
            className="h-full origin-left bg-white"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black text-white">
            <p className="font-mono text-sm tracking-widest">MEMUAT {percent}%</p>
            <div className="h-px w-48 bg-white/20">
              <div
                className="h-full bg-white transition-[width] duration-200"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
