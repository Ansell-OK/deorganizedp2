
import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface UpcomingShowsProps {
  onNavigate?: (page: string, id?: string | number) => void;
}

const shows = [
  {
    id: 1,
    title: "DeFi Morning Brief",
    host: "Sarah Blake",
    time: "08:00 AM EST",
    image: "https://picsum.photos/400/300?random=1",
    tag: "Daily"
  },
  {
    id: 2,
    title: "Altcoin Hunters",
    host: "CryptoJack",
    time: "02:00 PM EST",
    image: "https://picsum.photos/400/300?random=2",
    tag: "Live"
  },
  {
    id: 3,
    title: "Regulatory Watch",
    host: "Legal Eagle",
    time: "06:00 PM EST",
    image: "https://picsum.photos/400/300?random=3",
    tag: "Weekly"
  },
  {
    id: 4,
    title: "NFT Spotlight",
    host: "Pixel Pete",
    time: "09:00 PM EST",
    image: "https://picsum.photos/400/300?random=4",
    tag: "New"
  }
];

export const UpcomingShows: React.FC<UpcomingShowsProps> = ({ onNavigate }) => {
  const handleClick = (id: number) => {
    if (onNavigate) onNavigate('show-detail', id);
  };

  const handleViewAll = () => {
    if (onNavigate) onNavigate('shows');
  };

  return (
    <div className="container max-w-[1280px] mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-2">Upcoming Shows</h2>
          <p className="text-inkLight font-medium">Schedule your viewing for the week.</p>
        </div>
        <button onClick={handleViewAll} className="hidden md:block text-gold hover:text-gold/80 transition-colors text-sm font-bold">
          View Full Schedule &rarr;
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {shows.map((show) => (
          <div 
            key={show.id} 
            onClick={() => handleClick(show.id)}
            className="group relative bg-white border border-borderSubtle rounded-3xl overflow-hidden hover:shadow-soft hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={show.image} 
                alt={show.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-borderSubtle shadow-sm">
                <span className="text-xs font-bold text-gold uppercase">{show.tag}</span>
              </div>
            </div>
            
            <div className="p-5">
               <h3 className="text-lg font-bold text-ink group-hover:text-gold transition-colors mb-2 line-clamp-1">{show.title}</h3>
               <div className="flex items-center gap-4 text-inkLight text-sm font-medium">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Today</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{show.time}</span>
                  </div>
               </div>
               <div className="mt-4 pt-4 border-t border-borderSubtle flex items-center justify-between">
                  <span className="text-sm text-inkLight">Host: <span className="text-ink font-medium">{show.host}</span></span>
                  <button className="text-xs bg-surface border border-borderSubtle text-ink hover:bg-gold hover:text-white hover:border-gold px-3 py-1.5 rounded-full transition-colors font-medium">
                    Remind Me
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
