// LaunchAnimationPage.tsx
// Fullscreen launch animation for onboarding

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const COUNTDOWN_NUMBERS = [3, 2, 1];
const COUNTDOWN_DURATION = 0.75; // seconds per number
const FADE_DURATION = 0.25; // seconds fade
const ROCKET_LAUNCH_DURATION = 4; // seconds
const TOTAL_DURATION = 7; // seconds before redirect

const primaryGlow = '0 0 32px 8px #ff5757cc';

// Sound effect hooks
function useSound(src: string, volume = 1) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.volume = volume;
    return () => { audioRef.current?.pause(); };
  }, [src, volume]);
  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };
  return play;
}

const ROCKET_IMAGE = '/placeholder.svg'; // Replace with your rocket image path, e.g. '/rocket-realistic.png'

export const LaunchAnimationPage: React.FC = () => {
  const [count, setCount] = useState(0); // index in COUNTDOWN_NUMBERS
  const [showRocket, setShowRocket] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  // Sound effects
  const playBeep = useSound('/countdown-beep.mp3', 0.5);
  const playRoar = useSound('/rocket-roar.mp3', 0.7);

  // Countdown logic with sound
  useEffect(() => {
    if (count < COUNTDOWN_NUMBERS.length) {
      playBeep();
      const timer = setTimeout(() => setCount(count + 1), (COUNTDOWN_DURATION + FADE_DURATION) * 1000);
      return () => clearTimeout(timer);
    } else {
      setShowRocket(true);
      playRoar();
      // After rocket launch, redirect
      const timer = setTimeout(() => {
        setRedirecting(true);
        navigate('/');
      }, (TOTAL_DURATION - COUNTDOWN_NUMBERS.length * (COUNTDOWN_DURATION + FADE_DURATION)) * 1000);
      return () => clearTimeout(timer);
    }
  }, [count, navigate, playBeep, playRoar]);

  // Background gradient and starfield
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #18181b 0%, #232326 100%)', minHeight: '100vh', minWidth: '100vw', overflow: 'hidden' }}>
      {/* Starfield (subtle) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>
      {/* Countdown */}
      <AnimatePresence>
        {count < COUNTDOWN_NUMBERS.length && (
          <motion.div
            key={COUNTDOWN_NUMBERS[count]}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1.1, filter: `drop-shadow(${primaryGlow})` }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: FADE_DURATION, type: 'spring' }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] font-extrabold text-white select-none"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '-0.04em', textShadow: primaryGlow }}
          >
            {COUNTDOWN_NUMBERS[count]}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Rocket Launch (realistic image + animated flame) */}
      <AnimatePresence>
        {showRocket && !redirecting && (
          <>
            {/* Frosted glass overlay HUD */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute left-1/2 top-8 z-20 w-[90vw] max-w-2xl rounded-2xl px-8 py-6"
              style={{
                transform: 'translateX(-50%)',
                background: 'rgba(24,24,27,0.55)',
                backdropFilter: 'blur(18px)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
              }}
            >
              <div className="text-center text-white text-2xl font-semibold tracking-tight" style={{ textShadow: '0 0 12px #ff5757cc' }}>
                Launching your PitchFlic experience...
              </div>
            </motion.div>
            {/* Realistic rocket image */}
            <motion.img
              src={ROCKET_IMAGE}
              alt="Rocket"
              initial={{ y: 0, scale: 1, filter: 'drop-shadow(0 0 32px #ff5757cc)' }}
              animate={showRocket ? { y: -420, scale: 1.05 } : { y: 0, scale: 1 }}
              transition={{ duration: ROCKET_LAUNCH_DURATION, ease: [0.4, 0.8, 0.2, 1] }}
              style={{
                position: 'absolute',
                left: '50%',
                bottom: 0,
                transform: 'translateX(-50%)',
                width: 220,
                height: 'auto',
                zIndex: 10,
                borderRadius: 16,
                boxShadow: '0 0 64px 0 #ff5757cc',
              }}
            />
            {/* Animated flame SVG below the rocket image */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 60 60"
              style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)', zIndex: 9 }}
            >
              <motion.ellipse
                cx="30"
                cy="50"
                rx="16"
                ry="22"
                fill="url(#flame-gradient)"
                initial={{ opacity: 0, scaleY: 0.5 }}
                animate={showRocket ? { opacity: [0.8, 1, 0.7], scaleY: [0.5, 1.3, 0.7] } : { opacity: 0, scaleY: 0.5 }}
                transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
                style={{ filter: 'blur(6px)' }}
              />
              <defs>
                <linearGradient id="flame-gradient" x1="30" y1="60" x2="30" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffb347" />
                  <stop offset="0.3" stopColor="#ff5757" />
                  <stop offset="0.7" stopColor="#fff" stopOpacity="0.7" />
                </linearGradient>
              </defs>
            </motion.svg>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LaunchAnimationPage; 