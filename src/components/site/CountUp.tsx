import { useEffect, useRef, useState } from "react";

export function CountUp({ value, duration = 1600, className }: { value: string; duration?: number; className?: string }) {
  // Parse leading number; preserve prefix/suffix (e.g. "$", "K+", "%")
  const match = value.match(/^([^\d-]*)([\d,.]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numStr = match?.[2] ?? "0";
  const suffix = match?.[3] ?? "";
  const target = parseFloat(numStr.replace(/,/g, "")) || 0;
  const hasComma = numStr.includes(",");

  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(target * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);

  const display = target >= 100 ? Math.round(n) : n.toFixed(target % 1 === 0 ? 0 : 1);
  const formatted = hasComma ? Number(display).toLocaleString() : display;
  return <span ref={ref} className={className}>{prefix}{formatted}{suffix}</span>;
}
