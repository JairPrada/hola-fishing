"use client";

import { CONTACT_INFO, THEME_COLORS } from "@/shared/constants/contact";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookNowButton } from "@/components/booking/BookingProvider";

export function CallToActionSection(): JSX.Element {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
    amount: 0.3,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  const containerClasses = [
    "relative w-full",
    THEME_COLORS.BACKGROUND_GRAY,
    "bg-hero bg-cover bg-center bg-no-repeat",
    "flex flex-col justify-center items-center",
    "py-8 xs:py-12 sm:py-16 md:py-20 px-4 xs:px-6 sm:px-8",
  ].join(" ");

  const headingClasses = [
    "text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl",
    "font-bold relative z-10 text-center",
  ].join(" ");

  const contactTextClasses = [
    "mt-3 xs:mt-4 sm:mt-5",
    "text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl",
    "font-semibold z-10 text-center",
  ].join(" ");

  const buttonClasses = [
    "font-bold z-10 mt-3 xs:mt-4 sm:mt-5",
    "text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
    "px-4 xs:px-6 sm:px-8 md:px-10 py-3 xs:py-4 sm:py-6",
    "rounded-[15px] xs:rounded-[20px] sm:rounded-[25px] md:rounded-[30px]",
    "hover:opacity-90 transition-opacity duration-200 hover:bg-[#ED7D2F] hover:duration-200",
  ].join(" ");

  return (
    <>
      <motion.section
        ref={ref}
        className={containerClasses}
        aria-label="Contact and booking information"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Overlay para mejorar legibilidad */}
        <motion.div
          className={`absolute inset-0 ${THEME_COLORS.WHITE_OVERLAY}`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-white/70" />

        <motion.h1
          className={headingClasses}
          style={{ color: THEME_COLORS.PRIMARY_BLUE }}
          variants={itemVariants}
        >
          {CONTACT_INFO.BOOKING_CTA.split(" ").slice(0, 2).join(" ")} <br />
          {CONTACT_INFO.BOOKING_CTA.split(" ").slice(2).join(" ")}
        </motion.h1>

        <motion.p
          className={contactTextClasses}
          style={{ color: THEME_COLORS.PRIMARY_BLUE }}
          variants={itemVariants}
        >
          {CONTACT_INFO.CALL_TO_ACTION}
        </motion.p>

        <motion.div variants={itemVariants}>
          <BookNowButton
            size="lg"
            className={buttonClasses}
            packageInfo={{
              id: "general-charter",
              name: "Fishing Adventure",
              price: 0,
            }}
          >
            {CONTACT_INFO.BOOKING_BUTTON_TEXT}
          </BookNowButton>
        </motion.div>
      </motion.section>

      <div
        className="h-12"
        style={{ backgroundColor: THEME_COLORS.PRIMARY_ORANGE }}
        aria-hidden="true"
      />
    </>
  );
}
