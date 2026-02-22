import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart, MessageSquare, Send, Image, X, MoreHorizontal,
    Trash2, RefreshCw, CheckCircle, Loader2, Pin, Clock,
    Users, Sparkles, ChevronDown, Pencil, Check
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import {
    API_BASE_URL, CONTENT_TYPES,
    toggleLike, fetchComments, createComment, deleteComment, updateComment, Comment
} from '../lib/api';
import { getValidAccessToken } from '../lib/walletAuth';

// ============================================
// Types
// ============================================

interface PostAuthor {
    id: number;
    username: string;
    profile_picture?: string;
    is_verified: boolean;
    role: string;
}

interface Post {
    id: number;
    author: PostAuthor;
    content: string;
    image?: string;
    is_pinned: boolean;
    created_at: string;
    updated_at: string;
    like_count: number;
    comment_count: number;
    user_has_liked: boolean;
}

interface PaginatedPosts {
    count: number;
    next: string | null;
    previous: string | null;
    results: Post[];
}

// ============================================
// API Functions
// ============================================

async function fetchPosts(page = 1, authorId?: number): Promise<PaginatedPosts> {
    const token = await getValidAccessToken();
    const params = new URLSearchParams({ page: String(page) });
    if (authorId) params.set('author', String(authorId));

    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/posts/?${params}`, { headers });
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
}

async function fetchFeed(page = 1): Promise<PaginatedPosts> {
    const token = await getValidAccessToken();
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${API_BASE_URL}/posts/feed/?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch feed');
    return res.json();
}

async function createPostApi(content: string, image?: File): Promise<Post> {
    const token = await getValidAccessToken();
    if (!token) throw new Error('Not authenticated');

    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);

    const res = await fetch(`${API_BASE_URL}/posts/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.content?.[0] || err.detail || 'Failed to create post');
    }
    return res.json();
}

async function deletePostApi(id: number): Promise<void> {
    const token = await getValidAccessToken();
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${API_BASE_URL}/posts/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete post');
}

async function updatePostApi(id: number, content: string): Promise<Post> {
    const token = await getValidAccessToken();
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${API_BASE_URL}/posts/${id}/`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });
    if (!res.ok) throw new Error('Failed to update post');
    return res.json();
}

// Build a full image URL from a potentially relative path
function getImageUrl(path?: string | null): string | undefined {
    if (!path) return undefined;
    if (path.startsWith('http')) return path;
    const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '');
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
}

// ============================================
// Post Content Type ID — will be determined at runtime
// ============================================
let POST_CONTENT_TYPE_ID: number | null = null;

async function getPostContentTypeId(): Promise<number> {
    if (POST_CONTENT_TYPE_ID !== null) return POST_CONTENT_TYPE_ID;

    const token = await getValidAccessToken();
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
        const res = await fetch(`${API_BASE_URL}/likes/content-types/`, { headers });
        if (res.ok) {
            const data = await res.json();
            const postCt = data.find?.((ct: any) => ct.model === 'post');
            if (postCt) {
                POST_CONTENT_TYPE_ID = postCt.id;
                return postCt.id;
            }
        }
    } catch { }

    POST_CONTENT_TYPE_ID = Number(import.meta.env.VITE_CONTENT_TYPE_POST || 15);
    return POST_CONTENT_TYPE_ID;
}

// ============================================
// Component
// ============================================

type FeedTab = 'all' | 'following';

interface CommunityFeedProps {
    onNavigate: (page: string, id?: string | number) => void;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({ onNavigate }) => {
    const { backendUser, isBackendAuthenticated, accessToken } = useAuth();
    const [activeTab, setActiveTab] = useState<FeedTab>('all');
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    // Create post state
    const [newContent, setNewContent] = useState('');
    const [newImage, setNewImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [posting, setPosting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Comment expansion state
    const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
    const [postComments, setPostComments] = useState<Record<number, Comment[]>>({});
    const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
    const [loadingComments, setLoadingComments] = useState<Set<number>>(new Set());
    const [submittingComment, setSubmittingComment] = useState<Set<number>>(new Set());

    // Menu state
    const [openMenu, setOpenMenu] = useState<number | null>(null);

    // Edit post state
    const [editingPost, setEditingPost] = useState<number | null>(null);
    const [editContent, setEditContent] = useState('');

    // Comment edit/delete state
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editCommentText, setEditCommentText] = useState('');
    const [commentMenuId, setCommentMenuId] = useState<number | null>(null);

    // Delete modals (custom — no browser alerts)
    const [postToDelete, setPostToDelete] = useState<number | null>(null);
    const [commentToDelete, setCommentToDelete] = useState<{ commentId: number; postId: number } | null>(null);

    // Load posts
    useEffect(() => {
        loadPosts(true);
    }, [activeTab]);

    const loadPosts = async (reset = false) => {
        if (reset) {
            setLoading(true);
            setPage(1);
        } else {
            setLoadingMore(true);
        }

        try {
            const nextPage = reset ? 1 : page + 1;
            const data = activeTab === 'following' && isBackendAuthenticated
                ? await fetchFeed(nextPage)
                : await fetchPosts(nextPage);

            if (reset) {
                setPosts(data.results);
            } else {
                setPosts(prev => [...prev, ...data.results]);
            }
            setHasMore(!!data.next);
            setPage(nextPage);
        } catch (err) {
            console.error('Failed to load posts:', err);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // ---- Post CRUD ----

    const handleCreatePost = async () => {
        if (!newContent.trim() || posting || !backendUser) return;
        setPosting(true);
        try {
            const result = await createPostApi(newContent.trim(), newImage || undefined);

            // Build an optimistic post with full author data so it renders instantly
            const optimisticPost: Post = {
                id: result.id,
                author: result.author || {
                    id: backendUser.id,
                    username: backendUser.username,
                    profile_picture: backendUser.profile_picture || undefined,
                    is_verified: (backendUser as any).is_verified || false,
                    role: backendUser.role || 'creator',
                },
                content: result.content || newContent.trim(),
                image: result.image || (newImage ? imagePreview || undefined : undefined),
                is_pinned: result.is_pinned || false,
                created_at: result.created_at || new Date().toISOString(),
                updated_at: result.updated_at || new Date().toISOString(),
                like_count: result.like_count ?? 0,
                comment_count: result.comment_count ?? 0,
                user_has_liked: result.user_has_liked ?? false,
            };

            setPosts(prev => [optimisticPost, ...prev]);
            setNewContent('');
            setNewImage(null);
            setImagePreview(null);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setPosting(false);
        }
    };

    const handleStartEditPost = (post: Post) => {
        setEditingPost(post.id);
        setEditContent(post.content);
        setOpenMenu(null);
    };

    const handleSaveEditPost = async (postId: number) => {
        if (!editContent.trim()) return;
        try {
            await updatePostApi(postId, editContent.trim());
            setPosts(prev =>
                prev.map(p =>
                    p.id === postId ? { ...p, content: editContent.trim(), updated_at: new Date().toISOString() } : p
                )
            );
            setEditingPost(null);
            setEditContent('');
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleCancelEditPost = () => {
        setEditingPost(null);
        setEditContent('');
    };

    const handleDeletePost = (postId: number) => {
        setPostToDelete(postId);
        setOpenMenu(null);
    };

    const confirmDeletePost = async () => {
        if (!postToDelete) return;
        try {
            await deletePostApi(postToDelete);
            setPosts(prev => prev.filter(p => p.id !== postToDelete));
        } catch (err: any) {
            alert(err.message);
        }
        setPostToDelete(null);
    };

    // ---- Like ----

    const handleToggleLike = async (postId: number) => {
        if (!isBackendAuthenticated) return;
        const token = await getValidAccessToken();
        if (!token) return;

        const ctId = await getPostContentTypeId();

        setPosts(prev =>
            prev.map(p =>
                p.id === postId
                    ? {
                        ...p,
                        user_has_liked: !p.user_has_liked,
                        like_count: p.user_has_liked ? p.like_count - 1 : p.like_count + 1,
                    }
                    : p
            )
        );

        try {
            await toggleLike(ctId, postId, token);
        } catch {
            setPosts(prev =>
                prev.map(p =>
                    p.id === postId
                        ? {
                            ...p,
                            user_has_liked: !p.user_has_liked,
                            like_count: p.user_has_liked ? p.like_count - 1 : p.like_count + 1,
                        }
                        : p
                )
            );
        }
    };

    // ---- Comments ----

    const handleToggleComments = async (postId: number) => {
        const newSet = new Set(expandedComments);
        if (newSet.has(postId)) {
            newSet.delete(postId);
        } else {
            newSet.add(postId);
            if (!postComments[postId]) {
                await loadComments(postId);
            }
        }
        setExpandedComments(newSet);
    };

    const loadComments = async (postId: number) => {
        setLoadingComments(prev => new Set(prev).add(postId));
        try {
            const ctId = await getPostContentTypeId();
            const token = await getValidAccessToken();
            const comments = await fetchComments(ctId, postId, true, token || undefined);
            setPostComments(prev => ({ ...prev, [postId]: comments }));
        } catch (err) {
            console.error('Failed to load comments:', err);
        } finally {
            setLoadingComments(prev => {
                const s = new Set(prev);
                s.delete(postId);
                return s;
            });
        }
    };

    const handleSubmitComment = async (postId: number) => {
        const text = commentInputs[postId]?.trim();
        if (!text || !isBackendAuthenticated || !accessToken) return;

        setSubmittingComment(prev => new Set(prev).add(postId));
        try {
            const ctId = await getPostContentTypeId();
            await createComment(ctId, postId, text, accessToken);

            // Re-fetch comments to get full data with user info (same pattern as ShowDetail)
            const updatedComments = await fetchComments(ctId, postId, true, accessToken);
            setPostComments(prev => ({ ...prev, [postId]: updatedComments }));
            setCommentInputs(prev => ({ ...prev, [postId]: '' }));

            // Update comment count
            setPosts(prev =>
                prev.map(p =>
                    p.id === postId ? { ...p, comment_count: p.comment_count + 1 } : p
                )
            );
        } catch (err: any) {
            alert('Failed to post comment');
        } finally {
            setSubmittingComment(prev => {
                const s = new Set(prev);
                s.delete(postId);
                return s;
            });
        }
    };

    const handleDeleteComment = (commentId: number, postId: number) => {
        setCommentToDelete({ commentId, postId });
        setCommentMenuId(null);
    };

    const confirmDeleteComment = async () => {
        if (!commentToDelete || !accessToken) return;
        const { commentId, postId } = commentToDelete;
        try {
            await deleteComment(commentId, accessToken);
            setPostComments(prev => ({
                ...prev,
                [postId]: (prev[postId] || []).filter(c => c.id !== commentId),
            }));
            setPosts(prev =>
                prev.map(p =>
                    p.id === postId ? { ...p, comment_count: Math.max(0, p.comment_count - 1) } : p
                )
            );
        } catch (err) {
            console.error('Failed to delete comment:', err);
        }
        setCommentToDelete(null);
    };

    const handleEditComment = async (commentId: number, postId: number) => {
        if (!editCommentText.trim() || !accessToken) return;
        try {
            await updateComment(commentId, editCommentText, accessToken);

            // Re-fetch comments to get full updated data
            const ctId = await getPostContentTypeId();
            const updatedComments = await fetchComments(ctId, postId, true, accessToken);
            setPostComments(prev => ({ ...prev, [postId]: updatedComments }));

            setEditingCommentId(null);
            setEditCommentText('');
        } catch (err) {
            console.error('Failed to edit comment:', err);
        }
    };

    // ---- Utils ----

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewImage(file);
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const timeAgo = (date: string) => {
        const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
        if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d`;
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-canvas">
            <div className="container mx-auto px-4 sm:px-6 max-w-[680px] pt-24 pb-12">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-1">Community</h1>
                    <p className="text-sm text-inkLight">See what creators are sharing</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-6 bg-surface border border-borderSubtle rounded-2xl p-1.5">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex-1 justify-center ${activeTab === 'all'
                            ? 'bg-gold/10 text-gold border border-gold/30'
                            : 'text-inkLight hover:text-ink hover:bg-canvas/50'
                            }`}
                    >
                        <Sparkles className="w-4 h-4" />
                        Discover
                    </button>
                    <button
                        onClick={() => setActiveTab('following')}
                        disabled={!isBackendAuthenticated}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex-1 justify-center disabled:opacity-40 ${activeTab === 'following'
                            ? 'bg-gold/10 text-gold border border-gold/30'
                            : 'text-inkLight hover:text-ink hover:bg-canvas/50'
                            }`}
                    >
                        <Users className="w-4 h-4" />
                        Following
                    </button>
                </div>

                {/* Create Post (creators only) */}
                {isBackendAuthenticated && backendUser?.role === 'creator' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-surface border border-borderSubtle rounded-2xl p-4 mb-6"
                    >
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-canvas overflow-hidden flex-shrink-0">
                                {backendUser.profile_picture ? (
                                    <img src={getImageUrl(backendUser.profile_picture)} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-inkLight text-sm font-bold">
                                        {backendUser.username?.[0]?.toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <textarea
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                    placeholder="Share something with the community..."
                                    rows={3}
                                    maxLength={2000}
                                    className="w-full bg-transparent text-ink placeholder:text-inkLight text-sm resize-none focus:outline-none"
                                />

                                {imagePreview && (
                                    <div className="relative mt-2 rounded-xl overflow-hidden border border-borderSubtle">
                                        <img src={imagePreview} alt="Preview" className="w-full max-h-64 object-cover" />
                                        <button
                                            onClick={() => { setNewImage(null); setImagePreview(null); }}
                                            className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white hover:bg-black/80"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-borderSubtle">
                                    <div className="flex gap-2">
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageSelect}
                                            className="hidden"
                                        />
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="p-2 rounded-lg text-inkLight hover:text-gold hover:bg-gold/10 transition-colors"
                                        >
                                            <Image className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-inkLight">{newContent.length}/2000</span>
                                        <button
                                            onClick={handleCreatePost}
                                            disabled={!newContent.trim() || posting}
                                            className="flex items-center gap-2 px-4 py-2 bg-gold text-black text-sm font-bold rounded-xl hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            {posting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Posts Feed */}
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <RefreshCw className="w-5 h-5 animate-spin text-inkLight" />
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-16">
                        <MessageSquare className="w-12 h-12 text-inkLight/30 mx-auto mb-3" />
                        <p className="text-inkLight font-medium">
                            {activeTab === 'following' ? 'No posts from people you follow yet' : 'No posts yet'}
                        </p>
                        <p className="text-xs text-inkLight/60 mt-1">Be the first to share something!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-surface border border-borderSubtle rounded-2xl overflow-hidden"
                            >
                                {/* Post Header */}
                                <div className="flex items-center gap-3 p-4 pb-0">
                                    <button
                                        onClick={() => onNavigate('creator-detail', post.author.id)}
                                        className="w-10 h-10 rounded-full bg-canvas overflow-hidden flex-shrink-0 hover:ring-2 hover:ring-gold/30 transition-all"
                                    >
                                        {post.author.profile_picture ? (
                                            <img src={getImageUrl(post.author.profile_picture)} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-inkLight text-sm font-bold">
                                                {post.author.username[0]?.toUpperCase()}
                                            </div>
                                        )}
                                    </button>
                                    <div className="flex-1 min-w-0">
                                        <button
                                            onClick={() => onNavigate('creator-detail', post.author.id)}
                                            className="text-sm font-bold text-ink hover:text-gold transition-colors flex items-center gap-1"
                                        >
                                            {post.author.username}
                                            {post.author.is_verified && <CheckCircle className="w-3.5 h-3.5 text-gold" />}
                                        </button>
                                        <p className="text-xs text-inkLight flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {timeAgo(post.created_at)}
                                            {post.is_pinned && (
                                                <span className="ml-1 flex items-center gap-0.5 text-gold">
                                                    <Pin className="w-3 h-3" /> Pinned
                                                </span>
                                            )}
                                        </p>
                                    </div>

                                    {/* Post menu (own posts or staff) */}
                                    {backendUser && (backendUser.id === post.author.id || backendUser.is_staff) && (
                                        <div className="relative">
                                            <button
                                                onClick={() => setOpenMenu(openMenu === post.id ? null : post.id)}
                                                className="p-1.5 rounded-lg text-inkLight hover:text-ink hover:bg-canvas transition-colors"
                                            >
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                            {openMenu === post.id && (
                                                <div className="absolute right-0 top-8 bg-surface border border-borderSubtle rounded-xl shadow-lg py-1 z-20 min-w-[140px]">
                                                    {backendUser.id === post.author.id && (
                                                        <button
                                                            onClick={() => handleStartEditPost(post)}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-inkLight hover:bg-canvas transition-colors"
                                                        >
                                                            <Pencil className="w-4 h-4" /> Edit Post
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeletePost(post.id)}
                                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Delete Post
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Post Content */}
                                <div className="px-4 py-3">
                                    {editingPost === post.id ? (
                                        <div className="space-y-2">
                                            <textarea
                                                value={editContent}
                                                onChange={(e) => setEditContent(e.target.value)}
                                                rows={3}
                                                maxLength={2000}
                                                className="w-full bg-canvas border border-borderSubtle rounded-xl px-3 py-2 text-sm text-ink resize-none focus:outline-none focus:border-gold/50"
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={handleCancelEditPost}
                                                    className="px-3 py-1.5 text-xs text-inkLight hover:text-ink transition-colors rounded-lg"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => handleSaveEditPost(post.id)}
                                                    disabled={!editContent.trim()}
                                                    className="px-3 py-1.5 text-xs bg-gold text-black font-bold rounded-lg hover:brightness-110 disabled:opacity-40"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-ink whitespace-pre-wrap leading-relaxed">{post.content}</p>
                                    )}
                                </div>

                                {/* Post Image */}
                                {post.image && (
                                    <div className="px-4 pb-3">
                                        <img
                                            src={getImageUrl(post.image)}
                                            alt="Post image"
                                            className="w-full rounded-xl border border-borderSubtle object-cover max-h-[400px]"
                                        />
                                    </div>
                                )}

                                {/* Engagement Bar */}
                                <div className="flex items-center gap-1 px-4 py-2 border-t border-borderSubtle">
                                    <button
                                        onClick={() => handleToggleLike(post.id)}
                                        disabled={!isBackendAuthenticated}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${post.user_has_liked
                                            ? 'text-red-400 bg-red-500/10'
                                            : 'text-inkLight hover:text-red-400 hover:bg-red-500/5'
                                            } disabled:opacity-40`}
                                    >
                                        <Heart className={`w-4 h-4 ${post.user_has_liked ? 'fill-current' : ''}`} />
                                        <span className="text-xs font-medium">{post.like_count || ''}</span>
                                    </button>
                                    <button
                                        onClick={() => handleToggleComments(post.id)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${expandedComments.has(post.id)
                                            ? 'text-gold bg-gold/10'
                                            : 'text-inkLight hover:text-gold hover:bg-gold/5'
                                            }`}
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        <span className="text-xs font-medium">{post.comment_count || ''}</span>
                                    </button>
                                </div>

                                {/* Comments Section */}
                                <AnimatePresence>
                                    {expandedComments.has(post.id) && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden border-t border-borderSubtle"
                                        >
                                            <div className="p-4 space-y-3">
                                                {loadingComments.has(post.id) ? (
                                                    <div className="flex items-center justify-center py-4">
                                                        <Loader2 className="w-4 h-4 animate-spin text-inkLight" />
                                                    </div>
                                                ) : (
                                                    <>
                                                        {(postComments[post.id] || []).length === 0 && (
                                                            <p className="text-xs text-inkLight text-center py-2">No comments yet</p>
                                                        )}
                                                        {(postComments[post.id] || []).map((comment) => (
                                                            <div key={comment.id} className="flex gap-2 group">
                                                                <div
                                                                    className="w-7 h-7 rounded-full bg-canvas overflow-hidden flex-shrink-0 cursor-pointer"
                                                                    onClick={() => comment.user?.id && onNavigate('creator-detail', comment.user.id)}
                                                                >
                                                                    {comment.user?.profile_picture ? (
                                                                        <img src={getImageUrl(comment.user.profile_picture)} alt="" className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-inkLight">
                                                                            {comment.user?.username?.[0]?.toUpperCase() || '?'}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 bg-canvas rounded-xl px-3 py-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-xs font-bold text-ink">{comment.user?.username || 'Unknown'}</span>
                                                                        <span className="text-[10px] text-inkLight">{timeAgo(comment.created_at)}</span>
                                                                    </div>

                                                                    {editingCommentId === comment.id ? (
                                                                        <div className="mt-1 flex gap-2">
                                                                            <input
                                                                                type="text"
                                                                                value={editCommentText}
                                                                                onChange={(e) => setEditCommentText(e.target.value)}
                                                                                className="flex-1 bg-surface border border-gold rounded-lg px-3 py-1.5 text-xs text-ink focus:outline-none"
                                                                                autoFocus
                                                                            />
                                                                            <button
                                                                                onClick={() => handleEditComment(comment.id, post.id)}
                                                                                className="text-green-500 hover:text-green-600 p-1"
                                                                            >
                                                                                <Check className="w-4 h-4" />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => { setEditingCommentId(null); setEditCommentText(''); }}
                                                                                className="text-red-400 hover:text-red-500 p-1"
                                                                            >
                                                                                <X className="w-4 h-4" />
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <p className="text-xs text-ink/80 mt-0.5">{comment.text}</p>
                                                                    )}
                                                                </div>

                                                                {/* Comment Actions Menu */}
                                                                {isBackendAuthenticated && comment.user?.id === backendUser?.id && editingCommentId !== comment.id && (
                                                                    <div className="relative">
                                                                        <button
                                                                            onClick={() => setCommentMenuId(commentMenuId === comment.id ? null : comment.id)}
                                                                            className="opacity-0 group-hover:opacity-100 p-1 text-inkLight hover:text-ink transition-all"
                                                                        >
                                                                            <MoreHorizontal className="w-3.5 h-3.5" />
                                                                        </button>
                                                                        {commentMenuId === comment.id && (
                                                                            <div className="absolute right-0 top-full mt-1 bg-surface border border-borderSubtle rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
                                                                                <button
                                                                                    onClick={() => {
                                                                                        setEditingCommentId(comment.id);
                                                                                        setEditCommentText(comment.text);
                                                                                        setCommentMenuId(null);
                                                                                    }}
                                                                                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-ink hover:bg-canvas transition-colors"
                                                                                >
                                                                                    <Pencil className="w-3 h-3" /> Edit
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => handleDeleteComment(comment.id, post.id)}
                                                                                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-500/10 transition-colors"
                                                                                >
                                                                                    <Trash2 className="w-3 h-3" /> Delete
                                                                                </button>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </>
                                                )}

                                                {/* New Comment Input */}
                                                {isBackendAuthenticated && (
                                                    <div className="flex gap-2 pt-2">
                                                        <input
                                                            type="text"
                                                            value={commentInputs[post.id] || ''}
                                                            onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                                                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmitComment(post.id)}
                                                            placeholder="Write a comment..."
                                                            className="flex-1 bg-canvas border border-borderSubtle rounded-xl px-3 py-2 text-xs text-ink placeholder:text-inkLight focus:outline-none focus:border-gold/50"
                                                        />
                                                        <button
                                                            onClick={() => handleSubmitComment(post.id)}
                                                            disabled={!commentInputs[post.id]?.trim() || submittingComment.has(post.id)}
                                                            className="p-2 rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-colors disabled:opacity-40"
                                                        >
                                                            {submittingComment.has(post.id) ? (
                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                            ) : (
                                                                <Send className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}

                        {/* Load More */}
                        {hasMore && (
                            <button
                                onClick={() => loadPosts(false)}
                                disabled={loadingMore}
                                className="w-full py-3 text-sm font-medium text-inkLight hover:text-gold transition-colors flex items-center justify-center gap-2"
                            >
                                {loadingMore ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <ChevronDown className="w-4 h-4" /> Load more
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* =========================================
                Delete Post Confirmation Modal
                ========================================= */}
            {postToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-canvas rounded-3xl shadow-2xl max-w-md w-full p-8 border border-borderSubtle"
                    >
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-ink text-center mb-2">Delete Post?</h3>
                        <p className="text-inkLight text-center mb-6">
                            This action cannot be undone. Your post will be permanently deleted.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setPostToDelete(null)}
                                className="flex-1 px-6 py-3 bg-surface text-ink font-semibold rounded-full hover:bg-borderSubtle transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeletePost}
                                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-all shadow-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* =========================================
                Delete Comment Confirmation Modal
                ========================================= */}
            {commentToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-canvas rounded-3xl shadow-2xl max-w-md w-full p-8 border border-borderSubtle"
                    >
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-ink text-center mb-2">Delete Comment?</h3>
                        <p className="text-inkLight text-center mb-6">
                            This action cannot be undone. Your comment will be permanently deleted.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setCommentToDelete(null)}
                                className="flex-1 px-6 py-3 bg-surface text-ink font-semibold rounded-full hover:bg-borderSubtle transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteComment}
                                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-all shadow-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};
