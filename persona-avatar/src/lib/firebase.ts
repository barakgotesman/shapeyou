// Firebase init + Firestore + Auth helpers.
// All credentials come from .env.local (never commit that file).
// Firestore collection: "avatars" — one doc per generated avatar.

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, updateDoc, setDoc, increment, arrayUnion, serverTimestamp, query, where, orderBy, onSnapshot, runTransaction } from "firebase/firestore";
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

// ── USER DOCS ─────────────────────────────────────────────────────────────────

export type UserDoc = {
  coins: number;
  avatarSlots: number;
  lastLoginDate: string;   // YYYY-MM-DD
  likesGivenToday: number; // resets each day
  likesGivenDate: string;  // YYYY-MM-DD of last like given
};

export const SLOT_COST = 10; // coins per extra avatar slot

// Tiered daily reward: likes 1-3 → 3 coins, likes 4-7 → 1 coin, 8+ → 0
const LIKE_TIERS = [
  { upTo: 3, coins: 3 },
  { upTo: 7, coins: 1 },
];

function coinsForLike(likesGivenToday: number): number {
  for (const tier of LIKE_TIERS) {
    if (likesGivenToday < tier.upTo) return tier.coins;
  }
  return 0;
}

// Returns the user doc, creating it with defaults if it doesn't exist yet.
export async function getOrCreateUserDoc(uid: string): Promise<UserDoc> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data() as UserDoc;
  const defaults: UserDoc = { coins: 0, avatarSlots: 1, lastLoginDate: "", likesGivenToday: 0, likesGivenDate: "" };
  await setDoc(ref, defaults);
  return defaults;
}

// Awards 1 coin if the user hasn't been awarded one today. Returns updated doc.
export async function awardDailyLogin(uid: string): Promise<UserDoc> {
  const today = new Date().toISOString().slice(0, 10);
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  const data = snap.exists() ? (snap.data() as UserDoc) : { coins: 0, avatarSlots: 1, lastLoginDate: "", likesGivenToday: 0, likesGivenDate: "" };
  if (data.lastLoginDate === today) return data;
  const updated = { ...data, coins: data.coins + 1, lastLoginDate: today };
  await setDoc(ref, updated);
  return updated;
}

// Returns how many avatars the user has already created.
export async function getUserAvatarCount(uid: string): Promise<number> {
  const snap = await getDocs(query(collection(db, "avatars"), where("ownerUid", "==", uid)));
  return snap.size;
}

// Spends SLOT_COST coins to add 1 avatar slot. Throws if not enough coins.
export async function buyAvatarSlot(uid: string): Promise<UserDoc> {
  const ref = doc(db, "users", uid);
  return runTransaction(db, async tx => {
    const snap = await tx.get(ref);
    if (!snap.exists()) throw new Error("user doc missing");
    const data = snap.data() as UserDoc;
    if (data.coins < SLOT_COST) throw new Error("not enough coins");
    const updated = { ...data, coins: data.coins - SLOT_COST, avatarSlots: data.avatarSlots + 1 };
    tx.set(ref, updated);
    return updated;
  });
}

// ── AVATAR DOCS ───────────────────────────────────────────────────────────────

// Shape of a saved avatar document in Firestore
export type AvatarDoc = {
  id: string;
  name: string;
  traits: Traits;
  config: AvatarConfig;
  description: string;
  likes: number;
  likedIPs: string[];
  ownerUid: string | null;
  xp: number;
  chosenAccessory: string[] | null;
  // Owner's first name — set when showNameInProfile is ON, null when OFF
  ownerFirstName: string | null;
};

// Saves a new avatar to Firestore and returns the doc ID.
// ownerUid is the Firebase Auth uid of the signed-in user, or null if anonymous.
export async function saveAvatar(data: Omit<AvatarDoc, "id" | "likes" | "likedIPs" | "xp" | "chosenAccessory" | "ownerFirstName"> & { ownerFirstName: string | null }): Promise<string> {
  const ref = await addDoc(collection(db, "avatars"), {
    ...data,
    likes: 0,
    likedIPs: [],
    xp: 0,
    chosenAccessory: null,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

// Updates ownerFirstName on all avatars owned by uid.
// Call with firstName when user turns ON showNameInProfile, null when OFF.
export async function updateOwnerFirstNameForAll(uid: string, firstName: string | null): Promise<void> {
  const snap = await getDocs(query(collection(db, "avatars"), where("ownerUid", "==", uid)));
  await Promise.all(snap.docs.map(d => updateDoc(d.ref, { ownerFirstName: firstName })));
}

export async function likeAvatar(id: string, ip: string): Promise<void> {
  await updateDoc(doc(db, "avatars", id), {
    likes: increment(1),
    likedIPs: arrayUnion(ip),
    xp: increment(1),
  });
}

// Returns coins earned (0 if daily cap reached).
export async function awardLikerCoins(uid: string): Promise<number> {
  const today = new Date().toISOString().slice(0, 10);
  const ref = doc(db, "users", uid);
  return runTransaction(db, async tx => {
    const snap = await tx.get(ref);
    const data = snap.data() as UserDoc;
    const likesGivenToday = data.likesGivenDate === today ? (data.likesGivenToday ?? 0) : 0;
    const earned = coinsForLike(likesGivenToday);
    tx.update(ref, {
      likesGivenToday: likesGivenToday + 1,
      likesGivenDate: today,
      ...(earned > 0 && { coins: increment(earned) }),
    });
    return earned;
  });
}

export async function setChosenAccessory(id: string, accessories: string[] | null): Promise<void> {
  await updateDoc(doc(db, "avatars", id), { chosenAccessory: accessories });
}

// Normalize legacy string chosenAccessory to array format
function normalizeChosen(raw: unknown): string[] | null {
  if (raw === null || raw === undefined) return null;
  if (Array.isArray(raw)) return raw as string[];
  if (typeof raw === "string") return [raw];
  return null;
}

// Real-time listener for a single avatar doc — used on the edit screen so XP/likes update live
export function subscribeAvatar(id: string, onUpdate: (avatar: AvatarDoc) => void): () => void {
  return onSnapshot(doc(db, "avatars", id), snap => {
    if (!snap.exists()) return;
    const raw = snap.data();
    const data = raw as Omit<AvatarDoc, "id" | "likes" | "likedIPs" | "xp" | "chosenAccessory">;
    onUpdate({ likes: 0, likedIPs: [], xp: 0, ownerFirstName: null, ...data, chosenAccessory: normalizeChosen(raw.chosenAccessory), id: snap.id });
  });
}

// Loads an avatar by Firestore doc ID.
// Called from SharedAvatarScreen when someone opens a share link.
// Returns null if the ID doesn't exist (deleted or never created).
export async function loadAvatar(id: string): Promise<AvatarDoc | null> {
  const snap = await getDoc(doc(db, "avatars", id));
  if (!snap.exists()) return null;
  const raw = snap.data();
  const data = raw as Omit<AvatarDoc, "id" | "likes" | "likedIPs" | "xp" | "chosenAccessory">;
  return { likes: 0, likedIPs: [], xp: 0, ownerFirstName: null, ...data, chosenAccessory: normalizeChosen(raw.chosenAccessory), id: snap.id };
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
    xp: 0,
    ownerFirstName: null,
    ...(d.data() as Omit<AvatarDoc, "id" | "likes" | "likedIPs" | "xp" | "chosenAccessory">),
    chosenAccessory: normalizeChosen(d.data().chosenAccessory),
    id: d.id,
  }));
}
