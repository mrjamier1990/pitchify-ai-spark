import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Star, MessageCircle, Heart } from "lucide-react";
import { PageType } from "../MainApp";
import profile1 from "@/assets/profile1.jpg";
import profile2 from "@/assets/profile2.jpg";
import profile3 from "@/assets/profile3.jpg";
import profile4 from "@/assets/profile4.jpg";

interface MatchesPageProps {
  onNavigate: (page: PageType) => void;
}

const mockMatches = [
  {
    id: "1",
    name: "Sarah Chen",
    title: "CEO & Founder",
    company: "TechFlow AI",
    image: profile1,
    isSuper: true,
    lastMessage: "Excited to discuss our AI platform!",
    timestamp: "2h ago"
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    title: "Managing Partner",
    company: "Venture Capital Group",
    image: profile2,
    isSuper: false,
    lastMessage: "Would love to schedule a call",
    timestamp: "1d ago"
  },
  {
    id: "3",
    name: "Emma Thompson",
    title: "Co-Founder & CTO",
    company: "GreenTech Solutions",
    image: profile3,
    isSuper: false,
    lastMessage: "Thanks for the match!",
    timestamp: "2d ago"
  },
  {
    id: "4",
    name: "David Kim",
    title: "Startup Founder",
    company: "HealthTech Innovations",
    image: profile4,
    isSuper: true,
    lastMessage: "Let's connect on our healthcare vision",
    timestamp: "3d ago"
  }
];

export function MatchesPage({ onNavigate }: MatchesPageProps) {
  return (
    <div className="h-full bg-gradient-to-br from-[#1a1a1d] via-[#131315] to-[#0a0a0c] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigate("swipe")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-foreground">Matches</h1>
        <div className="w-10"></div>
      </header>

      {/* Matches Grid */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Your Connections</h2>
          <p className="text-muted-foreground">Start meaningful conversations with your matches</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {mockMatches.map((match) => (
            <Card key={match.id} className="p-4 border-border transition-colors duration-300">
              <div className="flex items-center gap-4">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                    <img 
                      src={match.image} 
                      alt={match.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {match.isSuper && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </div>

                {/* Match Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{match.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{match.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{match.company}</p>
                  
                  {match.lastMessage && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground truncate">"{match.lastMessage}"</p>
                      <p className="text-xs text-muted-foreground mt-1">{match.timestamp}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <Button
                    variant="cta"
                    size="sm"
                    className="px-4 py-2 rounded-xl"
                    onClick={() => onNavigate("messages")}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                  <Button
                    variant="glass"
                    size="sm"
                    className="px-4 py-2 rounded-xl"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {mockMatches.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No matches yet</h3>
            <p className="text-muted-foreground mb-6">Start swiping to find your perfect connections</p>
            <Button 
              variant="premium" 
              onClick={() => onNavigate("swipe")}
              className="px-8"
            >
              Start Swiping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}