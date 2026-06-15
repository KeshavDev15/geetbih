'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { HeroCanvas } from './HeroCanvas';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.5,
      });

      // Exit Parallax (moves slower than scroll)
      gsap.to(contentRef.current, {
        yPercent: 50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>
      
      <div ref={contentRef} className="z-10 text-center pointer-events-none relative">
        <h1
          ref={titleRef}
          className="text-7xl md:text-[10rem] font-bold tracking-tighter mix-blend-difference leading-none"
        >
          GEETBIH <span className="text-primary italic font-serif">LABS</span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto px-4 mix-blend-difference"
        >
          Crafting high-performance digital products and AI automation for elite brands.
        </motion.p>
      </div>
      
      {/* Dynamic Glow Overlay to ensure text readability */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,var(--background)_100%)] pointer-events-none" />
    </section>
  );
}
