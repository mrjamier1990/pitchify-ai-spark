import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Edit3, Settings, Star, Play, Camera, Link } from "lucide-react";
import { PageType } from "../MainApp";
import premiumLogo from "@/assets/pitchify-logo-premium.png";

interface ProfilePageProps {
  onNavigate: (page: PageType) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigate("swipe")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-foreground">My Profile</h1>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigate("settings")}
        >
          <Settings className="w-5 h-5" />
        </Button>
      </header>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Profile Header */}
        <Card className="p-6 bg-gradient-card border-border">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-muted overflow-hidden">
                <img 
                  src={premiumLogo} 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button 
                variant="glass" 
                size="icon"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-1">Alex Johnson</h2>
            <p className="text-muted-foreground mb-2">Entrepreneur</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-4 h-4 text-primary fill-current" />
              <span className="text-sm text-primary font-medium">Premium Member</span>
            </div>
            
            <Button variant="glass" className="mb-4">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Videos Section */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">My Videos</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/10 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">About Me Video</p>
                  <p className="text-sm text-muted-foreground">2:15 duration</p>
                </div>
              </div>
              <Button variant="glass" size="sm">
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/10 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Pitch Video</p>
                  <p className="text-sm text-muted-foreground">1:45 duration</p>
                </div>
              </div>
              <Button variant="glass" size="sm">
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button variant="premium" className="w-full mt-4">
            <Camera className="w-4 h-4 mr-2" />
            Record New Video
          </Button>
        </Card>

        {/* Links & Documents */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Links & Documents</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
              <div className="flex items-center gap-3">
                <Link className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Pitch Deck</span>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
              <div className="flex items-center gap-3">
                <Link className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Website</span>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
              <div className="flex items-center gap-3">
                <Link className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">LinkedIn</span>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          </div>

          <Button variant="glass" className="w-full mt-4">
            <Link className="w-4 h-4 mr-2" />
            Add Link
          </Button>
        </Card>

        {/* Stats */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Profile Stats</h3>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">127</p>
              <p className="text-sm text-muted-foreground">Profile Views</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">23</p>
              <p className="text-sm text-muted-foreground">Matches</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">8.5</p>
              <p className="text-sm text-muted-foreground">Pitch Score</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}