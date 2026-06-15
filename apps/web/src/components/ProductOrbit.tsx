'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    title: 'Aura Intelligence',
    category: 'AI / SAAS',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
    year: '2026',
  },
  {
    title: 'Nexus Flow',
    category: 'AUTOMATION',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop',
    year: '2025',
  },
  {
    title: 'Ether Brand',
    category: 'BRANDING',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop',
    year: '2026',
  },
  {
    title: 'Carbon Logic',
    category: 'ENGINEERING',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop',
    year: '2024',
  },
];

export function ProductOrbit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.orbit-panel');
    
    // Main horizontal scroll animation
    const pin = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${sectionRef.current?.offsetWidth || 0}`,
      },
    });

    // Horizontal parallax for images within the panels
    panels.forEach((panel: any) => {
      const img = panel.querySelector('.orbit-image img');
      gsap.fromTo(img, 
        { xPercent: -20 },
        {
          xPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: pin,
            start: 'left right',
            end: 'right left',
            scrub: true,
          }
        }
      );
    });

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <div className="overflow-hidden bg-background">
      <div ref={triggerRef}>
        <div ref={sectionRef} className="flex flex-row w-[400vw] h-screen relative">
          {PRODUCTS.map((product, index) => (
            <section
              key={index}
              className="orbit-panel h-screen w-screen flex-shrink-0 flex items-center justify-center px-6 md:px-20 relative overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-7xl z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 font-mono text-sm text-primary">
                    <span>{product.year}</span>
                    <span className="w-8 h-px bg-primary/30" />
                    <span>{product.category}</span>
                  </div>
                  <h3 className="text-6xl md:text-8xl font-serif leading-none text-foreground">
                    {product.title}
                  </h3>
                  <button className="mt-8 px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:scale-105 transition-transform">
                    Explore Project
                  </button>
                </div>
                <div className="orbit-image relative aspect-[16/10] overflow-hidden rounded-sm group">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="absolute -left-[20%] w-[140%] h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
              
              {/* Background Index */}
              <div className="absolute top-1/2 right-20 -translate-y-1/2 font-serif text-[30vw] text-white/5 select-none pointer-events-none leading-none mix-blend-overlay">
                0{index + 1}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
