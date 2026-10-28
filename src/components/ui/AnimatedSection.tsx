"use client";

import { motion } from "framer-motion";

// Reveal saat masuk viewport. Dibagi per item agar bisa di-stagger.
export function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}
