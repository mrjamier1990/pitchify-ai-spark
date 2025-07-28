import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X, Check, SkipForward, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SwipeTutorialProps {
  onComplete: () => void;
  onSkip?: () => void;
}

export function SwipeTutorial({ onComplete, onSkip }: SwipeTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const steps = [
    {
      title: "How PitchFlic Works",
      subtitle: "Swipe to discover promising startup founders",
      description: "Swipe right if you're interested, left if you're not.",
      cardData: {
        name: "Sarah Chen",
        title: "Founder & CEO",
        company: "TechFlow AI",
        description: "Revolutionary AI platform that automates complex business workflows, reducing manual tasks by 80%.",
        funding: "$2.5M raised",
        stage: "Series A",
        industry: "Artificial Intelligence",
        avatar: "👩‍💼"
      }
    }
  ];

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      navigate('/welcome');
    }
  };

  const handleComplete = () => {
    onComplete();
  };

  // Animate arrows
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500/5 rounded-full blur-xl"></div>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm"
      >
        <SkipForward className="w-4 h-4" />
        Skip
      </button>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {currentStepData.title}
          </h1>
          <p className="text-white/80 text-lg mb-1">
            {currentStepData.subtitle}
          </p>
          <p className="text-white/60 text-sm">
            {currentStepData.description}
          </p>
        </div>

        {/* Phone Mockup */}
        <div className="relative mx-auto mb-8">
          {/* Phone Frame */}
          <div className="relative mx-auto w-80 h-[500px] bg-gray-800 rounded-[3rem] p-3 shadow-2xl border border-gray-700">
            {/* Phone Screen */}
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] overflow-hidden relative">
              {/* Status Bar */}
              <div className="h-8 bg-black/20 flex items-center justify-between px-6 text-white text-xs">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-2 bg-white rounded-sm"></div>
                  <div className="w-1 h-2 bg-white rounded-sm"></div>
                </div>
              </div>

              {/* App Content */}
              <div className="flex-1 p-4 flex flex-col">
                {/* Profile Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex-1 flex flex-col">
                  {/* Avatar and Basic Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{currentStepData.cardData.avatar}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">
                        {currentStepData.cardData.name}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {currentStepData.cardData.title}
                      </p>
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {currentStepData.cardData.company}
                    </h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {currentStepData.cardData.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded inline-block mr-2">
                      {currentStepData.cardData.industry}
                    </div>
                    <div className="text-xs text-green-400 font-semibold">
                      {currentStepData.cardData.funding}
                    </div>
                    <div className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full inline-block">
                      {currentStepData.cardData.stage}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Swipe Arrows */}
            {/* Left Arrow */}
            <div className={`absolute top-1/2 -left-16 transform -translate-y-1/2 transition-all duration-300 ${
              isAnimating ? 'opacity-100 -translate-x-2' : 'opacity-60 translate-x-0'
            }`}>
              <div className="flex flex-col items-center gap-2">
                <div className="bg-red-500/20 backdrop-blur-sm rounded-full p-3 border border-red-400/30">
                  <ArrowLeft className="w-6 h-6 text-red-400" />
                </div>
                <div className="text-center">
                  <div className="text-white font-medium text-sm">Swipe Left</div>
                  <div className="text-red-400 text-xs">I'm Out ❌</div>
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            <div className={`absolute top-1/2 -right-16 transform -translate-y-1/2 transition-all duration-300 ${
              isAnimating ? 'opacity-100 translate-x-2' : 'opacity-60 translate-x-0'
            }`}>
              <div className="flex flex-col items-center gap-2">
                <div className="bg-green-500/20 backdrop-blur-sm rounded-full p-3 border border-green-400/30">
                  <ArrowRight className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-center">
                  <div className="text-white font-medium text-sm">Swipe Right</div>
                  <div className="text-green-400 text-xs">I'm In ✅</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Buttons */}
        <div className="text-center mb-8">
          <p className="text-white/60 text-sm mb-4">Or use buttons below:</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-400 px-6 py-3 rounded-full hover:bg-red-500/30 transition-all duration-300 flex items-center gap-2">
              <X className="w-5 h-5" />
              I'm Out
            </button>
            <button className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-400 px-6 py-3 rounded-full hover:bg-green-500/30 transition-all duration-300 flex items-center gap-2">
              <Check className="w-5 h-5" />
              I'm In
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSkip}
            className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300"
          >
            Skip Tutorial
          </button>
          <button
            onClick={handleComplete}
            className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-medium"
          >
            Get Started
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-white/20 text-6xl animate-pulse">
        💼
      </div>
      <div className="absolute bottom-20 right-10 text-white/20 text-6xl animate-pulse" style={{ animationDelay: '1s' }}>
        💡
      </div>
    </div>
  );
} 