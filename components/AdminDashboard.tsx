import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, Radio, Calendar, Newspaper, MessageSquare, Heart,
    UserPlus, TrendingUp, Shield, CheckCircle, XCircle,
    Search, ChevronLeft, ChevronRight, AlertCircle,
    BarChart3, Eye, Clock, Filter, RefreshCw, Star
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { API_BASE_URL } from '../lib/api';
import { getValidAccessToken } from '../lib/walletAuth';

// ============================================
// Types
// ============================================

interface AdminStats {
    overview: {
        total_users: number;
        total_creators: number;
        total_regular_users: number;
        total_shows: number;
        total_events: number;
        total_news: number;
    };
    activity: {
        new_users_7d: number;
        new_users_30d: number;
        total_likes: number;
        total_comments: number;
        total_follows: number;
    };
    feedback: {
        total: number;
        unresolved: number;
    };
    recent_users: AdminUser[];
}

interface AdminUser {
    id: number;
    username: string;
    profile_picture?: string;
    role: string;
    is_verified: boolean;
    is_staff: boolean;
    is_creator: boolean;
    follower_count: number;
    bio?: string;
    stacks_address?: string;
    date_joined: string;
}

interface FeedbackItem {
    id: number;
    category: string;
    message: string;
    user_identifier: string;
    resolved: boolean;
    admin_notes: string;
    created_at: string;
}

interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

// ============================================
// API Functions
// ============================================

async function fetchAdminStats(): Promise<AdminStats> {
    const token = await getValidAccessToken();
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${API_BASE_URL}/users/admin-stats/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`Failed to fetch stats: ${res.status}`);
    return res.json();
}

async function fetchAdminUsers(params: {
    search?: string;
    role?: string;
    page?: number;
}): Promise<PaginatedResponse<AdminUser>> {
    const token = await getValidAccessToken();
    if (!token) throw new Error('Not authenticated');

    const searchParams = new URLSearchParams();
    if (params.search) searchParams.set('search', params.search);
    if (params.role) searchParams.set('role', params.role);
    if (params.page) searchParams.set('page', String(params.page));

    const res = await fetch(`${API_BASE_URL}/users/admin-users/?${searchParams}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
    return res.json();
}

async function toggleUserVerification(userId: number): Promise<{ is_verified: boolean }> {
    const token = await getValidAccessToken();
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${API_BASE_URL}/users/${userId}/toggle-verification/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`Failed to toggle verification: ${res.status}`);
    return res.json();
}

async function fetchAllFeedback(page = 1): Promise<PaginatedResponse<FeedbackItem>> {
    const token = await getValidAccessToken();
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${API_BASE_URL}/feedback/?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`Failed to fetch feedback: ${res.status}`);
    return res.json();
}

async function updateFeedback(
    id: number,
    data: { resolved?: boolean; admin_notes?: string }
): Promise<FeedbackItem> {
    const token = await getValidAccessToken();
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${API_BASE_URL}/feedback/${id}/`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Failed to update feedback: ${res.status}`);
    return res.json();
}

// ============================================
// Component
// ============================================

type AdminTab = 'overview' | 'users' | 'feedback';

interface AdminDashboardProps {
    onNavigate: (page: string, id?: string | number) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
    const { backendUser } = useAuth();
    const [activeTab, setActiveTab] = useState<AdminTab>('overview');
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Users tab state
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [usersCount, setUsersCount] = useState(0);
    const [usersPage, setUsersPage] = useState(1);
    const [usersSearch, setUsersSearch] = useState('');
    const [usersRoleFilter, setUsersRoleFilter] = useState('');
    const [usersLoading, setUsersLoading] = useState(false);

    // Feedback tab state
    const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
    const [feedbackCount, setFeedbackCount] = useState(0);
    const [feedbackPage, setFeedbackPage] = useState(1);
    const [feedbackLoading, setFeedbackLoading] = useState(false);
    const [editingNote, setEditingNote] = useState<number | null>(null);
    const [noteText, setNoteText] = useState('');

    // Check if user is staff
    if (!backendUser?.is_staff) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Shield className="w-16 h-16 text-inkLight mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-ink mb-2">Access Denied</h2>
                    <p className="text-inkLight">You need staff privileges to access this dashboard.</p>
                </div>
            </div>
        );
    }

    // Load stats on mount
    useEffect(() => {
        loadStats();
    }, []);

    // Load users when tab or filters change
    useEffect(() => {
        if (activeTab === 'users') loadUsers();
    }, [activeTab, usersPage, usersRoleFilter]);

    // Load feedback when tab changes
    useEffect(() => {
        if (activeTab === 'feedback') loadFeedback();
    }, [activeTab, feedbackPage]);

    const loadStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchAdminStats();
            setStats(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadUsers = async () => {
        setUsersLoading(true);
        try {
            const data = await fetchAdminUsers({
                search: usersSearch,
                role: usersRoleFilter,
                page: usersPage,
            });
            setUsers(data.results);
            setUsersCount(data.count);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setUsersLoading(false);
        }
    };

    const loadFeedback = async () => {
        setFeedbackLoading(true);
        try {
            const data = await fetchAllFeedback(feedbackPage);
            setFeedback(data.results);
            setFeedbackCount(data.count);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setFeedbackLoading(false);
        }
    };

    const handleToggleVerification = async (userId: number) => {
        try {
            await toggleUserVerification(userId);
            // Update local state
            setUsers((prev) =>
                prev.map((u) => (u.id === userId ? { ...u, is_verified: !u.is_verified } : u))
            );
            // Also refresh stats
            loadStats();
        } catch (err: any) {
            alert('Failed to toggle verification: ' + err.message);
        }
    };

    const handleResolveFeedback = async (id: number, resolved: boolean) => {
        try {
            await updateFeedback(id, { resolved });
            setFeedback((prev) => prev.map((f) => (f.id === id ? { ...f, resolved } : f)));
            loadStats();
        } catch (err: any) {
            alert('Failed to update feedback: ' + err.message);
        }
    };

    const handleSaveNote = async (id: number) => {
        try {
            await updateFeedback(id, { admin_notes: noteText });
            setFeedback((prev) =>
                prev.map((f) => (f.id === id ? { ...f, admin_notes: noteText } : f))
            );
            setEditingNote(null);
            setNoteText('');
        } catch (err: any) {
            alert('Failed to save note: ' + err.message);
        }
    };

    const handleUserSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setUsersPage(1);
        loadUsers();
    };

    const timeAgo = (date: string) => {
        const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
        return new Date(date).toLocaleDateString();
    };

    const tabs = [
        { id: 'overview' as AdminTab, label: 'Overview', icon: BarChart3 },
        { id: 'users' as AdminTab, label: 'Users', icon: Users },
        { id: 'feedback' as AdminTab, label: 'Feedback', icon: MessageSquare },
    ];

    if (loading && !stats) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex items-center gap-3 text-inkLight">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Loading dashboard...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-canvas">
            <div className="container mx-auto px-4 sm:px-6 max-w-[1400px] pt-24 pb-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-ink">Admin Dashboard</h1>
                            <p className="text-sm text-inkLight">Platform management & analytics</p>
                        </div>
                    </div>
                </div>

                {/* Error Banner */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <p className="text-red-300 text-sm">{error}</p>
                        <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-300">
                            <XCircle className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}

                {/* Tabs */}
                <div className="flex gap-1 mb-8 bg-surface border border-borderSubtle rounded-2xl p-1.5">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex-1 justify-center ${activeTab === tab.id
                                ? 'bg-gold/10 text-gold border border-gold/30'
                                : 'text-inkLight hover:text-ink hover:bg-canvas/50'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && stats && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {[
                                    { label: 'Total Users', value: stats.overview.total_users, icon: Users, color: 'text-blue-400' },
                                    { label: 'Creators', value: stats.overview.total_creators, icon: Star, color: 'text-gold' },
                                    { label: 'Shows', value: stats.overview.total_shows, icon: Radio, color: 'text-purple-400' },
                                    { label: 'Events', value: stats.overview.total_events, icon: Calendar, color: 'text-green-400' },
                                    { label: 'News', value: stats.overview.total_news, icon: Newspaper, color: 'text-orange-400' },
                                    { label: 'Feedback', value: stats.feedback.unresolved, icon: MessageSquare, color: stats.feedback.unresolved > 0 ? 'text-red-400' : 'text-emerald-400' },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-surface border border-borderSubtle rounded-2xl p-4"
                                    >
                                        <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                                        <p className="text-2xl font-bold text-ink">{stat.value}</p>
                                        <p className="text-xs text-inkLight">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Activity & Engagement Row */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Recent Activity */}
                                <div className="bg-surface border border-borderSubtle rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-gold" />
                                        Recent Activity
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-2 border-b border-borderSubtle">
                                            <span className="text-sm text-inkLight">New users (7 days)</span>
                                            <span className="text-sm font-bold text-ink">{stats.activity.new_users_7d}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-borderSubtle">
                                            <span className="text-sm text-inkLight">New users (30 days)</span>
                                            <span className="text-sm font-bold text-ink">{stats.activity.new_users_30d}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-borderSubtle">
                                            <span className="text-sm text-inkLight">Total likes</span>
                                            <span className="text-sm font-bold text-ink">{stats.activity.total_likes}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-borderSubtle">
                                            <span className="text-sm text-inkLight">Total comments</span>
                                            <span className="text-sm font-bold text-ink">{stats.activity.total_comments}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-sm text-inkLight">Total follows</span>
                                            <span className="text-sm font-bold text-ink">{stats.activity.total_follows}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Users */}
                                <div className="bg-surface border border-borderSubtle rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                                        <UserPlus className="w-5 h-5 text-gold" />
                                        Recent Signups
                                    </h3>
                                    <div className="space-y-3">
                                        {stats.recent_users.slice(0, 6).map((user) => (
                                            <div
                                                key={user.id}
                                                className="flex items-center gap-3 py-2 border-b border-borderSubtle last:border-0"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-canvas overflow-hidden flex-shrink-0">
                                                    {user.profile_picture ? (
                                                        <img src={user.profile_picture} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-inkLight text-xs font-bold">
                                                            {user.username[0]?.toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-ink truncate flex items-center gap-1">
                                                        {user.username}
                                                        {user.is_verified && <CheckCircle className="w-3 h-3 text-gold" />}
                                                    </p>
                                                    <p className="text-xs text-inkLight">{user.role} · {timeAgo(user.date_joined)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'users' && (
                        <motion.div
                            key="users"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {/* Filters */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                <form onSubmit={handleUserSearch} className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-inkLight" />
                                    <input
                                        type="text"
                                        value={usersSearch}
                                        onChange={(e) => setUsersSearch(e.target.value)}
                                        placeholder="Search users..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-surface border border-borderSubtle rounded-xl text-sm text-ink placeholder:text-inkLight focus:outline-none focus:border-gold/50"
                                    />
                                </form>
                                <select
                                    value={usersRoleFilter}
                                    onChange={(e) => { setUsersRoleFilter(e.target.value); setUsersPage(1); }}
                                    className="px-4 py-2.5 bg-surface border border-borderSubtle rounded-xl text-sm text-ink focus:outline-none focus:border-gold/50"
                                >
                                    <option value="">All Roles</option>
                                    <option value="user">Users</option>
                                    <option value="creator">Creators</option>
                                </select>
                            </div>

                            {/* Users Table */}
                            <div className="bg-surface border border-borderSubtle rounded-2xl overflow-hidden">
                                {usersLoading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <RefreshCw className="w-5 h-5 animate-spin text-inkLight" />
                                    </div>
                                ) : (
                                    <>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b border-borderSubtle">
                                                        <th className="text-left py-3 px-4 text-xs font-semibold text-inkLight uppercase tracking-wider">User</th>
                                                        <th className="text-left py-3 px-4 text-xs font-semibold text-inkLight uppercase tracking-wider hidden sm:table-cell">Role</th>
                                                        <th className="text-left py-3 px-4 text-xs font-semibold text-inkLight uppercase tracking-wider hidden md:table-cell">Wallet</th>
                                                        <th className="text-left py-3 px-4 text-xs font-semibold text-inkLight uppercase tracking-wider hidden md:table-cell">Joined</th>
                                                        <th className="text-left py-3 px-4 text-xs font-semibold text-inkLight uppercase tracking-wider">Verified</th>
                                                        <th className="text-left py-3 px-4 text-xs font-semibold text-inkLight uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users.map((user) => (
                                                        <tr key={user.id} className="border-b border-borderSubtle/50 hover:bg-canvas/50 transition-colors">
                                                            <td className="py-3 px-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 rounded-full bg-canvas overflow-hidden flex-shrink-0">
                                                                        {user.profile_picture ? (
                                                                            <img src={user.profile_picture} alt="" className="w-full h-full object-cover" />
                                                                        ) : (
                                                                            <div className="w-full h-full flex items-center justify-center text-inkLight text-xs font-bold">
                                                                                {user.username[0]?.toUpperCase()}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <span className="text-sm font-medium text-ink">{user.username}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4 hidden sm:table-cell">
                                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${user.role === 'creator'
                                                                    ? 'bg-gold/10 text-gold border border-gold/30'
                                                                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                                                                    }`}>
                                                                    {user.role}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4 hidden md:table-cell">
                                                                <span className="text-xs text-inkLight font-mono">
                                                                    {user.stacks_address
                                                                        ? `${user.stacks_address.slice(0, 6)}...${user.stacks_address.slice(-4)}`
                                                                        : '—'}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4 hidden md:table-cell">
                                                                <span className="text-xs text-inkLight">{timeAgo(user.date_joined)}</span>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                {user.is_verified ? (
                                                                    <CheckCircle className="w-4 h-4 text-gold" />
                                                                ) : (
                                                                    <XCircle className="w-4 h-4 text-inkLight/40" />
                                                                )}
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <button
                                                                    onClick={() => handleToggleVerification(user.id)}
                                                                    className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${user.is_verified
                                                                        ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                                                                        : 'bg-gold/10 text-gold hover:bg-gold/20'
                                                                        }`}
                                                                >
                                                                    {user.is_verified ? 'Unverify' : 'Verify'}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Pagination */}
                                        {usersCount > 20 && (
                                            <div className="flex items-center justify-between px-4 py-3 border-t border-borderSubtle">
                                                <p className="text-xs text-inkLight">
                                                    Showing {(usersPage - 1) * 20 + 1}–{Math.min(usersPage * 20, usersCount)} of {usersCount}
                                                </p>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setUsersPage((p) => Math.max(1, p - 1))}
                                                        disabled={usersPage === 1}
                                                        className="p-1.5 rounded-lg bg-canvas border border-borderSubtle text-inkLight hover:text-ink disabled:opacity-30"
                                                    >
                                                        <ChevronLeft className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setUsersPage((p) => p + 1)}
                                                        disabled={usersPage * 20 >= usersCount}
                                                        className="p-1.5 rounded-lg bg-canvas border border-borderSubtle text-inkLight hover:text-ink disabled:opacity-30"
                                                    >
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'feedback' && (
                        <motion.div
                            key="feedback"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {feedbackLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <RefreshCw className="w-5 h-5 animate-spin text-inkLight" />
                                </div>
                            ) : feedback.length === 0 ? (
                                <div className="text-center py-16">
                                    <MessageSquare className="w-12 h-12 text-inkLight/30 mx-auto mb-3" />
                                    <p className="text-inkLight">No feedback submissions yet</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {feedback.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            className={`bg-surface border rounded-2xl p-5 transition-colors ${item.resolved
                                                ? 'border-emerald-500/20 opacity-75'
                                                : 'border-borderSubtle'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${item.category === 'bug'
                                                        ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                                                        : item.category === 'feature'
                                                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                                                            : 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
                                                        }`}>
                                                        {item.category}
                                                    </span>
                                                    <span className="text-xs text-inkLight">{timeAgo(item.created_at)}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleResolveFeedback(item.id, !item.resolved)}
                                                    className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${item.resolved
                                                        ? 'bg-inkLight/10 text-inkLight hover:bg-inkLight/20'
                                                        : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                                                        }`}
                                                >
                                                    {item.resolved ? 'Reopen' : 'Resolve'}
                                                </button>
                                            </div>

                                            <p className="text-sm text-ink mb-2">{item.message}</p>
                                            <p className="text-xs text-inkLight mb-3">From: {item.user_identifier}</p>

                                            {/* Admin Notes */}
                                            {editingNote === item.id ? (
                                                <div className="flex gap-2 mt-3">
                                                    <input
                                                        type="text"
                                                        value={noteText}
                                                        onChange={(e) => setNoteText(e.target.value)}
                                                        placeholder="Add a note..."
                                                        className="flex-1 px-3 py-2 bg-canvas border border-borderSubtle rounded-lg text-sm text-ink placeholder:text-inkLight focus:outline-none focus:border-gold/50"
                                                    />
                                                    <button
                                                        onClick={() => handleSaveNote(item.id)}
                                                        className="px-3 py-2 bg-gold/10 text-gold text-sm rounded-lg hover:bg-gold/20 transition-colors"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => { setEditingNote(null); setNoteText(''); }}
                                                        className="px-3 py-2 text-inkLight text-sm rounded-lg hover:bg-canvas transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => { setEditingNote(item.id); setNoteText(item.admin_notes || ''); }}
                                                    className="text-xs text-inkLight hover:text-gold transition-colors mt-1"
                                                >
                                                    {item.admin_notes ? `📝 ${item.admin_notes}` : '+ Add note'}
                                                </button>
                                            )}
                                        </motion.div>
                                    ))}

                                    {/* Pagination */}
                                    {feedbackCount > 20 && (
                                        <div className="flex items-center justify-between pt-4">
                                            <p className="text-xs text-inkLight">
                                                Page {feedbackPage} of {Math.ceil(feedbackCount / 20)}
                                            </p>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setFeedbackPage((p) => Math.max(1, p - 1))}
                                                    disabled={feedbackPage === 1}
                                                    className="p-1.5 rounded-lg bg-surface border border-borderSubtle text-inkLight hover:text-ink disabled:opacity-30"
                                                >
                                                    <ChevronLeft className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setFeedbackPage((p) => p + 1)}
                                                    disabled={feedbackPage * 20 >= feedbackCount}
                                                    className="p-1.5 rounded-lg bg-surface border border-borderSubtle text-inkLight hover:text-ink disabled:opacity-30"
                                                >
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
