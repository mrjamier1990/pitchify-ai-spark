import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Video, MapPin, Briefcase, Star, Heart, MessageCircle, Calendar, User } from "lucide-react";

interface Profile {
  id: string;
  name: string;
  age: number;
  title: string;
  company: string;
  location: string;
  type: "entrepreneur" | "investor";
  image: string;
  bio: string;
  industry: string;
  fundingStage?: string;
  investmentRange?: string;
}

interface ProfileDetailPageProps {
  profile: Profile;
  onBack: () => void;
}

export function ProfileDetailPage({ profile, onBack }: ProfileDetailPageProps) {
  return (
    <div className="h-screen bg-gradient-to-br from-[#1a1a1d] via-[#131315] to-[#0a0a0c] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm relative z-10">
        <button
          type="button"
          className="font-light text-base rounded-full px-4 py-2 text-primary bg-transparent border border-primary transition-all duration-300 hover:bg-primary/10 focus:bg-primary/10"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          onClick={onBack}
        >
          Back
        </button>
        <h1 className="text-xl font-bold text-foreground">{profile.name}</h1>
        <div className="w-10"></div>
      </header>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero Video Section */}
        <div className="relative h-72 bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
          <video
            src={profile.image}
            controls
            className="w-full h-full object-cover"
            poster={profile.image}
          />
          
          {/* Type Badge */}
          <div className="absolute top-6 left-6">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md border ${
              profile.type === "entrepreneur" 
                ? "bg-primary/90 text-primary-foreground border-primary/30"
                : "bg-accent/90 text-accent-foreground border-accent/30"
            } shadow-lg`}>
              {profile.type === "entrepreneur" ? "Entrepreneur" : "Investor"}
            </span>
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
            <Button variant="premium" size="lg" className="rounded-full shadow-2xl transform hover:scale-110">
              <Play className="w-10 h-10 ml-1" />
            </Button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-6 py-5 space-y-6">
          {/* Basic Info */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              {profile.name}, {profile.age}
            </h2>
            <div className="space-y-1">
              <p className="text-xl font-semibold text-foreground">{profile.title}</p>
              <p className="text-lg text-primary font-medium">{profile.company}</p>
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2 bg-muted/30 px-3 py-2 rounded-full">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{profile.location}</span>
              </div>
              <div className="flex items-center gap-2 bg-muted/30 px-3 py-2 rounded-full">
                <Briefcase className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{profile.industry}</span>
              </div>
            </div>
          </div>

          {/* Funding/Investment Info */}
          {profile.type === "entrepreneur" && profile.fundingStage && (
            <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Funding Stage</h3>
              </div>
              <p className="text-lg font-semibold text-primary">{profile.fundingStage}</p>
            </Card>
          )}

          {profile.type === "investor" && profile.investmentRange && (
            <Card className="p-6 bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Investment Range</h3>
              </div>
              <p className="text-lg font-semibold text-accent">{profile.investmentRange}</p>
            </Card>
          )}

          {/* About Section */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-xl rounded-2xl">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              About
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">{profile.bio}</p>
          </Card>

          {/* Videos Section */}
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Videos</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/10 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">About Me</p>
                    <p className="text-sm text-muted-foreground">2:15 duration</p>
                  </div>
                </div>
                <Button variant="glass" size="sm">
                  <Play className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/10 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {profile.type === "entrepreneur" ? "Pitch Video" : "Investment Focus"}
                    </p>
                    <p className="text-sm text-muted-foreground">1:45 duration</p>
                  </div>
                </div>
                <Button variant="glass" size="sm">
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 px-6 py-4 bg-background/95 backdrop-blur-md border-t border-border">
          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 font-light text-base rounded-full px-4 py-2 text-primary bg-transparent border border-primary transition-all duration-300 hover:bg-primary/10 focus:bg-primary/10"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Message
            </button>
            <button
              type="button"
              className="flex-1 font-light text-base rounded-full px-4 py-2 text-white bg-transparent transition-all duration-300 shadow-none hover:bg-[#1ABC9C11] hover:backdrop-blur-sm hover:shadow-[0_0_24px_0_#1ABC9C22] focus:bg-[#1ABC9C11] focus:backdrop-blur-sm focus:shadow-[0_0_24px_0_#1ABC9C22]"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Schedule Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}