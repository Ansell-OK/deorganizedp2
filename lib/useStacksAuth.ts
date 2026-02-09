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
                // Get connection data from localStorage
                const localData = getLocalStorage();

                if (localData?.addresses?.stx?.[0]?.address) {
                    const address = localData.addresses.stx[0].address;
                    const bnsName = await fetchBNSName(address);

                    setUserData({ address, bnsName });
                    setIsAuthenticated(true);

                    // Note: Using custom navigation instead of react-router-dom
                    // console.log('Wallet connected successfully:', address);
                }
            },
            onCancel: () => {
                // console.log('User cancelled wallet connection');
            },
        });
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

        // Note: Using custom navigation instead of react-router-dom
        // console.log('Wallet disconnected');
    };

    return {
        isAuthenticated,
        userData,
        signIn,
        signOut,
    };
};
