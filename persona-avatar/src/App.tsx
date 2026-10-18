import { useEffect } from "react";
import { Routes, Route, useSearchParams, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "sonner";
import { AvatarProvider } from "@/context/AvatarContext";
import { AuthProvider } from "@/context/AuthContext";
import { LandingScreen } from "@/components/Screens/LandingScreen";
import { NameInputScreen } from "@/components/Screens/NameInputScreen";
import { TraitsScreen } from "@/components/Screens/TraitsScreen";
import { DevPreview } from "@/components/DevPreview";
import { ResultScreen } from "@/components/Screens/ResultScreen";
import { SharedAvatarScreen } from "@/components/Screens/SharedAvatarScreen";
import { LeaderboardScreen } from "@/components/Screens/LeaderboardScreen";
import { MyAvatarsScreen } from "@/components/Screens/MyAvatarsScreen";
import { EditAvatarScreen } from "@/components/Screens/EditAvatarScreen";
import { BenefitsScreen } from "@/components/Screens/BenefitsScreen";
import { SettingsScreen } from "@/components/Screens/SettingsScreen";
import { TermsScreen } from "@/components/Screens/TermsScreen";
import { PrivacyScreen } from "@/components/Screens/PrivacyScreen";
import { AccessibilityScreen } from "@/components/Screens/AccessibilityScreen";
import { Footer } from "@/components/Footer";

// Reset scroll to the top on every navigation (including create step changes)
function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname, search]);
  return null;
}

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
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"       element={<LandingScreen />} />
        <Route path="/create" element={<CreateRoute />} />
        <Route path="/result" element={<ResultScreen />} />
        <Route path="/avatar/:id" element={<SharedAvatarScreen />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
        <Route path="/my-avatars" element={<MyAvatarsScreen />} />
        <Route path="/edit/:id" element={<EditAvatarScreen />} />
        <Route path="/benefits" element={<BenefitsScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/terms" element={<TermsScreen />} />
        <Route path="/privacy" element={<PrivacyScreen />} />
        <Route path="/accessibility" element={<AccessibilityScreen />} />
      </Routes>
      <Footer />
      <Toaster />
      <DevPreview />
    </AvatarProvider>
    </AuthProvider>
  );
}
