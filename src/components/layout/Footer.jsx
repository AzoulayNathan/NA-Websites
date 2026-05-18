import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function Footer() {
  const [ref, visible] = useScrollReveal(0.2);

  return (
    <footer ref={ref} className="bg-deep-green text-quartz">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Seam line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={visible ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-[1px] bg-quartz/15 origin-left mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-serif text-2xl font-semibold">NA</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-sky-blue font-medium">
                Websites
              </span>
            </div>
            <p className="text-sm text-quartz/50 leading-relaxed max-w-xs font-light">
              Websites with structure. Interfaces with atmosphere.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-quartz/40 mb-5">Navigation</p>
            <div className="flex flex-col gap-3">
              <Link to="/work" className="text-sm text-quartz/70 hover:text-quartz transition-colors">Work</Link>
              <Link to="/process" className="text-sm text-quartz/70 hover:text-quartz transition-colors">Process</Link>
              <Link to="/contact" className="text-sm text-quartz/70 hover:text-quartz transition-colors">Contact</Link>
              <a
                href="https://na-studio.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-quartz/40 hover:text-sky-blue transition-colors"
              >
                Nathan / NA Studio
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-quartz/40 mb-5">Contact</p>
            <a
              href="mailto:nathanazoulay.pro@gmail.com"
              className="text-sm text-quartz/70 hover:text-quartz transition-colors"
            >
              nathanazoulay.pro@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-quartz/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-quartz/30 tracking-wider">
            © {new Date().getFullYear()} NA Websites
          </p>
          <p className="text-[11px] text-quartz/20 tracking-wider">
            STRUCTURE / ATMOSPHERE / INTENT
          </p>
        </div>
      </div>
    </footer>
  );
}