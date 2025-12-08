
import React, { useState } from 'react';
import { ArrowLeft, Play, Heart, MessageSquare, Share2, ThumbsUp, MoreHorizontal, User } from 'lucide-react';

interface ShowDetailProps {
  onNavigate: (page: string, id?: string | number) => void;
}

export const ShowDetail: React.FC<ShowDetailProps> = ({ onNavigate }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(1245);
  const [comments, setComments] = useState([
    { id: 1, user: "Vitalik_Fan", avatar: "https://picsum.photos/50/50?random=u1", text: "Incredible insights on the rollup roadmap!", time: "2h ago" },
    { id: 2, user: "DeFi_Degen", avatar: "https://picsum.photos/50/50?random=u2", text: "When do you think fees will actually drop though?", time: "5h ago" }
  ]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    if (isLiked) {
       setLikesCount(prev => prev - 1);
    } else {
       setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([{
       id: Date.now(),
       user: "You",
       avatar: "https://picsum.photos/50/50?random=me",
       text: newComment,
       time: "Just now"
    }, ...comments]);
    setNewComment("");
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-canvas">
       <div className="container max-w-[1280px] mx-auto px-6">
          
          <button 
             onClick={() => onNavigate('shows')}
             className="flex items-center gap-2 text-sm font-bold text-inkLight hover:text-gold transition-colors mb-6"
          >
             <ArrowLeft className="w-4 h-4" /> Back to Shows
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             
             {/* Left Column: Video & Main Info */}
             <div className="lg:col-span-2 space-y-6">
                {/* Video Player */}
                <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-soft relative group">
                   <img src="https://picsum.photos/1200/800?random=video" className="w-full h-full object-cover opacity-80" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/50 shadow-2xl hover:scale-110 transition-transform">
                         <Play className="w-8 h-8 text-white fill-white ml-1" />
                      </button>
                   </div>
                   {/* Mock Controls */}
                   <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/80 to-transparent flex items-end px-6 pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                         <div className="w-1/3 h-full bg-gold" />
                      </div>
                   </div>
                </div>

                {/* Title & Actions */}
                <div>
                   <h1 className="text-2xl md:text-3xl font-bold text-ink mb-2">The State of Ethereum Scaling 2024</h1>
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center gap-2 text-inkLight text-sm">
                         <span>12.5k Views</span>
                         <span>•</span>
                         <span>Streamed 2 hours ago</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <button 
                           onClick={handleLike}
                           className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${isLiked ? 'bg-red-50 text-red-500 border-red-200' : 'bg-surface border-borderSubtle text-ink hover:bg-white hover:shadow-sm'}`}
                         >
                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                            <span className="font-bold text-sm">{likesCount}</span>
                         </button>
                         <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-borderSubtle text-ink hover:bg-white hover:shadow-sm transition-all">
                            <Share2 className="w-4 h-4" />
                            <span className="font-bold text-sm">Share</span>
                         </button>
                         <button className="p-2 rounded-full bg-surface border border-borderSubtle text-ink hover:bg-white transition-all">
                            <MoreHorizontal className="w-4 h-4" />
                         </button>
                      </div>
                   </div>
                </div>

                {/* Host Info */}
                <div className="p-6 bg-surface border border-borderSubtle rounded-2xl flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <img src="https://picsum.photos/100/100?random=host" className="w-12 h-12 rounded-full border border-borderSubtle" />
                      <div>
                         <h4 className="font-bold text-ink">CryptoDaily Team</h4>
                         <p className="text-xs text-inkLight">120k Subscribers</p>
                      </div>
                   </div>
                   <button className="bg-ink text-white font-bold px-6 py-2.5 rounded-full hover:bg-gold transition-colors shadow-sm">
                      Subscribe
                   </button>
                </div>

                {/* Description */}
                <div className="bg-white p-6 rounded-2xl border border-borderSubtle">
                   <p className="text-inkLight leading-relaxed">
                      Join us as we dive deep into the roadmap for Ethereum. We discuss EIP-4844, the surge of Layer 2 solutions like Arbitrum and Optimism, and what it means for the end-user.
                   </p>
                   <button className="text-gold font-bold text-sm mt-2 hover:underline">Show More</button>
                </div>

                {/* Comments Section */}
                <div className="pt-8">
                   <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" /> {comments.length} Comments
                   </h3>
                   
                   {/* Comment Input */}
                   <form onSubmit={handlePostComment} className="flex gap-4 mb-8">
                      <div className="w-10 h-10 rounded-full bg-surface border border-borderSubtle flex items-center justify-center shrink-0">
                         <User className="w-5 h-5 text-inkLight" />
                      </div>
                      <div className="flex-1">
                         <input 
                           value={newComment}
                           onChange={(e) => setNewComment(e.target.value)}
                           type="text" 
                           placeholder="Add a comment..." 
                           className="w-full bg-surface border border-borderSubtle rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                         />
                         <div className="flex justify-end mt-2">
                            <button type="submit" disabled={!newComment.trim()} className="bg-gold text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                               Comment
                            </button>
                         </div>
                      </div>
                   </form>

                   {/* Comments List */}
                   <div className="space-y-6">
                      {comments.map(comment => (
                         <div key={comment.id} className="flex gap-4">
                            <img src={comment.avatar} className="w-10 h-10 rounded-full border border-borderSubtle" />
                            <div>
                               <div className="flex items-center gap-2 mb-1">
                                  <span className="font-bold text-sm text-ink">{comment.user}</span>
                                  <span className="text-xs text-inkLight">{comment.time}</span>
                               </div>
                               <p className="text-sm text-ink">{comment.text}</p>
                               <div className="flex items-center gap-4 mt-2">
                                  <button className="flex items-center gap-1 text-xs text-inkLight hover:text-ink">
                                     <ThumbsUp className="w-3 h-3" /> 12
                                  </button>
                                  <button className="text-xs text-inkLight hover:text-ink font-bold">Reply</button>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Right Column: Up Next */}
             <div className="lg:col-span-1">
                <h3 className="text-lg font-bold text-ink mb-4">Up Next</h3>
                <div className="space-y-4">
                   {[1,2,3,4,5].map(i => (
                      <div key={i} className="flex gap-3 group cursor-pointer hover:bg-surface p-2 rounded-xl transition-colors">
                         <div className="relative w-40 aspect-video rounded-lg overflow-hidden shrink-0">
                            <img src={`https://picsum.photos/300/200?random=${i+200}`} className="w-full h-full object-cover" />
                            <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1 rounded">12:40</span>
                         </div>
                         <div>
                            <h4 className="font-bold text-sm text-ink leading-tight line-clamp-2 mb-1 group-hover:text-gold transition-colors">
                               Why Bitcoin might hit $100k sooner than you think
                            </h4>
                            <p className="text-xs text-inkLight">Macro Maven</p>
                            <p className="text-xs text-inkLight">15k views • 1 day ago</p>
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
