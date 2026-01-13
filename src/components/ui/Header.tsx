"use client";

import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.header
      className="bg-white shadow-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-[#164765] h-2 xs:h-4 sm:h-8 md:h-8"
        variants={itemVariants}
      />
      <motion.div className="bg-[#E2DDD7]" variants={itemVariants}>
        <div className="flex flex-col md:flex-row justify-center md:justify-around items-center py-2 md:py-4 gap-4 md:gap-0">
          {/* Logo - Hidden on very small screens, visible from xs up */}
          <motion.div
            className="hidden xs:block md:relative flex-shrink-0 md:top-6 lg:top-8"
            variants={itemVariants}
          >
            <img
              src="/logo.png"
              alt="Hola Fishing Charters Logo"
              className="h-20 xs:h-24 sm:h-32 md:h-32 lg:h-44 xl:h-56 object-contain mx-auto md:mx-0"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="text-center md:text-right px-4 md:px-0"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row justify-center md:justify-end items-center">
              <motion.h1
                className="text-lg md:text-2xl lg:text-4xl xl:text-5xl xxl:text-5xl font-extrabold md:tracking-[.5px] xl:tracking-[.1px]"
              >
                <motion.span className="text-[#ED7D2F]">
                  HOLA FISHING
                </motion.span>
                <motion.span className="text-[#164765]">
                  {" CHARTERS PUERTO RICO "}
                </motion.span>
              </motion.h1>
            </div>
            <motion.p
              className="text-base lg:text-2xl xl:text-3xl text-[#164765] font-extrabold xl:tracking-[.5px]"
            >
              LOCAL WATERS, LOCAL KNOWLEDGE, UNFORGETTABLE FUN.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
