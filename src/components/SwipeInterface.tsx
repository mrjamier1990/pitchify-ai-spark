import { useState } from "react";
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

  const handleButtonAction = (action: "pass" | "like" | "superlike") => {
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
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-10 h-10 rounded-full"
          onClick={() => onNavigate?.("profile")}
        >
          <User className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-3">
          <img src={investifySymbol} alt="INVESTIFY" className="w-9 h-9" />
          <span className="text-xl font-montserrat font-bold text-foreground tracking-wide">INVESTIFY</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative w-10 h-10 rounded-full"
          onClick={() => onNavigate?.("messages")}
        >
          <MessageCircle className="w-5 h-5" />
          {matches > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
              {matches}
            </span>
          )}
        </Button>
      </header>

      {/* Card Stack */}
      <div className="flex-1 relative overflow-hidden px-4 pt-4">
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
          profile={currentProfile}
          onSwipe={handleSwipe}
          onProfileClick={() => setSelectedProfile(currentProfile.id)}
          style={{ zIndex: 1 }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-8 px-6 py-5 bg-background/90 backdrop-blur-md">
        <Button
          variant="glass"
          size="lg" 
          className="w-14 h-14 rounded-full bg-red-500/20 backdrop-blur-md border border-red-400/30 text-red-300 hover:bg-red-500/30 hover:border-red-400/50 hover:text-red-100 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transform hover:scale-105 hover:translate-y-[-2px] transition-all duration-300 group relative overflow-hidden"
          onClick={() => handleButtonAction("pass")}
        >
          <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <X className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300 relative z-10 stroke-2" />
        </Button>
        
        <Button
          variant="premium"
          size="xl"
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-600/30 backdrop-blur-md border border-blue-400/40 text-blue-200 hover:from-blue-500/50 hover:to-purple-600/50 hover:border-blue-400/60 hover:text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transform hover:scale-110 hover:translate-y-[-3px] transition-all duration-300 group relative overflow-hidden"
          onClick={() => handleButtonAction("superlike")}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-ping opacity-0 group-hover:opacity-75"></div>
          <Star className="w-8 h-8 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 relative z-10 fill-current" />
        </Button>
        
        <Button
          variant="glass"
          size="lg"
          className="w-14 h-14 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/30 hover:border-emerald-400/50 hover:text-emerald-100 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transform hover:scale-105 hover:translate-y-[-2px] transition-all duration-300 group relative overflow-hidden"
          onClick={() => handleButtonAction("like")}
        >
          <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Heart className="w-7 h-7 group-hover:scale-110 transition-transform duration-300 relative z-10 stroke-2 fill-current" />
        </Button>
      </div>
    </div>
  );
}