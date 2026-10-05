import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { createUserProfile, getUserProfile, updateUserProfile } from '../services/firestore/users';

const AuthContext = createContext(null);

const normalizeAuthError = (error) => {
  const code = error?.code || '';

  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/user-not-found':
      return 'No account exists for that email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Your password is too weak. Please use at least 6 characters.';
    case 'auth/requires-recent-login':
      return 'Please sign in again and try once more.';
    default:
      return 'Something went wrong. Please try again.';
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Failed to load user profile:', error);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const profile = await getUserProfile(result.user.uid);
      setUserProfile(profile);
      return { success: true, role: profile?.role || 'client' };
    } catch (error) {
      return {
        success: false,
        message: normalizeAuthError(error),
      };
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const profile = await createUserProfile({
        uid: result.user.uid,
        name,
        email,
        role: 'client',
        photoURL: null,
      });

      setUserProfile(profile);
      return { success: true, role: profile?.role || 'client' };
    } catch (error) {
      return {
        success: false,
        message: normalizeAuthError(error),
      };
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
  };

  const updateProfile = useCallback(async (updates) => {
    if (!user?.uid) throw new Error('You must be signed in to update your profile.');
    const savedUpdates = await updateUserProfile(user.uid, updates);
    setUserProfile((current) => ({ ...current, ...savedUpdates }));
    return savedUpdates;
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      userProfile,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: userProfile?.role === 'admin',
      isClient: userProfile?.role === 'client',
      login,
      register,
      logout,
      updateProfile,
    }),
    [user, userProfile, loading, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// This module intentionally exports the auth hook alongside its provider.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
