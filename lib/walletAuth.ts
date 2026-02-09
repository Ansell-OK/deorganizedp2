// ============================================
// DEFERRED WALLET AUTHENTICATION API
// ============================================
// NOTE: This implementation does NOT verify wallet signatures
// Suitable for MVP/testing only - requires signature verification for production

// Environment-aware API URL (same as api.ts)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// ============================================
// Type Definitions
// ============================================

export interface User {
    id: number;
    username: string;
    stacks_address: string;
    role: 'user' | 'creator';
    bio?: string;
    website?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    profile_picture?: string;
    cover_photo?: string;
    is_verified: boolean;
    date_joined: string;
    follower_count?: number;
    following_count?: number;
}

export interface Tokens {
    access: string;
    refresh: string;
}

export interface WalletCheckResponse {
    is_new: boolean;
    user?: User;
    tokens?: Tokens;
}

export interface CompleteSetupPayload {
    wallet_address: string;
    username?: string;
    role: 'user' | 'creator';
    bio?: string;
    website?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
}

export interface CompleteSetupResponse {
    user: User;
    tokens: Tokens;
}

// ============================================
// API Functions
// ============================================

/**
 * Check if wallet exists and login if it does.
 * Returns is_new=true if wallet doesn't exist (new user).
 * Returns is_new=false + JWT tokens if wallet exists (existing user).
 * 
 * @param walletAddress - Stacks wallet address (SP... or SM...)
 * @returns WalletCheckResponse with is_new flag and optional user/tokens
 */
export async function checkWalletOrLogin(
    walletAddress: string
): Promise<WalletCheckResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/users/wallet-login-or-check/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ wallet_address: walletAddress }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.detail || error.error || 'Wallet check failed');
        }

        const data: WalletCheckResponse = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
}

/**
 * Complete user setup and create account.
 * Called after user fills setup form.
 * 
 * @param payload - User profile data including wallet address
 * @returns User object and JWT tokens
 */
export async function completeSetup(
    payload: CompleteSetupPayload
): Promise<CompleteSetupResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/users/complete-setup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.detail || error.error || 'Setup failed');
        }

        const data: CompleteSetupResponse = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
}

// ============================================
// Token Management
// ============================================

/**
 * Store JWT tokens in localStorage
 */
export function storeTokens(tokens: Tokens): void {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
}

/**
 * Get stored access token
 */
export function getAccessToken(): string | null {
    return localStorage.getItem('access_token');
}

/**
 * Get stored refresh token
 */
export function getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
}

/**
 * Store user data in localStorage
 */
export function storeUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
}

/**
 * Get stored user data
 */
export function getStoredUser(): User | null {
    const userData = localStorage.getItem('user');
    if (!userData) return null;

    try {
        return JSON.parse(userData);
    } catch (error) {
        return null;
    }
}

/**
 * Clear all stored authentication data (logout)
 */
export function clearAuth(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('pending_wallet_address');
}

/**
 * Check if user is authenticated (has valid tokens)
 */
export function isAuthenticated(): boolean {
    const token = getAccessToken();
    return !!token;
}

// ============================================
// Temporary Storage (for setup flow)
// ============================================

/**
 * Store wallet address temporarily during setup flow
 */
export function storePendingWallet(walletAddress: string): void {
    sessionStorage.setItem('pending_wallet_address', walletAddress);
}

/**
 * Get pending wallet address from temporary storage
 */
export function getPendingWallet(): string | null {
    return sessionStorage.getItem('pending_wallet_address');
}

/**
 * Clear pending wallet address
 */
export function clearPendingWallet(): void {
    sessionStorage.removeItem('pending_wallet_address');
}
