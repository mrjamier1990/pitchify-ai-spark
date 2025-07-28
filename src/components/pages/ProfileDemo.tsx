import React, { useState } from "react";
import { PersonalProfilePageV2 } from "./PersonalProfilePageV2";
import { PageType } from "../MainApp";
import { useNavigate } from "react-router-dom";
import AuroraBackground from '../ui/aurora-background';
import { ArrowLeft, Eye, Settings } from "lucide-react";

export function ProfileDemo() {
  const [showProfile, setShowProfile] = useState(true);
  const navigate = useNavigate();

  const handleNavigate = (page: PageType) => {
    if (page === 'swipe') {
      setShowProfile(false);
      setTimeout(() => {
        alert('Demo completed! In a real app, this would navigate to the main app.');
        navigate('/welcome');
      }, 1000);
    }
  };

  if (showProfile) {
    return (
      <div className="relative">
        {/* Demo Header */}
        <div className="absolute top-4 left-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
            <div className="flex items-center gap-2 text-white text-sm">
              <Eye className="w-4 h-4" />
              <span>Demo Mode - No Authentication Required</span>
            </div>
          </div>
        </div>

        {/* Demo Navigation */}
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => setShowProfile(false)}
            className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <PersonalProfilePageV2 onNavigate={handleNavigate} />
      </div>
    );
  }

  return (
    <AuroraBackground>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Profile Demo Completed!</h1>
          <p className="text-white/80 mb-6">You've seen the new profile page design with aurora theme.</p>
          
          <div className="space-y-4">
            <button 
              onClick={() => setShowProfile(true)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
            >
              View Profile Again
            </button>
            
            <button 
              onClick={() => navigate('/welcome')}
              className="block mx-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300"
            >
              Back to Welcome
            </button>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
} 