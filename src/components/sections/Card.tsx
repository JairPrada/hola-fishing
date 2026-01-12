'use client';

import { CircleDollarSign, Clock, Badge } from "lucide-react";
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface CardProps {
  variant?: "primary" | "secondary";
  imgPath?: string;
  price?: number | string;
  time?: number;
  description?: string;
  title?: string;
}

export function Card({
  variant = "primary",
  imgPath = "landing/05.jpg",
  price = 200,
  time = 1,
  description = "",
  title = "",
}: CardProps) {
  const styles = getCardStyles(variant);
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.3 
  });

  return (
    <motion.section 
      ref={ref}
      className={`${styles.background} grid grid-cols-1 md:grid-cols-6 w-full overflow-hidden`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: { duration: 0.3 }
      }}
    >
      {/* Imagen del paquete */}
      <CardImage
        imgPath={imgPath}
        title={title}
        orderClass={styles.imageOrder}
      />

      {/* Contenido de la card */}
      <CardContent
        title={title}
        description={description}
        price={price}
        time={time}
        textColor={styles.textColor}
        orderClass={styles.contentOrder}
      />
    </motion.section>
  );
}

function CardImage({
  imgPath,
  title,
  orderClass,
}: {
  imgPath: string;
  title: string;
  orderClass: string;
}) {
  return (
    <motion.div className={`${orderClass} col-span-1 md:col-span-2 overflow-hidden`}>
      <motion.img
        src={imgPath}
        alt={`Paquete de pesca: ${title}`}
        className="h-64 xs:h-72 sm:h-80 md:h-full w-full object-cover"
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
      />
    </motion.div>
  );
}

function CardContent({
  title,
  description,
  price,
  time,
  textColor,
  orderClass,
}: {
  title: string;
  description: string;
  price: number | string;
  time: number;
  textColor: string;
  orderClass: string;
}) {
  return (
    <div
      className={`${orderClass} relative col-span-1 md:col-span-4 overflow-hidden px-4 xs:px-6 sm:px-8 md:px-11 py-6 xs:py-8 sm:py-10`}
    >
      {/* Título del paquete */}
      <h1 className={`${textColor} text-lg xs:text-xl sm:text-2xl md:text-2xl font-extrabold`}>{title}</h1>

      {/* Descripción */}
      <div className="mt-3 xs:mt-4">
        <p className={`${textColor} text-sm xs:text-base sm:text-lg md:text-2xl leading-relaxed`}>{description}</p>
      </div>

      {/* Información de precio y duración */}
      <div className="mt-6 xs:mt-8 sm:mt-10 flex flex-col xs:flex-row w-full justify-between items-start xs:items-center space-y-3 xs:space-y-0">
        <PriceDisplay price={price} textColor={textColor} />
        <TimeDisplay time={time} textColor={textColor} />
      </div>
    </div>
  );
}

function PriceDisplay({
  price,
  textColor,
}: {
  price: number | string;
  textColor: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {/* Icono de precio con insignia de dólar - Lucide React */}

      <div className="relative">
        <Badge
          size={30}
          color="#ED7D2F"
          strokeWidth={2}
          className="flex-shrink-0 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
        />
        <CircleDollarSign
          size={18}
          color="#ED7D2F"
          strokeWidth={2}
          className="flex-shrink-0 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
        />
      </div>
      <p className={`${textColor} text-base xs:text-lg sm:text-xl md:text-2xl font-extrabold`}>${price}</p>
    </div>
  );
}

function TimeDisplay({ time, textColor }: { time: number; textColor: string }) {
  return (
    <div className="flex items-center gap-2">
      {/* Icono de reloj - Lucide React */}
      <Clock
        size={24}
        color="#ED7D2F"
        strokeWidth={2}
        className="flex-shrink-0 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
      />
      <p className={`${textColor} text-base xs:text-lg sm:text-xl md:text-2xl font-extrabold`}>{time} HOURS</p>
    </div>
  );
}

function getCardStyles(variant: "primary" | "secondary") {
  const styleMap = {
    primary: {
      background: "bg-[#164765]",
      textColor: "text-white",
      imageOrder: "md:order-1",
      contentOrder: "md:order-2",
    },
    secondary: {
      background: "bg-[#E2DDD7]",
      textColor: "text-[#164765]",
      imageOrder: "md:order-2",
      contentOrder: "md:order-1",
    },
  } as const;

  return styleMap[variant];
}
