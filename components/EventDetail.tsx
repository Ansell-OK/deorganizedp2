
import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Users, Ticket, Share2, MessageSquare, User, Clock } from 'lucide-react';

interface EventDetailProps {
  onNavigate: (page: string, id?: string | number) => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({ onNavigate }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
     { id: 1, user: "Alice", text: "Can't wait to meet everyone in Miami!", time: "2 days ago" }
  ]);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([{ id: Date.now(), user: "You", text: newComment, time: "Just now" }, ...comments]);
    setNewComment("");
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-canvas">
       
       {/* Hero Banner */}
       <div className="h-[40vh] relative bg-ink overflow-hidden">
          <img src="https://picsum.photos/1600/900?random=event" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 container mx-auto max-w-[1280px]">
             <button 
                onClick={() => onNavigate('events')}
                className="flex items-center gap-2 text-sm font-bold text-white/80 hover:text-gold transition-colors mb-6"
             >
                <ArrowLeft className="w-4 h-4" /> Back to Events
             </button>
             <span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-4 inline-block">
                Conference
             </span>
             <h1 className="text-4xl md:text-6xl font-bold text-ink mb-2">Deorganized Global Summit 2024</h1>
             <p className="text-xl text-inkLight font-medium">The largest gathering of creators and builders in Web3.</p>
          </div>
       </div>

       <div className="container max-w-[1280px] mx-auto px-6 -mt-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             
             {/* Left Column: Details */}
             <div className="lg:col-span-2 space-y-8">
                
                {/* Info Card */}
                <div className="bg-white border border-borderSubtle rounded-3xl p-8 shadow-soft flex flex-col md:flex-row gap-8 justify-between">
                   <div className="flex items-start gap-4">
                      <div className="p-3 bg-surface rounded-xl border border-borderSubtle">
                         <Calendar className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                         <h3 className="font-bold text-ink text-lg">Date & Time</h3>
                         <p className="text-inkLight">December 12-14, 2024</p>
                         <p className="text-inkLight text-sm">09:00 AM - 06:00 PM EST</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="p-3 bg-surface rounded-xl border border-borderSubtle">
                         <MapPin className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                         <h3 className="font-bold text-ink text-lg">Location</h3>
                         <p className="text-inkLight">Miami Beach Convention Center</p>
                         <p className="text-inkLight text-sm">1901 Convention Center Dr</p>
                      </div>
                   </div>
                </div>

                {/* Description */}
                <div className="bg-white border border-borderSubtle rounded-3xl p-8 shadow-soft">
                   <h2 className="text-2xl font-bold text-ink mb-4">About Event</h2>
                   <div className="prose prose-p:text-inkLight prose-headings:text-ink max-w-none">
                      <p>
                         Join over 2,500 attendees for 3 days of high-signal talks, workshops, and networking. Whether you are a developer, creator, or investor, the Deorganized Global Summit is the place to be to understand where the industry is heading in 2025.
                      </p>
                      <h3 className="text-lg font-bold mt-6 mb-2">Agenda Highlights</h3>
                      <ul className="list-disc pl-5 space-y-2">
                         <li>Keynote: The Future of Creator Economy on Chain</li>
                         <li>Panel: Regulation vs Innovation</li>
                         <li>Workshop: Building on Lens Protocol</li>
                         <li>Afterparty: Bored Ape Yacht Club & Friends</li>
                      </ul>
                   </div>
                </div>

                {/* Map Placeholder */}
                <div className="bg-surface border border-borderSubtle rounded-3xl h-64 flex items-center justify-center text-inkLight font-medium">
                   <MapPin className="w-6 h-6 mr-2" /> Map View Unavailable in Demo
                </div>

                {/* Discussion Area */}
                <div className="pt-8">
                   <h3 className="text-2xl font-bold text-ink mb-6">Discussion</h3>
                   <div className="bg-white border border-borderSubtle rounded-3xl p-6 shadow-soft">
                      <form onSubmit={handlePostComment} className="flex gap-4 mb-8">
                         <div className="w-10 h-10 rounded-full bg-surface border border-borderSubtle flex items-center justify-center shrink-0">
                            <User className="w-5 h-5 text-inkLight" />
                         </div>
                         <div className="flex-1">
                            <input 
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              type="text" 
                              placeholder="Ask a question or say hi..." 
                              className="w-full bg-surface border border-borderSubtle rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                            />
                            <div className="flex justify-end mt-2">
                               <button type="submit" className="bg-ink text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gold transition-colors">
                                  Post
                               </button>
                            </div>
                         </div>
                      </form>

                      <div className="space-y-6">
                         {comments.map(comment => (
                            <div key={comment.id} className="flex gap-4 border-b border-borderSubtle last:border-0 pb-4 last:pb-0">
                               <div className="w-10 h-10 rounded-full bg-surface border border-borderSubtle flex items-center justify-center shrink-0 font-bold text-inkLight">
                                  {comment.user[0]}
                               </div>
                               <div>
                                  <div className="flex items-center gap-2 mb-1">
                                     <span className="font-bold text-sm text-ink">{comment.user}</span>
                                     <span className="text-xs text-inkLight">{comment.time}</span>
                                  </div>
                                  <p className="text-sm text-ink">{comment.text}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>

             {/* Right Column: RSVP */}
             <div className="lg:col-span-1 space-y-6">
                <div className="bg-white border border-borderSubtle rounded-3xl p-6 shadow-soft sticky top-24">
                   <div className="flex justify-between items-center mb-6">
                      <span className="text-3xl font-bold text-ink">$299</span>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md border border-green-200">
                         Selling Fast
                      </span>
                   </div>

                   <button className="w-full bg-gold-gradient text-white font-bold py-4 rounded-xl shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:-translate-y-0.5 transition-all mb-4 flex items-center justify-center gap-2">
                      <Ticket className="w-5 h-5" /> Get Tickets
                   </button>
                   
                   <button className="w-full bg-surface border border-borderSubtle text-ink font-bold py-3 rounded-xl hover:bg-white hover:border-gold transition-all flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4" /> Share Event
                   </button>

                   <div className="pt-6 border-t border-borderSubtle mt-6 space-y-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-ink">
                         <Users className="w-4 h-4 text-gold" /> 2,450 Attending
                      </div>
                      <div className="flex -space-x-2 overflow-hidden py-1 pl-1">
                         {[1,2,3,4,5].map(i => (
                            <img key={i} src={`https://picsum.photos/50/50?random=${i+50}`} className="inline-block h-8 w-8 rounded-full ring-2 ring-white" />
                         ))}
                         <div className="h-8 w-8 rounded-full bg-surface ring-2 ring-white flex items-center justify-center text-xs font-bold text-inkLight">
                            +2k
                         </div>
                      </div>
                   </div>
                </div>
             </div>

          </div>
       </div>
    </div>
  );
};
