import { useState } from 'react';
import { WelcomePage } from './WelcomePage';
import { useNavigate } from 'react-router-dom';

export function WelcomeDemo() {
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // In a real app, this would navigate to the onboarding or main app
    console.log('User clicked Get Started!');
    setShowWelcome(false);
    
    // Simulate navigation to onboarding
    setTimeout(() => {
      alert('Welcome page completed! In a real app, this would navigate to onboarding or the main app.');
      navigate('/onboarding');
    }, 1000);
  };

  if (showWelcome) {
    return (
      <WelcomePage 
        onGetStarted={handleGetStarted}
        userName="John Doe" // Example user name
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome Page Demo</h1>
        <p className="mb-4">The welcome page has been completed!</p>
        <button 
          onClick={() => setShowWelcome(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          Show Welcome Page Again
        </button>
      </div>
    </div>
  );
} 