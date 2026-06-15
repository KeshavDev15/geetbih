'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'motion/react';
import { HeroCanvas } from './HeroCanvas';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <HeroCanvas />
      
      <div className="z-10 text-center pointer-events-none">
        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-bold tracking-tighter mix-blend-difference"
        >
          GEETBIH <span className="text-primary">LABS</span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto px-4"
        >
          Crafting high-performance digital products and AI automation for elite brands.
        </motion.p>
      </div>
      
      {/* Dynamic Glow */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.2)_0%,rgba(0,0,0,1)_80%)]" />
    </section>
  );
}
