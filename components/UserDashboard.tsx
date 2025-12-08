
import React, { useState } from 'react';
import { 
  User, Settings, Clock, Heart, Shield, Zap, 
  LogOut, Play, MoreHorizontal, MessageSquare, 
  ThumbsUp, ExternalLink, CreditCard, Award
} from 'lucide-react';
import { motion } from 'framer-motion';

export const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'liked' | 'activity'>('history');

  return (
    <div className="min-h-screen pt-24 pb-20 container max-w-[1024px] mx-auto px-6 space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-ink mb-2">My Dashboard</h1>
          <p className="text-inkLight font-medium">Welcome back, CryptoExplorer.</p>
        </div>
        <button className="flex items-center gap-2 text-sm font-bold text-ink hover:text-red-500 transition-colors">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile & Stats */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Profile Card */}
          <div className="bg-white border border-borderSubtle rounded-3xl p-6 shadow-soft relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gold-gradient opacity-10" />
            
            <div className="relative z-10 flex flex-col items-center text-center mt-4">
               <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden mb-4 relative">
                  <img src="https://picsum.photos/200/200?random=user" alt="User" className="w-full h-full object-cover" />
               </div>
               <h2 className="text-xl font-bold text-ink">CryptoExplorer</h2>
               <p className="text-inkLight text-sm font-medium mb-4">Member since 2023</p>
               
               <div className="flex items-center gap-2 bg-surface border border-borderSubtle px-3 py-1.5 rounded-full text-xs font-bold text-inkLight mb-6 cursor-pointer hover:border-gold hover:text-gold transition-colors">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  0x71C...9A23
                  <ExternalLink className="w-3 h-3" />
               </div>

               <div className="grid grid-cols-2 gap-3 w-full">
                  <button className="flex-1 bg-ink text-white text-sm font-bold py-2.5 rounded-xl hover:bg-gold transition-colors shadow-sm">
                     Edit Profile
                  </button>
                  <button className="flex-1 bg-white border border-borderSubtle text-ink text-sm font-bold py-2.5 rounded-xl hover:bg-surface transition-colors flex items-center justify-center gap-2">
                     <Settings className="w-4 h-4" /> Settings
                  </button>
               </div>
            </div>
          </div>

          {/* Membership / Points Card */}
          <div className="bg-ink text-white rounded-3xl p-6 shadow-soft relative overflow-hidden">
             <div className="absolute top-0 right-0 w-40 h-40 bg-gold rounded-full opacity-20 blur-[50px] -translate-y-1/2 translate-x-1/2" />
             
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                   <div className="bg-white/10 p-2 rounded-lg">
                      <Shield className="w-6 h-6 text-gold" />
                   </div>
                   <span className="text-xs font-bold uppercase tracking-wider bg-gold text-ink px-2 py-1 rounded-md">Gold Tier</span>
                </div>
                
                <h3 className="text-3xl font-bold mb-1">12,450</h3>
                <p className="text-white/60 text-sm font-medium mb-6">DeOrg Points Earned</p>
                
                <div className="space-y-3">
                   <div className="flex justify-between text-xs font-medium">
                      <span className="text-white/80">Next Reward: Exclusive NFT</span>
                      <span className="text-gold">85%</span>
                   </div>
                   <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gold w-[85%] rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                   </div>
                </div>

                <button className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white text-sm font-bold py-3 rounded-xl transition-colors border border-white/10">
                   Redeem Rewards
                </button>
             </div>
          </div>

        </div>

        {/* Right Column: Content Modules */}
        <div className="lg:col-span-2 space-y-8">

          {/* Subscriptions Module */}
          <section>
             <div className="flex justify-between items-center mb-4 px-1">
                <h3 className="text-lg font-bold text-ink">Subscriptions</h3>
                <button className="text-xs font-bold text-gold hover:underline">View All</button>
             </div>
             <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {[1,2,3,4,5].map((i) => (
                   <div key={i} className="min-w-[140px] bg-white border border-borderSubtle rounded-2xl p-4 flex flex-col items-center text-center hover:border-gold/50 hover:shadow-soft transition-all cursor-pointer group">
                      <div className="w-16 h-16 rounded-full border-2 border-surface mb-3 overflow-hidden group-hover:scale-105 transition-transform">
                         <img src={`https://picsum.photos/100/100?random=${i + 20}`} alt="Creator" className="w-full h-full object-cover" />
                      </div>
                      <h4 className="text-sm font-bold text-ink truncate w-full">Creator Name</h4>
                      <p className="text-xs text-inkLight mb-3">Analyst</p>
                      <button className="text-xs bg-surface text-inkLight font-bold px-3 py-1 rounded-full border border-borderSubtle group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-colors">
                         Following
                      </button>
                   </div>
                ))}
                <button className="min-w-[60px] flex items-center justify-center bg-surface border border-dashed border-borderSubtle rounded-2xl hover:border-gold hover:text-gold transition-colors">
                   <PlusIcon />
                </button>
             </div>
          </section>

          {/* Main Content Tabs */}
          <section className="bg-white border border-borderSubtle rounded-3xl p-6 shadow-soft min-h-[500px]">
             
             {/* Tab Navigation */}
             <div className="flex items-center gap-6 border-b border-borderSubtle pb-4 mb-6">
                {[
                   { id: 'history', label: 'Watch History', icon: Clock },
                   { id: 'liked', label: 'Liked Shows', icon: Heart },
                   { id: 'activity', label: 'Activity Feed', icon: Zap },
                ].map((tab) => (
                   <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id as any)}
                     className={`flex items-center gap-2 text-sm font-bold pb-4 -mb-8 transition-all relative ${
                        activeTab === tab.id 
                        ? 'text-ink' 
                        : 'text-inkLight hover:text-ink'
                     }`}
                   >
                      <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-gold' : ''}`} />
                      {tab.label}
                      {activeTab === tab.id && (
                         <motion.div layoutId="activeTab" className="absolute bottom-4 left-0 w-full h-0.5 bg-gold" />
                      )}
                   </button>
                ))}
             </div>

             {/* Tab Content */}
             <div className="space-y-6">
                
                {activeTab === 'history' && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[1,2,3,4].map(i => (
                         <div key={i} className="flex gap-4 group cursor-pointer">
                            <div className="relative w-32 aspect-video rounded-lg overflow-hidden shrink-0">
                               <img src={`https://picsum.photos/300/200?random=${i + 50}`} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                               <div className="absolute bottom-0 left-0 w-full h-1 bg-black/50">
                                  <div className="h-full bg-gold w-[60%]" />
                               </div>
                               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                  <Play className="w-6 h-6 text-white fill-white" />
                               </div>
                            </div>
                            <div>
                               <h4 className="font-bold text-ink text-sm mb-1 leading-tight group-hover:text-gold transition-colors">Understanding ZK-Rollups in 2024</h4>
                               <p className="text-xs text-inkLight mb-2">Dev Guy • 2 days ago</p>
                               <span className="text-[10px] font-bold bg-surface border border-borderSubtle px-2 py-0.5 rounded text-inkLight">
                                  Resume at 12:45
                               </span>
                            </div>
                         </div>
                      ))}
                   </div>
                )}

                {activeTab === 'liked' && (
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[1,2,3].map(i => (
                         <div key={i} className="group cursor-pointer">
                            <div className="rounded-xl overflow-hidden aspect-video mb-3 relative">
                               <img src={`https://picsum.photos/300/200?random=${i + 60}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                               <div className="absolute top-2 right-2 bg-black/60 backdrop-blur rounded-full p-1.5 text-gold">
                                  <Heart className="w-3 h-3 fill-gold" />
                               </div>
                            </div>
                            <h4 className="font-bold text-ink text-sm mb-1 truncate group-hover:text-gold transition-colors">Top 5 Altcoins for Q4</h4>
                            <p className="text-xs text-inkLight">Altcoin Hunters</p>
                         </div>
                      ))}
                   </div>
                )}

                {activeTab === 'activity' && (
                   <div className="space-y-6">
                      {[
                         { icon: ThumbsUp, text: "You liked", target: "Ethereum Merge Documentary", time: "2h ago", color: "text-blue-500 bg-blue-50" },
                         { icon: MessageSquare, text: "You commented on", target: "Weekly Market Wrap", time: "5h ago", color: "text-purple-500 bg-purple-50" },
                         { icon: Award, text: "You earned badge", target: "Early Adopter", time: "1d ago", color: "text-yellow-600 bg-yellow-50" },
                         { icon: CreditCard, text: "Subscription renewed", target: "Sarah Blake", time: "2d ago", color: "text-green-600 bg-green-50" },
                      ].map((item, i) => (
                         <div key={i} className="flex gap-4 items-center p-3 rounded-xl hover:bg-surface transition-colors">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
                               <item.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                               <p className="text-sm text-ink font-medium">
                                  {item.text} <span className="font-bold text-ink">{item.target}</span>
                               </p>
                               <span className="text-xs text-inkLight">{item.time}</span>
                            </div>
                            <button className="text-inkLight hover:text-ink">
                               <MoreHorizontal className="w-4 h-4" />
                            </button>
                         </div>
                      ))}
                   </div>
                )}

             </div>
          </section>

        </div>
      </div>
    </div>
  );
};

// Helper Icon
const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-inkLight">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);
