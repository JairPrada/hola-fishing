"use client";

import { motion, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function CaptainSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.1 && !shouldAnimate) {
        setShouldAnimate(true);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, shouldAnimate]);

  return (
    <motion.section
      ref={ref}
      id="captain"
      className="relative w-full bg-gray-50 bg-hero bg-cover bg-center bg-no-repeat"
      initial={{ opacity: 0, y: 50 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Overlay con filtro blanco para mejorar legibilidad */}
      <div className="absolute inset-0 bg-white/90" />

      {/* Contenedor principal con z-index superior */}
      <motion.div
        className="relative z-10 mx-auto flex flex-col md:flex-row justify-center items-start px-4 xs:px-6 sm:px-8 md:px-16 lg:px-20 xl:px-40 pt-0 sm:pt-0 md:pt-0 pb-0 sm:pb-12 lg:pb-16 gap-8 lg:gap-12"
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Información del Capitán */}
        <motion.div
          className="w-full md:w-3/5"
          initial={{ opacity: 0, x: -50 }}
          animate={
            shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
          }
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CaptainProfile />
          <CaptainBiography />
        </motion.div>

        {/* Galería de Fotos */}
        <motion.div
          className="w-full md:w-2/5 md:-top-14 md:relative"
          initial={{ opacity: 0, x: 50 }}
          animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PhotoGallery />
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full md:w-3/5 mx-4 mb-4 !z-10 relative"
        initial={{ opacity: 0, x: -50 }}
        animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-[#174866]">
          ADVENTURE PACKAGES
        </h1>
      </motion.div>
    </motion.section>
  );
}

function CaptainProfile() {
  return (
    <div className="mb-6 sm:mb-8 text-center md:text-left">
      <img
        src="/landing/02.jpeg"
        alt="Capitán de Hola Fishing Charters"
        className="mb-4 sm:mb-5 h-40 w-40 xs:h-48 xs:w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-60 lg:w-60 xl:h-64 xl:w-64 rounded-full border-3 sm:border-4 border-[#174866] object-cover mx-auto md:mx-0 shadow-lg"
      />
      <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-[#174866]">
        MEET THE CAPTAIN
      </h1>
    </div>
  );
}

function CaptainBiography() {
  const paragraphs = [
    {
      text: "I am a native Floridian and fishing has been an integral part of my daily life since I was a teenager. Most of my fishing has been done in the offshore waters of Florida for pelagic fish, but I did manage to escape the state from time to time. Over the years, I've participated in a dozen international Marlin tournaments with prizes for the biggest fish that went up in the millions. Eventually, I wanted to turn toward unknown waters, and that's how I found my way to the island of Puerto Rico.",
      className:
        "font-bold text-[#174866] text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed",
    },
    {
      text: "My goal is simple: I'd like to make enough life-long friendships with my clients that I'll never have to fish with a stranger when I retire, if I ever do!",
      className:
        "text-[#174866] text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed",
    },
    {
      text: "I do my best to give you the most exciting fishing experience as possible. We'll fish the the Puerto Rican offshore waters near places like Desecheo island, the famous Bajo Cinco sea mountain. We'll cruise over the steep ledges, and wild reefs from Rincon to Cabo Rojo. We will hunt Wahoo, Mahi, Tuna, and reef species such as grouper, snapper and other toothy species!",
      className:
        "text-[#174866] text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed",
    },
  ];

  return (
    <div className="max-w-none lg:max-w-2xl space-y-4 sm:space-y-6 text-center md:text-left">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={paragraph.className}>
          {paragraph.text}
        </p>
      ))}
    </div>
  );
}

function PhotoGallery() {
  const photos = [
    {
      src: "/landing/03.JPG",
      alt: "Experiencia de pesca en Puerto Rico",
      className:
        "mb-4 sm:mb-6 w-full h-auto object-cover shadow-lg transition-shadow duration-300",
    },
    {
      src: "/landing/04.png",
      alt: "Aventuras de pesca offshore",
      className:
        "w-full h-auto object-cover shadow-lg transition-shadow duration-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 sm:gap-6">
      {photos.map((photo, index) => (
        <motion.div key={index} className="overflow-hidden">
          <motion.img
            src={photo.src}
            alt={photo.alt}
            className={photo.className}
          />
        </motion.div>
      ))}
    </div>
  );
}
