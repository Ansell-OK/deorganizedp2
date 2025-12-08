import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
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
            <span className="text-gold text-sm font-bold tracking-wide">LIVE: Bitcoin hits $98k ATH</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-ink leading-[1.1] tracking-tight"
          >
            The Signal in the <br />
            <span className="relative inline-block text-ink">
              <span className="relative z-10">Crypto Noise</span>
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
            Deorganized is the premier ecosystem for creator-driven market insights. 
            Watch exclusive shows, earn rewards, and stay ahead of the curve.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <button className="bg-gold-gradient text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all hover:-translate-y-1 flex items-center gap-2">
              Start Watching
              <PlayCircle className="w-5 h-5" />
            </button>
            <button className="bg-white text-ink border border-borderSubtle px-8 py-4 rounded-full font-semibold hover:bg-surface hover:border-gold/30 transition-all flex items-center gap-2 shadow-sm">
              Read Latest News
              <ArrowRight className="w-4 h-4 text-gold" />
            </button>
          </motion.div>
        </div>

        {/* Hero Image/Mockup */}
        <div className="lg:col-span-5 relative hidden lg:block">
           <motion.div
             initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
             animate={{ opacity: 1, scale: 1, rotate: 0 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="relative z-10"
           >
              {/* Abstract Glass Card representing a video player or app interface - Light Version */}
              <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-4 shadow-2xl shadow-gray-200/50 transform translate-x-8">
                 <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-gray-100 shadow-inner">
                    <img 
                      src="https://picsum.photos/600/800?grayscale" 
                      alt="App Interface" 
                      className="object-cover w-full h-full opacity-90 transition-all duration-700" 
                    />
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-white via-white/80 to-transparent">
                       <span className="text-gold text-xs font-bold uppercase tracking-wider mb-2 block">Live Now</span>
                       <h3 className="text-ink text-xl font-bold">The Ethereum Merge: Retrospective</h3>
                       <div className="flex items-center gap-2 mt-2">
                          <div className="w-6 h-6 rounded-full bg-gold-gradient"></div>
                          <span className="text-inkLight text-sm font-medium">Host: Alex DeVault</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Floating Element */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-8 bg-white border border-borderSubtle p-4 rounded-2xl shadow-xl shadow-gray-200/50 z-20"
              >
                 <div className="flex items-center gap-3">
                    <div className="bg-emerald-50 p-2 rounded-lg">
                       <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                       </svg>
                    </div>
                    <div>
                       <div className="text-xs text-gray-500 font-medium">Market Sentiment</div>
                       <div className="text-ink font-bold">Greed (78)</div>
                    </div>
                 </div>
              </motion.div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};