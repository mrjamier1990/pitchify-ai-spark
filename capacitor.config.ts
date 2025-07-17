import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.92901e6edc6440d5bfd96868edfe118d',
  appName: 'pitchify-ai-spark',
  webDir: 'dist',
  server: {
    url: 'https://92901e6e-dc64-40d5-bfd9-6868edfe118d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
};

export default config;