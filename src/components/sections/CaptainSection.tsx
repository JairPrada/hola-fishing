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
      className="relative w-full bg-gray-50 bg-hero bg-cover bg-center bg-no-repeat pt-4 md:pt-8 pb-10"
      initial={{ opacity: 0, y: 50 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Overlay con filtro blanco para mejorar legibilidad */}
      <div className="absolute inset-0 bg-white/90" />

      {/* Contenedor principal con z-index superior */}
      <motion.div
        className="relative z-10 mx-auto flex flex-col lg:flex-row justify-center lg:items-stretch items-start px-4 xs:px-6 sm:px-8 md:px-16 lg:px-20 pt-0 sm:pt-0 md:pt-0 pb-0 gap-8 lg:gap-12"
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Información del Capitán */}
        <motion.div
          className="w-full lg:w-3/5 lg:flex lg:flex-col"
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
        <div className="relative w-full lg:w-2/5">
          <motion.div
            className="w-full absolute lg:-top-20"
            initial={{ opacity: 0, x: 50 }}
            animate={
              shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
            }
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PhotoGallery />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="w-full lg:w-3/5 px-4 xs:px-6 sm:px-8 md:px-11 !z-10 relative"
        initial={{ opacity: 0, x: -50 }}
        animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1
          className="text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-bold text-[#174866] mt-10"
          style={{ fontSize: "clamp(1.75rem, 2.2vw + 0.4rem, 3rem)" }}
        >
          ADVENTURE PACKAGES
        </h1>
      </motion.div>
    </motion.section>
  );
}

function CaptainProfile() {
  return (
    <div className="mb-1 text-center lg:text-left">
      <img
        src="/landing/02.jpeg"
        alt="Capitán de Hola Fishing Charters"
        className="mb-4 sm:mb-5 h-40 w-40 xs:h-48 xs:w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-60 lg:w-60 xl:h-64 xl:w-64 rounded-full border-3 sm:border-4 border-[#174866] object-cover mx-auto lg:mx-0 shadow-lg"
      />
      <h1
        className="text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-[#174866]"
        style={{ fontSize: "clamp(1.75rem, 2.2vw + 0.4rem, 3rem)" }}
      >
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
        "font-semibold text-[#174866] text-sm xs:text-base sm:text-lg md:text-lg leading-relaxed",
      style: {
        fontSize: "clamp(1.125rem, 1.3vw + 0.4rem, 1.75rem)",
        lineHeight: "1.20",
      },
    },
    {
      text: "My goal is simple: I'd like to make enough life-long friendships with my clients that I'll never have to fish with a stranger when I retire, if I ever do!",
      className:
        "text-[#174866] text-sm xs:text-base sm:text-lg md:text-lg leading-relaxed",
      style: {
        fontSize: "clamp(1.125rem, 1.3vw + 0.4rem, 1.75rem)",
        lineHeight: "1.20",
      },
    },
    {
      text: "I do my best to give you the most exciting fishing experience as possible. We'll fish the the Puerto Rican offshore waters near places like Desecheo island, the famous Bajo Cinco sea mountain. We'll cruise over the steep ledges, and wild reefs from Rincon to Cabo Rojo. We will hunt Wahoo, Mahi, Tuna, and reef species such as grouper, snapper and other toothy species!",
      className:
        "text-[#174866] text-sm xs:text-base sm:text-lg md:text-lg leading-relaxed",
      style: {
        fontSize: "clamp(1.125rem, 1.3vw + 0.4rem, 1.75rem)",
        lineHeight: "1.20",
      },
    },
  ];

  return (
    <div className="max-w-none space-y-4 sm:space-y-6 text-center lg:text-left xl:pr-20 xxl:pr-40">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={paragraph.className} style={paragraph.style}>
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
    },
    {
      src: "/landing/04.png",
      alt: "Aventuras de pesca offshore",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-4 sm:gap-6 lg:h-full border">
      {photos.map((photo, index) => (
        <motion.div key={index} className="overflow-hidden lg:flex-1">
          <motion.img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-48 xs:h-56 sm:h-64 md:h-72 lg:h-[450px] xl:h-[520px] xxl:h-[540px] object-cover shadow-lg transition-shadow duration-300"
          />
        </motion.div>
      ))}
    </div>
  );
}
