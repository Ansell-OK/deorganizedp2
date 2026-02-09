
import React from 'react';
import { Star } from 'lucide-react';

interface CreatorSpotlightProps {
  onNavigate?: (page: string, id?: string | number) => void;
}

export const CreatorSpotlight: React.FC<CreatorSpotlightProps> = ({ onNavigate }) => {
  const handleClick = () => {
    if (onNavigate) onNavigate('creator-detail', 1);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-ink mb-6 flex items-center gap-2">
        <Star className="w-6 h-6 text-gold fill-gold" />
        Creator of the Month
      </h2>
      
      {/* Light mode card with subtle gradient border */}
      <div className="flex-1 bg-canvas border border-borderSubtle rounded-3xl p-1 relative overflow-hidden group shadow-soft">
         <div className="absolute inset-0 bg-[url('https://picsum.photos/600/600?random=10')] bg-cover bg-center opacity-10 group-hover:scale-105 transition-transform duration-700" />
         <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
         
         <div className="relative h-full flex flex-col justify-end p-8">
            <div className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 shadow-sm">
               Top Performer
            </div>
            <h3 className="text-3xl font-bold text-ink mb-1">Marcus "The Chain" Reed</h3>
            <p className="text-inkLight mb-6 text-sm font-medium">Host of "Block by Block" • 120k Followers</p>
            
            <p className="text-inkLight text-sm mb-6 line-clamp-3">
               Marcus has redefined how we look at Layer 2 scaling solutions. His deep dive series this month brought in over 500k views and sparked a governance vote.
            </p>
            
            <div className="flex gap-3">
               <button 
                  onClick={handleClick}
                  className="flex-1 bg-gold-gradient text-white font-semibold py-3 rounded-full text-sm hover:opacity-90 transition-opacity shadow-md shadow-gold/20"
               >
                  View Profile
               </button>
               <button className="flex-1 bg-canvas border border-borderSubtle text-ink font-semibold py-3 rounded-full text-sm hover:bg-surface hover:border-gold/30 transition-all">
                  Subscribe
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

