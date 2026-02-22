import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, Users, UserPlus, UserCheck } from 'lucide-react';
import { fetchFollowers, fetchFollowing, toggleFollow, Follow, API_BASE_URL } from '../lib/api';
import { useAuth } from '../lib/AuthContext';
import { getValidAccessToken } from '../lib/walletAuth';

// Build a full image URL from a potentially relative path
function getImageUrl(path?: string | null): string | undefined {
    if (!path) return undefined;
    if (path.startsWith('http')) return path;
    const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '');
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
}

type TabType = 'followers' | 'following';

interface FollowersListProps {
    userId: number;
    username: string;
    initialTab?: TabType;
    followerCount: number;
    followingCount: number;
    onClose: () => void;
    onNavigate: (page: string, id?: string | number) => void;
}

export const FollowersList: React.FC<FollowersListProps> = ({
    userId,
    username,
    initialTab = 'followers',
    followerCount,
    followingCount,
    onClose,
    onNavigate,
}) => {
    const { backendUser, accessToken, isBackendAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState<TabType>(initialTab);
    const [followers, setFollowers] = useState<Follow[]>([]);
    const [following, setFollowing] = useState<Follow[]>([]);
    const [loading, setLoading] = useState(true);
    const [followingSet, setFollowingSet] = useState<Set<number>>(new Set());
    const [togglingFollow, setTogglingFollow] = useState<Set<number>>(new Set());

    // Load the current user's following list to show Follow/Unfollow state
    useEffect(() => {
        const loadMyFollowing = async () => {
            if (!backendUser || !accessToken) return;
            try {
                const myFollowing = await fetchFollowing(backendUser.id, accessToken);
                setFollowingSet(new Set(myFollowing.map(f => f.following.id)));
            } catch (err) {
                console.error('Failed to load my following:', err);
            }
        };
        loadMyFollowing();
    }, [backendUser, accessToken]);

    // Load followers/following when tab changes
    useEffect(() => {
        loadData();
    }, [activeTab, userId]);

    const loadData = async () => {
        setLoading(true);
        try {
            const token = await getValidAccessToken();
            if (activeTab === 'followers') {
                const data = await fetchFollowers(userId, token || undefined);
                setFollowers(data);
            } else {
                const data = await fetchFollowing(userId, token || undefined);
                setFollowing(data);
            }
        } catch (err) {
            console.error(`Failed to load ${activeTab}:`, err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleFollow = async (targetUserId: number) => {
        if (!isBackendAuthenticated || !accessToken) return;

        setTogglingFollow(prev => new Set(prev).add(targetUserId));
        try {
            const result = await toggleFollow(targetUserId, accessToken);
            if (result.status === 'followed') {
                setFollowingSet(prev => new Set(prev).add(targetUserId));
            } else {
                setFollowingSet(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(targetUserId);
                    return newSet;
                });
            }
        } catch (err) {
            console.error('Failed to toggle follow:', err);
        } finally {
            setTogglingFollow(prev => {
                const newSet = new Set(prev);
                newSet.delete(targetUserId);
                return newSet;
            });
        }
    };

    const handleUserClick = (targetUserId: number) => {
        onClose();
        onNavigate('creator-detail', targetUserId);
    };

    const currentList = activeTab === 'followers' ? followers : following;
    const getUserFromFollow = (follow: Follow) =>
        activeTab === 'followers' ? follow.follower : follow.following;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-canvas rounded-3xl shadow-2xl max-w-md w-full border border-borderSubtle overflow-hidden"
                style={{ maxHeight: '80vh' }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-borderSubtle">
                    <h2 className="text-lg font-bold text-ink">{username}</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-inkLight hover:text-ink hover:bg-canvas transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-borderSubtle">
                    <button
                        onClick={() => setActiveTab('followers')}
                        className={`flex-1 py-3 text-sm font-semibold text-center transition-colors relative ${activeTab === 'followers'
                                ? 'text-gold'
                                : 'text-inkLight hover:text-ink'
                            }`}
                    >
                        <span>{followerCount} Followers</span>
                        {activeTab === 'followers' && (
                            <motion.div
                                layoutId="follower-tab-indicator"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                            />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('following')}
                        className={`flex-1 py-3 text-sm font-semibold text-center transition-colors relative ${activeTab === 'following'
                                ? 'text-gold'
                                : 'text-inkLight hover:text-ink'
                            }`}
                    >
                        <span>{followingCount} Following</span>
                        {activeTab === 'following' && (
                            <motion.div
                                layoutId="follower-tab-indicator"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                            />
                        )}
                    </button>
                </div>

                {/* List */}
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 130px)' }}>
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="w-5 h-5 animate-spin text-inkLight" />
                        </div>
                    ) : currentList.length === 0 ? (
                        <div className="text-center py-16 px-6">
                            <Users className="w-10 h-10 text-inkLight/30 mx-auto mb-3" />
                            <p className="text-inkLight font-medium text-sm">
                                {activeTab === 'followers'
                                    ? 'No followers yet'
                                    : 'Not following anyone yet'}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-borderSubtle">
                            {currentList.map((follow) => {
                                const user = getUserFromFollow(follow);
                                const isMe = backendUser?.id === user.id;
                                const amFollowing = followingSet.has(user.id);
                                const isToggling = togglingFollow.has(user.id);

                                return (
                                    <div
                                        key={follow.id}
                                        className="flex items-center gap-3 px-5 py-3 hover:bg-surface/50 transition-colors"
                                    >
                                        {/* Avatar */}
                                        <button
                                            onClick={() => handleUserClick(user.id)}
                                            className="w-11 h-11 rounded-full bg-surface overflow-hidden flex-shrink-0 hover:ring-2 hover:ring-gold/30 transition-all"
                                        >
                                            {user.profile_picture ? (
                                                <img
                                                    src={getImageUrl(user.profile_picture)}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-inkLight text-sm font-bold">
                                                    {user.username[0]?.toUpperCase()}
                                                </div>
                                            )}
                                        </button>

                                        {/* User Info */}
                                        <div className="flex-1 min-w-0">
                                            <button
                                                onClick={() => handleUserClick(user.id)}
                                                className="text-sm font-bold text-ink hover:text-gold transition-colors flex items-center gap-1"
                                            >
                                                {user.username}
                                                {user.is_verified && (
                                                    <CheckCircle className="w-3.5 h-3.5 text-gold" />
                                                )}
                                            </button>
                                            {user.bio && (
                                                <p className="text-xs text-inkLight truncate mt-0.5">
                                                    {user.bio}
                                                </p>
                                            )}
                                        </div>

                                        {/* Follow/Unfollow Button */}
                                        {isBackendAuthenticated && !isMe && (
                                            <button
                                                onClick={() => handleToggleFollow(user.id)}
                                                disabled={isToggling}
                                                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all disabled:opacity-50 ${amFollowing
                                                        ? 'bg-surface border border-borderSubtle text-ink hover:border-red-400/50 hover:text-red-400'
                                                        : 'bg-gold text-black hover:brightness-110'
                                                    }`}
                                            >
                                                {isToggling ? (
                                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                ) : amFollowing ? (
                                                    <>
                                                        <UserCheck className="w-3.5 h-3.5" />
                                                        Following
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserPlus className="w-3.5 h-3.5" />
                                                        Follow
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
