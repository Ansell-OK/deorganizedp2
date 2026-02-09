'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    completeSetup,
    getPendingWallet,
    clearPendingWallet,
    storeTokens,
    storeUser,
} from '@/lib/wallet-auth';

export default function SetupPage() {
    const router = useRouter();
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        role: 'user' as 'user' | 'creator',
        username: '',
        bio: '',
        website: '',
    });

    useEffect(() => {
        // Load pending wallet address
        const pending = getPendingWallet();

        if (!pending) {
            // No pending wallet - redirect to login
            router.push('/');
            return;
        }

        setWalletAddress(pending);
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!walletAddress) {
            setError('No wallet address found. Please connect your wallet again.');
            return;
        }

        // Prevent double submission
        if (submitting) return;

        setSubmitting(true);
        setLoading(true);
        setError(null);

        try {
            // Complete setup
            const result = await completeSetup({
                wallet_address: walletAddress,
                role: formData.role,
                username: formData.username || undefined,
                bio: formData.bio || undefined,
                website: formData.website || undefined,
            });

            console.log('Setup complete:', result.user);

            // Store tokens and user
            storeTokens(result.tokens);
            storeUser(result.user);

            // Clear pending wallet
            clearPendingWallet();

            // Redirect to dashboard
            router.push('/dashboard');
        } catch (err) {
            console.error('Setup error:', err);
            setError(err instanceof Error ? err.message : 'Setup failed');
            setLoading(false);
            setSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (!walletAddress) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Complete Your Profile
                    </h1>
                    <p className="text-gray-600">
                        Set up your account to get started
                    </p>
                    <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                        <p className="text-sm text-indigo-800">
                            <span className="font-medium">Wallet:</span>{' '}
                            {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Account Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="user">User</option>
                            <option value="creator">Creator</option>
                        </select>
                        <p className="mt-1 text-sm text-gray-500">
                            Creators can publish shows and content
                        </p>
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username <span className="text-gray-400">(optional)</span>
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Choose a username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Leave blank to auto-generate from your wallet address
                        </p>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bio <span className="text-gray-400">(optional)</span>
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself"
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Website */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Website <span className="text-gray-400">(optional)</span>
                        </label>
                        <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || submitting}
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Creating Account...' : 'Complete Setup'}
                    </button>
                </form>
            </div>
        </div>
    );
}
