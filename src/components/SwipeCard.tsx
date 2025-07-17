import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Heart, X, Star, Play, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Haptics, ImpactStyle } from '@capacitor/haptics';

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
  onProfileClick?: () => void;
  style?: React.CSSProperties;
}

export function SwipeCard({ profile, onSwipe, onProfileClick, style }: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for smooth animations
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-30, 0, 30]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0.5, 0.8, 1, 0.8, 0.5]);
  
  // Transform values for swipe indicators
  const likeOpacity = useTransform(x, [0, 150], [0, 1]);
  const passOpacity = useTransform(x, [-150, 0], [1, 0]);
  const superLikeOpacity = useTransform(y, [-150, 0], [1, 0]);

  // Haptic feedback helper
  const triggerHaptics = useCallback(async (type: 'light' | 'medium' | 'heavy') => {
    try {
      const impactStyle = type === 'light' ? ImpactStyle.Light : 
                         type === 'medium' ? ImpactStyle.Medium : ImpactStyle.Heavy;
      await Haptics.impact({ style: impactStyle });
    } catch (error) {
      // Haptics not available (web/desktop)
      console.log('Haptics not available');
    }
  }, []);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    triggerHaptics('light');
  }, [triggerHaptics]);

  const handleDrag = useCallback((event: any, info: PanInfo) => {
    // Add subtle haptic feedback at swipe thresholds
    const currentX = Math.abs(info.offset.x);
    const currentY = Math.abs(info.offset.y);
    
    if ((currentX > 100 || currentY > 100) && isDragging) {
      triggerHaptics('medium');
    }
  }, [isDragging, triggerHaptics]);

  const handleDragEnd = useCallback((event: any, info: PanInfo) => {
    setIsDragging(false);
    
    const threshold = 150;
    const velocity = 500;
    const { offset, velocity: vel } = info;
    
    // Check for swipe based on distance OR velocity
    const shouldSwipeRight = offset.x > threshold || vel.x > velocity;
    const shouldSwipeLeft = offset.x < -threshold || vel.x < -velocity;
    const shouldSwipeUp = offset.y < -threshold || vel.y < -velocity;
    
    if (shouldSwipeRight || shouldSwipeLeft || shouldSwipeUp) {
      triggerHaptics('heavy');
      
      if (shouldSwipeUp) {
        onSwipe("up");
      } else if (shouldSwipeRight) {
        onSwipe("right");
      } else {
        onSwipe("left");
      }
    } else {
      // Spring back with smooth animation
      x.set(0);
      y.set(0);
      triggerHaptics('light');
    }
  }, [onSwipe, x, y, triggerHaptics]);

  return (
    <motion.div
      ref={cardRef}
      className="absolute inset-2 sm:inset-4 bg-card rounded-xl sm:rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none border-2 border-primary/20 shadow-[0_0_40px_rgba(0,0,0,0.3),0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm"
      style={{
        ...style,
        x,
        y,
        rotate,
        opacity,
      }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0_0_60px_rgba(0,0,0,0.4),0_12px_48px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)",
        borderColor: "hsl(var(--primary) / 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
    >
      {/* Profile Image */}
      <div className="relative h-2/3 overflow-hidden">
        <video
          src={profile.image}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center top' }}
          poster={profile.image}
        />
        <img
          src={profile.image}
          alt={profile.name}
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center top', display: 'none' }}
          onError={(e) => {
            e.currentTarget.style.display = 'block';
            const video = e.currentTarget.previousElementSibling as HTMLVideoElement;
            if (video) video.style.display = 'none';
          }}
        />
        
        {/* Video Play Overlay */}
        <motion.div 
          className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
          whileHover={{ opacity: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button variant="glass" size="lg" className="rounded-full">
              <Play className="w-6 h-6" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Type Badge */}
        <motion.div 
          className="absolute top-3 sm:top-4 left-3 sm:left-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium backdrop-blur-md ${
            profile.type === "entrepreneur" 
              ? "bg-primary/90 text-primary-foreground"
              : "bg-accent/90 text-accent-foreground"
          }`}>
            {profile.type === "entrepreneur" ? "Entrepreneur" : "Investor"}
          </span>
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Profile Info - Clickable */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 text-white cursor-pointer"
        onClick={onProfileClick}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <motion.div 
          className="mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg sm:text-2xl font-bold leading-tight tracking-wide">
            {profile.name}, {profile.age}
          </h2>
          <p className="text-sm sm:text-lg opacity-90 leading-tight font-medium">{profile.title}</p>
          <p className="text-xs sm:text-sm opacity-75 font-light">{profile.company}</p>
        </motion.div>

        <motion.div 
          className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm opacity-75 mb-2 sm:mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate font-medium">{profile.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate font-medium">{profile.industry}</span>
          </div>
        </motion.div>

        {profile.type === "entrepreneur" && profile.fundingStage && (
          <motion.p 
            className="text-xs sm:text-sm opacity-90 mb-1 sm:mb-2 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="font-semibold">Funding Stage:</span> {profile.fundingStage}
          </motion.p>
        )}

        {profile.type === "investor" && profile.investmentRange && (
          <motion.p 
            className="text-xs sm:text-sm opacity-90 mb-1 sm:mb-2 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="font-semibold">Investment Range:</span> {profile.investmentRange}
          </motion.p>
        )}

        {/* Enhanced Bio with Hover Bubble */}
        <div className="relative group">
          <motion.p 
            className="text-xs sm:text-sm opacity-90 line-clamp-2 leading-relaxed font-light cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {profile.bio}
          </motion.p>
          
          {/* Premium Hover Bubble */}
          <motion.div 
            className="absolute bottom-full left-0 right-0 mb-3 opacity-0 group-hover:opacity-100 z-20 pointer-events-none"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            whileHover={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="bg-gradient-to-br from-card via-background to-card/90 backdrop-blur-xl rounded-2xl p-5 border border-primary/30 shadow-[0_0_50px_rgba(0,0,0,0.5),0_0_100px_hsl(var(--primary)/0.3),inset_0_1px_0_rgba(255,255,255,0.1)] relative mx-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl"></div>
              <p className="text-sm text-foreground leading-relaxed font-medium relative z-10">
                {profile.bio}
              </p>
              {/* Premium Triangle Pointer */}
              <div className="absolute top-full left-6 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-card drop-shadow-lg"></div>
              <div className="absolute top-full left-7 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-primary/20"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Swipe Indicators with smooth animations */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-green-500/20 pointer-events-none"
        style={{ opacity: likeOpacity }}
      >
        <motion.div 
          className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-xl transform rotate-12 backdrop-blur-md"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          I'M IN
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-red-500/20 pointer-events-none"
        style={{ opacity: passOpacity }}
      >
        <motion.div 
          className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-xl transform -rotate-12 backdrop-blur-md"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          I'M OUT
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-blue-500/20 pointer-events-none"
        style={{ opacity: superLikeOpacity }}
      >
        <motion.div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-xl backdrop-blur-md"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          SUPER LIKE
        </motion.div>
      </motion.div>
    </motion.div>
  );
}