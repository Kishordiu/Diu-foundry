import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Mark } from "./Mark";

export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    // Reduced from 1600ms — shaves 400ms off FCP on mobile
    const t = setTimeout(() => setDone(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000000] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="relative flex flex-col items-center justify-center h-full w-full">
            {/* 1. Pure black screen starts implicitly */}

            {/* 2 & 3. Tiny spark and flowing ribbon */}
            <svg
              className="absolute pointer-events-none w-[200px] h-[200px]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M 20 80 C 20 80, 50 20, 80 80" // abstract ribbon path
                stroke="url(#ribbon-grad)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="ribbon-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#f2edff" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <motion.div
              className="absolute h-[1px] w-[1px] rounded-full bg-white shadow-[0_0_15px_3px_rgba(255,255,255,0.9)]"
              initial={{ x: -60, y: 30, opacity: 0 }}
              animate={{
                x: [-60, 0, 60],
                y: [30, -30, 30],
                opacity: [0, 1, 0],
                scale: [1, 2.5, 0.5],
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* 4 & 5. DIU Logo Forge & Metallic Reflection */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="relative overflow-hidden group">
                <Mark className="h-28 w-28 text-white drop-shadow-2xl" stroke="#ffffff" />
                {/* Metallic Reflection Sweep */}
                <motion.div
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 skew-x-12 mix-blend-overlay"
                  initial={{ x: "-200%" }}
                  animate={{ x: "200%" }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                />
              </div>

              {/* 6. Subtle blooming lavender gradient */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 rounded-full bg-[#d6b4ff] blur-[60px]"
                initial={{ opacity: 0, width: 0, height: 0 }}
                animate={{ opacity: 0.35, width: "300px", height: "300px" }}
                transition={{ delay: 0.4, duration: 1.6, ease: "easeOut" }}
              />
            </motion.div>

            {/* 7. Tagline Appearance */}
            <div className="absolute top-[60%] flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                className="font-display text-2xl italic tracking-wider text-[#f2edff]"
              >
                Every Idea is a Spark.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.7, ease: "easeOut" }}
                className="mt-3 text-[10px] uppercase tracking-[0.5em] text-white/60"
              >
                Build the Flame.
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
