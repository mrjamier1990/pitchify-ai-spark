import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Users, MessageCircle, Heart, Settings, ThumbsUp, ThumbsDown, ArrowLeft, ArrowRight as ArrowRightIcon, Play, HelpCircle } from 'lucide-react';
import AuroraBackground from '../ui/aurora-background';
import { useNavigate } from 'react-router-dom';

interface WelcomePageProps {
  onGetStarted: () => void;
  userName?: string;
}

export function WelcomePage({ onGetStarted, userName }: WelcomePageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentDemoCard, setCurrentDemoCard] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const demoCards = [
    {
      id: 1,
      title: "TechFlow AI",
      subtitle: "AI-Powered Workflow Automation",
      description: "Revolutionary AI platform that automates complex business workflows, reducing manual tasks by 80% and increasing productivity across organizations.",
      funding: "$2.5M raised",
      stage: "Series A",
      industry: "Artificial Intelligence",
      image: "🤖"
    },
    {
      id: 2,
      title: "GreenCharge",
      subtitle: "Sustainable Energy Solutions",
      description: "Next-generation battery technology for electric vehicles, offering 3x faster charging and 50% longer battery life compared to current solutions.",
      funding: "$1.8M raised",
      stage: "Seed",
      industry: "Clean Energy",
      image: "⚡"
    },
    {
      id: 3,
      title: "HealthSync",
      subtitle: "Digital Health Platform",
      description: "Comprehensive health monitoring platform that connects patients, doctors, and healthcare providers in real-time for better care coordination.",
      funding: "$3.2M raised",
      stage: "Series A",
      industry: "Healthcare",
      image: "🏥"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentDemoCard((prev) => (prev + 1) % demoCards.length);
          setIsAnimating(false);
        }, 300);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isAnimating, demoCards.length]);

  const handleGetStarted = () => {
    setIsLoading(true);
    // Simulate a brief loading state
    setTimeout(() => {
      onGetStarted();
    }, 500);
  };

  return (
    <AuroraBackground>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-y-3 mb-6">
            <h1
              className="text-6xl font-extrabold text-white tracking-tight transition-transform duration-300"
              style={{ letterSpacing: '-0.02em', willChange: 'transform, color', fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              PitchFlic
            </h1>
            <div className="text-sm font-light tracking-wide text-center shimmer-once" style={{ color: '#fff' }}>
              Flic <span className="mx-1">|</span> Pitch <span className="mx-1">|</span> Invest
            </div>
          </div>
          
          {userName && (
            <div className="text-xl text-white/90 mb-4">
              Welcome, <span className="font-semibold text-white">{userName}</span>! 👋
            </div>
          )}
          
          <h2 className="text-2xl font-bold text-white mb-2">
            Your Journey Starts Here
          </h2>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            Discover, connect, and pitch your way to success in the world of entrepreneurship
          </p>
        </div>

        {/* Features Section */}
        <div className="w-full max-w-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature 1: Discover */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Discover</h3>
              </div>
              <p className="text-white/80 text-sm">
                Swipe through innovative startups and find the perfect investment opportunities that match your interests.
              </p>
            </div>

            {/* Feature 2: Connect */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Connect</h3>
              </div>
              <p className="text-white/80 text-sm">
                Build meaningful connections with founders and fellow investors through our intelligent matching system.
              </p>
            </div>

            {/* Feature 3: Pitch */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Pitch</h3>
              </div>
              <p className="text-white/80 text-sm">
                Present your ideas with confidence using our AI-powered pitch coach and feedback system.
              </p>
            </div>

            {/* Feature 4: Invest */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Invest</h3>
              </div>
              <p className="text-white/80 text-sm">
                Make informed investment decisions with comprehensive startup profiles and market insights.
              </p>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <div className="w-full max-w-4xl mb-8">
          <h3 className="text-xl font-bold text-white text-center mb-6">
            See How It Works
          </h3>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Demo Card */}
            <div className="flex-1 max-w-sm">
              <div className="relative">
                {/* Swipe Left/Right Indicators */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 text-white/60 text-sm">
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="w-4 h-4 text-red-400" />
                    <span>Swipe Left</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Swipe Right</span>
                    <ThumbsUp className="w-4 h-4 text-green-400" />
                  </div>
                </div>

                {/* Demo Card */}
                <div 
                  className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-500 ${
                    isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
                  }`}
                  style={{ minHeight: '400px' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{demoCards[currentDemoCard].image}</div>
                    <div className="text-right">
                      <div className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                        {demoCards[currentDemoCard].stage}
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-1">
                    {demoCards[currentDemoCard].title}
                  </h4>
                  <p className="text-white/80 text-sm mb-3">
                    {demoCards[currentDemoCard].subtitle}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded">
                      {demoCards[currentDemoCard].industry}
                    </div>
                    <div className="text-xs text-green-400 font-semibold">
                      {demoCards[currentDemoCard].funding}
                    </div>
                  </div>
                  
                  <p className="text-white/70 text-sm leading-relaxed">
                    {demoCards[currentDemoCard].description}
                  </p>
                </div>

                {/* Swipe Animation Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className={`absolute top-1/2 left-0 transform -translate-y-1/2 transition-all duration-300 ${
                    isAnimating ? 'opacity-100 translate-x-4' : 'opacity-0 -translate-x-4'
                  }`}>
                    <div className="bg-red-500/20 backdrop-blur-sm rounded-lg px-3 py-2 text-red-400 text-sm font-medium">
                      <ThumbsDown className="w-4 h-4 inline mr-1" />
                      Pass
                    </div>
                  </div>
                  <div className={`absolute top-1/2 right-0 transform -translate-y-1/2 transition-all duration-300 ${
                    isAnimating ? 'opacity-100 -translate-x-4' : 'opacity-0 translate-x-4'
                  }`}>
                    <div className="bg-green-500/20 backdrop-blur-sm rounded-lg px-3 py-2 text-green-400 text-sm font-medium">
                      <ThumbsUp className="w-4 h-4 inline mr-1" />
                      Like
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Instructions */}
            <div className="flex-1 max-w-md">
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5 text-green-400" />
                    Swipe Right to Like
                  </h4>
                  <p className="text-white/70 text-sm">
                    When you see a startup that interests you, swipe right to express interest and potentially match with the founders.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <ThumbsDown className="w-5 h-5 text-red-400" />
                    Swipe Left to Pass
                  </h4>
                  <p className="text-white/70 text-sm">
                    If a startup doesn't match your investment criteria or interests, swipe left to move to the next opportunity.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                    Start Conversations
                  </h4>
                  <p className="text-white/70 text-sm">
                    When you match with a startup, you can start conversations, ask questions, and explore investment opportunities together.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Demo Buttons */}
          <div className="text-center mt-8 space-y-4">
            <button
              onClick={() => navigate('/interactive-demo')}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <Play className="w-4 h-4" />
              Try Interactive Demo
            </button>
            
            <button
              onClick={() => navigate('/swipe-tutorial')}
              className="bg-white/5 backdrop-blur-md border border-white/10 text-white/80 px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <HelpCircle className="w-4 h-4" />
              How to Swipe
            </button>
            
            <button
              onClick={() => navigate('/profile-demo')}
              className="bg-white/5 backdrop-blur-md border border-white/10 text-white/80 px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <User className="w-4 h-4" />
              View New Profile Design (Demo)
            </button>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="w-full max-w-2xl mb-8">
          <h3 className="text-xl font-bold text-white text-center mb-6">
            How to Get Started
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Complete Your Profile</h4>
                <p className="text-white/70 text-sm">Set up your investor profile with your interests, experience, and investment preferences.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Start Swiping</h4>
                <p className="text-white/70 text-sm">Browse through startup profiles and swipe right on opportunities that interest you.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Connect & Pitch</h4>
                <p className="text-white/70 text-sm">Match with founders, start conversations, and use our pitch tools to make your case.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Get Started Button */}
        <div className="flex flex-col gap-3 w-full max-w-xs mx-auto items-center">
          <button
            type="button"
            className="aurora-signin-btn w-full"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: '1rem',
              letterSpacing: '0.02em',
              padding: '0.75rem 1.75rem',
              borderRadius: '2rem',
              background: 'rgba(20, 20, 40, 0.18)',
              border: '2px solid transparent',
              color: '#fff',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              position: 'relative',
              zIndex: 2,
              transition: 'background 0.3s, border 0.3s, box-shadow 0.3s, color 0.3s',
              overflow: 'hidden',
            }}
            onClick={handleGetStarted}
            disabled={isLoading}
          >
            <span style={{ position: 'relative', zIndex: 2 }} className="flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <span className="animate-spin">🔄</span>
                  Setting up...
                </>
              ) : (
                <>
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Keyframes for shimmer */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }
        .shimmer-once {
          display: inline-block;
          background: linear-gradient(90deg, #fff 0%, #ff477e 50%, #fff 100%);
          background-size: 400px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 2s linear 1;
        }
      `}</style>
    </AuroraBackground>
  );
} 