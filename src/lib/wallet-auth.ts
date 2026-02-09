/**
 * Wallet Authentication API Client
 * 
 * Simple address-based auth - NO signatures, NO nonces
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface User {
    id: number;
    username: string;
    stacks_address: string;
    role: 'user' | 'creator';
    bio?: string;
    profile_picture?: string;
    website?: string;
    is_verified: boolean;
    date_joined: string;
}

export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface LoginCheckResponse {
    is_new: boolean;
    user?: User;
    tokens?: AuthTokens;
}

export interface CompleteSetupRequest {
    wallet_address: string;
    role: 'user' | 'creator';
    username?: string;
    bio?: string;
    website?: string;
}

export interface CompleteSetupResponse {
    user: User;
    tokens: AuthTokens;
}

/**
 * Check if wallet exists and login if it does
 */
export async function walletLoginOrCheck(
    walletAddress: string
): Promise<LoginCheckResponse> {
    const response = await fetch(`${API_BASE_URL}/api/users/wallet-login-or-check/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            wallet_address: walletAddress,
        }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
}

/**
 * Complete user setup and create account
 */
export async function completeSetup(
    data: CompleteSetupRequest
): Promise<CompleteSetupResponse> {
    const response = await fetch(`${API_BASE_URL}/api/users/complete-setup/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Registration failed' }));
        throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
}

/**
 * Store auth tokens in localStorage
 */
export function storeTokens(tokens: AuthTokens): void {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
}

/**
 * Store authenticated user in localStorage
 */
export function storeUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
}

/**
 * Get stored access token
 */
export function getAccessToken(): string | null {
    return localStorage.getItem('access_token');
}

/**
 * Get stored user
 */
export function getStoredUser(): User | null {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    try {
        return JSON.parse(userJson);
    } catch {
        return null;
    }
}

/**
 * Store pending wallet address (before setup)
 */
export function storePendingWallet(address: string): void {
    localStorage.setItem('pending_wallet', address);
}

/**
 * Get pending wallet address
 */
export function getPendingWallet(): string | null {
    return localStorage.getItem('pending_wallet');
}

/**
 * Clear pending wallet
 */
export function clearPendingWallet(): void {
    localStorage.removeItem('pending_wallet');
}

/**
 * Clear all auth data (logout)
 */
export function clearAuth(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('pending_wallet');
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
    return !!getAccessToken() && !!getStoredUser();
}

/**
 * Make authenticated API request
 */
export async function authenticatedFetch(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const token = getAccessToken();

    if (!token) {
        throw new Error('Not authenticated');
    }

    return fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
}
