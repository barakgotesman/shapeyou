// Firebase init + Firestore helpers.
// All credentials come from .env.local (never commit that file).
// Firestore collection: "avatars" — one doc per generated avatar.

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, doc, serverTimestamp } from "firebase/firestore";
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

// Shape of a saved avatar document in Firestore
export type AvatarDoc = {
  id: string;          // Firestore auto-generated doc ID — used as the share URL key
  name: string;
  traits: Traits;
  config: AvatarConfig; // full resolved config stored so shared view doesn't need to rebuild
  description: string;
};

// Saves a new avatar to Firestore and returns the doc ID.
// Called from TraitsScreen when the user clicks "Generate".
export async function saveAvatar(data: Omit<AvatarDoc, "id">): Promise<string> {
  const ref = await addDoc(collection(db, "avatars"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

// Loads an avatar by Firestore doc ID.
// Called from SharedAvatarScreen when someone opens a share link.
// Returns null if the ID doesn't exist (deleted or never created).
export async function loadAvatar(id: string): Promise<AvatarDoc | null> {
  const snap = await getDoc(doc(db, "avatars", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<AvatarDoc, "id">) };
}
