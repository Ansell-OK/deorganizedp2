import React from 'react';
import { Gift, Zap } from 'lucide-react';

export const EarnPointsBanner: React.FC = () => {
  return (
    <div className="bg-canvas border border-borderSubtle rounded-2xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-soft">
      {/* Background radial glow */}
      <div className="absolute -left-20 -top-20 w-64 h-64 bg-gold/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 flex items-start gap-6">
         <div className="w-16 h-16 rounded-2xl bg-surface border border-gold/20 flex items-center justify-center shrink-0 shadow-sm">
            <Gift className="w-8 h-8 text-gold" />
         </div>
         <div>
            <h3 className="text-2xl font-bold text-ink mb-2">Earn $DEORG Points</h3>
            <p className="text-inkLight max-w-md font-medium">
               Engage with content, share articles, and attend live events to level up your profile and unlock exclusive rewards.
            </p>
         </div>
      </div>

      <div className="relative z-10 flex items-center gap-4 bg-surface p-2 pr-6 rounded-full border border-borderSubtle shadow-sm">
         <div className="bg-gold/10 p-2 rounded-full">
            <Zap className="w-5 h-5 text-gold" />
         </div>
         <div className="text-right">
            <div className="text-xs text-inkLight font-semibold">Current Prize Pool</div>
            <div className="text-lg font-bold text-ink">50,000 USDT</div>
         </div>
      </div>
    </div>
  );
};
