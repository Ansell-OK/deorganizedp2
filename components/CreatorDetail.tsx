import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Link as LinkIcon, Users, CheckCircle, Calendar, Video, Heart, MessageSquare, Twitter, Instagram, Youtube } from 'lucide-react';
import { fetchCreatorById, fetchCreatorShows, checkIsFollowing, toggleFollow, Creator, Show } from '../lib/api';
import { useAuth } from '../lib/AuthContext';

interface CreatorDetailProps {
   onNavigate: (page: string, id?: string | number) => void;
   creatorId: number;
}

export const CreatorDetail: React.FC<CreatorDetailProps> = ({ onNavigate, creatorId }) => {
   const { backendUser, accessToken, connectWallet } = useAuth();
   const [creator, setCreator] = useState<Creator | null>(null);
   const [shows, setShows] = useState<Show[]>([]);
   const [loading, setLoading] = useState(true);
   const [loadingShows, setLoadingShows] = useState(true);
   const [isFollowing, setIsFollowing] = useState(false);
   const [followLoading, setFollowLoading] = useState(false);

   useEffect(() => {
      const loadCreator = async () => {
         try {
            const data = await fetchCreatorById(creatorId);
            setCreator(data);

            // Check if current user is following this creator
            if (backendUser && accessToken && backendUser.id !== data.id) {
               try {
                  const following = await checkIsFollowing(data.id, backendUser.id, accessToken);
                  setIsFollowing(following);
               } catch (error) {
                  console.error('Failed to check follow status:', error);
               }
            }
         } catch (error) {
            console.error('Failed to load creator:', error);
         } finally {
            setLoading(false);
         }
      };

      const loadShows = async () => {
         try {
            // Fetch ALL shows (published) - no auth needed for public viewing
            const showsData = await fetchCreatorShows(creatorId, undefined, 'published');
            setShows(showsData);
         } catch (error) {
            console.error('Failed to load shows:', error);
         } finally {
            setLoadingShows(false);
         }
      };

      loadCreator();
      loadShows();
   }, [creatorId, backendUser, accessToken]);

   const handleFollowToggle = async () => {
      if (!backendUser || !accessToken) {
         // Trigger wallet connection instead of showing alert
         connectWallet();
         return;
      }

      try {
         setFollowLoading(true);
         await toggleFollow(creatorId, accessToken);
         setIsFollowing(!isFollowing);
      } catch (error) {
         console.error('Failed to toggle follow:', error);
         alert('Failed to update follow status');
      } finally {
         setFollowLoading(false);
      }
   };

   if (loading) {
      return (
         <div className="min-h-screen pt-24 flex items-center justify-center">
            <p className="text-inkLight">Loading creator...</p>
         </div>
      );
   }

   if (!creator) {
      return (
         <div className="min-h-screen pt-24 pb-20 bg-canvas">
            <div className="container max-w-[1280px] mx-auto px-6">
               <button
                  onClick={() => onNavigate('creators')}
                  className="flex items-center gap-2 text-sm font-bold text-inkLight hover:text-gold transition-colors mb-6"
               >
                  <ArrowLeft className="w-4 h-4" /> Back to Creators
               </button>
               <div className="text-center py-20">
                  <div className="text-6xl mb-4">👤</div>
                  <h2 className="text-2xl font-bold text-ink mb-2">Creator not found</h2>
                  <p className="text-inkLight">This creator profile doesn't exist.</p>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen pt-24 pb-20 bg-canvas">
         <div className="container max-w-[1280px] mx-auto px-6">

            <button
               onClick={() => onNavigate('creators')}
               className="flex items-center gap-2 text-sm font-bold text-inkLight hover:text-gold transition-colors mb-6"
            >
               <ArrowLeft className="w-4 h-4" /> Back to Creators
            </button>

            {/* Profile Header */}
            <div className="bg-canvas rounded-3xl border border-borderSubtle shadow-soft p-6 md:p-12 mb-8">
               <div className="flex flex-col md:flex-row gap-6 md:items-start">
                  {/* Avatar */}
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-borderSubtle bg-surface overflow-hidden shadow-lg flex-shrink-0">
                     <img
                        src={creator.profile_picture || "https://picsum.photos/200/200"}
                        alt={creator.username}
                        className="w-full h-full object-cover"
                     />
                  </div>

                  {/* Name & Stats */}
                  <div className="flex-1">
                     <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div>
                           <h1 className="text-3xl md:text-4xl font-bold text-ink flex items-center gap-2">
                              {creator.username}
                              {creator.is_verified && (
                                 <CheckCircle className="w-6 h-6 text-gold fill-current" />
                              )}
                           </h1>
                           <p className="text-inkLight font-medium mb-2">@{creator.username.toLowerCase()}</p>
                           <div className="flex items-center gap-4">
                              <span className="text-sm">
                                 <strong className="text-ink">{creator.follower_count || 0}</strong>
                                 <span className="text-inkLight"> followers</span>
                              </span>
                              <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-bold rounded-full">
                                 {creator.role.toUpperCase()}
                              </span>
                           </div>
                        </div>

                        {/* Follow Button - Only show if not viewing own profile */}
                        {backendUser && backendUser.id !== creator.id && (
                           <button
                              onClick={handleFollowToggle}
                              disabled={followLoading}
                              className={`px-8 py-3 rounded-full font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isFollowing
                                 ? 'bg-surface border border-borderSubtle text-ink hover:border-gold/50'
                                 : 'bg-gold text-white hover:bg-gold/90 shadow-md'
                                 }`}
                           >
                              {followLoading ? 'Loading...' : (isFollowing ? 'Following' : 'Follow')}
                           </button>
                        )}
                     </div>

                     {/* Bio */}
                     {creator.bio && (
                        <div className="mb-4">
                           <p className="text-inkLight leading-relaxed">{creator.bio}</p>
                        </div>
                     )}

                     {/* Links */}
                     <div className="flex flex-wrap items-center gap-4">
                        {creator.website && (
                           <a
                              href={creator.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-ink hover:text-gold transition-colors"
                           >
                              <LinkIcon className="w-4 h-4" />
                              <span className="font-medium">{creator.website.replace('https://', '').replace('http://', '')}</span>
                           </a>
                        )}
                        {creator.twitter && (
                           <a
                              href={`https://twitter.com/${creator.twitter}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-ink hover:text-[#1DA1F2] transition-colors"
                           >
                              <Twitter className="w-4 h-4" />
                              <span className="font-medium">@{creator.twitter}</span>
                           </a>
                        )}
                        {creator.instagram && (
                           <a
                              href={`https://instagram.com/${creator.instagram}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-ink hover:text-[#E4405F] transition-colors"
                           >
                              <Instagram className="w-4 h-4" />
                              <span className="font-medium">@{creator.instagram}</span>
                           </a>
                        )}
                        {creator.youtube && (
                           <a
                              href={creator.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-ink hover:text-[#FF0000] transition-colors"
                           >
                              <Youtube className="w-4 h-4" />
                              <span className="font-medium">YouTube</span>
                           </a>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            {/* Shows Grid */}
            <div className="bg-canvas rounded-2xl border border-borderSubtle p-8">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center">
                        <Video className="w-5 h-5 text-gold" />
                     </div>
                     <div>
                        <h2 className="text-2xl font-bold text-ink">Shows</h2>
                        <p className="text-sm text-inkLight">{shows.length} published shows</p>
                     </div>
                  </div>
               </div>

               {loadingShows ? (
                  <div className="text-center py-12">
                     <div className="animate-spin w-8 h-8 border-4 border-gold/30 border-t-gold rounded-full mx-auto mb-4" />
                     <p className="text-inkLight">Loading shows...</p>
                  </div>
               ) : shows.length === 0 ? (
                  <div className="text-center py-12">
                     <div className="text-6xl mb-4">🎬</div>
                     <h3 className="text-xl font-bold text-ink mb-2">No Shows Yet</h3>
                     <p className="text-inkLight">This creator hasn't published any shows yet.</p>
                  </div>
               ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {shows.map((show) => (
                        <div
                           key={show.id}
                           onClick={() => onNavigate('show-detail', show.slug)}
                           className="group bg-canvas border border-borderSubtle rounded-2xl overflow-hidden hover:shadow-soft hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        >
                           {/* Thumbnail */}
                           <div className="aspect-video bg-surface relative overflow-hidden">
                              {show.thumbnail ? (
                                 <img
                                    src={show.thumbnail}
                                    alt={show.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                 />
                              ) : (
                                 <div className="w-full h-full flex items-center justify-center text-4xl">
                                    🎬
                                 </div>
                              )}

                              {/* Recurring Badge */}
                              {show.is_recurring && (
                                 <div className="absolute top-3 left-3 bg-gold text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                                    RECURRING
                                 </div>
                              )}
                           </div>

                           {/* Content */}
                           <div className="p-4">
                              <h3 className="font-bold text-ink text-lg mb-2 line-clamp-2 group-hover:text-gold transition-colors">
                                 {show.title}
                              </h3>
                              <p className="text-sm text-inkLight line-clamp-2 mb-4">
                                 {show.description}
                              </p>

                              {/* Stats */}
                              <div className="flex items-center gap-4 text-xs text-inkLight">
                                 <span className="flex items-center gap-1">
                                    <Heart className="w-3 h-3" /> {show.like_count}
                                 </span>
                                 <span className="flex items-center gap-1">
                                    <MessageSquare className="w-3 h-3" /> {show.comment_count}
                                 </span>
                                 {show.is_recurring && show.day_of_week !== null && (
                                    <span className="ml-auto text-gold font-bold">
                                       {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][show.day_of_week]}
                                    </span>
                                 )}
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>

         </div>
      </div>
   );
};

