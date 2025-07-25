import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { User } from 'lucide-react';
import AuroraBackground from '../ui/aurora-background';

// NativeLoginForm component (to be implemented below main component)
function NativeLoginForm({ setError, setLoadingProvider }: { setError: (e: string | null) => void, setLoadingProvider: (p: string | null) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleNativeSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setLoadingProvider('native');
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } catch (err: any) {
      setError('Sign in failed. Please try again.');
    } finally {
      setLoading(false);
      setLoadingProvider(null);
    }
  }

  return (
    <form onSubmit={handleNativeSignIn} className="w-full flex flex-col gap-3 mt-4 animate-fade-in">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full rounded-md px-4 py-2 bg-background/80 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full rounded-md px-4 py-2 bg-background/80 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
}

// Add NativeSignUpForm below NativeLoginForm
function NativeSignUpForm({ setError, setLoadingProvider }: { setError: (e: string | null) => void, setLoadingProvider: (p: string | null) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleNativeSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setLoadingProvider('native');
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
    } catch (err: any) {
      setError('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
      setLoadingProvider(null);
    }
  }

  return (
    <form onSubmit={handleNativeSignUp} className="w-full flex flex-col gap-3 mt-4 animate-fade-in">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full rounded-md px-4 py-2 bg-background/80 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full rounded-md px-4 py-2 bg-background/80 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Signing up...' : 'Sign Up'}
      </Button>
    </form>
  );
}

export function AuthPage() {
  const [mode, setMode] = useState<'none' | 'signin' | 'signup' | 'native'>('none');
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
    <AuroraBackground>
      <div className="flex flex-col items-center w-full max-w-lg px-4 justify-center min-h-screen">
        <div className="flex flex-col items-center group transition-all duration-300 gap-y-5">
          <img
            src="/pitchflic-logo.png"
            alt="PitchFlic Logo"
            width={160}
            style={{ display: 'block', margin: '0 auto', maxWidth: '160px', maxHeight: '72px', objectFit: 'contain', marginTop: '-16px' }}
          />
          <div className="flex flex-col items-center gap-y-3">
            <h1
              className="text-6xl font-extrabold text-white tracking-tight transition-transform duration-300 mt-0"
              style={{ letterSpacing: '-0.02em', willChange: 'transform, color', fontFamily: 'Inter, system-ui, sans-serif', marginTop: 0 }}
            >
              PitchFlic
            </h1>
            <div className="text-sm font-light tracking-wide text-center shimmer-once" style={{ color: '#fff' }}>
              Flic <span className="mx-1">|</span> Pitch <span className="mx-1">|</span> Invest
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full max-w-xs mx-auto items-center mt-8 mb-8" style={{ marginTop: '3.5rem' }}>
          <div className="relative w-full flex flex-col items-center">
            {/* Google, Facebook, and Native icon pop-ups on hover for Sign In */}
            <div className={`absolute -top-10 left-1/2 -translate-x-1/2 flex flex-row gap-2 items-center justify-center pointer-events-none transition-all duration-500 z-10 ${showIcons ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`} id="icons-signin">
              {/* Google Icon */}
              <div
                className={`rounded-full backdrop-blur-md shadow-[0_2px_16px_0_#1ABC9C33] p-2 flex items-center justify-center cursor-pointer transition-opacity duration-200 social-pop ${loadingProvider === 'google' ? 'opacity-60' : ''}`}
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
              {/* Facebook Icon */}
              <div
                className={`rounded-full backdrop-blur-md shadow-[0_2px_16px_0_#1ABC9C33] p-2 flex items-center justify-center cursor-pointer transition-opacity duration-200 social-pop ${loadingProvider === 'facebook' ? 'opacity-60' : ''}`}
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
              {/* Native (Email/Password) Icon */}
              <div
                className={`rounded-full backdrop-blur-md shadow-[0_2px_16px_0_#1ABC9C33] p-2 flex items-center justify-center cursor-pointer transition-opacity duration-200 social-pop ${loadingProvider === 'native' ? 'opacity-60' : ''}`}
                title="Sign in with Email"
                tabIndex={0}
                onClick={() => { setMode('native'); setShowIcons(false); }}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setMode('native'); setShowIcons(false); } }}
                aria-disabled={!!loadingProvider}
                style={{ pointerEvents: loadingProvider ? 'none' : 'auto' }}
              >
                <User width={28} height={28} />
              </div>
            </div>
            <button
              type="button"
              className="aurora-signin-btn"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '1rem',
                letterSpacing: '0.02em',
                padding: '0.5rem 1.75rem',
                borderRadius: '2rem',
                background: 'rgba(20, 20, 40, 0.18)',
                border: '2px solid transparent',
                color: '#fff',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                position: 'relative',
                zIndex: 2,
                transition: 'background 0.3s, border 0.3s, box-shadow 0.3s, color 0.3s',
                overflow: 'hidden',
              }}
              onMouseEnter={handleShowIcons}
              onFocus={handleShowIcons}
              onClick={() => {
                handleShowIcons();
                setMode('signin');
              }}
              disabled={!!loadingProvider}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>
                {loadingProvider === 'google' && <span className="mr-2 animate-spin">🔄</span>}
                {loadingProvider === 'facebook' && <span className="mr-2 animate-spin">🔄</span>}
                Sign In
              </span>
            </button>
          </div>
          {/* Native login form below icons if mode==='native' */}
          {mode === 'native' && (
            <NativeLoginForm setError={setError} setLoadingProvider={setLoadingProvider} />
          )}
        </div>
        {error && <div className="mt-4 text-red-400 text-sm text-center">{error}</div>}
      </div>
      <style>{`.force-nunito { font-family: 'Nunito', system-ui, sans-serif !important; }`}</style>
      {/* Keyframes for shimmer */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }
        .shimmer-once {
          display: inline-block;
          background: linear-gradient(90deg, #fff 0%, #ff477e 50%, #fff 100%);
          background-size: 400px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 2s linear 1;
        }
      `}</style>
    </AuroraBackground>
  );
}