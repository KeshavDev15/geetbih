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
      gsap.from(layer.querySelector('.layer-content'), {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: layer,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      });

      gsap.from(layer.querySelector('.layer-image'), {
        scale: 1.1,
        filter: 'grayscale(100%)',
        scrollTrigger: {
          trigger: layer,
          start: 'top 90%',
          end: 'bottom 20%',
          scrub: 2,
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-background">
      {CAPABILITIES.map((cap) => (
        <section
          key={cap.id}
          className="capability-layer relative min-h-screen flex items-center px-6 md:px-20 py-20 overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center z-10 w-full">
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
            <div className="layer-image relative aspect-[4/5] md:aspect-square overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700">
              <img
                src={cap.image}
                alt={cap.title}
                className="object-cover w-full h-full scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>
          </div>
          
          {/* Subtle Background Text */}
          <div className="absolute -bottom-10 -right-10 text-[20vw] font-bold text-white/5 select-none pointer-events-none font-serif">
            {cap.id}
          </div>
        </section>
      ))}
    </div>
  );
}
