import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';


interface FirstTimeUserWrapperProps {
  children: React.ReactNode;
}

export function FirstTimeUserWrapper({ children }: FirstTimeUserWrapperProps) {
  const { user, profile, loading } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && profile) {
      // Check if this is a first-time user (no profile or specific flag)
      const isFirstTimeUser = !profile.onboarding_completed;
      
      if (isFirstTimeUser) {
        setShowWelcome(true);
      }
    }
  }, [user, profile, loading]);

  const handleGetStarted = async () => {
    setShowWelcome(false);
    
    // Navigate directly to onboarding for first-time users
    navigate('/onboarding');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (showWelcome && user) {
    // Redirect directly to onboarding instead of showing welcome page
    handleGetStarted();
    return null;
  }

  return <>{children}</>;
} 