import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Video, MapPin, Briefcase, Star, Heart, MessageCircle, Calendar } from "lucide-react";

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
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur-sm relative z-10">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-foreground">{profile.name}</h1>
        <div className="w-10"></div>
      </header>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero Video Section */}
        <div className="relative h-80 sm:h-96 bg-muted overflow-hidden">
          <video
            src={profile.image}
            controls
            className="w-full h-full object-cover"
            poster={profile.image}
          />
          
          {/* Type Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${
              profile.type === "entrepreneur" 
                ? "bg-primary/90 text-primary-foreground"
                : "bg-accent/90 text-accent-foreground"
            }`}>
              {profile.type === "entrepreneur" ? "Entrepreneur" : "Investor"}
            </span>
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <Button variant="glass" size="lg" className="rounded-full">
              <Play className="w-8 h-8" />
            </Button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {profile.name}, {profile.age}
            </h2>
            <p className="text-xl text-muted-foreground mb-1">{profile.title}</p>
            <p className="text-lg text-muted-foreground mb-4">{profile.company}</p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>{profile.industry}</span>
              </div>
            </div>
          </div>

          {/* Funding/Investment Info */}
          {profile.type === "entrepreneur" && profile.fundingStage && (
            <Card className="p-4 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-2">Funding Stage</h3>
              <p className="text-muted-foreground">{profile.fundingStage}</p>
            </Card>
          )}

          {profile.type === "investor" && profile.investmentRange && (
            <Card className="p-4 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-2">Investment Range</h3>
              <p className="text-muted-foreground">{profile.investmentRange}</p>
            </Card>
          )}

          {/* About Section */}
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">About</h3>
            <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
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
        <div className="sticky bottom-0 p-6 bg-background/95 backdrop-blur-md border-t border-border">
          <div className="flex gap-4">
            <Button variant="glass" className="flex-1" size="lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Message
            </Button>
            <Button variant="premium" className="flex-1" size="lg">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}