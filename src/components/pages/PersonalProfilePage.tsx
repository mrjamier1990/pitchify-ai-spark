import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Edit3, Video, Plus, Settings, Star, Crown, Zap } from "lucide-react";
import { PageType } from "../MainApp";
import profile1 from "@/assets/profile1.jpg";

interface PersonalProfilePageProps {
  onNavigate: (page: PageType) => void;
}

interface SubscriptionTier {
  name: string;
  price: string;
  superlikes: number;
  features: string[];
  current: boolean;
}

const subscriptionTiers: SubscriptionTier[] = [
  {
    name: "Basic",
    price: "Free",
    superlikes: 1,
    features: ["1 Superlike per day", "Limited matches", "Basic profile"],
    current: true
  },
  {
    name: "Premium", 
    price: "$9.99/mo",
    superlikes: 5,
    features: ["5 Superlikes per day", "Unlimited matches", "Enhanced profile", "See who liked you"],
    current: false
  },
  {
    name: "Elite",
    price: "$19.99/mo", 
    superlikes: 15,
    features: ["15 Superlikes per day", "Priority matching", "Advanced analytics", "Direct messaging", "Verified badge"],
    current: false
  }
];

export function PersonalProfilePage({ onNavigate }: PersonalProfilePageProps) {
  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
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

      <div className="flex-1 overflow-y-auto">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={profile1} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover border-4 border-background shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                <Star className="w-4 h-4 text-primary-foreground fill-current" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-1">Sarah Chen</h2>
              <p className="text-muted-foreground">CEO & Founder at TechFlow AI</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
                  Basic Member
                </span>
                <span className="text-sm text-muted-foreground">1 Superlike left today</span>
              </div>
            </div>
            <Button variant="glass" size="sm">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Subscription Tiers */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-xl rounded-2xl">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Crown className="w-6 h-6 text-primary" />
              Upgrade Your Experience
            </h3>
            
            <div className="grid gap-4">
              {subscriptionTiers.map((tier, index) => (
                <div 
                  key={tier.name}
                  className={`relative p-4 rounded-xl border transition-all duration-300 ${
                    tier.current 
                      ? "border-primary bg-primary/5 shadow-lg" 
                      : "border-border bg-card/30 hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  {tier.current && (
                    <div className="absolute -top-2 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                      Current Plan
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index === 0 ? "bg-muted/50" : index === 1 ? "bg-primary/20" : "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                      }`}>
                        {index === 0 ? <Star className="w-5 h-5" /> : 
                         index === 1 ? <Crown className="w-5 h-5 text-primary" /> : 
                         <Zap className="w-5 h-5 text-purple-400" />}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-foreground">{tier.name}</h4>
                        <p className="text-sm text-muted-foreground">{tier.superlikes} Superlikes/day</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-foreground">{tier.price}</p>
                      {!tier.current && (
                        <Button 
                          size="sm" 
                          variant={index === 2 ? "premium" : "default"}
                          className="mt-2"
                        >
                          Upgrade
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {tier.features.map((feature, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {feature}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Profile Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <p className="text-2xl font-bold text-primary">24</p>
              <p className="text-sm text-muted-foreground">Profile Views</p>
            </Card>
            <Card className="p-4 text-center bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
              <p className="text-2xl font-bold text-accent">12</p>
              <p className="text-sm text-muted-foreground">Matches</p>
            </Card>
            <Card className="p-4 text-center bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20">
              <p className="text-2xl font-bold text-purple-400">8</p>
              <p className="text-sm text-muted-foreground">Messages</p>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="glass" className="h-20 flex-col gap-2">
              <Video className="w-6 h-6" />
              <span>Manage Videos</span>
            </Button>
            <Button variant="glass" className="h-20 flex-col gap-2">
              <Plus className="w-6 h-6" />
              <span>Add Content</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}