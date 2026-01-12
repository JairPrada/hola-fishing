'use client';

import { motion } from 'framer-motion';

/**
 * Componente de elementos flotantes decorativos
 * Agrega un toque sutil e innovador al diseño
 */
export function FloatingElements() {
  // Generar elementos flotantes con diferentes delays y duraciones
  const floatingElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: i * 0.8,
    duration: 8 + (i * 0.5),
    size: 20 + (i * 5),
    opacity: 0.03 + (i * 0.01),
    x: 10 + (Math.random() * 80), // Limitar entre 10% y 90%
    y: 10 + (Math.random() * 80), // Limitar entre 10% y 90%
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-blue-400/20"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
            opacity: element.opacity,
          }}
          animate={{
            y: [-20, -100, -20],
            x: [-5, 5, -5], // Reducir movimiento horizontal
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1], // Reducir escalado
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Componente de burbujas marinas flotantes
 * Temática específica para el sitio de pesca
 */
export function MarineBubbles() {
  const bubbles = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    delay: i * 2,
    duration: 12 + (i * 2),
    size: 8 + (i * 3),
    opacity: 0.05 + (i * 0.01),
    x: 15 + (i * 15), // Mantener más centrado
    y: 80 + (i * 3), // Reducir dispersión vertical
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full border-2 border-blue-200"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            opacity: bubble.opacity,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
          }}
          animate={{
            y: [0, -300],
            x: [-2, 2, -2], // Reducir movimiento horizontal
            scale: [0.5, 1, 0.8, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}