import React from 'react';
import { Mic, Video, TrendingUp } from 'lucide-react';

interface CreatorBannerProps {
  onNavigate?: (page: string) => void;
  userRole?: 'user' | 'creator' | null;
  isAuthenticated?: boolean;
}

export const CreatorBanner: React.FC<CreatorBannerProps> = ({ onNavigate, userRole, isAuthenticated }) => {
  const handleBecomeCreator = () => {
    if (userRole === 'creator') {
      // Already a creator - go to dashboard
      onNavigate?.('dashboard');
    } else if (isAuthenticated) {
      // Logged in but not a creator - go to edit profile to upgrade role
      onNavigate?.('edit-profile');
    } else {
      // Not logged in - go to login/registration
      onNavigate?.('login');
    }
  };

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
          <p className="text-white/90 text-lg mb-8 font-medium">
            Join the Deorganized creator network. Schedule shows, drop exclusive content, and earn directly from your community.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            {['Launch Your Show', 'Earn Tokens', 'Engage Community'].map((feat, i) => (
              <div key={i} className="flex items-center gap-2 text-white bg-surface/5 border border-borderSubtle/5 px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                {feat}
              </div>
            ))}
          </div>

          <button
            onClick={handleBecomeCreator}
            className="bg-gold text-white font-bold px-8 py-4 rounded-full hover:bg-gold/90 transition-colors shadow-lg"
          >
            {userRole === 'creator' ? 'Go to Dashboard' : 'Become a Creator'}
          </button>
        </div>

        {/* Visual Icons on Right */}
        <div className="hidden md:grid grid-cols-2 gap-4 opacity-100">
          <div className="bg-surface/5 backdrop-blur-md p-6 rounded-2xl border border-borderSubtle/10 flex flex-col items-center justify-center w-32 h-32 transform translate-y-8 shadow-lg">
            <Mic className="w-8 h-8 text-gold mb-2" />
            <span className="text-xs text-white font-semibold">Podcasts</span>
          </div>
          <div className="bg-surface/5 backdrop-blur-md p-6 rounded-2xl border border-borderSubtle/10 flex flex-col items-center justify-center w-32 h-32 shadow-lg">
            <Video className="w-8 h-8 text-gold mb-2" />
            <span className="text-xs text-white font-semibold">Live Shows</span>
          </div>
          <div className="bg-surface/5 backdrop-blur-md p-6 rounded-2xl border border-borderSubtle/10 flex flex-col items-center justify-center w-32 h-32 transform translate-y-8 col-span-2 mx-auto shadow-lg">
            <TrendingUp className="w-8 h-8 text-gold mb-2" />
            <span className="text-xs text-white font-semibold">Analytics</span>
          </div>
        </div>
      </div>
    </div>
  );
};

