import { useState } from "react";
import { Heart, X, Star, Play, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: "left" | "right" | "up") => void;
  style?: React.CSSProperties;
}

export function SwipeCard({ profile, onSwipe, style }: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const threshold = 100;
    const { x, y } = dragOffset;
    
    if (Math.abs(x) > threshold) {
      onSwipe(x > 0 ? "right" : "left");
    } else if (y < -threshold) {
      onSwipe("up");
    }
    
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const rotation = isDragging ? dragOffset.x * 0.1 : 0;
  const opacity = isDragging ? Math.max(0.7, 1 - Math.abs(dragOffset.x) / 300) : 1;

  return (
    <div
      className="absolute inset-4 bg-card rounded-2xl shadow-card overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{
        ...style,
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
        opacity,
        zIndex: isDragging ? 10 : 1,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Profile Image */}
      <div className="relative h-2/3 overflow-hidden">
        <video
          src={profile.image}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
          poster={profile.image}
        />
        
        {/* Video Play Overlay */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Button variant="glass" size="lg" className="rounded-full">
            <Play className="w-6 h-6" />
          </Button>
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            profile.type === "entrepreneur" 
              ? "bg-primary text-primary-foreground"
              : "bg-accent text-accent-foreground"
          }`}>
            {profile.type === "entrepreneur" ? "Entrepreneur" : "Investor"}
          </span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="mb-2">
          <h2 className="text-2xl font-bold">
            {profile.name}, {profile.age}
          </h2>
          <p className="text-lg opacity-90">{profile.title}</p>
          <p className="text-sm opacity-75">{profile.company}</p>
        </div>

        <div className="flex items-center gap-4 text-sm opacity-75 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {profile.location}
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            {profile.industry}
          </div>
        </div>

        {profile.type === "entrepreneur" && profile.fundingStage && (
          <p className="text-sm opacity-90 mb-2">
            <span className="font-medium">Funding Stage:</span> {profile.fundingStage}
          </p>
        )}

        {profile.type === "investor" && profile.investmentRange && (
          <p className="text-sm opacity-90 mb-2">
            <span className="font-medium">Investment Range:</span> {profile.investmentRange}
          </p>
        )}

        <p className="text-sm opacity-90 line-clamp-2">{profile.bio}</p>
      </div>

      {/* Swipe Indicators */}
      {isDragging && (
        <>
          {dragOffset.x > 50 && (
            <div className="absolute inset-0 flex items-center justify-center bg-green-500/20">
              <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-xl transform rotate-12">
                I'M IN
              </div>
            </div>
          )}
          {dragOffset.x < -50 && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
              <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-xl transform -rotate-12">
                I'M OUT
              </div>
            </div>
          )}
          {dragOffset.y < -50 && (
            <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-xl">
                SUPER LIKE
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}