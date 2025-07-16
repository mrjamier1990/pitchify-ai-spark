import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { MainApp } from "@/components/MainApp";
import { AuthPage } from "@/components/pages/AuthPage";
import { OnboardingFlow } from "@/components/pages/OnboardingFlow";

const Index = () => {
  const { user, loading, needsOnboarding, setNeedsOnboarding } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  if (needsOnboarding) {
    return (
      <OnboardingFlow
        onComplete={() => setNeedsOnboarding(false)}
        userEmail={user.email || ''}
        userId={user.id}
      />
    );
  }

  return <MainApp />;
};

export default Index;
