import { useState, useRef, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DemoCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  funding: string;
  stage: string;
  industry: string;
  image: string;
}

export function InteractiveDemo() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const demoCards: DemoCard[] = [
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
    },
    {
      id: 4,
      title: "EduTech Pro",
      subtitle: "Personalized Learning Platform",
      description: "AI-driven educational platform that adapts to each student's learning style, providing personalized curriculum and real-time feedback.",
      funding: "$1.2M raised",
      stage: "Seed",
      industry: "Education Technology",
      image: "📚"
    },
    {
      id: 5,
      title: "FinFlow",
      subtitle: "Digital Banking Solutions",
      description: "Modern banking platform for small businesses, offering seamless payment processing, expense tracking, and financial analytics.",
      funding: "$4.1M raised",
      stage: "Series A",
      industry: "Financial Technology",
      image: "💳"
    }
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const offset = e.clientX - centerX;
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (Math.abs(dragOffset) > 100) {
      // Swipe threshold met
      if (dragOffset > 0) {
        // Swipe right - like
        setSwipeDirection('right');
        setTimeout(() => {
          setSwipeDirection(null);
          setCurrentCardIndex(prev => (prev + 1) % demoCards.length);
          setDragOffset(0);
        }, 300);
      } else {
        // Swipe left - pass
        setSwipeDirection('left');
        setTimeout(() => {
          setSwipeDirection(null);
          setCurrentCardIndex(prev => (prev + 1) % demoCards.length);
          setDragOffset(0);
        }, 300);
      }
    } else {
      // Reset position
      setDragOffset(0);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const offset = e.touches[0].clientX - centerX;
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    setTimeout(() => {
      setSwipeDirection(null);
      setCurrentCardIndex(prev => (prev + 1) % demoCards.length);
    }, 300);
  };

  const currentCard = demoCards[currentCardIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Interactive Demo</h1>
        <p className="text-white/80 mb-6">Try swiping the cards to see how PitchFlic works!</p>
        
        <div className="flex items-center justify-center gap-4 text-white/60 text-sm mb-4">
          <div className="flex items-center gap-1">
            <ThumbsDown className="w-4 h-4 text-red-400" />
            <span>Swipe Left to Pass</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Swipe Right to Like</span>
            <ThumbsUp className="w-4 h-4 text-green-400" />
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-sm">
        {/* Demo Card */}
        <div
          ref={cardRef}
          className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 cursor-grab active:cursor-grabbing transition-transform duration-200 ${
            isDragging ? 'cursor-grabbing' : ''
          }`}
          style={{
            transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.1}deg)`,
            minHeight: '400px',
            touchAction: 'none'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">{currentCard.image}</div>
            <div className="text-right">
              <div className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                {currentCard.stage}
              </div>
            </div>
          </div>
          
          <h4 className="text-xl font-bold text-white mb-1">
            {currentCard.title}
          </h4>
          <p className="text-white/80 text-sm mb-3">
            {currentCard.subtitle}
          </p>
          
          <div className="space-y-2 mb-4">
            <div className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded">
              {currentCard.industry}
            </div>
            <div className="text-xs text-green-400 font-semibold">
              {currentCard.funding}
            </div>
          </div>
          
          <p className="text-white/70 text-sm leading-relaxed">
            {currentCard.description}
          </p>
        </div>

        {/* Swipe Animation Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/2 left-0 transform -translate-y-1/2 transition-all duration-300 ${
            swipeDirection === 'left' ? 'opacity-100 translate-x-4' : 'opacity-0 -translate-x-4'
          }`}>
            <div className="bg-red-500/20 backdrop-blur-sm rounded-lg px-3 py-2 text-red-400 text-sm font-medium">
              <ThumbsDown className="w-4 h-4 inline mr-1" />
              Pass
            </div>
          </div>
          <div className={`absolute top-1/2 right-0 transform -translate-y-1/2 transition-all duration-300 ${
            swipeDirection === 'right' ? 'opacity-100 -translate-x-4' : 'opacity-0 translate-x-4'
          }`}>
            <div className="bg-green-500/20 backdrop-blur-sm rounded-lg px-3 py-2 text-green-400 text-sm font-medium">
              <ThumbsUp className="w-4 h-4 inline mr-1" />
              Like
            </div>
          </div>
        </div>
      </div>

      {/* Button Controls */}
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={() => handleSwipe('left')}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
        >
          <ThumbsDown className="w-5 h-5" />
          Pass
        </button>
        
        <button
          onClick={() => handleSwipe('right')}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
        >
          <ThumbsUp className="w-5 h-5" />
          Like
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-2 mt-6">
        {demoCards.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentCardIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-8">
        <button
          onClick={() => navigate('/welcome')}
          className="text-white/80 hover:text-white flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Welcome
        </button>
      </div>
    </div>
  );
} 