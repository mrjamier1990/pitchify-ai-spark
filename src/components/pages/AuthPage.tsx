import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

export function AuthPage() {
  const [mode, setMode] = useState<'none' | 'signin' | 'signup'>('none');
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showIcons, setShowIcons] = useState(false);
  const fadeTimeout = useRef<NodeJS.Timeout | null>(null);

  async function handleSocialSignIn(provider: 'google' | 'facebook') {
    setLoadingProvider(provider);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) setError(error.message);
    } catch (err) {
      setError('Social sign-in failed. Please try again.');
    } finally {
      setLoadingProvider(null);
    }
  }

  const handleShowIcons = () => {
    setShowIcons(true);
    if (fadeTimeout.current) {
      clearTimeout(fadeTimeout.current);
    }
    fadeTimeout.current = setTimeout(() => {
      setShowIcons(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-[#232326] via-[#18181a] to-[#101012] relative overflow-hidden" style={{ fontFamily: 'Inter, Nunito, system-ui, sans-serif' }}>
      {/* Subtle travelling star animation background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        {/* Star 1 */}
        <span className="absolute block rounded-full bg-[#1ABC9C] opacity-20 blur-[2px]" style={{ width: '18px', height: '18px', left: '10%', top: '20%', animation: 'starTravel1 22s linear infinite' }} />
        {/* Star 2 */}
        <span className="absolute block rounded-full bg-white opacity-10 blur-[1.5px]" style={{ width: '10px', height: '10px', left: '70%', top: '30%', animation: 'starTravel2 28s linear infinite' }} />
        {/* Star 3 */}
        <span className="absolute block rounded-full bg-[#1ABC9C] opacity-14 blur-[2.5px]" style={{ width: '14px', height: '14px', left: '40%', top: '70%', animation: 'starTravel3 32s linear infinite' }} />
        {/* Star 4 */}
        <span className="absolute block rounded-full bg-white opacity-8 blur-[2px]" style={{ width: '8px', height: '8px', left: '80%', top: '60%', animation: 'starTravel4 26s linear infinite' }} />
        {/* Star 5 */}
        <span className="absolute block rounded-full bg-[#1ABC9C] opacity-10 blur-[3px]" style={{ width: '22px', height: '22px', left: '55%', top: '10%', animation: 'starTravel5 36s linear infinite' }} />
      </div>
      {/* Logo and Title centered vertically */}
      <div className="flex flex-col items-center w-full max-w-lg px-4 justify-center min-h-screen">
        <div className="flex flex-col items-center group transition-all duration-300">
          <div className="flex items-center justify-center mb-4">
            <h1
              className="text-6xl font-extrabold text-white tracking-tight transition-transform duration-300"
              style={{ letterSpacing: '-0.02em', willChange: 'transform, color', fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              PitchFlic
            </h1>
          </div>
        </div>
        <div className="mb-6 text-sm font-light text-gray-400 tracking-wide text-center">
          Flic <span className="mx-1">|</span> Pitch <span className="mx-1">|</span> Invest
        </div>
        <div className="flex flex-col gap-3 w-full max-w-xs mx-auto items-center mt-8 mb-8">
          <div className="relative w-full flex flex-col items-center">
            {/* Google and Facebook icon pop-ups on hover for Sign In */}
            <div className={`absolute -top-10 left-1/2 -translate-x-1/2 flex flex-row gap-2 items-center justify-center pointer-events-none transition-all duration-500 z-10 ${showIcons ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`} id="icons-signin">
              <div
                className={`rounded-full backdrop-blur-md shadow-[0_2px_16px_0_#1ABC9C33] p-2 flex items-center justify-center cursor-pointer transition-opacity duration-200 ${loadingProvider === 'google' ? 'opacity-60' : ''}`}
                title="Sign in with Google"
                tabIndex={0}
                onClick={() => handleSocialSignIn('google')}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSocialSignIn('google'); }}
                aria-disabled={!!loadingProvider}
                style={{ pointerEvents: loadingProvider ? 'none' : 'auto' }}
              >
                {/* Google SVG */}
                <svg width="28" height="28" viewBox="0 0 22 22" fill="none">
                  <g>
                    <circle cx="11" cy="11" r="11" fill="transparent" />
                    <path d="M17.64 11.2c0-.56-.05-1.1-.14-1.6H11v3.04h3.74a3.2 3.2 0 0 1-1.39 2.1v1.74h2.24c1.3-1.2 2.05-2.97 2.05-5.28z" fill="#4285F4" />
                    <path d="M11 18c1.8 0 3.3-.6 4.4-1.64l-2.24-1.74c-.62.42-1.42.68-2.16.68-1.66 0-3.07-1.12-3.58-2.64H5.1v1.8A7 7 0 0 0 11 18z" fill="#34A853" />
                    <path d="M7.42 12.66A4.2 4.2 0 0 1 7.1 11c0-.58.1-1.14.32-1.66V7.54H5.1A7 7 0 0 0 4 11c0 1.1.26 2.14.72 3.06l2.7-1.4z" fill="#FBBC05" />
                    <path d="M11 6.44c.98 0 1.86.34 2.56 1.02l1.92-1.92C14.3 4.6 12.8 4 11 4A7 7 0 0 0 5.1 7.54l2.7 2.1C7.93 8.56 9.32 7.44 11 7.44z" fill="#EA4335" />
                  </g>
                </svg>
              </div>
              <div
                className={`rounded-full backdrop-blur-md shadow-[0_2px_16px_0_#1ABC9C33] p-2 flex items-center justify-center cursor-pointer transition-opacity duration-200 ${loadingProvider === 'facebook' ? 'opacity-60' : ''}`}
                title="Sign in with Facebook"
                tabIndex={0}
                onClick={() => handleSocialSignIn('facebook')}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSocialSignIn('facebook'); }}
                aria-disabled={!!loadingProvider}
                style={{ pointerEvents: loadingProvider ? 'none' : 'auto' }}
              >
                {/* Facebook SVG */}
                <svg width="28" height="28" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="11" fill="transparent" />
                  <path d="M14.5 11H12v5H9.5v-5H8v-2h1.5V7.5A2.5 2.5 0 0 1 12 5h2.5v2H12a.5.5 0 0 0-.5.5V9H14.5v2z" fill="#1877F3" />
                </svg>
              </div>
            </div>
            <button
              type="button"
              className="group w-32 font-light text-base rounded-full px-4 py-2 text-white bg-transparent transition-all duration-300 shadow-none hover:bg-[#1ABC9C11] hover:backdrop-blur-sm hover:shadow-[0_0_24px_0_#1ABC9C22] focus:bg-[#1ABC9C11] focus:backdrop-blur-sm focus:shadow-[0_0_24px_0_#1ABC9C22]"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              onMouseEnter={handleShowIcons}
              onFocus={handleShowIcons}
              onClick={() => {
                handleShowIcons();
                setMode('signin');
              }}
              disabled={!!loadingProvider}
            >
              {loadingProvider === 'google' && <span className="mr-2 animate-spin">🔄</span>}
              {loadingProvider === 'facebook' && <span className="mr-2 animate-spin">🔄</span>}
              Sign In
            </button>
          </div>
        </div>
        {error && <div className="mt-4 text-red-400 text-sm text-center">{error}</div>}
      </div>
      <style>{`.force-nunito { font-family: 'Nunito', system-ui, sans-serif !important; }`}</style>
      {/* Keyframes for star animation */}
      <style>{`
        @keyframes starTravel1 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60vw, 40vh); }
        }
        @keyframes starTravel2 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-50vw, 30vh); }
        }
        @keyframes starTravel3 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(30vw, -50vh); }
        }
        @keyframes starTravel4 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-40vw, -30vh); }
        }
        @keyframes starTravel5 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(20vw, 60vh); }
        }
      `}</style>
    </div>
  );
}