/**
 * Wallet Authentication Helper
 * Provides utility functions for requiring wallet authentication before actions
 */

export interface WalletAuthHelper {
    /**
     * Requires authentication before executing an action
     * @param isAuthenticated - Current authentication status
     * @param onConnect - Function to trigger wallet connection
     * @param onSuccess - Function to execute when authenticated
     */
    requireAuth: (
        isAuthenticated: boolean,
        onConnect: () => void,
        onSuccess: () => void
    ) => void;
}

/**
 * Executes an action if authenticated, otherwise triggers wallet connection
 */
export const requireAuth = (
    isAuthenticated: boolean,
    onConnect: () => void,
    onSuccess: () => void
): void => {
    if (!isAuthenticated) {
        // User is not authenticated - trigger wallet connection
        onConnect();
    } else {
        // User is authenticated - execute the action
        onSuccess();
    }
};

/**
 * Creates a wrapper function that requires authentication
 * Useful for button onClick handlers
 */
export const withAuth = (
    isAuthenticated: boolean,
    onConnect: () => void,
    action: () => void
) => {
    return () => requireAuth(isAuthenticated, onConnect, action);
};
