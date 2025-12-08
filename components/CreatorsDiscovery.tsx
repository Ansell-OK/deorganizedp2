
import React, { useState } from 'react';
import { Search, Star, TrendingUp, Users, CheckCircle, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface CreatorsDiscoveryProps {
  onNavigate?: (page: string, id?: string | number) => void;
}

const categories = ["Top Rated", "Rising Stars", "Analysts", "Educators", "Entertainers", "Developers"];

const creators = [
  {
    id: 1,
    name: "Marcus Reed",
    handle: "@marcus_chain",
    avatar: "https://picsum.photos/150/150?random=1",
    banner: "https://picsum.photos/400/200?random=10",
    role: "Analyst",
    followers: "120k",
    bio: "Deep diving into Layer 2 scaling solutions and tokenomics.",
    trending: true
  },
  {
    id: 2,
    name: "Sarah Blake",
    handle: "@sarah_defi",
    avatar: "https://picsum.photos/150/150?random=2",
    banner: "https://picsum.photos/400/200?random=11",
    role: "Educator",
    followers: "85k",
    bio: "Simplifying DeFi for everyone. Daily tutorials and guides.",
    trending: true
  },
  {
    id: 3,
    name: "Dev Guy",
    handle: "@solidity_guru",
    avatar: "https://picsum.photos/150/150?random=3",
    banner: "https://picsum.photos/400/200?random=12",
    role: "Developer",
    followers: "45k",
    bio: "Building the future of web3. Live coding sessions weekly.",
    trending: false
  },
  {
    id: 4,
    name: "Pixel Pete",
    handle: "@nft_pete",
    avatar: "https://picsum.photos/150/150?random=4",
    banner: "https://picsum.photos/400/200?random=13",
    role: "Entertainer",
    followers: "200k",
    bio: "Hunting for the next blue chip. Join the alpha squad.",
    trending: false
  },
  {
    id: 5,
    name: "Legal Eagle",
    handle: "@law_crypto",
    avatar: "https://picsum.photos/150/150?random=5",
    banner: "https://picsum.photos/400/200?random=14",
    role: "Analyst",
    followers: "30k",
    bio: "Navigating the regulatory landscape of crypto assets.",
    trending: false
  },
  {
    id: 6,
    name: "Macro Maven",
    handle: "@econ_watch",
    avatar: "https://picsum.photos/150/150?random=6",
    banner: "https://picsum.photos/400/200?random=15",
    role: "Analyst",
    followers: "95k",
    bio: "Connecting traditional markets with digital assets.",
    trending: true
  }
];

export const CreatorsDiscovery: React.FC<CreatorsDiscoveryProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState("Top Rated");

  const handleCreatorClick = (id: number) => {
    if (onNavigate) onNavigate('creator-detail', id);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 container max-w-[1280px] mx-auto px-6">
      
      {/* Hero Call to Action */}
      <section className="mb-16 text-center max-w-4xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/5 border border-gold/20 mb-6"
        >
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-gold font-bold text-sm">Join 500+ Verified Creators</span>
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-ink mb-6 tracking-tight">
            Find Your <span className="text-gold">Signal</span>. <br/>
            Follow the Best.
        </h1>
        <p className="text-xl text-inkLight font-medium mb-8 leading-relaxed max-w-2xl mx-auto">
            Discover the voices shaping the industry. From technical analysis to cultural commentary, find the creators that match your vibe.
        </p>

        <div className="flex items-center justify-center gap-4">
             <button className="bg-ink text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gold transition-colors">
                Start Exploring
             </button>
             <button className="bg-white border border-borderSubtle text-ink font-bold px-8 py-4 rounded-full hover:bg-surface hover:border-gold/30 transition-all shadow-sm">
                Apply as Creator
             </button>
        </div>
      </section>

      {/* Filters */}
      <section className="mb-12 sticky top-24 z-30 bg-canvas/95 backdrop-blur-sm py-4 -mx-4 px-4 border-b border-borderSubtle/50 flex justify-center">
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 justify-between items-center">
           <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-inkLight" />
              <input 
                type="text" 
                placeholder="Find creators..." 
                className="w-full pl-12 pr-4 py-3 bg-surface border border-borderSubtle rounded-full text-sm font-medium focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              />
           </div>
           
           <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <div className="flex gap-2">
                 {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                        activeCategory === cat 
                        ? 'bg-gold text-white shadow-md' 
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

      {/* Creators Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {creators.map((creator) => (
          <motion.div 
            key={creator.id}
            onClick={() => handleCreatorClick(creator.id)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white border border-borderSubtle rounded-3xl overflow-hidden hover:shadow-soft hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
             {/* Banner & Avatar */}
             <div className="h-24 bg-surface relative overflow-hidden">
                <img src={creator.banner} alt="banner" className="w-full h-full object-cover opacity-80" />
             </div>
             <div className="px-6 relative">
                <div className="w-20 h-20 rounded-full border-4 border-white bg-surface absolute -top-10 overflow-hidden shadow-sm">
                    <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover" />
                </div>
                <div className="pt-12 pb-6">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-xl font-bold text-ink flex items-center gap-1">
                                {creator.name} 
                                <CheckCircle className="w-4 h-4 text-gold fill-current" />
                            </h3>
                            <p className="text-sm text-inkLight font-medium">{creator.handle}</p>
                        </div>
                        {creator.trending && (
                            <span className="flex items-center gap-1 bg-surface border border-borderSubtle text-ink text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                <TrendingUp className="w-3 h-3 text-gold" /> Trending
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-inkLight font-medium line-clamp-2 mb-6">
                        {creator.bio}
                    </p>

                    <div className="flex items-center gap-2 mb-6">
                        <span className="bg-gold/10 text-gold text-xs font-bold px-2 py-1 rounded-md">
                            {creator.role}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-inkLight">
                            <Users className="w-3 h-3" />
                            {creator.followers}
                        </div>
                    </div>

                    <button className="w-full bg-surface border border-borderSubtle text-ink font-bold py-2.5 rounded-xl hover:bg-gold hover:text-white hover:border-gold transition-all flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        Subscribe
                    </button>
                </div>
             </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};
