import { Routes, Route, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { AvatarProvider } from "@/context/AvatarContext";
import { AuthProvider } from "@/context/AuthContext";
import { LandingScreen } from "@/components/Screens/LandingScreen";
import { NameInputScreen } from "@/components/Screens/NameInputScreen";
import { TraitsScreen } from "@/components/Screens/TraitsScreen";
import { DevPreview } from "@/components/DevPreview";
import { ResultScreen } from "@/components/Screens/ResultScreen";
import { SharedAvatarScreen } from "@/components/Screens/SharedAvatarScreen";
import { LeaderboardScreen } from "@/components/Screens/LeaderboardScreen";

function CreateRoute() {
  const [params] = useSearchParams();
  return params.get("step") === "traits" ? <TraitsScreen /> : <NameInputScreen />;
}

export default function App() {
  return (
    // AuthProvider wraps everything so any screen can call useAuth()
    // AvatarProvider sits inside so it can read auth state in the future if needed
    <AuthProvider>
    <AvatarProvider>
      <Navbar />
      <Routes>
        <Route path="/"       element={<LandingScreen />} />
        <Route path="/create" element={<CreateRoute />} />
        <Route path="/result" element={<ResultScreen />} />
        <Route path="/avatar/:id" element={<SharedAvatarScreen />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
      </Routes>
      <Toaster />
      <DevPreview />
    </AvatarProvider>
    </AuthProvider>
  );
}
