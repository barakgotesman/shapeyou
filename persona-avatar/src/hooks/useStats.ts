// Fetches live stats from Firestore for the landing screen.
// - totalAvatars: all-time count of created avatars
// - last24h: avatars created in the last 24 hours
// Uses a simple count query via getDocs — no aggregation extension needed for MVP scale.

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Stats = {
  totalAvatars: number;
  last24h: number;
  loading: boolean;
};

export function useStats(): Stats {
  const [stats, setStats] = useState<Stats>({ totalAvatars: 0, last24h: 0, loading: true });

  useEffect(() => {
    const since = Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000));

    Promise.all([
      getDocs(collection(db, "avatars")),
      getDocs(query(collection(db, "avatars"), where("createdAt", ">=", since))),
    ])
      .then(([all, recent]) => {
        setStats({ totalAvatars: all.size, last24h: recent.size, loading: false });
      })
      .catch(() => {
        // Silently fail — stats are decorative, don't block the page
        setStats({ totalAvatars: 0, last24h: 0, loading: false });
      });
  }, []);

  return stats;
}
