"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function ScrollytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 0.0 - 0.3: Scale up and fade in
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.5, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // 0.3 - 0.6: Shift left
  const x = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "-30%"]);
  
  // 0.6 - 0.9: Text fades in on right
  const textOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.6, 0.8], [50, 0]);
  const listOpacity1 = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const listOpacity2 = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
  const listOpacity3 = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);

  // Parallax elements
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <ReactLenis root>
      <div ref={containerRef} className="relative h-[400vh] bg-neutral-950 text-white overflow-hidden">
        
        {/* Sticky Container */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          
          {/* Background Parallax Elements */}
          <motion.div 
            style={{ y: bgY1 }} 
            className="absolute top-20 left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"
          />
          <motion.div 
            style={{ y: bgY2 }} 
            className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          />

          {/* Central Object */}
          <motion.div
            style={{ 
              scale, 
              opacity,
              x 
            }}
            className="absolute flex items-center justify-center w-[40vw] h-[40vw] max-w-md max-h-md bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-3xl shadow-2xl"
          >
            <div className="text-4xl font-bold">NGO 3D</div>
          </motion.div>

          {/* Text Block */}
          <motion.div
            style={{ 
              opacity: textOpacity,
              y: textY 
            }}
            className="absolute right-[10%] w-[40%] max-w-lg space-y-6"
          >
            <h2 className="text-5xl font-semibold tracking-tight">Meaningful Change</h2>
            <ul className="space-y-4 text-xl text-neutral-300">
              <motion.li style={{ opacity: listOpacity1 }} className="flex items-center gap-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" /> Care, compassion, and action.
              </motion.li>
              <motion.li style={{ opacity: listOpacity2 }} className="flex items-center gap-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" /> Supporting those who need it most.
              </motion.li>
              <motion.li style={{ opacity: listOpacity3 }} className="flex items-center gap-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" /> Building a better tomorrow.
              </motion.li>
            </ul>
          </motion.div>

        </div>
      </div>
    </ReactLenis>
  );
}
