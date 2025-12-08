
import React, { useState } from 'react';
import { Search, Play, Calendar, Clock, User, Filter, Heart, Bell, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShowsDiscoveryProps {
  onNavigate?: (page: string, id?: string | number) => void;
}

const categories = ["All", "Live Now", "DeFi", "NFTs", "Trading", "Macro", "Regulation", "Interviews"];

const shows = [
  {
    id: 1,
    title: "Market Open Live",
    host: "Alex DeVault",
    hostAvatar: "https://picsum.photos/100/100?random=1",
    image: "https://picsum.photos/800/600?random=10",
    category: "Trading",
    status: "LIVE",
    viewers: "12.5k",
    description: "Real-time analysis of the Asian market open and its impact on BTC/ETH correlation.",
    nextEp: "Now Streaming"
  },
  {
    id: 2,
    title: "The DeFi Report",
    host: "Sarah Blake",
    hostAvatar: "https://picsum.photos/100/100?random=2",
    image: "https://picsum.photos/800/600?random=11",
    category: "DeFi",
    status: "Upcoming",
    description: "Deep dive into the latest lending protocols on Arbitrum.",
    nextEp: "Today, 4:00 PM EST"
  },
  {
    id: 3,
    title: "Regulatory Watch",
    host: "Legal Eagle",
    hostAvatar: "https://picsum.photos/100/100?random=3",
    image: "https://picsum.photos/800/600?random=12",
    category: "Regulation",
    status: "Scheduled",
    description: "Breaking down the new SEC guidelines for staking services.",
    nextEp: "Tomorrow, 10:00 AM EST"
  },
  {
    id: 4,
    title: "NFT Alpha Hunters",
    host: "Pixel Pete",
    hostAvatar: "https://picsum.photos/100/100?random=4",
    image: "https://picsum.photos/800/600?random=13",
    category: "NFTs",
    status: "Scheduled",
    description: "Scouting the next blue chip collections before mint.",
    nextEp: "Fri, 8:00 PM EST"
  },
  {
    id: 5,
    title: "Macro Mondays",
    host: "Dr. Econ",
    hostAvatar: "https://picsum.photos/100/100?random=5",
    image: "https://picsum.photos/800/600?random=14",
    category: "Macro",
    status: "Replay",
    description: "Analyzing the Fed's decision and its ripple effect on crypto assets.",
    nextEp: "Next Monday"
  },
  {
    id: 6,
    title: "Builder's Corner",
    host: "Dev Guy",
    hostAvatar: "https://picsum.photos/100/100?random=6",
    image: "https://picsum.photos/800/600?random=15",
    category: "Interviews",
    status: "Scheduled",
    description: "Interviewing the founder of the newest ZK-Rollup.",
    nextEp: "Wed, 2:00 PM EST"
  }
];

export const ShowsDiscovery: React.FC<ShowsDiscoveryProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredShow, setHoveredShow] = useState<number | null>(null);

  const handleShowClick = (id: number) => {
     if (onNavigate) onNavigate('show-detail', id);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 container max-w-[1280px] mx-auto px-6">
      
      {/* Featured / Hero Show */}
      <section className="mb-20">
        <div className="relative rounded-3xl overflow-hidden bg-white border border-borderSubtle shadow-soft group">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="absolute inset-0 z-0">
             <img src="https://picsum.photos/1600/900?grayscale" alt="Featured" className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000" />
          </div>
          
          <div className="relative z-20 grid lg:grid-cols-2 gap-12 p-8 md:p-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <span className="flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    <Radio className="w-3 h-3" /> LIVE
                 </span>
                 <span className="text-inkLight text-sm font-semibold tracking-wide">12.5k Viewers watching</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-ink leading-tight">
                The State of <span className="text-gold">Ethereum</span> Scaling 2024
              </h1>
              
              <p className="text-lg text-inkLight font-medium max-w-lg">
                Join vitalik_fan and the core developers as they discuss the roadmap for the next hard fork and what it means for gas fees.
              </p>

              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-3">
                    <img src="https://picsum.photos/100/100?random=99" alt="Host" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                    <div className="text-sm">
                       <p className="text-inkLight">Hosted by</p>
                       <p className="font-bold text-ink">CryptoDaily Team</p>
                    </div>
                 </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => handleShowClick(99)}
                  className="bg-gold-gradient text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Watch Stream
                </button>
                <button className="bg-white border border-borderSubtle text-ink font-bold px-6 py-4 rounded-full hover:bg-surface hover:border-gold/30 transition-all flex items-center gap-2 shadow-sm">
                  <Bell className="w-5 h-5" />
                  Remind Me
                </button>
              </div>
            </div>

            {/* Hero Video Preview */}
            <div 
               onClick={() => handleShowClick(99)}
               className="hidden lg:block relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white cursor-pointer"
            >
                <img src="https://picsum.photos/800/450?random=100" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                   <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                   </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="mb-12 sticky top-24 z-30 bg-canvas/95 backdrop-blur-sm py-4 -mx-4 px-4 border-b border-borderSubtle/50">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-inkLight" />
              <input 
                type="text" 
                placeholder="Search shows, hosts, or topics..." 
                className="w-full pl-12 pr-4 py-3 bg-surface border border-borderSubtle rounded-full text-sm font-medium focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              />
           </div>
           
           <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <div className="flex gap-2">
                 <button className="p-3 border border-borderSubtle rounded-full hover:bg-surface text-inkLight transition-colors">
                    <Filter className="w-5 h-5" />
                 </button>
                 {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                        activeCategory === cat 
                        ? 'bg-ink text-white shadow-md' 
                        : 'bg-white border border-borderSubtle text-inkLight hover:text-ink hover:border-gold/50'
                      }`}
                    >
                       {cat}
                    </button>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Shows Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shows.map((show) => (
          <motion.div 
            key={show.id}
            onClick={() => handleShowClick(show.id)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredShow(show.id)}
            onMouseLeave={() => setHoveredShow(null)}
            className="group bg-white border border-borderSubtle rounded-3xl overflow-hidden hover:shadow-soft transition-all duration-300 flex flex-col h-full cursor-pointer"
          >
             {/* Thumbnail */}
             <div className="relative aspect-video overflow-hidden">
                <img 
                  src={show.image} 
                  alt={show.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  {show.status === 'LIVE' ? (
                     <span className="flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live
                     </span>
                  ) : (
                     <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                        {show.status}
                     </span>
                  )}
                </div>

                {/* Overlay Play Button */}
                <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${hoveredShow === show.id ? 'opacity-100' : 'opacity-0'}`}>
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 text-ink fill-ink ml-0.5" />
                   </div>
                </div>
             </div>

             {/* Content */}
             <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                   <span className="text-xs font-bold text-gold uppercase tracking-wider border border-gold/20 px-2 py-0.5 rounded-full bg-gold/5">{show.category}</span>
                   <button className="text-inkLight hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                   </button>
                </div>
                
                <h3 className="text-xl font-bold text-ink mb-2 line-clamp-1 group-hover:text-gold transition-colors">{show.title}</h3>
                <p className="text-sm text-inkLight font-medium line-clamp-2 mb-6 flex-1">
                   {show.description}
                </p>

                <div className="border-t border-borderSubtle pt-4 mt-auto">
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                         <img src={show.hostAvatar} className="w-8 h-8 rounded-full border border-borderSubtle" />
                         <span className="text-sm font-semibold text-ink">{show.host}</span>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-4 text-xs font-medium text-inkLight">
                      <div className="flex items-center gap-1.5 bg-surface px-2 py-1 rounded-md border border-borderSubtle">
                         <Calendar className="w-3 h-3 text-gold" />
                         {show.nextEp}
                      </div>
                      {show.status === 'LIVE' && (
                         <div className="flex items-center gap-1.5 text-red-500">
                            <User className="w-3 h-3" />
                            {show.viewers}
                         </div>
                      )}
                   </div>
                </div>
             </div>
          </motion.div>
        ))}
      </section>

      {/* Pagination / Load More */}
      <div className="mt-16 text-center">
         <button className="bg-white border border-borderSubtle text-ink font-bold px-8 py-3 rounded-full hover:bg-gold hover:text-white hover:border-gold transition-all shadow-sm hover:shadow-md">
            Load More Shows
         </button>
      </div>

    </div>
  );
};
