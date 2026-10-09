"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactLenis } from "lenis/react";

export default function ScrollytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 0.0 - 0.3: Scale up and fade in
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.5, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // 0.3 - 0.6: Move elements using a unified timeline progress
  // We map the progress to a generic 0 to 1 value, and use CSS for responsive transforms
  const moveProgress = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  
  // 0.6 - 0.9: Text fades in
  const textOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.6, 0.8], [30, 0]);
  
  const listOpacity1 = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const listOpacity2 = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
  const listOpacity3 = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);

  // Parallax elements
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <ReactLenis root options={{ smoothWheel: true, touchMultiplier: 2 }}>
      <div ref={containerRef} className="relative h-[400vh] bg-neutral-950 text-white w-full overflow-hidden">
        
        {/* Sticky Container */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          
          {/* Background Parallax Elements */}
          <motion.div 
            style={{ y: bgY1 }} 
            className="absolute top-[10%] left-[10%] w-48 h-48 md:w-64 md:h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div 
            style={{ y: bgY2 }} 
            className="absolute bottom-[10%] right-[10%] w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
          />

          {/* Central Object wrapper for responsive movement */}
          <motion.div 
            style={{ 
              scale,
              opacity,
              // On desktop (vw > 768), shift left by -25vw, otherwise shift up by -20vh
              x: useTransform(moveProgress, (p) => `calc(${p} * var(--shift-x, 0vw))`),
              y: useTransform(moveProgress, (p) => `calc(${p} * var(--shift-y, -25vh))`),
            }}
            className="absolute flex items-center justify-center w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] max-w-[320px] max-h-[320px] bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-3xl shadow-2xl z-10 [--shift-x:0vw] [--shift-y:-25vh] md:[--shift-x:-25vw] md:[--shift-y:0vh]"
          >
            <div className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">NGO 3D</div>
          </motion.div>

          {/* Text Block */}
          <motion.div
            style={{ 
              opacity: textOpacity,
              y: textY,
              // Move from center to its final place alongside the box
              x: useTransform(moveProgress, (p) => `calc(${p} * var(--text-shift-x, 0vw))`),
              marginTop: useTransform(moveProgress, (p) => `calc(${p} * var(--text-shift-y, 25vh))`),
            }}
            className="absolute w-[85%] md:w-[40%] flex flex-col items-center md:items-start text-center md:text-left z-20 [--text-shift-x:0vw] [--text-shift-y:25vh] md:[--text-shift-x:20vw] md:[--text-shift-y:0vh]"
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white drop-shadow-sm mb-6">
              Meaningful Change
            </h2>
            <ul className="space-y-4 text-lg md:text-xl text-neutral-200">
              <motion.li style={{ opacity: listOpacity1 }} className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]" /> 
                <span>Care, compassion, and action.</span>
              </motion.li>
              <motion.li style={{ opacity: listOpacity2 }} className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]" /> 
                <span>Supporting those who need it most.</span>
              </motion.li>
              <motion.li style={{ opacity: listOpacity3 }} className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]" /> 
                <span>Building a better tomorrow.</span>
              </motion.li>
            </ul>
          </motion.div>

        </div>
      </div>
    </ReactLenis>
  );
}
