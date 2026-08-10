import { Link, useLocation } from "@tanstack/react-router";
import { Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function StickyCTA() {
  const { pathname } = useLocation();
  if (pathname === "/" || pathname === "/calculator") return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 22 }}
        className="fixed bottom-5 right-5 z-30"
      >
        <Link
          to="/"
          hash="calculator"
          className="flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-elegant hover:opacity-95"
        >
          <Calculator className="h-4 w-4" />
          Calculate My Cost
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
