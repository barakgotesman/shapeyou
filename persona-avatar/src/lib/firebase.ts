// Firebase init + Firestore + Auth helpers.
// All credentials come from .env.local (never commit that file).
// Firestore collection: "avatars" — one doc per generated avatar.

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, updateDoc, increment, arrayUnion, serverTimestamp, query, where, orderBy } from "firebase/firestore";
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
  // null when the avatar was created without signing in
  ownerUid: string | null;
};

// Saves a new avatar to Firestore and returns the doc ID.
// ownerUid is the Firebase Auth uid of the signed-in user, or null if anonymous.
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
  const data = snap.data() as Omit<AvatarDoc, "id" | "likes" | "likedIPs">;
  return { likes: 0, likedIPs: [], ...data, id: snap.id };
}

// Loads all avatars owned by a specific user, sorted newest first.
// Called from MyAvatarsScreen after the user signs in.
export async function loadMyAvatars(uid: string): Promise<AvatarDoc[]> {
  const snap = await getDocs(
    query(
      collection(db, "avatars"),
      where("ownerUid", "==", uid),
      orderBy("createdAt", "desc")
    )
  );
  return snap.docs.map((d) => ({
    likes: 0,
    likedIPs: [],
    ...(d.data() as Omit<AvatarDoc, "id" | "likes" | "likedIPs">),
    id: d.id,
  }));
}
