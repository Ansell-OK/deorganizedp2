'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredUser, clearAuth, type User } from '@/lib/wallet-auth';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check authentication
        const storedUser = getStoredUser();

        if (!storedUser) {
            // Not authenticated - redirect to home
            router.push('/');
            return;
        }

        setUser(storedUser);
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        clearAuth();
        router.push('/');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Card */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Welcome, {user.username}!
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Wallet Address</p>
                            <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                                {user.stacks_address}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 mb-1">Role</p>
                            <p className="font-medium capitalize">
                                {user.role}
                            </p>
                        </div>

                        {user.bio && (
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-600 mb-1">Bio</p>
                                <p className="text-gray-900">{user.bio}</p>
                            </div>
                        )}

                        {user.website && (
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Website</p>
                                <a
                                    href={user.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:text-indigo-700"
                                >
                                    {user.website}
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">
                            Account Status
                        </h3>
                        <p className="text-2xl font-bold text-green-600">Active</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">
                            Verified
                        </h3>
                        <p className="text-2xl font-bold text-gray-900">
                            {user.is_verified ? 'Yes' : 'No'}
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">
                            Member Since
                        </h3>
                        <p className="text-lg font-medium text-gray-900">
                            {new Date(user.date_joined).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
