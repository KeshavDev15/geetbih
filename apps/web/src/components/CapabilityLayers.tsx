'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    id: '01',
    title: 'Visual Branding',
    description: 'We define the aesthetic DNA of elite products. Quality that clients feel before they read a single word.',
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: '02',
    title: 'Engineering',
    description: 'High-performance code architecture built for scale. We build systems that are as beautiful inside as they are outside.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: '03',
    title: 'AI Automation',
    description: 'The AI Factory layer. We automate content, ads, and idea generation into seamless, always-on pipelines.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
  },
];

export function CapabilityLayers() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const layers = gsap.utils.toArray('.capability-layer');
    
    layers.forEach((layer: any, i) => {
      // Content fade up
      gsap.fromTo(layer.querySelector('.layer-content'), 
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: layer,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );

      // Premium Image Parallax
      gsap.fromTo(layer.querySelector('.layer-image img'),
        { yPercent: -20, scale: 1.1, filter: 'grayscale(100%)' },
        {
          yPercent: 20,
          scale: 1,
          filter: 'grayscale(0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: layer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Background Text Parallax (Moves opposite to scroll)
      gsap.fromTo(layer.querySelector('.bg-text'),
        { yPercent: 50, opacity: 0 },
        {
          yPercent: -50,
          opacity: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: layer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-background relative z-10">
      {CAPABILITIES.map((cap) => (
        <section
          key={cap.id}
          className="capability-layer relative min-h-screen flex items-center px-6 md:px-20 py-20 overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center z-10 w-full max-w-7xl mx-auto">
            <div className="layer-content space-y-6">
              <span className="font-mono text-primary text-sm tracking-widest">
                {cap.id} // CAPABILITY
              </span>
              <h2 className="text-5xl md:text-7xl font-serif text-foreground leading-tight">
                {cap.title}
              </h2>
              <p className="text-muted-foreground text-xl md:text-2xl max-w-lg leading-relaxed">
                {cap.description}
              </p>
            </div>
            <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-sm group">
              <div className="layer-image absolute inset-0 w-full h-full">
                <img
                  src={cap.image}
                  alt={cap.title}
                  className="object-cover w-full h-full h-[140%] -top-[20%] absolute"
                />
              </div>
              <div className="absolute inset-0 bg-primary/5 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700" />
            </div>
          </div>
          
          {/* Subtle Parallax Background Text */}
          <div className="bg-text absolute top-1/2 right-0 -translate-y-1/2 text-[30vw] font-bold text-white select-none pointer-events-none font-serif leading-none opacity-5">
            {cap.id}
          </div>
        </section>
      ))}
    </div>
  );
}
