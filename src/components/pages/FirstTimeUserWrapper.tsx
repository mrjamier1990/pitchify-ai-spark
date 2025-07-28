import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import { WelcomePage } from './WelcomePage';

interface FirstTimeUserWrapperProps {
  children: React.ReactNode;
}

export function FirstTimeUserWrapper({ children }: FirstTimeUserWrapperProps) {
  const { user, profile, loading } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && profile) {
      // Check if this is a first-time user (no profile or specific flag)
      const isFirstTimeUser = !profile.onboarding_completed || !profile.has_seen_welcome;
      
      if (isFirstTimeUser && !hasSeenWelcome) {
        setShowWelcome(true);
      }
    }
  }, [user, profile, loading, hasSeenWelcome]);

  const handleGetStarted = async () => {
    setShowWelcome(false);
    setHasSeenWelcome(true);
    
    // In a real app, you would update the user's profile to mark that they've seen the welcome page
    // await updateUserProfile({ has_seen_welcome: true });
    
    // Navigate to onboarding or main app
    if (profile?.onboarding_completed) {
      navigate('/'); // Main app
    } else {
      navigate('/onboarding');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (showWelcome && user) {
    return (
      <WelcomePage 
        onGetStarted={handleGetStarted}
        userName={user.user_metadata?.full_name || user.email?.split('@')[0]}
      />
    );
  }

  return <>{children}</>;
} 