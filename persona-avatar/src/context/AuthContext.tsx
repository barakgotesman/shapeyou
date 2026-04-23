// AuthContext — provides the signed-in Firebase user to the whole app.
// Wraps Firebase's onAuthStateChanged so every component can read `user`
// without each one setting up its own listener.

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signInWithGoogle, signOut, awardDailyLogin, getOrCreateUserDoc } from "@/lib/firebase";
import type { UserDoc } from "@/lib/firebase";

type AuthState = {
  user: User | null;
  loading: boolean;
  userDoc: UserDoc | null;
  refreshUserDoc: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);

  const refreshUserDoc = useCallback(async () => {
    if (!user) return;
    const doc = await getOrCreateUserDoc(user.uid);
    setUserDoc(doc);
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const doc = await awardDailyLogin(firebaseUser.uid);
          setUserDoc(doc);
        } catch {
          // Firestore unavailable — still let the user in
          try {
            const doc = await getOrCreateUserDoc(firebaseUser.uid);
            setUserDoc(doc);
          } catch {
            // ignore
          }
        }
      } else {
        setUserDoc(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleSignIn = async () => { await signInWithGoogle(); };
  const handleSignOut = async () => { await signOut(); };

  return (
    <AuthContext.Provider value={{ user, loading, userDoc, refreshUserDoc, signIn: handleSignIn, signOut: handleSignOut }}>
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
