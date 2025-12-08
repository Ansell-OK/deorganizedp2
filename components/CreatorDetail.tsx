
import React, { useState } from 'react';
import { ArrowLeft, User, CheckCircle, Twitter, Globe, Users, Star, Play, MessageSquare, Plus } from 'lucide-react';

interface CreatorDetailProps {
  onNavigate: (page: string, id?: string | number) => void;
}

export const CreatorDetail: React.FC<CreatorDetailProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'about'>('videos');

  return (
    <div className="min-h-screen pt-24 pb-20 bg-canvas">
      
      {/* Cover Banner */}
      <div className="h-64 md:h-80 w-full relative bg-ink">
        <img src="https://picsum.photos/1600/400?random=cover" className="w-full h-full object-cover opacity-80" />
        <div className="absolute top-6 left-6 md:left-12">
           <button 
              onClick={() => onNavigate('creators')}
              className="bg-black/50 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-gold transition-colors flex items-center gap-2"
           >
              <ArrowLeft className="w-4 h-4" /> Back
           </button>
        </div>
      </div>

      <div className="container max-w-[1280px] mx-auto px-6 relative -mt-20 z-10">
         <div className="flex flex-col md:flex-row items-end md:items-start gap-8 mb-8">
            {/* Avatar */}
            <div className="w-40 h-40 rounded-full border-4 border-canvas shadow-lg overflow-hidden shrink-0 bg-surface">
               <img src="https://picsum.photos/300/300?random=creator" className="w-full h-full object-cover" />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left pt-2 md:pt-20">
               <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                     <h1 className="text-3xl font-bold text-ink flex items-center justify-center md:justify-start gap-2">
                        Marcus Reed <CheckCircle className="w-6 h-6 text-gold fill-current" />
                     </h1>
                     <p className="text-inkLight font-medium">@marcus_chain • Crypto Analyst</p>
                  </div>
                  <div className="flex gap-3">
                     <button className="bg-ink text-white font-bold px-8 py-3 rounded-full hover:bg-gold transition-colors shadow-lg flex items-center gap-2">
                        <Plus className="w-5 h-5" /> Subscribe
                     </button>
                     <button className="bg-white border border-borderSubtle text-ink font-bold p-3 rounded-full hover:bg-surface transition-colors">
                        <MessageSquare className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Sidebar */}
            <div className="space-y-6">
               <div className="bg-white border border-borderSubtle rounded-3xl p-6 shadow-soft">
                  <h3 className="font-bold text-ink mb-4">Stats</h3>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-inkLight text-sm flex items-center gap-2"><Users className="w-4 h-4" /> Followers</span>
                        <span className="font-bold text-ink">125k</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-inkLight text-sm flex items-center gap-2"><Play className="w-4 h-4" /> Total Views</span>
                        <span className="font-bold text-ink">1.2M</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-inkLight text-sm flex items-center gap-2"><Star className="w-4 h-4" /> Rating</span>
                        <span className="font-bold text-ink">4.9/5</span>
                     </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-borderSubtle flex gap-4 justify-center">
                     <Twitter className="w-5 h-5 text-inkLight hover:text-blue-400 cursor-pointer" />
                     <Globe className="w-5 h-5 text-inkLight hover:text-gold cursor-pointer" />
                  </div>
               </div>

               <div className="bg-white border border-borderSubtle rounded-3xl p-6 shadow-soft">
                  <h3 className="font-bold text-ink mb-2">About</h3>
                  <p className="text-sm text-inkLight leading-relaxed">
                     Deep diving into Layer 2 scaling solutions and tokenomics. Former Goldman Sachs analyst turned DeFi degen. I breakdown complex protocols so you don't have to.
                  </p>
               </div>
            </div>

            {/* Main Content Feed */}
            <div className="lg:col-span-3">
               {/* Tabs */}
               <div className="flex gap-6 border-b border-borderSubtle mb-8">
                  <button 
                     onClick={() => setActiveTab('videos')}
                     className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'videos' ? 'text-ink' : 'text-inkLight hover:text-ink'}`}
                  >
                     Videos
                     {activeTab === 'videos' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" />}
                  </button>
                  <button 
                     onClick={() => setActiveTab('about')}
                     className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'about' ? 'text-ink' : 'text-inkLight hover:text-ink'}`}
                  >
                     Community Posts
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1,2,3,4,5,6].map(i => (
                     <div key={i} onClick={() => onNavigate('show-detail')} className="group cursor-pointer bg-white border border-borderSubtle rounded-2xl overflow-hidden hover:shadow-soft hover:-translate-y-1 transition-all">
                        <div className="aspect-video relative overflow-hidden">
                           <img src={`https://picsum.photos/400/300?random=${i+300}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                           <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                              10:24
                           </div>
                        </div>
                        <div className="p-4">
                           <h3 className="font-bold text-ink mb-1 line-clamp-2 leading-tight group-hover:text-gold transition-colors">
                              Is Optimism the new king of Layer 2s?
                           </h3>
                           <div className="flex items-center gap-2 text-xs text-inkLight mt-2">
                              <span>15k views</span>
                              <span>•</span>
                              <span>2 days ago</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

         </div>
      </div>
    </div>
  );
};
