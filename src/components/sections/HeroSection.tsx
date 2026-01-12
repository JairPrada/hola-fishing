'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  
  // Efecto parallax sutil - solo vertical
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]); // Reducir el parallax
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]); // Reducir el escalado

  return (
    <div className="top-0 w-full overflow-hidden"> {/* Contenedor con overflow-hidden */}
      <motion.div 
        className="w-full bg-fishing-01 h-64 xs:h-80 sm:h-96 md:h-[450px] lg:h-[550px] xl:h-[600px] bg-cover bg-no-repeat"
        style={{ 
          backgroundPosition: 'center center',
          backgroundPositionY: 'clamp(-500px, -20vw, -50px)',
          y,
          scale
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );
}
