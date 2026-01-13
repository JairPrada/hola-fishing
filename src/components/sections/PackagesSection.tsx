'use client';

import type { PackagesProps } from '@/shared/types/fishing-packages';
import { Card } from './Card';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function PackagesSection({ packages }: PackagesProps): JSX.Element {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.001 
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.section 
      ref={ref}
      aria-label="Fishing packages and tours"
      className="packages-section"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {packages.map((packageItem) => (
        <Card
          key={packageItem.id}
          variant={packageItem.variant}
          title={packageItem.title}
          description={packageItem.description}
          imgPath={packageItem.imgPath}
          price={packageItem.price}
          time={packageItem.time}
        />
      ))}
    </motion.section>
  );
}
