import { useState } from "react";
import { SwipeCard } from "./SwipeCard";
import { Button } from "@/components/ui/button";
import { Heart, X, Star, MessageCircle, User, Flame } from "lucide-react";
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
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Flame className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">You're all caught up!</h2>
          <p className="text-muted-foreground mb-4">Check back later for more connections</p>
          <p className="text-lg text-primary font-semibold">{matches} matches today</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <Flame className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold text-foreground">Pitchify</span>
        </div>
        
        <Button variant="ghost" size="icon">
          <MessageCircle className="w-5 h-5" />
          {matches > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
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
      <div className="flex items-center justify-center gap-6 p-6 bg-background/80 backdrop-blur-sm">
        <Button
          variant="glass"
          size="lg"
          className="px-8 py-4 rounded-2xl bg-muted/10 backdrop-blur-md border border-muted/20 text-muted-foreground hover:bg-muted/20 hover:border-muted/40 hover:text-foreground hover:shadow-glow transform hover:scale-105 hover:translate-y-[-3px] transition-all duration-300 group min-w-[120px]"
          onClick={() => handleButtonAction("pass")}
        >
          <X className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-medium">I'm Out</span>
        </Button>
        
        <Button
          variant="premium"
          size="xl"
          className="w-16 h-16 rounded-full bg-gradient-primary text-primary-foreground hover:shadow-3d transform hover:scale-110 hover:translate-y-[-4px] transition-all duration-300 group relative overflow-hidden"
          onClick={() => handleButtonAction("superlike")}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-glow/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          <Star className="w-7 h-7 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
        </Button>
        
        <Button
          variant="cta"
          size="lg"
          className="px-8 py-4 rounded-2xl bg-accent/90 backdrop-blur-md border border-accent/30 text-accent-foreground hover:bg-accent hover:border-accent/50 hover:shadow-3d transform hover:scale-105 hover:translate-y-[-3px] transition-all duration-300 group min-w-[120px]"
          onClick={() => handleButtonAction("like")}
        >
          <Heart className="w-5 h-5 mr-2 group-hover:scale-110 group-hover:text-red-400 transition-all duration-300" />
          <span className="font-medium">I'm In</span>
        </Button>
      </div>
    </div>
  );
}