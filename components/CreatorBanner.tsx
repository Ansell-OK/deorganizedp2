import React from 'react';
import { Mic, Video, TrendingUp } from 'lucide-react';

export const CreatorBanner: React.FC = () => {
  return (
    <div className="relative rounded-[32px] overflow-hidden bg-midnight border border-borderSubtle shadow-2xl">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/1200/400?grayscale')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      {/* Keeping a dark background here for visual anchor/contrast in a light theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/95 to-transparent" />
      
      <div className="relative z-10 px-8 py-16 md:px-16 md:flex items-center justify-between gap-12">
        <div className="max-w-xl">
           <div className="inline-block px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-bold mb-4 uppercase tracking-wider">
             Creator Economy 2.0
           </div>
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
             Your Voice. <span className="text-transparent bg-clip-text bg-gold-gradient">Your Audience.</span> Your Revenue.
           </h2>
           <p className="text-white/70 text-lg mb-8 font-medium">
             Join the Deorganized creator network. Schedule shows, drop exclusive content, and earn directly from your community.
           </p>
           
           <div className="flex flex-wrap gap-4 mb-8">
              {['Launch Your Show', 'Earn Tokens', 'Engage Community'].map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-white/90 bg-white/5 border border-white/5 px-4 py-2 rounded-full text-sm font-medium">
                   <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                   {feat}
                </div>
              ))}
           </div>

           <button className="bg-white text-midnight font-bold px-8 py-4 rounded-full hover:bg-gold hover:text-white transition-colors shadow-lg">
             Become a Creator
           </button>
        </div>

        {/* Visual Icons on Right */}
        <div className="hidden md:grid grid-cols-2 gap-4 opacity-100">
           <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center w-32 h-32 transform translate-y-8 shadow-lg">
              <Mic className="w-8 h-8 text-gold mb-2" />
              <span className="text-xs text-white font-semibold">Podcasts</span>
           </div>
           <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center w-32 h-32 shadow-lg">
              <Video className="w-8 h-8 text-gold mb-2" />
              <span className="text-xs text-white font-semibold">Live Shows</span>
           </div>
           <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center w-32 h-32 transform translate-y-8 col-span-2 mx-auto shadow-lg">
              <TrendingUp className="w-8 h-8 text-gold mb-2" />
              <span className="text-xs text-white font-semibold">Analytics</span>
           </div>
        </div>
      </div>
    </div>
  );
};