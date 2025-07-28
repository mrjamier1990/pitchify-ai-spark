import { useState } from 'react';
import { SwipeTutorial } from './SwipeTutorial';
import { useNavigate } from 'react-router-dom';

export function SwipeTutorialDemo() {
  const [showTutorial, setShowTutorial] = useState(true);
  const navigate = useNavigate();

  const handleComplete = () => {
    setShowTutorial(false);
    // In a real app, this would navigate to the main app or next onboarding step
    setTimeout(() => {
      alert('Tutorial completed! In a real app, this would navigate to the main app.');
      navigate('/welcome');
    }, 1000);
  };

  const handleSkip = () => {
    setShowTutorial(false);
    setTimeout(() => {
      alert('Tutorial skipped! In a real app, this would navigate to the main app.');
      navigate('/welcome');
    }, 500);
  };

  if (showTutorial) {
    return (
      <SwipeTutorial 
        onComplete={handleComplete}
        onSkip={handleSkip}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Swipe Tutorial Demo</h1>
        <p className="mb-4">The tutorial has been completed!</p>
        <button 
          onClick={() => setShowTutorial(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          Show Tutorial Again
        </button>
      </div>
    </div>
  );
} 