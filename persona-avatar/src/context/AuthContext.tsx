// AuthContext — provides the signed-in Firebase user to the whole app.
// Wraps Firebase's onAuthStateChanged so every component can read `user`
// without each one setting up its own listener.

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signInWithGoogle, signOut } from "@/lib/firebase";

type AuthState = {
  user: User | null;       // null = not signed in, or still loading
  loading: boolean;        // true until Firebase resolves the initial auth state
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // Start as loading so the UI doesn't flash a "not signed in" state
  // before Firebase finishes checking the persisted session
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase calls this once immediately with the current session (or null),
    // then again whenever the user signs in or out
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    // Clean up the listener when the provider unmounts (e.g. during HMR)
    return unsubscribe;
  }, []);

  const handleSignIn = async () => {
    await signInWithGoogle();
    // No need to setUser here — onAuthStateChanged fires automatically after sign-in
  };

  const handleSignOut = async () => {
    await signOut();
    // Same — onAuthStateChanged fires automatically after sign-out
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn: handleSignIn, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Convenience hook — throws if used outside AuthProvider
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
