"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function HeroSection() {
  const { scrollYProgress } = useScroll();

  // Efecto parallax sutil - solo vertical
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]); // Reducir el parallax
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]); // Reducir el escalado

  return (
    <motion.div
      className="w-full bg-fishing-01 h-36 sm:h-[200px] border md:h-[450px] lg:h-[550px] xl:h-[600px] bg-cover bg-no-repeat bg-center"
      style={{
        backgroundPosition: "center 40%",
        y,
        scale,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
  );
}
