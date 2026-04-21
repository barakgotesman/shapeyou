import { createContext, useContext, useState } from "react";
import type { Traits } from "@/lib/avatar";

const DEFAULT_TRAITS: Traits = {
  extrovert: 50, creative: 50, calm: 50, funny: 50, social: 50, gender: "other",
};

type AppState = {
  name: string;
  traits: Traits;
  avatarId: string | null;
  setName: (name: string) => void;
  setTraits: (traits: Traits) => void;
  setAvatarId: (id: string) => void;
};

const AvatarContext = createContext<AppState | null>(null);

export function AvatarProvider({ children }: { children: React.ReactNode }) {
  const [name, setName]       = useState("");
  const [traits, setTraits]   = useState<Traits>(DEFAULT_TRAITS);
  const [avatarId, setAvatarId] = useState<string | null>(null);

  return (
    <AvatarContext.Provider value={{ name, traits, avatarId, setName, setTraits, setAvatarId }}>
      {children}
    </AvatarContext.Provider>
  );
}

export function useAvatarContext() {
  const ctx = useContext(AvatarContext);
  if (!ctx) throw new Error("useAvatarContext must be used inside AvatarProvider");
  return ctx;
}
