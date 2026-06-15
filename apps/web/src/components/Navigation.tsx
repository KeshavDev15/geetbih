'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { name: 'Branding', href: '#branding' },
  { name: 'Engineering', href: '#engineering' },
  { name: 'AI Automation', href: '#automation' },
  { name: 'Work', href: '#work' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-20 py-6',
          isScrolled ? 'bg-background/80 backdrop-blur-md py-4' : 'bg-transparent'
        )}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full animate-pulse" />
            <span className="text-xl font-serif font-bold tracking-tighter text-foreground">
              GEETBIH <span className="text-muted-foreground font-light">LABS</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button className="px-6 py-2 border border-primary/50 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all text-foreground">
                Start Audit
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button
              className="text-foreground"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center p-6"
          >
            <button
              className="absolute top-6 right-6 text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-serif hover:text-primary transition-colors text-foreground"
                >
                  {link.name}
                </a>
              ))}
              <button className="mt-8 px-10 py-4 bg-primary text-primary-foreground rounded-full text-lg font-serif">
                Start Audit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
