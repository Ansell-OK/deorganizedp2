import { useState, useEffect } from 'react';
import { connect, disconnect, isConnected, getLocalStorage } from '@stacks/connect';

interface UserData {
    address: string;
    bnsName?: string;
}

interface UseStacksAuthReturn {
    isAuthenticated: boolean;
    userData: UserData | null;
    signIn: () => void;
    signOut: () => void;
}

export const useStacksAuth = (): UseStacksAuthReturn => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    // Fetch BNS name from Hiro API
    const fetchBNSName = async (address: string): Promise<string | undefined> => {
        try {
            const response = await fetch(`https://api.hiro.so/v2/addresses/stacks/${address}/valid`);
            if (response.ok) {
                const data = await response.json();
                return data.names?.[0]; // Return first BNS name if available
            }
        } catch (error) {
            console.error('Failed to fetch BNS name:', error);
        }
        return undefined;
    };

    // Load existing connection on mount
    useEffect(() => {
        const checkConnection = async () => {
            const connected = await isConnected();

            if (connected) {
                const localData = getLocalStorage();

                if (localData?.addresses?.stx?.[0]?.address) {
                    const address = localData.addresses.stx[0].address;
                    const bnsName = await fetchBNSName(address);

                    setUserData({ address, bnsName });
                    setIsAuthenticated(true);
                }
            }
        };

        checkConnection();
    }, []);

    // Sign in with wallet
    const signIn = () => {
        // @ts-ignore - connect options type mismatch but works at runtime
        connect({
            appDetails: {
                name: 'Deorganized',
                icon: window.location.origin + '/logo.png',
            },
            onFinish: async () => {
                const localData = getLocalStorage();

                if (localData?.addresses?.stx?.[0]?.address) {
                    const address = localData.addresses.stx[0].address;
                    const bnsName = await fetchBNSName(address);

                    setUserData({ address, bnsName });
                    setIsAuthenticated(true);

                    // Reload to update UI
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                }
            },
            onCancel: () => {
                // User cancelled
            },
        });

        // WORKAROUND: onFinish callback doesn't always fire reliably  
        // Poll to detect when connection completes
        let pollCount = 0;
        const maxPolls = 50; // Poll for up to 25 seconds

        const pollInterval = setInterval(async () => {
            pollCount++;

            const connected = await isConnected();
            const localData = getLocalStorage();

            if (connected && localData?.addresses?.stx?.[0]?.address && !isAuthenticated) {
                clearInterval(pollInterval);
                window.location.reload();
            } else if (pollCount >= maxPolls) {
                clearInterval(pollInterval);
            }
        }, 500); // Poll every 500ms
    };

    // Sign out
    const signOut = () => {
        disconnect();
        setUserData(null);
        setIsAuthenticated(false);

        // Clear any additional stored data
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_profile');
    };

    return {
        isAuthenticated,
        userData,
        signIn,
        signOut,
    };
};
