import { useState, useRef } from "react";
import { SwipeCard } from "./SwipeCard";
import { Button } from "@/components/ui/button";
import { Heart, X, Star, MessageCircle, User, Play, Filter, Settings } from "lucide-react";
import investifySymbol from "@/assets/investify-blended.png";
import { PageType } from "./MainApp";
import { ProfileDetailPage } from "./ProfileDetailPage";
import profile1 from "@/assets/profile1.jpg";
import profile2 from "@/assets/profile2.jpg";
import profile3 from "@/assets/profile3.jpg";
import profile4 from "@/assets/profile4.jpg";

interface SwipeInterfaceProps {
  onNavigate?: (page: PageType) => void;
}
const mockProfiles = [
  {
    id: "1",
    name: "Sarah Chen",
    age: 28,
    title: "CEO & Founder",
    company: "TechFlow AI",
    location: "San Francisco, CA",
    type: "entrepreneur" as const,
    image: profile1,
    bio: "Building the future of AI-powered workflow automation. Looking for Series A funding to scale our team and expand market reach.",
    industry: "AI/Machine Learning",
    fundingStage: "Series A ($2-5M)",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    age: 45,
    title: "Managing Partner",
    company: "Venture Capital Group",
    location: "New York, NY",
    type: "investor" as const,
    image: profile2,
    bio: "20+ years investing in early-stage startups. Focus on fintech, AI, and healthcare. Looking for passionate founders with clear vision.",
    industry: "Venture Capital",
    investmentRange: "$500K - $10M",
  },
  {
    id: "3",
    name: "Emma Thompson",
    age: 31,
    title: "Co-Founder & CTO",
    company: "GreenTech Solutions",
    location: "Austin, TX",
    type: "entrepreneur" as const,
    image: profile3,
    bio: "Revolutionizing renewable energy storage with breakthrough battery technology. MIT PhD, 15 patents filed.",
    industry: "CleanTech",
    fundingStage: "Seed ($500K-2M)",
  },
  {
    id: "4",
    name: "David Kim",
    age: 35,
    title: "Startup Founder",
    company: "HealthTech Innovations",
    location: "Seattle, WA",
    type: "entrepreneur" as const,
    image: profile4,
    bio: "Former Google engineer building the next generation of telemedicine platforms. Seeking strategic partnerships and growth capital.",
    industry: "HealthTech",
    fundingStage: "Series B ($5-15M)",
  },
];

export function SwipeInterface({ onNavigate }: SwipeInterfaceProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleSwipe = (direction: "left" | "right" | "up") => {
    if (direction === "right" || direction === "up") {
      setMatches(prev => prev + 1);
    }
    
    setCurrentIndex(prev => prev + 1);
  };

  const swipeCardRef = useRef<any>(null);
  const handleButtonAction = (action: "pass" | "like" | "superlike") => {
    if (action === "like") {
      if (swipeCardRef.current && swipeCardRef.current.swipeRight) {
        swipeCardRef.current.swipeRight();
        setTimeout(() => {
          setMatches(prev => prev + 1);
          setCurrentIndex(prev => prev + 1);
        }, 320);
        return;
      }
    }
    if (action === "pass") {
      if (swipeCardRef.current && swipeCardRef.current.swipeLeft) {
        swipeCardRef.current.swipeLeft();
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
        }, 320);
        return;
      }
    }
    if (action === "superlike") {
      if (swipeCardRef.current && swipeCardRef.current.swipeUp) {
        swipeCardRef.current.swipeUp();
        setTimeout(() => {
          setMatches(prev => prev + 1);
          setCurrentIndex(prev => prev + 1);
        }, 320);
        return;
      }
    }
    if (action === "like" || action === "superlike") {
      setMatches(prev => prev + 1);
    }
    setCurrentIndex(prev => prev + 1);
  };

  const currentProfile = mockProfiles[currentIndex % mockProfiles.length];
  const nextProfile = mockProfiles[(currentIndex + 1) % mockProfiles.length];

  // Show detailed profile if selected
  if (selectedProfile) {
    const profile = mockProfiles.find(p => p.id === selectedProfile);
    if (profile) {
      return (
        <ProfileDetailPage 
          profile={profile} 
          onBack={() => setSelectedProfile(null)} 
        />
      );
    }
  }

  if (currentIndex >= mockProfiles.length * 2) {
    return (
      <div className="h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-primary rounded-full w-20 h-20 flex items-center justify-center">
              <Play className="w-10 h-10 text-primary-foreground ml-1" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">You're all caught up!</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-4">Check back later for more connections</p>
          <p className="text-base sm:text-lg text-primary font-semibold">{matches} matches today</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-screen-sm mx-auto bg-[#18181b] flex flex-col overflow-hidden"
      style={{ minHeight: '100dvh', paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#18181b] border border-[#232326] rounded-xl mx-2 mt-2 shadow-lg">
        <Button 
          variant="glass"
          size="icon"
          className="w-10 h-10 rounded-full transition-all duration-300 shadow-[0_0_24px_0_#1ABC9C22] hover:bg-[#1ABC9C22] hover:shadow-[0_0_32px_8px_rgba(26,188,156,0.25)] hover:border-primary/40 focus:bg-[#1ABC9C22] focus:shadow-[0_0_32px_8px_rgba(26,188,156,0.25)]"
          onClick={() => onNavigate?.("profile")}
        >
          <User className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-3">
          <img src="/pitchflic-logo.png" alt="PitchFlic Logo" className="w-10 h-10" style={{ objectFit: 'contain', display: 'block' }} />
          <span className="text-2xl md:text-3xl font-bold text-primary" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>PitchFlic</span>
        </div>
        
        <Button 
          variant="glass"
          size="icon"
          className="relative w-10 h-10 rounded-full transition-all duration-300 shadow-[0_0_24px_0_#1ABC9C22] hover:bg-[#1ABC9C22] hover:shadow-[0_0_32px_8px_rgba(26,188,156,0.25)] hover:border-primary/40 focus:bg-[#1ABC9C22] focus:shadow-[0_0_32px_8px_rgba(26,188,156,0.25)]"
          onClick={() => onNavigate?.("messages")}
        >
          <MessageCircle className="w-5 h-5" />
          {matches > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-gradient-to-br from-[#1ABC9C] to-[#14575c] text-white text-sm rounded-full flex items-center justify-center font-extrabold border-2 border-white">
              {matches}
            </span>
          )}
        </Button>
      </header>

      {/* Card Stack */}
      <div className="flex-1 min-h-0 flex flex-col justify-center items-center relative overflow-hidden px-2 sm:px-4 pt-2 sm:pt-4">
        {/* Next card (behind) */}
        <SwipeCard
          key={`next-${currentIndex}`}
          profile={nextProfile}
          onSwipe={() => {}}
          style={{
            transform: 'scale(0.95)',
            zIndex: 0,
          }}
        />
        
        {/* Current card (front) */}
        <SwipeCard
          key={`current-${currentIndex}`}
          ref={swipeCardRef}
          profile={currentProfile}
          onSwipe={handleSwipe}
          onProfileClick={() => setSelectedProfile(currentProfile.id)}
          style={{ zIndex: 1 }}
        />
      </div>

      {/* Enhanced Action Buttons with Smooth Animations */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 px-2 sm:px-6 py-3 sm:py-5 bg-[#18181b] border border-[#232326] rounded-xl mx-2 mb-2 shadow-lg flex-shrink-0">
        {/* I'm Out (Pass) Button */}
        <Button
          variant="glass"
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500/70 via-rose-600/80 to-pink-500/80 backdrop-blur-md border border-rose-400/60 text-red-100 hover:from-red-600/90 hover:to-pink-500/90 hover:border-pink-400/80 hover:text-white hover:shadow-[0_0_40px_rgba(244,63,94,0.5)] transform hover:scale-110 hover:translate-y-[-4px] transition-all duration-500 group relative overflow-hidden"
          onClick={() => handleButtonAction("pass")}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-400/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <X className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300 relative z-10" strokeWidth={4} />
        </Button>
        {/* Super Like Button (Purple Star) */}
        <Button
          variant="glass"
          size="lg"
          className="w-24 h-14 rounded-full bg-gradient-to-r from-purple-500/80 via-fuchsia-600/80 to-fuchsia-500/90 backdrop-blur-md border border-fuchsia-500/70 text-fuchsia-100 hover:from-purple-600/90 hover:to-fuchsia-500/100 hover:border-fuchsia-400/80 hover:text-white hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transform hover:scale-110 hover:translate-y-[-4px] transition-all duration-500 group relative overflow-hidden"
          onClick={() => handleButtonAction("superlike")}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-fuchsia-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Star className="w-7 h-7 group-hover:scale-110 transition-transform duration-300 relative z-10 stroke-2 fill-current" style={{ color: '#FFFFF0' }} />
        </Button>
        {/* I'm In (Like) Button (Green Heart) */}
        <Button
          variant="glass"
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#1ABC9C]/80 via-[#10B981]/80 to-[#1ABC9C]/90 backdrop-blur-md border border-[#1ABC9C]/70 text-[#10B981] hover:from-[#10B981]/90 hover:to-[#1ABC9C]/100 hover:border-[#10B981]/80 hover:text-white hover:shadow-[0_0_40px_rgba(26,188,156,0.5)] transform hover:scale-110 hover:translate-y-[-4px] transition-all duration-500 group relative overflow-hidden"
          onClick={() => handleButtonAction("like")}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1ABC9C]/40 to-[#10B981]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Heart className="w-7 h-7 group-hover:scale-110 transition-transform duration-300 relative z-10 stroke-2 fill-current" style={{ color: '#FFFFF0' }} />
        </Button>
      </div>
    </div>
  );
}