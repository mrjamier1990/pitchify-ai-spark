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


            <Route path="/onboarding" element={<OnboardingFlow onComplete={() => {}} userEmail="demo@demo.com" userId="demo-user-id" />} />
            <Route path="/profile/personal" element={<PersonalProfilePage onNavigate={() => {}} />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
