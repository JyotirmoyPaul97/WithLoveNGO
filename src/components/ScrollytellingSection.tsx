"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactLenis } from "lenis/react";

export default function ScrollytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Responsive check to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 0.0 - 0.3: Scale up and fade in
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.5, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // 0.3 - 0.6: Shift positions based on mobile vs desktop
  // On desktop, shift left. On mobile, shift up.
  const x = useTransform(scrollYProgress, [0.3, 0.6], ["0%", isMobile ? "0%" : "-30%"]);
  const yShift = useTransform(scrollYProgress, [0.3, 0.6], ["0%", isMobile ? "-25%" : "0%"]);
  
  // 0.6 - 0.9: Text fades in
  const textOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.6, 0.8], [50, 0]);
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
        <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-center overflow-hidden px-6 md:px-0">
          
          {/* Background Parallax Elements */}
          <motion.div 
            style={{ y: bgY1 }} 
            className="absolute top-10 left-10 md:top-20 md:left-20 w-48 h-48 md:w-64 md:h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div 
            style={{ y: bgY2 }} 
            className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
          />

          {/* Central Object */}
          <motion.div
            style={{ 
              scale, 
              opacity,
              x,
              y: yShift
            }}
            className="absolute flex items-center justify-center w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] max-w-sm max-h-sm bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-3xl shadow-2xl z-10"
          >
            <div className="text-2xl md:text-4xl font-bold text-white">NGO 3D</div>
          </motion.div>

          {/* Text Block */}
          <motion.div
            style={{ 
              opacity: textOpacity,
              y: textY 
            }}
            className="absolute w-full md:w-[40%] md:right-[10%] mt-[60vh] md:mt-0 px-6 md:px-0 space-y-4 md:space-y-6 z-20"
          >
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center md:text-left">Meaningful Change</h2>
            <ul className="space-y-3 md:space-y-4 text-lg md:text-xl text-neutral-300">
              <motion.li style={{ opacity: listOpacity1 }} className="flex items-center justify-center md:justify-start gap-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" /> Care, compassion, and action.
              </motion.li>
              <motion.li style={{ opacity: listOpacity2 }} className="flex items-center justify-center md:justify-start gap-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" /> Supporting those who need it most.
              </motion.li>
              <motion.li style={{ opacity: listOpacity3 }} className="flex items-center justify-center md:justify-start gap-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" /> Building a better tomorrow.
              </motion.li>
            </ul>
          </motion.div>

        </div>
      </div>
    </ReactLenis>
  );
}
