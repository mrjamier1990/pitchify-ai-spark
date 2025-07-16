import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Bell, Shield, CreditCard, HelpCircle, LogOut, Star } from "lucide-react";
import { PageType } from "../MainApp";

interface SettingsPageProps {
  onNavigate: (page: PageType) => void;
}

export function SettingsPage({ onNavigate }: SettingsPageProps) {
  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigate("profile")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <div className="w-10"></div>
      </header>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Premium Status */}
        <Card className="p-6 bg-gradient-primary border-border">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-6 h-6 text-primary-foreground" />
            <h3 className="text-lg font-semibold text-primary-foreground">Pitchify Premium</h3>
          </div>
          <p className="text-primary-foreground/80 mb-4">
            Unlock unlimited swipes, SuperLikes, and AI features
          </p>
          <Button variant="glass" className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
            Manage Subscription
          </Button>
        </Card>

        {/* Notifications */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">New Matches</p>
                <p className="text-sm text-muted-foreground">Get notified when you have a new match</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Messages</p>
                <p className="text-sm text-muted-foreground">Get notified about new messages</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">SuperLikes</p>
                <p className="text-sm text-muted-foreground">Get notified when someone SuperLikes you</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Privacy & Security */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy & Security
          </h3>
          
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start h-12">
              Privacy Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12">
              Blocked Users
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12">
              Data & Privacy
            </Button>
          </div>
        </Card>

        {/* Account */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Account
          </h3>
          
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start h-12">
              Subscription & Billing
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12">
              Delete Account
            </Button>
          </div>
        </Card>

        {/* Support */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Support
          </h3>
          
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start h-12">
              Help Center
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12">
              Contact Support
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12">
              Terms of Service
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12">
              Privacy Policy
            </Button>
          </div>
        </Card>

        {/* Sign Out */}
        <Card className="p-6 bg-card border-border">
          <Button variant="destructive" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </Card>
      </div>
    </div>
  );
}