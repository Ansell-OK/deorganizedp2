# Wallet Authentication - Frontend Implementation

## Simple Address-Based Auth (NO SIGNATURES)

This implementation uses **wallet address only** - no message signing, no nonces, no cryptography.

---

## Flow

```
1. User clicks "Connect Wallet"
   ↓
2. Wallet popup (Leather/Xverse)
   ↓
3. Extract wallet address
   ↓
4. Call POST /api/users/wallet-login-or-check/
   ↓
5a. If is_new = false:
    → Save tokens
    → Redirect to /dashboard
   
5b. If is_new = true:
    → Save pending wallet to localStorage
    → Redirect to /setup
    ↓
6. User fills setup form
   ↓
7. Call POST /api/users/complete-setup/
   ↓
8. Save tokens & redirect to /dashboard
```

---

## Files Created

### 1. `src/lib/wallet-auth.ts`
API client functions:
- `walletLoginOrCheck()` - Check if wallet exists
- `completeSetup()` - Create user account
- `storeTokens()` - Save JWT tokens
- `storeUser()` - Save user data
- Token/user management helpers

### 2. `src/components/WalletAuth.tsx`
Wallet connection component:
- Shows "Connect Wallet" button
- Handles Stacks Connect popup
- Extracts wallet address
- Calls login-or-check endpoint
- Routes to setup or dashboard

### 3. `src/app/setup/page.tsx`
Profile setup page:
- Loads pending wallet from localStorage
- Shows setup form (role, username, bio, website)
- Calls complete-setup endpoint
- Stores tokens and redirects

### 4. `src/app/dashboard/page.tsx`
Protected dashboard:
- Checks authentication
- Displays user info
- Logout functionality

---

## Usage

### Home Page
```tsx
import WalletAuth from '@/components/WalletAuth';

export default function HomePage() {
  return <WalletAuth />;
}
```

### Protected Route
```tsx
'use client';

import { useEffect } from 'use';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/wallet-auth';

export default function ProtectedPage() {
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/');
    }
  }, [router]);
  
  return <div>Protected content</div>;
}
```

---

## Install Dependencies

```bash
npm install @stacks/connect
```

---

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Backend Endpoints Used

### 1. POST /api/users/wallet-login-or-check/
**Request:**
```json
{
  "wallet_address": "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
}
```

**Response (Existing):**
```json
{
  "is_new": false,
  "user": { /*...*/ },
  "tokens": { "access": "...", "refresh": "..." }
}
```

**Response (New):**
```json
{
  "is_new": true
}
```

### 2. POST /api/users/complete-setup/
**Request:**
```json
{
  "wallet_address": "SP...",
  "role": "user",
  "username": "optional",
  "bio": "optional"
}
```

**Response:**
```json
{
  "user": { /*...*/ },
  "tokens": { "access": "...", "refresh": "..." }
}
```

---

## Security Notes

✅ **What This Does:**
- Validates wallet address format
- Backend verifies wallet uniqueness
- JWT tokens for session management

⚠️ **What This Does NOT Do:**
- Verify wallet ownership
- Require signatures
- Use cryptographic proofs

This is suitable for MVP/testing where wallet ownership verification is not critical.

---

## Testing

1. **New User Flow:**
   - Click "Connect Wallet"
   - Select wallet in popup
   - Should redirect to /setup
   - Fill in form
   - Should redirect to /dashboard

2. **Existing User Flow:**
   - Click "Connect Wallet"
   - Select wallet in popup
   - Should redirect directly to /dashboard

3. **Logout:**
   - Click logout button
   - Should clear tokens and redirect to home

---

## Troubleshooting

**"Connect Wallet" not working:**
- Check console for errors
- Verify @stacks/connect is installed
- Check wallet extension is installed

**Setup page blank:**
- Check if pending_wallet exists in localStorage
- Verify wallet address was stored

**Dashboard redirecting to home:**
- Check if access_token exists in localStorage
- Verify token format is correct

---

## Next Steps

For production:
1. Add proper error boundaries
2. Implement token refresh logic
3. Add loading states globally
4. Consider React Context for auth state
5. Add protected route middleware
