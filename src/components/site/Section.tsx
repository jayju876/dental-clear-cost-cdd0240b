import { motion } from "framer-motion";
import { type ReactNode } from "react";

export function FadeIn({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PageShell({ children, title, eyebrow, lead }: { children: ReactNode; title: string; eyebrow?: string; lead?: string }) {
  return (
    <div className="container mx-auto px-4 pt-12 pb-20">
      <div className="max-w-3xl">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary mb-3">{eyebrow}</p>}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">{title}</h1>
        {lead && <p className="mt-4 text-lg text-muted-foreground">{lead}</p>}
      </div>
      <div className="mt-10">{children}</div>
    </div>
  );
}
