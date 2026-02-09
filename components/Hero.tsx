import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate?: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-canvas">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gold-glow pointer-events-none opacity-60" />

      {/* Wavy Line SVG Background - Adapted for Light Mode */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M-100 600 C 200 400, 600 800, 1540 200"
          stroke="url(#gradient-stroke)"
          strokeWidth="2"
          fill="none"
        />
        <defs>
          <linearGradient id="gradient-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(217, 119, 6, 0)" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="rgba(217, 119, 6, 0)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container max-w-[1280px] mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">

        {/* Text Content */}
        <div className="lg:col-span-7 flex flex-col gap-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 w-fit mx-auto lg:mx-0 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-sm font-bold tracking-wide">NEW SHOWS STREAMING NOW</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-ink leading-[1.1] tracking-tight"
          >
            The Home For <br />
            <span className="relative inline-block text-ink">
              <span className="relative z-10">Creator Content</span>
              {/* Scribble SVG Highlight */}
              <svg className="absolute -bottom-2 -left-2 w-[110%] h-[120%] z-0 text-goldLight opacity-40" viewBox="0 0 200 60" fill="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  d="M10,50 Q100,60 190,40"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-inkLight max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
          >
            Deorganized is where Web3 creators share knowledge, build community, and monetize their content.
            Watch exclusive shows, discover talented creators, and be part of the future of content creation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={() => onNavigate?.('shows')}
              className="bg-gold-gradient text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              Start Watching
              <PlayCircle className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Hero Image */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10"
          >
            <img
              src="/images/hero/hero-image.png"
              alt="Creator Content"
              className="object-cover w-full h-full rounded-2xl"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="800"%3E%3Crect fill="%23D97706" width="600" height="800"/%3E%3C/svg%3E';
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};