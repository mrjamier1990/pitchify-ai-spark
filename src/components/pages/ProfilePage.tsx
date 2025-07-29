import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Edit3, Settings, Star, Play, Camera, Link } from "lucide-react";
import { PageType } from "../MainApp";
import premiumLogo from "@/assets/pitchify-logo-premium.png";
import AuroraBackground from '../ui/aurora-background';

interface ProfilePageProps {
  onNavigate: (page: PageType) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  return (
    <AuroraBackground>
      <div className="h-full flex flex-col">
      {/* Header */}
        <header className="flex items-center justify-between p-4">
        <Button 
          onClick={() => onNavigate("swipe")}
            className="font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
            <ArrowLeft className="w-4 h-4" />
            Back
        </Button>
          <h1 className="text-xl font-semibold text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>My Profile</h1>
        <Button 
          onClick={() => onNavigate("settings")}
            className="font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
            <Settings className="w-4 h-4" />
        </Button>
      </header>

      {/* Profile Content */}
        <div className="flex-1 overflow-y-auto p-4 pt-8 space-y-8 max-w-4xl mx-auto pb-8 w-full min-w-0">
        {/* Profile Header */}
        <Card className="glass-card">
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
            
            <h2 className="text-2xl font-bold text-white mb-1">Alex Johnson</h2>
            <p className="text-white/80 mb-2">Entrepreneur</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-4 h-4 text-[#ff7300] fill-current" />
              <span className="text-sm text-[#ff7300] font-medium">Premium Member</span>
            </div>
            
            <Button className="mb-4 aurora-signin-btn">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Videos Section */}
        <Card className="glass-card">
          <h3 className="text-lg font-semibold text-white mb-4">My Videos</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff7300]/20 to-[#ff477e]/20 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-[#ff7300]" />
                </div>
                <div>
                  <p className="font-medium text-white">About Me Video</p>
                  <p className="text-sm text-white/70">2:15 duration</p>
                </div>
              </div>
              <Button className="hover:bg-[#ff7300] hover:text-white" size="sm">
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#017ed5]/20 to-[#b53dff]/20 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-[#017ed5]" />
                </div>
                <div>
                  <p className="font-medium text-white">Pitch Video</p>
                  <p className="text-sm text-white/70">1:45 duration</p>
                </div>
              </div>
              <Button className="hover:bg-[#ff7300] hover:text-white" size="sm">
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button className="w-full mt-4 aurora-signin-btn">
            <Camera className="w-4 h-4 mr-2" />
            Record New Video
          </Button>
        </Card>

        {/* Links & Documents */}
        <Card className="glass-card">
          <h3 className="text-lg font-semibold text-white mb-4">Links & Documents</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <Link className="w-4 h-4 text-white/70" />
                <span className="text-sm text-white">Pitch Deck</span>
              </div>
              <Button className="hover:bg-[#ff7300] hover:text-white" size="sm">Edit</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <Link className="w-4 h-4 text-white/70" />
                <span className="text-sm text-white">Website</span>
              </div>
              <Button className="hover:bg-[#ff7300] hover:text-white" size="sm">Edit</Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <Link className="w-4 h-4 text-white/70" />
                <span className="text-sm text-white">LinkedIn</span>
              </div>
              <Button className="hover:bg-[#ff7300] hover:text-white" size="sm">Edit</Button>
            </div>
          </div>

          <Button className="w-full mt-4 aurora-signin-btn">
            <Link className="w-4 h-4 mr-2" />
            Add Link
          </Button>
        </Card>

        {/* Stats */}
        <Card className="glass-card">
          <h3 className="text-lg font-semibold text-white mb-4">Profile Stats</h3>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-[#ff7300]">127</p>
              <p className="text-sm text-white/70">Profile Views</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#017ed5]">23</p>
              <p className="text-sm text-white/70">Matches</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#b53dff]">8.5</p>
              <p className="text-sm text-white/70">Pitch Score</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
    </AuroraBackground>
  );
}