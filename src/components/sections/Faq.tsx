"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQ } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[800px]">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">FAQ</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tighter md:text-5xl">
          Pertanyaan yang sering ditanyakan
        </h2>

        <div className="mt-12 flex flex-col gap-4">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="neu rounded-[20px] p-6">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between text-left text-lg font-medium"
                >
                  {item.q}
                  <span className="ml-4 text-muted">{isOpen ? "–" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                      className="overflow-hidden text-muted"
                    >
                      <span className="mt-4 block">{item.a}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
