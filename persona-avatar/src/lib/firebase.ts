// Firebase init + Firestore + Auth helpers.
// All credentials come from .env.local (never commit that file).
// Firestore collection: "avatars" — one doc per generated avatar.

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, doc, updateDoc, increment, arrayUnion, serverTimestamp } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import type { Traits, AvatarConfig } from "@/lib/avatar";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Auth instance — shared across the app via AuthContext
export const auth = getAuth(app);

// Google provider — we only request basic profile + email scopes (default)
const googleProvider = new GoogleAuthProvider();

// Opens the Google sign-in popup and returns the signed-in user.
// Using popup (vs redirect) so the user stays on the same page after sign-in.
export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

// Signs the current user out of Firebase Auth.
export async function signOut() {
  await firebaseSignOut(auth);
}

// Shape of a saved avatar document in Firestore
export type AvatarDoc = {
  id: string;
  name: string;
  traits: Traits;
  config: AvatarConfig;
  description: string;
  likes: number;
  likedIPs: string[];
};

// Saves a new avatar to Firestore and returns the doc ID.
// Called from TraitsScreen when the user clicks "Generate".
export async function saveAvatar(data: Omit<AvatarDoc, "id" | "likes" | "likedIPs">): Promise<string> {
  const ref = await addDoc(collection(db, "avatars"), {
    ...data,
    likes: 0,
    likedIPs: [],
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function likeAvatar(id: string, ip: string): Promise<void> {
  await updateDoc(doc(db, "avatars", id), {
    likes: increment(1),
    likedIPs: arrayUnion(ip),
  });
}

// Loads an avatar by Firestore doc ID.
// Called from SharedAvatarScreen when someone opens a share link.
// Returns null if the ID doesn't exist (deleted or never created).
export async function loadAvatar(id: string): Promise<AvatarDoc | null> {
  const snap = await getDoc(doc(db, "avatars", id));
  if (!snap.exists()) return null;
  const data = snap.data() as Omit<AvatarDoc, "id">;
  return { id: snap.id, likes: 0, likedIPs: [], ...data };
}
