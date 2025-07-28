import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthPage } from "@/components/pages/AuthPage";
import { OnboardingFlow } from "@/components/pages/OnboardingFlow";
import { PersonalProfilePage } from "@/components/pages/PersonalProfilePage";
import { WelcomePage } from "@/components/pages/WelcomePage";
import { WelcomeDemo } from "@/components/pages/WelcomeDemo";
import { InteractiveDemo } from "@/components/pages/InteractiveDemo";
import { SwipeTutorial } from "@/components/pages/SwipeTutorial";
import { SwipeTutorialDemo } from "@/components/pages/SwipeTutorialDemo";
import { PersonalProfilePageV2 } from "@/components/pages/PersonalProfilePageV2";
import { ProfileDemo } from "@/components/pages/ProfileDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/welcome" element={<WelcomePage onGetStarted={() => {}} />} />
            <Route path="/welcome-demo" element={<WelcomeDemo />} />
            <Route path="/interactive-demo" element={<InteractiveDemo />} />
            <Route path="/swipe-tutorial" element={<SwipeTutorial onComplete={() => {}} />} />
            <Route path="/swipe-tutorial-demo" element={<SwipeTutorialDemo />} />
            <Route path="/profile-demo" element={<ProfileDemo />} />
            <Route path="/onboarding" element={<OnboardingFlow onComplete={() => {}} userEmail="demo@demo.com" userId="demo-user-id" />} />
            <Route path="/profile/personal" element={<PersonalProfilePage onNavigate={() => {}} />} />
            <Route path="/profile/personal-v2" element={<PersonalProfilePageV2 onNavigate={() => {}} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
