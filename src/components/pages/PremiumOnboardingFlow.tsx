import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  Rocket, 
  DollarSign, 
  Users, 
  Building, 
  Brain, 
  Wrench, 
  TrendingUp, 
  Banknote, 
  Heart, 
  MapPin, 
  Lightbulb, 
  Cpu, 
  Zap, 
  Smartphone, 
  Shield, 
  Leaf, 
  ShoppingBag, 
  Gamepad2, 
  GraduationCap, 
  Coffee, 
  Plane, 
  Camera,
  FileText,
  Upload,
  Video,
  Target,
  Star,
  Globe,
  BarChart3,
  TrendingDown,
  Scale,
  HandCoins,
  Briefcase,
  Crown,
  Building2,
  Linkedin
} from 'lucide-react';

interface PremiumOnboardingFlowProps {
  onComplete: () => void;
  userEmail: string;
  userId: string;
}

interface FormData {
  full_name: string;
  linkedin_url: string;
  country: string;
  role: 'entrepreneur' | 'investor' | 'both';
  startup_name: string;
  industry: string[];
  funding_stage: string;
  funding_amount_seeking: number;
  investor_type_preference: string[];
  pitch_deck_url: string;
  startup_website: string;
  video_pitch_url: string;
  why_good_fit: string;
  investor_type: string;
  investment_status: string;
  investor_check_size: string;
  preferred_sectors: string[];
  preferred_stages: string[];
  regional_focus: string[];
}

const industries = [
  { value: 'saas', label: 'SaaS', icon: <Cpu className="h-5 w-5" /> },
  { value: 'ai', label: 'AI/ML', icon: <Brain className="h-5 w-5" /> },
  { value: 'healthtech', label: 'HealthTech', icon: <Heart className="h-5 w-5" /> },
  { value: 'fintech', label: 'FinTech', icon: <DollarSign className="h-5 w-5" /> },
  { value: 'edtech', label: 'EdTech', icon: <GraduationCap className="h-5 w-5" /> },
  { value: 'web3', label: 'Web3', icon: <Zap className="h-5 w-5" /> },
  { value: 'ecommerce', label: 'E-commerce', icon: <ShoppingBag className="h-5 w-5" /> },
  { value: 'mobile', label: 'Mobile', icon: <Smartphone className="h-5 w-5" /> },
  { value: 'gaming', label: 'Gaming', icon: <Gamepad2 className="h-5 w-5" /> },
  { value: 'cleantech', label: 'CleanTech', icon: <Leaf className="h-5 w-5" /> },
  { value: 'security', label: 'Security', icon: <Shield className="h-5 w-5" /> },
  { value: 'travel', label: 'Travel', icon: <Plane className="h-5 w-5" /> },
  { value: 'food', label: 'Food', icon: <Coffee className="h-5 w-5" /> },
  { value: 'media', label: 'Media', icon: <Camera className="h-5 w-5" /> }
];

const fundingStages = [
  { value: 'idea', label: 'Just an Idea', icon: <Lightbulb className="h-6 w-6" />, desc: 'Early concept stage' },
  { value: 'mvp', label: 'MVP / Beta', icon: <Wrench className="h-6 w-6" />, desc: 'Building the product' },
  { value: 'launched', label: 'Launched with some traction', icon: <Rocket className="h-6 w-6" />, desc: 'Live with users' },
  { value: 'revenue', label: 'Generating revenue', icon: <Banknote className="h-6 w-6" />, desc: 'Making money' },
  { value: 'scaling', label: 'Scaling', icon: <TrendingUp className="h-6 w-6" />, desc: 'Growing fast' }
];

const investorTypes = [
  { value: 'angel', label: 'Angel Investor', icon: <Star className="h-5 w-5" /> },
  { value: 'strategic', label: 'Strategic Partner', icon: <Briefcase className="h-5 w-5" /> },
  { value: 'vc', label: 'VC / Fund', icon: <Building2 className="h-5 w-5" /> },
  { value: 'open', label: 'Open to all', icon: <Globe className="h-5 w-5" /> }
];

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 
  'Singapore', 'UAE', 'India', 'Brazil', 'Netherlands', 'Switzerland', 'Sweden', 
  'Japan', 'South Korea', 'Israel', 'Other'
];

const investorCheckSizes = [
  { value: '1k-10k', label: '$1K - $10K' },
  { value: '10k-50k', label: '$10K - $50K' },
  { value: '50k-100k', label: '$50K - $100K' },
  { value: '100k-500k', label: '$100K - $500K' },
  { value: '500k-1m', label: '$500K - $1M' },
  { value: '1m+', label: '$1M+' }
];

const regions = [
  { value: 'north_america', label: 'North America' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia_pacific', label: 'Asia Pacific' },
  { value: 'mena', label: 'MENA' },
  { value: 'latin_america', label: 'Latin America' },
  { value: 'global', label: 'Global' }
];

const stages = [
  { value: 'pre_seed', label: 'Pre-seed' },
  { value: 'seed', label: 'Seed' },
  { value: 'series_a', label: 'Series A' },
  { value: 'series_b+', label: 'Series B+' },
  { value: 'growth', label: 'Growth Stage' }
];

export const PremiumOnboardingFlow = ({ onComplete, userEmail, userId }: PremiumOnboardingFlowProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    linkedin_url: '',
    country: '',
    role: 'entrepreneur',
    startup_name: '',
    industry: [],
    funding_stage: '',
    funding_amount_seeking: 100000,
    investor_type_preference: [],
    pitch_deck_url: '',
    startup_website: '',
    video_pitch_url: '',
    why_good_fit: '',
    investor_type: '',
    investment_status: '',
    investor_check_size: '',
    preferred_sectors: [],
    preferred_stages: [],
    regional_focus: []
  });

  const autoAdvanceTimer = useRef<NodeJS.Timeout>();

  // Auto-advance logic for completed required fields
  useEffect(() => {
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
    }

    const slide = getSlides()[currentSlide];
    if (slide?.autoAdvance && canContinue() && currentSlide < getSlides().length - 1) {
      autoAdvanceTimer.current = setTimeout(() => {
        nextSlide();
      }, 1500);
    }

    return () => {
      if (autoAdvanceTimer.current) {
        clearTimeout(autoAdvanceTimer.current);
      }
    };
  }, [formData, currentSlide]);

  const getSlides = () => {
    const universalSlides = [
      { id: 'welcome', title: 'Welcome to Pitchify', required: false },
      { id: 'name', title: 'Full Name', required: true, autoAdvance: true },
      { id: 'linkedin', title: 'LinkedIn Profile', required: false, autoAdvance: true },
      { id: 'location', title: 'Location', required: true, autoAdvance: true },
      { id: 'role', title: 'Role Selection', required: true }
    ];

    if (formData.role === 'entrepreneur') {
      return [
        ...universalSlides,
        { id: 'startup_name', title: 'Startup Name', required: true, autoAdvance: true },
        { id: 'industry', title: 'Industry', required: true, autoAdvance: true },
        { id: 'stage', title: 'Current Stage', required: true },
        { id: 'funding_amount', title: 'Funding Amount', required: true },
        { id: 'investor_preference', title: 'Investor Type', required: true },
        { id: 'pitch_deck', title: 'Pitch Deck', required: false },
        { id: 'startup_website', title: 'Website', required: false },
        { id: 'video_pitch', title: 'Video Pitch', required: false },
        { id: 'why_good_fit', title: 'Why Good Fit', required: true }
      ];
    } else if (formData.role === 'investor') {
      return [
        ...universalSlides,
        { id: 'investor_type', title: 'Investor Type', required: true },
        { id: 'investment_status', title: 'Investment Status', required: true },
        { id: 'check_size', title: 'Check Size', required: true },
        { id: 'sector_preference', title: 'Sector Preference', required: true },
        { id: 'stage_preference', title: 'Stage Preference', required: true },
        { id: 'regional_focus', title: 'Regional Focus', required: true },
        { id: 'why_good_fit', title: 'Why Good Fit', required: true }
      ];
    } else {
      return [
        ...universalSlides,
        { id: 'startup_name', title: 'Startup Name', required: true },
        { id: 'industry', title: 'Industry', required: true },
        { id: 'stage', title: 'Current Stage', required: true },
        { id: 'funding_amount', title: 'Funding Amount', required: true },
        { id: 'investor_preference', title: 'Investor Type', required: true },
        { id: 'pitch_deck', title: 'Pitch Deck', required: false },
        { id: 'startup_website', title: 'Website', required: false },
        { id: 'video_pitch', title: 'Video Pitch', required: false },
        { id: 'investor_type', title: 'Investor Type', required: true },
        { id: 'investment_status', title: 'Investment Status', required: true },
        { id: 'check_size', title: 'Check Size', required: true },
        { id: 'sector_preference', title: 'Sector Preference', required: true },
        { id: 'stage_preference', title: 'Stage Preference', required: true },
        { id: 'regional_focus', title: 'Regional Focus', required: true },
        { id: 'why_good_fit', title: 'Why Good Fit', required: true }
      ];
    }
  };

  const slides = getSlides();

  const nextSlide = () => {
    if (currentSlide < slides.length - 1 && !isAnimating) {
      setDirection('forward');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0 && !isAnimating) {
      setDirection('backward');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const canContinue = () => {
    const slide = slides[currentSlide];
    if (!slide.required) return true;
    
    switch (slide.id) {
      case 'name': return formData.full_name.trim() !== '';
      case 'location': return formData.country !== '';
      case 'role': return true;
      case 'startup_name': return formData.startup_name.trim() !== '';
      case 'industry': return formData.industry.length > 0;
      case 'stage': return formData.funding_stage !== '';
      case 'funding_amount': return formData.funding_amount_seeking > 0;
      case 'investor_preference': return formData.investor_type_preference.length > 0;
      case 'investor_type': return formData.investor_type !== '';
      case 'investment_status': return formData.investment_status !== '';
      case 'check_size': return formData.investor_check_size !== '';
      case 'sector_preference': return formData.preferred_sectors.length > 0;
      case 'stage_preference': return formData.preferred_stages.length > 0;
      case 'regional_focus': return formData.regional_focus.length > 0;
      case 'why_good_fit': return formData.why_good_fit.trim() !== '';
      default: return true;
    }
  };

  const formatFundingAmount = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const handleComplete = async () => {
    try {
      const profileData = {
        user_id: userId,
        email: userEmail,
        full_name: formData.full_name,
        linkedin_url: formData.linkedin_url || null,
        country: formData.country,
        role: formData.role,
        startup_name: formData.startup_name || null,
        industry: formData.industry.length > 0 ? formData.industry[0] : null,
        funding_stage: formData.funding_stage || null,
        funding_amount_seeking: formData.funding_amount_seeking ? formatFundingAmount(formData.funding_amount_seeking) : null,
        investor_type_preference: formData.investor_type_preference.length > 0 ? formData.investor_type_preference : null,
        pitch_deck_url: formData.pitch_deck_url || null,
        startup_website: formData.startup_website || null,
        video_pitch_url: formData.video_pitch_url || null,
        investor_type: formData.investor_type || null,
        investment_status: formData.investment_status || null,
        investor_check_size: formData.investor_check_size || null,
        preferred_sectors: formData.preferred_sectors.length > 0 ? formData.preferred_sectors : null,
        preferred_stages: formData.preferred_stages.length > 0 ? formData.preferred_stages : null,
        regional_focus: formData.regional_focus.length > 0 ? formData.regional_focus : null,
        why_good_fit: formData.why_good_fit || null,
      };

      const { error } = await supabase
        .from('profiles')
        .insert([profileData]);

      if (error) throw error;

      toast({
        title: "Welcome to Pitchify! 🚀",
        description: "Your profile is ready. Let's find your perfect matches.",
      });

      onComplete();
    } catch (error) {
      console.error('Error creating profile:', error);
      toast({
        title: "Error creating profile",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderSlide = () => {
    const slide = slides[currentSlide];
    const animationClass = direction === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left';
    
    switch (slide.id) {
      case 'welcome':
        return (
          <div className={`space-y-8 text-center ${animationClass}`}>
            <div className="space-y-4">
              <div className="relative">
                <h1 className="text-5xl font-display font-bold bg-gradient-coral bg-clip-text text-transparent leading-tight">
                  Welcome to Pitchify
                </h1>
                <div className="absolute -top-2 -right-4 text-3xl animate-bounce-in">✨</div>
              </div>
              <p className="text-xl text-muted-foreground font-medium">
                Let's personalize your experience
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative p-8 rounded-full bg-gradient-coral shadow-coral">
                <Rocket className="h-20 w-20 text-white animate-bounce-in" />
                <div className="absolute inset-0 rounded-full bg-gradient-coral opacity-20 animate-pulse" />
              </div>
            </div>
            <Button 
              onClick={nextSlide}
              size="lg" 
              className="px-12 py-4 text-lg font-semibold rounded-full shadow-coral hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey
            </Button>
          </div>
        );

      case 'name':
        return (
          <div className={`space-y-8 ${animationClass}`}>
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-display font-bold text-foreground">
                What's your full name?
              </h2>
            </div>
            <div className="max-w-md mx-auto">
              <Input
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                className="text-xl p-6 border-2 focus:border-primary transition-all duration-300 rounded-2xl text-center shadow-card"
                autoFocus
              />
            </div>
          </div>
        );

      case 'linkedin':
        return (
          <div className={`space-y-8 ${animationClass}`}>
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-display font-bold text-foreground">
                What's your LinkedIn profile?
              </h2>
              <p className="text-lg text-muted-foreground">(Optional)</p>
            </div>
            <div className="max-w-md mx-auto relative">
              <Input
                placeholder="https://linkedin.com/in/yourname"
                value={formData.linkedin_url}
                onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                className="text-lg p-6 pl-14 border-2 focus:border-primary transition-all duration-300 rounded-2xl shadow-card"
              />
              <Linkedin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-primary" />
            </div>
          </div>
        );

      case 'location':
        return (
          <div className={`space-y-8 ${animationClass}`}>
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-display font-bold text-foreground">
                Where are you currently based?
              </h2>
            </div>
            <div className="max-w-md mx-auto relative">
              <Select
                value={formData.country}
                onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
              >
                <SelectTrigger className="text-lg p-6 pl-14 border-2 focus:border-primary transition-all duration-300 rounded-2xl shadow-card">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country.toLowerCase().replace(/\s+/g, '_')}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-primary pointer-events-none" />
            </div>
          </div>
        );

      case 'role':
        return (
          <div className={`space-y-8 ${animationClass}`}>
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-display font-bold text-foreground">
                Which best describes you?
              </h2>
            </div>
            <div className="max-w-2xl mx-auto grid gap-4">
              {[
                { value: 'entrepreneur', icon: <Rocket className="h-8 w-8" />, emoji: '🚀', title: "I'm a Founder", desc: "Looking for investment and strategic partners" },
                { value: 'investor', icon: <DollarSign className="h-8 w-8" />, emoji: '💰', title: "I'm an Investor", desc: "Seeking promising startups to invest in" },
                { value: 'both', icon: <Users className="h-8 w-8" />, emoji: '🤝', title: "I'm Both", desc: "Founder who also invests in other startups" }
              ].map((option) => (
                <Card 
                  key={option.value}
                  className={`cursor-pointer border-2 transition-all duration-300 hover:scale-[1.02] ${
                    formData.role === option.value 
                      ? 'border-primary bg-primary/5 shadow-coral' 
                      : 'border-border hover:border-primary/50 hover:shadow-card'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, role: option.value as any }))}
                >
                  <CardContent className="flex items-center space-x-6 p-8">
                    <div className={`p-4 rounded-2xl ${formData.role === option.value ? 'bg-primary text-white' : 'bg-primary/10 text-primary'} transition-all duration-300`}>
                      {option.icon}
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-semibold text-2xl mb-1">
                        {option.emoji} {option.title}
                      </h3>
                      <p className="text-muted-foreground text-lg">{option.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      // ... continue with remaining slides (startup_name, industry, stage, etc.)
      // For brevity, I'll show a few key founder slides

      case 'startup_name':
        return (
          <div className={`space-y-8 ${animationClass}`}>
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-display font-bold text-foreground">
                What's the name of your startup?
              </h2>
            </div>
            <div className="max-w-md mx-auto">
              <Input
                placeholder="Enter your startup name"
                value={formData.startup_name}
                onChange={(e) => setFormData(prev => ({ ...prev, startup_name: e.target.value }))}
                className="text-xl p-6 border-2 focus:border-primary transition-all duration-300 rounded-2xl text-center shadow-card"
                autoFocus
              />
            </div>
          </div>
        );

      case 'industry':
        return (
          <div className={`space-y-8 ${animationClass}`}>
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-display font-bold text-foreground">
                What industry or category best fits your startup?
              </h2>
            </div>
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {industries.map((industry) => (
                <Card
                  key={industry.value}
                  className={`cursor-pointer border-2 transition-all duration-300 hover:scale-105 ${
                    formData.industry.includes(industry.value)
                      ? 'border-primary bg-primary/10 shadow-coral'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => {
                    const newIndustries = formData.industry.includes(industry.value)
                      ? formData.industry.filter(i => i !== industry.value)
                      : [...formData.industry, industry.value];
                    setFormData(prev => ({ ...prev, industry: newIndustries }));
                  }}
                >
                  <CardContent className="flex flex-col items-center space-y-3 p-6">
                    <div className={`p-3 rounded-xl ${formData.industry.includes(industry.value) ? 'bg-primary text-white' : 'bg-primary/10 text-primary'} transition-all duration-300`}>
                      {industry.icon}
                    </div>
                    <span className="font-medium text-center text-sm">{industry.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'stage':
        return (
          <div className={`space-y-8 ${animationClass}`}>
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-display font-bold text-foreground">
                What stage are you currently at?
              </h2>
            </div>
            <div className="max-w-2xl mx-auto space-y-4">
              {fundingStages.map((stage) => (
                <Card
                  key={stage.value}
                  className={`cursor-pointer border-2 transition-all duration-300 hover:scale-[1.02] ${
                    formData.funding_stage === stage.value
                      ? 'border-primary bg-primary/5 shadow-coral'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, funding_stage: stage.value }))}
                >
                  <CardContent className="flex items-center space-x-6 p-6">
                    <div className={`p-3 rounded-xl ${formData.funding_stage === stage.value ? 'bg-primary text-white' : 'bg-primary/10 text-primary'} transition-all duration-300`}>
                      {stage.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl">{stage.label}</h3>
                      <p className="text-muted-foreground">{stage.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'funding_amount':
        return (
          <div className={`space-y-8 ${animationClass}`}>
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-display font-bold text-foreground">
                How much are you looking to raise?
              </h2>
            </div>
            <div className="max-w-md mx-auto space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold bg-gradient-coral bg-clip-text text-transparent mb-2">
                  {formatFundingAmount(formData.funding_amount_seeking)}
                </div>
                <p className="text-muted-foreground">Funding Amount</p>
              </div>
              <Slider
                value={[formData.funding_amount_seeking]}
                onValueChange={([value]) => setFormData(prev => ({ ...prev, funding_amount_seeking: value }))}
                min={10000}
                max={5000000}
                step={10000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$10K</span>
                <span>$5M+</span>
              </div>
            </div>
          </div>
        );

      case 'investor_preference':
        return (
          <div className={`space-y-8 ${animationClass}`}>
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-display font-bold text-foreground">
                What type of investor are you looking for?
              </h2>
            </div>
            <div className="max-w-2xl mx-auto grid grid-cols-2 gap-4">
              {investorTypes.map((type) => (
                <Card
                  key={type.value}
                  className={`cursor-pointer border-2 transition-all duration-300 hover:scale-105 ${
                    formData.investor_type_preference.includes(type.value)
                      ? 'border-primary bg-primary/10 shadow-coral'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => {
                    const newTypes = formData.investor_type_preference.includes(type.value)
                      ? formData.investor_type_preference.filter(t => t !== type.value)
                      : [...formData.investor_type_preference, type.value];
                    setFormData(prev => ({ ...prev, investor_type_preference: newTypes }));
                  }}
                >
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    <div className={`p-4 rounded-xl ${formData.investor_type_preference.includes(type.value) ? 'bg-primary text-white' : 'bg-primary/10 text-primary'} transition-all duration-300`}>
                      {type.icon}
                    </div>
                    <span className="font-medium text-center">{type.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'why_good_fit':
        return (
          <div className={`space-y-8 ${animationClass}`}>
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-display font-bold text-foreground">
                In one sentence, tell us why you're a good fit for Pitchify.
              </h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <Textarea
                placeholder="I'm building the next generation of..."
                value={formData.why_good_fit}
                onChange={(e) => setFormData(prev => ({ ...prev, why_good_fit: e.target.value }))}
                className="text-lg p-6 border-2 focus:border-primary transition-all duration-300 rounded-2xl shadow-card min-h-[120px] resize-none"
                maxLength={200}
              />
              <p className="text-sm text-muted-foreground mt-2 text-right">
                {formData.why_good_fit.length}/200
              </p>
            </div>
            {formData.why_good_fit.trim() && (
              <div className="text-center">
                <Button 
                  onClick={handleComplete}
                  size="lg" 
                  className="px-12 py-4 text-lg font-semibold rounded-full shadow-coral hover:shadow-glow transition-all duration-300 transform hover:scale-105"
                >
                  Launch Pitchify 🚀
                </Button>
              </div>
            )}
          </div>
        );

      default:
        return <div className="text-center">Slide not implemented</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Progress Indicator */}
      <div className="relative z-10 flex items-center justify-center pt-8 pb-4">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentSlide + 1} of {slides.length}
          </span>
          <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-coral transition-all duration-500 ease-out"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          {renderSlide()}
        </div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 flex items-center justify-between p-8">
        <Button
          onClick={prevSlide}
          variant="outline"
          size="lg"
          className={`px-8 py-3 rounded-full transition-all duration-300 ${
            currentSlide === 0 ? 'opacity-0 pointer-events-none' : 'hover:scale-105'
          }`}
          disabled={currentSlide === 0}
        >
          Back
        </Button>
        
        <div className="flex-1" />
        
        {currentSlide < slides.length - 1 && slides[currentSlide].id !== 'why_good_fit' && (
          <Button
            onClick={nextSlide}
            size="lg"
            className={`px-8 py-3 rounded-full transition-all duration-300 ${
              canContinue() 
                ? 'shadow-coral hover:shadow-glow hover:scale-105' 
                : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!canContinue()}
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};