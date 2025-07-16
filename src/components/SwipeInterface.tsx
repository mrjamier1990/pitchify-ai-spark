import { useState } from "react";
import { SwipeCard } from "./SwipeCard";
import { Button } from "@/components/ui/button";
import { Heart, X, Star, MessageCircle, User, Play } from "lucide-react";
import profile1 from "@/assets/profile1.jpg";
import profile2 from "@/assets/profile2.jpg";
import profile3 from "@/assets/profile3.jpg";
import profile4 from "@/assets/profile4.jpg";

// Mock profiles data
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

export function SwipeInterface() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState(0);

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
      <header className="flex items-center justify-between p-3 sm:p-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <Button variant="ghost" size="icon" className="w-9 h-9 sm:w-10 sm:h-10">
          <User className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-lg opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-primary rounded-lg w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground ml-0.5" />
            </div>
          </div>
          <span className="text-lg sm:text-xl font-bold text-foreground">Pitchify</span>
        </div>
        
        <Button variant="ghost" size="icon" className="relative w-9 h-9 sm:w-10 sm:h-10">
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          {matches > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
              {matches}
            </span>
          )}
        </Button>
      </header>

      {/* Card Stack */}
      <div className="flex-1 relative overflow-hidden">
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
          style={{ zIndex: 1 }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 p-4 sm:p-6 bg-background/90 backdrop-blur-md border-t border-border/50">
        <Button
          variant="glass"
          size="lg"
          className="flex-1 sm:flex-none px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-destructive/10 backdrop-blur-md border border-destructive/20 text-destructive hover:bg-destructive/20 hover:border-destructive/40 hover:text-destructive-foreground hover:shadow-glow transform hover:scale-105 hover:translate-y-[-3px] transition-all duration-300 group sm:min-w-[120px] max-w-[140px]"
          onClick={() => handleButtonAction("pass")}
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-medium text-sm sm:text-base">I'm Out</span>
        </Button>
        
        <Button
          variant="premium"
          size="xl"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-primary text-primary-foreground hover:shadow-3d transform hover:scale-110 hover:translate-y-[-4px] transition-all duration-300 group relative overflow-hidden shadow-premium"
          onClick={() => handleButtonAction("superlike")}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-glow/40 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-0 group-hover:opacity-75"></div>
          <Star className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
        </Button>
        
        <Button
          variant="cta"
          size="lg"
          className="flex-1 sm:flex-none px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-accent/90 backdrop-blur-md border border-accent/30 text-accent-foreground hover:bg-accent hover:border-accent/50 hover:shadow-3d transform hover:scale-105 hover:translate-y-[-3px] transition-all duration-300 group sm:min-w-[120px] max-w-[140px]"
          onClick={() => handleButtonAction("like")}
        >
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 group-hover:scale-110 group-hover:text-red-300 transition-all duration-300" />
          <span className="font-medium text-sm sm:text-base">I'm In</span>
        </Button>
      </div>
    </div>
  );
}