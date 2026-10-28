"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FEATURES } from "@/lib/content";

// Bento grid: kartu neumorphic dengan reveal bertahap.
export function Features() {
  return (
    <section id="fitur" className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <AnimatedSection>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Fitur</p>
          <h2 className="mt-4 max-w-[18ch] text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl">
            Ganti judul bagian ini.
          </h2>
        </AnimatedSection>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {FEATURES.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.08}>
              <div className="neu h-full rounded-[20px] p-7">
                <h3 className="text-xl font-semibold tracking-tight">{feature.title}</h3>
                <p className="mt-3 max-w-[48ch] text-muted">{feature.body}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
