import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Users, TrendingUp, Shield, Star, ArrowRight } from "lucide-react";
import pitchifyLogo from "@/assets/pitchify-logo.png";
import heroImage from "@/assets/hero-networking.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={pitchifyLogo} alt="Pitchify" className="w-8 h-8" />
            <span className="text-xl font-bold text-foreground">Pitchify</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="cta" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Where Entrepreneurs
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Meet Investors
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              Swipe through video pitches. Connect with game-changers. 
              Build the future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="xl" className="min-w-[200px]">
                <Play className="mr-2" />
                Start Pitching
              </Button>
              <Button variant="glass" size="xl" className="min-w-[200px]">
                <Users className="mr-2" />
                I'm an Investor
              </Button>
            </div>
            <div className="mt-12 flex justify-center items-center gap-8 text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-primary text-primary" />
                <span>1000+ Successful Matches</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>$50M+ Funding Raised</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              The Future of Professional Networking
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience intelligent matching, video-first connections, and AI-powered insights
              in the most sophisticated networking platform ever built.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-gradient-card shadow-card hover:shadow-premium transition-all duration-300 border-0">
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6">
                <Play className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Video Pitches</h3>
              <p className="text-muted-foreground leading-relaxed">
                Replace static profiles with dynamic 60-second video pitches. 
                Show your passion, explain your vision, and make a lasting first impression.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-card shadow-card hover:shadow-premium transition-all duration-300 border-0">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Smart Matching</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI-powered algorithm analyzes your goals, industry, and investment criteria 
                to surface the most relevant connections for your success.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-card shadow-card hover:shadow-premium transition-all duration-300 border-0">
              <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Verified Profiles</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every investor and entrepreneur is verified. Connect with confidence 
                knowing you're engaging with legitimate, serious professionals.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Simple. Powerful. Effective.
            </h2>
            <p className="text-xl text-muted-foreground">
              Three steps to transform your professional network
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Create Your Pitch</h3>
              <p className="text-muted-foreground">
                Record a compelling 60-second video explaining who you are, 
                what you're building, or what you're looking to invest in.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-accent-foreground">
                2
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Smart Discovery</h3>
              <p className="text-muted-foreground">
                Swipe through curated matches. Our AI learns your preferences 
                and surfaces the most relevant opportunities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-secondary-foreground">
                3
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Connect & Grow</h3>
              <p className="text-muted-foreground">
                When there's mutual interest, unlock full profiles, 
                chat, and schedule calls to turn connections into partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Pitch Your Future?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join the most exclusive network of entrepreneurs and investors. 
            Your next big opportunity is just a swipe away.
          </p>
          <Button variant="premium" size="xl" className="shadow-glow">
            Get Early Access
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <img src={pitchifyLogo} alt="Pitchify" className="w-8 h-8" />
              <span className="text-xl font-bold text-foreground">Pitchify</span>
            </div>
            <div className="flex items-center gap-6 text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2024 Pitchify. Connecting the future of business.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
