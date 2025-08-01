import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { MultiSelect } from '@/components/ui/multi-select';
import { FileUpload } from '@/components/ui/file-upload';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { ArrowRight, ArrowLeft, Rocket, DollarSign, Users, Building, Brain, Wrench, TrendingUp, Banknote, Scale, Heart, Globe, MapPin, Lightbulb, Cpu, Zap, Smartphone, Shield, Leaf, ShoppingBag, Gamepad2, Music, GraduationCap, Home, Car, Plane, Camera, Palette, Book, Coffee, Trophy, Target, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuroraBackground from '../ui/aurora-background';

interface OnboardingFlowProps {
  onComplete: () => void;
  userEmail: string;
  userId: string;
}

interface OnboardingStep {
  id: string;
  title: string;
  required: boolean;
}

interface FormData {
  full_name: string;
  linkedin_url: string;
  country: string;
  role: 'entrepreneur' | 'investor' | 'both';
  industry: string;
  funding_stage: string;
  bio: string;
  startup_name: string;
  startup_website: string;
  funding_amount_seeking: string;
  investor_type_preference: string[];
  pitch_deck_url: string;
  video_pitch_url: string;
  investor_type: string;
  investment_status: string;
  investor_check_size: string;
  preferred_sectors: string[];
  preferred_stages: string[];
  regional_focus: string[];
  why_good_fit: string;
}

const industries = [
  { value: 'saas', label: 'SaaS', icon: <Cpu className="h-4 w-4" /> },
  { value: 'ai', label: 'AI/ML', icon: <Brain className="h-4 w-4" /> },
  { value: 'healthtech', label: 'HealthTech', icon: <Heart className="h-4 w-4" /> },
  { value: 'biotech', label: 'Biotech', icon: <Heart className="h-4 w-4" /> },
  { value: 'fintech', label: 'FinTech', icon: <DollarSign className="h-4 w-4" /> },
  { value: 'proptech', label: 'PropTech', icon: <Building className="h-4 w-4" /> },
  { value: 'agritech', label: 'AgriTech', icon: <Leaf className="h-4 w-4" /> },
  { value: 'insurtech', label: 'InsurTech', icon: <Shield className="h-4 w-4" /> },
  { value: 'legaltech', label: 'LegalTech', icon: <Scale className="h-4 w-4" /> },
  { value: 'logistics', label: 'Logistics', icon: <Car className="h-4 w-4" /> },
  { value: 'robotics', label: 'Robotics', icon: <Wrench className="h-4 w-4" /> },
  { value: 'spacetech', label: 'SpaceTech', icon: <Rocket className="h-4 w-4" /> },
  { value: 'sportstech', label: 'SportsTech', icon: <Trophy className="h-4 w-4" /> },
  { value: 'fashion', label: 'Fashion', icon: <Palette className="h-4 w-4" /> },
  { value: 'art', label: 'Art', icon: <Palette className="h-4 w-4" /> },
  { value: 'social_impact', label: 'Social Impact', icon: <Heart className="h-4 w-4" /> },
  { value: 'nonprofit', label: 'Nonprofit', icon: <Heart className="h-4 w-4" /> },
  { value: 'automotive', label: 'Automotive', icon: <Car className="h-4 w-4" /> },
  { value: 'construction', label: 'Construction', icon: <Building className="h-4 w-4" /> },
  { value: 'real_estate', label: 'Real Estate', icon: <Building className="h-4 w-4" /> },
  { value: 'retail', label: 'Retail', icon: <ShoppingBag className="h-4 w-4" /> },
  { value: 'telecom', label: 'Telecommunications', icon: <Smartphone className="h-4 w-4" /> },
  { value: 'utilities', label: 'Utilities', icon: <Leaf className="h-4 w-4" /> },
  { value: 'energy', label: 'Energy', icon: <Zap className="h-4 w-4" /> },
  { value: 'mining', label: 'Mining', icon: <Banknote className="h-4 w-4" /> },
  { value: 'materials', label: 'Materials', icon: <Wrench className="h-4 w-4" /> },
  { value: 'aerospace', label: 'Aerospace', icon: <Rocket className="h-4 w-4" /> },
  { value: 'maritime', label: 'Maritime', icon: <Plane className="h-4 w-4" /> },
  { value: 'education', label: 'Education', icon: <GraduationCap className="h-4 w-4" /> },
  { value: 'hospitality', label: 'Hospitality', icon: <Coffee className="h-4 w-4" /> },
  { value: 'tourism', label: 'Tourism', icon: <Plane className="h-4 w-4" /> },
  { value: 'publishing', label: 'Publishing', icon: <Book className="h-4 w-4" /> },
  { value: 'advertising', label: 'Advertising', icon: <Book className="h-4 w-4" /> },
  { value: 'hrtech', label: 'HRTech', icon: <Users className="h-4 w-4" /> },
  { value: 'ecommerce', label: 'E-commerce', icon: <ShoppingBag className="h-4 w-4" /> },
  { value: 'web3', label: 'Web3/Crypto', icon: <Zap className="h-4 w-4" /> },
  { value: 'mobile', label: 'Mobile Apps', icon: <Smartphone className="h-4 w-4" /> },
  { value: 'gaming', label: 'Gaming', icon: <Gamepad2 className="h-4 w-4" /> },
  { value: 'cleantech', label: 'CleanTech', icon: <Leaf className="h-4 w-4" /> },
  { value: 'security', label: 'Cybersecurity', icon: <Shield className="h-4 w-4" /> },
  { value: 'travel', label: 'Travel', icon: <Plane className="h-4 w-4" /> },
  { value: 'food', label: 'Food & Beverage', icon: <Coffee className="h-4 w-4" /> },
  { value: 'media', label: 'Media & Entertainment', icon: <Camera className="h-4 w-4" /> },
  { value: 'other', label: 'Other', icon: <Building className="h-4 w-4" /> }
];

const startupStages = [
  { value: 'idea', label: 'Just an Idea', icon: <Lightbulb className="h-4 w-4" /> },
  { value: 'prototype', label: 'Prototype', icon: <Wrench className="h-4 w-4" /> },
  { value: 'pre_product', label: 'Pre-Product', icon: <Wrench className="h-4 w-4" /> },
  { value: 'mvp', label: 'MVP / Beta', icon: <Wrench className="h-4 w-4" /> },
  { value: 'product_market_fit', label: 'Product-Market Fit', icon: <TrendingUp className="h-4 w-4" /> },
  { value: 'launched', label: 'Launched with some traction', icon: <Rocket className="h-4 w-4" /> },
  { value: 'revenue', label: 'Generating revenue', icon: <Banknote className="h-4 w-4" /> },
  { value: 'scaling', label: 'Scaling', icon: <TrendingUp className="h-4 w-4" /> },
  { value: 'expansion', label: 'Expansion', icon: <TrendingUp className="h-4 w-4" /> },
  { value: 'ipo', label: 'IPO', icon: <Trophy className="h-4 w-4" /> },
  { value: 'exit', label: 'Exit', icon: <Trophy className="h-4 w-4" /> },
  { value: 'turnaround', label: 'Turnaround', icon: <Wrench className="h-4 w-4" /> },
];

const investorTypes = [
  { value: 'angel', label: 'Angel Investor' },
  { value: 'vc', label: 'VC' },
  { value: 'syndicate', label: 'Syndicate' },
  { value: 'family_office', label: 'Family Office' },
  { value: 'private_equity', label: 'Private Equity' },
  { value: 'corporate_vc', label: 'Corporate VC' },
  { value: 'incubator', label: 'Incubator/Accelerator' },
  { value: 'crowdfunding', label: 'Crowdfunding' },
  { value: 'government_grant', label: 'Government Grant' },
  { value: 'sovereign_wealth', label: 'Sovereign Wealth Fund' },
  { value: 'strategic_partner', label: 'Strategic Partner' },
  { value: 'other', label: 'Other' },
];

const investorTypePreferences = [
  { value: 'angel', label: 'Angel Investor' },
  { value: 'strategic', label: 'Strategic Partner' },
  { value: 'vc', label: 'VC / Fund' },
  { value: 'open', label: 'Open to all' }
];

const investmentStages = [
  { value: 'idea', label: 'Idea / Early' },
  { value: 'prototype', label: 'Prototype' },
  { value: 'pre_product', label: 'Pre-Product' },
  { value: 'mvp', label: 'MVP' },
  { value: 'product_market_fit', label: 'Product-Market Fit' },
  { value: 'seed', label: 'Pre-seed / Seed' },
  { value: 'growth', label: 'Growth Stage' },
  { value: 'expansion', label: 'Expansion' },
  { value: 'ipo', label: 'IPO' },
  { value: 'exit', label: 'Exit' },
  { value: 'turnaround', label: 'Turnaround' },
];

const regions = [
  { value: 'north_america', label: 'North America' },
  { value: 'mena', label: 'MENA' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia_pacific', label: 'Asia-Pacific' },
  { value: 'global', label: 'Global' }
];

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Switzerland', 'Austria', 'Belgium', 'Ireland', 'Portugal', 'Poland', 'Czech Republic', 'Hungary', 'Greece', 'Turkey', 'Russia', 'China', 'Japan', 'South Korea', 'India', 'Singapore', 'Hong Kong', 'Australia', 'New Zealand', 'Brazil', 'Mexico', 'Argentina', 'Chile', 'Colombia', 'South Africa', 'Nigeria', 'Egypt', 'UAE', 'Saudi Arabia', 'Israel', 'Indonesia', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines', 'Pakistan', 'Bangladesh', 'Ukraine', 'Romania', 'Slovakia', 'Slovenia', 'Croatia', 'Bulgaria', 'Estonia', 'Latvia', 'Lithuania', 'Luxembourg', 'Iceland', 'Qatar', 'Kuwait', 'Morocco', 'Kenya', 'Ghana', 'Peru', 'Venezuela', 'Uruguay', 'Ecuador', 'Costa Rica', 'Panama', 'Dominican Republic', 'Other'
];

export const OnboardingFlow = ({ onComplete, userEmail, userId }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    linkedin_url: '',
    country: '',
    role: 'entrepreneur',
    industry: '',
    funding_stage: '',
    bio: '',
    startup_name: '',
    startup_website: '',
    funding_amount_seeking: '',
    investor_type_preference: [],
    pitch_deck_url: '',
    video_pitch_url: '',
    investor_type: '',
    investment_status: '',
    investor_check_size: '',
    preferred_sectors: [],
    preferred_stages: [],
    regional_focus: [],
    why_good_fit: '',
  });

  const [toastOpen, setToastOpen] = useState(false);
  const toastIdRef = useRef<string | null>(null);
  const [lastToastStep, setLastToastStep] = useState<number | null>(null);
  const navigate = useNavigate();

  const getSteps = (): OnboardingStep[] => {
    const universalSteps = [
      { id: 'welcome', title: 'Welcome', required: false }, // step 1
      { id: 'name', title: 'Full Name', required: true },
      { id: 'linkedin', title: 'LinkedIn', required: false }, // step 3
      { id: 'location', title: 'Location', required: true },
      { id: 'role', title: 'Role', required: true },
    ];

    if (formData.role === 'entrepreneur') {
      return [
        ...universalSteps,
        { id: 'startup_name', title: 'Startup Name', required: true },
        { id: 'industry', title: 'Industry', required: true },
        { id: 'stage', title: 'Stage', required: true },
        { id: 'funding_amount', title: 'Funding Amount', required: true },
        { id: 'investor_preference', title: 'Investor Type', required: true },
        { id: 'pitch_deck', title: 'Pitch Deck', required: false }, // step 11
        { id: 'startup_website', title: 'Website', required: false }, // step 12
        { id: 'video_pitch', title: 'Video Pitch', required: true }, // step 13 always required
        { id: 'why_good_fit', title: 'Why Good Fit', required: true },
        { id: 'complete', title: 'Complete', required: true },
      ];
    } else if (formData.role === 'investor') {
      return [
        ...universalSteps,
        { id: 'investor_type', title: 'Investor Type', required: true },
        { id: 'investment_status', title: 'Investment Status', required: true },
        { id: 'check_size', title: 'Check Size', required: true },
        { id: 'sector_preference', title: 'Sector Preference', required: true },
        { id: 'stage_preference', title: 'Stage Preference', required: true },
        { id: 'regional_focus', title: 'Regional Focus', required: true },
        { id: 'video_pitch', title: 'Video Pitch', required: true }, // step 13 always required
        { id: 'why_good_fit', title: 'Why Good Fit', required: true },
        { id: 'complete', title: 'Complete', required: true },
      ];
    } else {
      return [
        ...universalSteps,
        { id: 'startup_name', title: 'Startup Name', required: true },
        { id: 'industry', title: 'Industry', required: true },
        { id: 'stage', title: 'Stage', required: true },
        { id: 'funding_amount', title: 'Funding Amount', required: true },
        { id: 'investor_preference', title: 'Investor Type', required: true },
        { id: 'pitch_deck', title: 'Pitch Deck', required: false },
        { id: 'startup_website', title: 'Website', required: false },
        { id: 'video_pitch', title: 'Video Pitch', required: true }, // step 13 always required
        { id: 'investor_type', title: 'Investor Type', required: true },
        { id: 'investment_status', title: 'Investment Status', required: true },
        { id: 'check_size', title: 'Check Size', required: true },
        { id: 'sector_preference', title: 'Sector Preference', required: true },
        { id: 'stage_preference', title: 'Stage Preference', required: true },
        { id: 'regional_focus', title: 'Regional Focus', required: true },
        { id: 'why_good_fit', title: 'Why Good Fit', required: true },
        { id: 'complete', title: 'Complete', required: true },
      ];
    }
  };

  const steps = getSteps();

  useEffect(() => {
    // Show the toast only for step 13 (video_pitch) and role 'entrepreneur', and only once per visit to the step
    if (
      steps[currentStep]?.id === 'video_pitch' &&
      formData.role === 'entrepreneur' &&
      lastToastStep !== currentStep &&
      !toastOpen
    ) {
      setToastOpen(true);
      setLastToastStep(currentStep);
      const { id } = toast({
        title: '',
        description: "This is the first thing investors or founders will see on your PitchFlic swipe card. You’ve got 60 seconds to shine, so make it clear, confident, and give a strong glimpse of who you are and what you’re building or looking for.",
        className: "fixed left-1/2 top-1/3 z-[200] -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-8 flex flex-col items-center text-white animate-fade-in max-w-md w-full text-center text-lg",
        duration: 1000000,
      });
      toastIdRef.current = id;
      // Listen for manual close
      const interval = setInterval(() => {
        const toastEl = document.querySelector(`[data-radix-toast-id='${id}']`);
        if (!toastEl) {
          setToastOpen(false);
          clearInterval(interval);
        }
      }, 500);
    }
  }, [steps, currentStep, formData.role, toastOpen, lastToastStep]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (files: File[], field: string) => {
    // In a real app, you'd upload to Supabase storage here
    if (files.length > 0) {
      const file = files[0];
      setFormData(prev => ({ ...prev, [field]: `uploaded_${file.name}` }));
      toast({
        title: "Video uploaded",
        description: `${file.name} has been uploaded successfully.`,
        className: "fixed left-1/2 top-1/2 z-[200] -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-8 flex flex-col items-center text-white animate-fade-in max-w-sm w-full",
        duration: 3000,
      });
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
      // Handle the 'both' role case - default to 'entrepreneur' for database constraint
      const dbRole = formData.role === 'both' ? 'entrepreneur' : formData.role;
      
      const profileData = {
        user_id: userId,
        email: userEmail,
        full_name: formData.full_name,
        linkedin_url: formData.linkedin_url || null,
        country: formData.country,
        role: dbRole,
        industry: formData.industry || null,
        funding_stage: formData.funding_stage || null,
        bio: formData.bio || null,
        startup_name: formData.startup_name || null,
        startup_website: formData.startup_website || null,
        funding_amount_seeking: formData.funding_amount_seeking || null,
        investor_type_preference: formData.investor_type_preference.length > 0 ? formData.investor_type_preference : null,
        pitch_deck_url: formData.pitch_deck_url || null,
        video_pitch_url: formData.video_pitch_url || null,
        investor_type: formData.investor_type || null,
        investment_status: formData.investment_status || null,
        investor_check_size: formData.investor_check_size || null,
        preferred_sectors: formData.preferred_sectors.length > 0 ? formData.preferred_sectors : null,
        preferred_stages: formData.preferred_stages.length > 0 ? formData.preferred_stages : null,
        regional_focus: formData.regional_focus.length > 0 ? formData.regional_focus : null,
        why_good_fit: formData.why_good_fit || null,
        onboarding_completed: true,
      };

      const { error } = await supabase
        .from('profiles')
        .upsert([profileData], { 
          onConflict: 'user_id',
          ignoreDuplicates: false 
        });

      if (error) throw error;

      // Instead of onComplete(), navigate to personal profile page
      navigate('/profile/personal');
    } catch (error) {
      console.error('Error creating profile:', error);
      toast({
        title: "Error creating profile",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const canContinue = () => {
    const step = steps[currentStep];
    if (!step.required) return true;
    
    switch (step.id) {
      case 'name':
        return formData.full_name.trim() !== '';
      case 'location':
        return formData.country !== '';
      case 'role':
        return true; // Role has default value
      case 'startup_name':
        return formData.startup_name.trim() !== '';
      case 'industry':
        return formData.industry !== '';
      case 'stage':
        return formData.funding_stage !== '';
      case 'funding_amount':
        return formData.funding_amount_seeking !== '';
      case 'investor_preference':
        return formData.investor_type_preference.length > 0;
      case 'investor_type':
        return formData.investor_type !== '';
      case 'investment_status':
        return formData.investment_status !== '';
      case 'check_size':
        return formData.investor_check_size !== '';
      case 'sector_preference':
        return formData.preferred_sectors.length > 0;
      case 'stage_preference':
        return formData.preferred_stages.length > 0;
      case 'regional_focus':
        return formData.regional_focus.length > 0;
      case 'why_good_fit':
        // Require at least 25 words
        return formData.why_good_fit.trim().split(/\s+/).filter(Boolean).length >= 25;
      case 'bio':
        return formData.bio.trim() !== '';
      case 'video_pitch':
        return formData.video_pitch_url && formData.video_pitch_url.trim() !== '';
      case 'pitch_deck':
        return formData.pitch_deck_url && formData.pitch_deck_url.trim() !== '';
      default:
        return true;
    }
  };

  const renderSlide = () => {
    const step = steps[currentStep];
    
    switch (step.id) {
      case 'welcome':
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="flex justify-center">
                <img src="/pitchflic-logo.png" alt="PitchFlic Logo" width={64} height={64} style={{ display: 'block', objectFit: 'contain' }} />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                Welcome to PitchFlic
              </h1>
              <p className="text-lg text-white/80">Let's personalize your experience</p>
            </div>
          </div>
        );

      case 'name':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>What's your full name?</h2>
            </div>
            <Input
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              className="text-lg p-6 border focus:border-white transition-colors rounded-full bg-white/10 backdrop-blur-xl border-white/20 text-white placeholder:text-white/60"
            />
          </div>
        );

      case 'linkedin':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>What's your LinkedIn profile?</h2>
              <p className="text-white/60">(Optional)</p>
            </div>
            <div className="relative">
              <Input
                placeholder="https://linkedin.com/in/yourname"
                value={formData.linkedin_url}
                onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                className="text-lg p-6 border focus:border-white transition-colors pl-12 rounded-full bg-white/10 backdrop-blur-xl border-white/20 text-white placeholder:text-white/60"
              />
              <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>Where are you currently based?</h2>
            </div>
            <div className="relative">
              <Select
                value={formData.country}
                onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
              >
                <SelectTrigger className="text-lg p-6 border border-white rounded-full bg-transparent !bg-transparent text-white focus:border-white transition-colors pl-12 rounded-full text-left" style={{ background: 'transparent !important' }}>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent className="bg-[#18181b30] backdrop-blur-2xl text-white rounded-xl border border-[#232326] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ff7300]/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#ff7300]/70 [&_*]:focus:outline-none [&_*]:focus:ring-0">
                  {countries.map((country) => (
                    <SelectItem
                      key={country}
                      value={country}
                      className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors"
                    >
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60 pointer-events-none" />
            </div>
          </div>
        );

      case 'role':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>Which best describes you?</h2>
            </div>
            <div className="grid gap-4">
              <Card 
                className={`cursor-pointer border-2 transition-all focus:ring-0 focus:outline-none ${
                  formData.role === 'entrepreneur' ? 'shadow-lg' : 'border-white/20 hover:border-white/40 hover:shadow-md'
                }`}
                style={{ 
                  background: formData.role === 'entrepreneur' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.10)', 
                  backdropFilter: formData.role === 'entrepreneur' ? 'blur(20px)' : 'blur(12px)',
                  border: formData.role === 'entrepreneur' ? '2px solid transparent' : '2px solid rgba(255,255,255,0.2)',
                  backgroundImage: formData.role === 'entrepreneur' ? 'linear-gradient(rgba(255,255,255,0.25), rgba(255,255,255,0.25)), linear-gradient(90deg, #ff7300, #ff477e)' : 'none',
                  backgroundOrigin: formData.role === 'entrepreneur' ? 'border-box' : 'initial',
                  backgroundClip: formData.role === 'entrepreneur' ? 'padding-box, border-box' : 'initial'
                }}
                onClick={() => setFormData(prev => ({ ...prev, role: 'entrepreneur' }))}
              >
                <CardContent className="flex items-center space-x-4 p-6">
                  <div className="p-3">
                    <Rocket className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-xl text-white" style={{ fontFamily: 'Inter, sans-serif' }}>I'm a Founder</h3>
                    <p className="text-white/80">Looking for investment and strategic partners</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer border-2 transition-all focus:ring-0 focus:outline-none ${
                  formData.role === 'investor' ? 'shadow-lg' : 'border-white/20 hover:border-white/40 hover:shadow-md'
                }`}
                style={{ 
                  background: formData.role === 'investor' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.10)', 
                  backdropFilter: formData.role === 'investor' ? 'blur(20px)' : 'blur(12px)',
                  border: formData.role === 'investor' ? '2px solid transparent' : '2px solid rgba(255,255,255,0.2)',
                  backgroundImage: formData.role === 'investor' ? 'linear-gradient(rgba(255,255,255,0.25), rgba(255,255,255,0.25)), linear-gradient(90deg, #ff7300, #ff477e)' : 'none',
                  backgroundOrigin: formData.role === 'investor' ? 'border-box' : 'initial',
                  backgroundClip: formData.role === 'investor' ? 'padding-box, border-box' : 'initial'
                }}
                onClick={() => setFormData(prev => ({ ...prev, role: 'investor' }))}
              >
                <CardContent className="flex items-center space-x-4 p-6">
                  <div className="p-3">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-xl text-white" style={{ fontFamily: 'Inter, sans-serif' }}>I'm an Investor</h3>
                    <p className="text-white/80">Looking for promising startups to invest in</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer border-2 transition-all focus:ring-0 focus:outline-none ${
                  formData.role === 'both' ? 'shadow-lg' : 'border-white/20 hover:border-white/40 hover:shadow-md'
                }`}
                style={{ 
                  background: formData.role === 'both' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.10)', 
                  backdropFilter: formData.role === 'both' ? 'blur(20px)' : 'blur(12px)',
                  border: formData.role === 'both' ? '2px solid transparent' : '2px solid rgba(255,255,255,0.2)',
                  backgroundImage: formData.role === 'both' ? 'linear-gradient(rgba(255,255,255,0.25), rgba(255,255,255,0.25)), linear-gradient(90deg, #ff7300, #ff477e)' : 'none',
                  backgroundOrigin: formData.role === 'both' ? 'border-box' : 'initial',
                  backgroundClip: formData.role === 'both' ? 'padding-box, border-box' : 'initial'
                }}
                onClick={() => setFormData(prev => ({ ...prev, role: 'both' }))}
              >
                <CardContent className="flex items-center space-x-4 p-6">
                  <div className="p-3">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-xl text-white" style={{ fontFamily: 'Inter, sans-serif' }}>I'm Both</h3>
                    <p className="text-white/80">I'm both building and investing</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'startup_name':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>What's the name of your startup?</h2>
            </div>
            <Input
              placeholder="Enter your startup name"
              value={formData.startup_name}
              onChange={(e) => setFormData(prev => ({ ...prev, startup_name: e.target.value }))}
              className="text-lg p-6 border focus:border-white transition-colors rounded-full bg-white/10 backdrop-blur-xl border-white/20 text-white placeholder:text-white/60"
            />
          </div>
        );

      case 'industry':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>What industry or category best fits your startup?</h2>
            </div>
            <div className="relative">
              <Select
                value={formData.industry}
                onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}
              >
                <SelectTrigger className="text-lg p-6 border border-white rounded-full bg-transparent !bg-transparent text-white focus:border-white transition-colors pl-4 rounded-full text-left" style={{ background: 'transparent !important' }}>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent className="bg-[#18181b30] backdrop-blur-2xl text-white rounded-xl border border-[#232326] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ff7300]/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#ff7300]/70 [&_*]:focus:outline-none [&_*]:focus:ring-0">
                  {industries.map((industry) => (
                    <SelectItem
                      key={industry.value}
                      value={industry.value}
                      className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors flex items-center gap-2"
                    >
                      <span className="inline-block align-middle mr-2">{industry.icon}</span>
                      <span className="align-middle">{industry.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'stage':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>What stage are you currently at?</h2>
            </div>
            <div className="relative">
              <Select
                value={formData.funding_stage}
                onValueChange={(value) => setFormData(prev => ({ ...prev, funding_stage: value }))}
              >
                <SelectTrigger className="text-lg p-6 border border-white rounded-full bg-transparent !bg-transparent text-white focus:border-white transition-colors pl-4 rounded-full text-left" style={{ background: 'transparent !important' }}>
                  <SelectValue placeholder="Select your stage" />
                </SelectTrigger>
                <SelectContent className="bg-[#18181b30] backdrop-blur-2xl text-white rounded-xl border border-[#232326] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ff7300]/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#ff7300]/70 [&_*]:focus:outline-none [&_*]:focus:ring-0" position="popper" side="top">
                  {startupStages.map((stage) => (
                    <SelectItem
                      key={stage.value}
                      value={stage.value}
                      className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors flex items-center gap-2"
                    >
                      <span className="inline-block align-middle mr-2">{stage.icon}</span>
                      <span className="align-middle">{stage.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
                {/* No left icon in SelectTrigger, just like step 7 */}
              </Select>
            </div>
          </div>
        );

      case 'funding_amount':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>How much are you looking to raise?</h2>
            </div>
            <div className="space-y-6">
              <div className="px-4">
                <Slider
                  value={[parseInt(formData.funding_amount_seeking) || 100000]}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, funding_amount_seeking: value[0].toString() }))}
                  max={5000000}
                  min={5000}
                  step={10000}
                  className="w-full funding-slider"
                />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {formatFundingAmount(parseInt(formData.funding_amount_seeking) || 100000)}
                </div>
                <p className="text-white/80">Funding goal</p>
              </div>
              <div className="flex justify-between text-sm text-white/80 px-4">
                <span>$5K</span>
                <span>$5M+</span>
              </div>
            </div>
          </div>
        );

      case 'investor_preference':
        const allInvestorTypePreferences = [
          { value: 'angel', label: 'Angel Investor' },
          { value: 'strategic', label: 'Strategic Partner' },
          { value: 'vc', label: 'VC / Fund' },
          { value: 'private_equity', label: 'Private Equity' },
          { value: 'corporate_vc', label: 'Corporate VC' },
          { value: 'incubator', label: 'Incubator/Accelerator' },
          { value: 'crowdfunding', label: 'Crowdfunding' },
          { value: 'government_grant', label: 'Government Grant' },
          { value: 'open', label: 'Open to all' },
        ];
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>What type of investor are you looking for?</h2>
            </div>
            <div className="relative">
              <Select
                value={formData.investor_type_preference[0] || ''}
                onValueChange={(value) => setFormData(prev => ({ ...prev, investor_type_preference: [value] }))}
              >
                <SelectTrigger className="text-lg p-6 border border-white rounded-full bg-transparent !bg-transparent text-white focus:border-white transition-colors pl-4 rounded-full text-left" style={{ background: 'transparent !important' }}>
                  <SelectValue placeholder="Select investor type" />
                </SelectTrigger>
                <SelectContent className="bg-[#18181b30] backdrop-blur-2xl text-white rounded-xl border border-[#232326] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ff7300]/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#ff7300]/70 [&_*]:focus:outline-none [&_*]:focus:ring-0" position="popper" side="top">
                  {allInvestorTypePreferences.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'pitch_deck':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>Do you have a pitch deck ready?</h2>
              <p className="text-white/60">Upload your pitch deck or skip for now</p>
            </div>
            <FileUpload
              accept=".pdf,.ppt,.pptx"
              onUpload={(files) => {
                if (files.length > 0) {
                  const file = files[0];
                  setFormData(prev => ({ ...prev, pitch_deck_url: `uploaded_${file.name}` }));
                  toast({
                    title: "Pitch Deck uploaded",
                    description: `${file.name} has been uploaded successfully.`,
                    className: "fixed left-1/2 top-1/2 z-[200] -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-8 flex flex-col items-center text-white animate-fade-in max-w-sm w-full",
                    duration: 3000,
                  });
                } else {
                  setFormData(prev => ({ ...prev, pitch_deck_url: '' }));
                  // TODO: Add API/storage deletion logic here if needed
                }
              }}
              placeholder="Upload pitch deck"
              description="PDF, PPT, or PPTX formats supported"
              maxSize={25}
            />
          </div>
        );

      case 'startup_website':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>What's your startup website or landing page?</h2>
              <p className="text-white/60">(Optional)</p>
            </div>
            <div className="relative">
              <Input
                placeholder="https://yourstartup.com"
                value={formData.startup_website}
                onChange={(e) => setFormData(prev => ({ ...prev, startup_website: e.target.value }))}
                className="text-lg p-6 border focus:border-white transition-colors pl-12 rounded-full bg-white/10 backdrop-blur-xl border-white/20 text-white placeholder:text-white/60"
              />
              <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
            </div>
          </div>
        );

      case 'video_pitch':
          return (
            <div className="space-y-6 animate-slide-in-right">
              <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>Upload a short video pitch</h2>
              <p className="text-white/60">30–60s, optional but boosts visibility</p>
              </div>
              <FileUpload
                accept=".mp4,.mov,.avi"
                onUpload={(files) => {
                  if (!toastOpen && files.length > 0) {
                    handleFileUpload(files, 'video_pitch_url');
                  }
                }}
                placeholder="Upload video pitch"
                description="MP4, MOV, or AVI formats, max 60 seconds"
                maxSize={100}
                disabled={toastOpen}
              />
            </div>
          );

      case 'investor_type':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>What kind of investor are you?</h2>
            </div>
            <div className="relative">
              <Select
                value={formData.investor_type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, investor_type: value }))}
              >
                <SelectTrigger className="text-lg p-6 border border-white rounded-full bg-transparent !bg-transparent text-white focus:border-white transition-colors pl-4 rounded-full text-left" style={{ background: 'transparent !important' }}>
                  <SelectValue placeholder="Select investor type" />
                </SelectTrigger>
                <SelectContent className="bg-[#18181b55] backdrop-blur-2xl text-white rounded-xl border border-[#232326] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ff7300]/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#ff7300]/70 [&_*]:focus:outline-none [&_*]:focus:ring-0">
                  {investorTypes.map((type) => (
                    <SelectItem
                      key={type.value}
                      value={type.value}
                      className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors"
                    >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'investment_status':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>Are you currently looking to invest?</h2>
            </div>
            <div className="grid gap-4">
              <Card
                className={`cursor-pointer border-2 transition-all focus:ring-0 focus:outline-none ${
                  formData.investment_status === 'actively_investing' ? 'shadow-lg' : 'border-white/20 hover:border-white/40 hover:shadow-md'
                }`}
                style={{ 
                  background: formData.investment_status === 'actively_investing' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.10)', 
                  backdropFilter: formData.investment_status === 'actively_investing' ? 'blur(20px)' : 'blur(12px)',
                  border: formData.investment_status === 'actively_investing' ? '2px solid transparent' : '2px solid rgba(255,255,255,0.2)',
                  backgroundImage: formData.investment_status === 'actively_investing' ? 'linear-gradient(rgba(255,255,255,0.25), rgba(255,255,255,0.25)), linear-gradient(90deg, #ff7300, #ff477e)' : 'none',
                  backgroundOrigin: formData.investment_status === 'actively_investing' ? 'border-box' : 'initial',
                  backgroundClip: formData.investment_status === 'actively_investing' ? 'padding-box, border-box' : 'initial'
                }}
                onClick={() => setFormData(prev => ({ ...prev, investment_status: 'actively_investing' }))}
              >
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-white mx-auto mb-2" />
                  <p className="font-medium text-lg text-white">Yes, actively investing</p>
                </CardContent>
              </Card>
              <Card
                className={`cursor-pointer border-2 transition-all focus:ring-0 focus:outline-none ${
                  formData.investment_status === 'just_exploring' ? 'shadow-lg' : 'border-white/20 hover:border-white/40 hover:shadow-md'
                }`}
                style={{ 
                  background: formData.investment_status === 'just_exploring' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.10)', 
                  backdropFilter: formData.investment_status === 'just_exploring' ? 'blur(20px)' : 'blur(12px)',
                  border: formData.investment_status === 'just_exploring' ? '2px solid transparent' : '2px solid rgba(255,255,255,0.2)',
                  backgroundImage: formData.investment_status === 'just_exploring' ? 'linear-gradient(rgba(255,255,255,0.25), rgba(255,255,255,0.25)), linear-gradient(90deg, #ff7300, #ff477e)' : 'none',
                  backgroundOrigin: formData.investment_status === 'just_exploring' ? 'border-box' : 'initial',
                  backgroundClip: formData.investment_status === 'just_exploring' ? 'padding-box, border-box' : 'initial'
                }}
                onClick={() => setFormData(prev => ({ ...prev, investment_status: 'just_exploring' }))}
              >
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-white mx-auto mb-2" />
                  <p className="font-medium text-lg text-white">Just exploring</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'check_size':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>What is your typical investment amount?</h2>
            </div>
            <div className="space-y-6">
              <div className="px-4">
                <Slider
                  value={[parseInt(formData.investor_check_size) || 50000]}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, investor_check_size: value[0].toString() }))}
                  max={5000000}
                  min={5000}
                  step={5000}
                  className="w-full funding-slider"
                />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {formatFundingAmount(parseInt(formData.investor_check_size) || 50000)}
                </div>
                <p className="text-white/80">Typical investment amount</p>
              </div>
              <div className="flex justify-between text-sm text-white/80 px-4">
                <span>$5K</span>
                <span>$5M+</span>
              </div>
            </div>
          </div>
        );

      case 'sector_preference':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>What sectors are you most interested in?</h2>
            </div>
            <div className="relative">
              <Select
                open={undefined}
                onOpenChange={undefined}
                value=""
                onValueChange={() => {}}
                // Dummy props to keep Select API, but we'll use custom dropdown below
              >
                <SelectTrigger className="text-lg p-6 border border-white rounded-full bg-transparent !bg-transparent text-white focus:border-white transition-colors pl-4 rounded-full text-left cursor-pointer" style={{ background: 'transparent !important' }}>
                  <span className="text-white/60">
                    {formData.preferred_sectors.length > 0
                      ? `${formData.preferred_sectors.length} sector${formData.preferred_sectors.length > 1 ? 's' : ''} selected`
                      : 'Select your sectors'}
                  </span>
                </SelectTrigger>
                <SelectContent className="bg-[#18181b30] backdrop-blur-2xl text-white rounded-xl border border-[#232326] max-h-96 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ff7300]/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#ff7300]/70">
                  {industries.map((industry) => (
                    <div
                      key={industry.value}
                      className={`flex items-center px-4 py-2 cursor-pointer rounded-full transition-colors ${formData.preferred_sectors.includes(industry.value) ? 'bg-gradient-to-r from-[#ff7300] to-[#ff477e] text-white' : 'hover:bg-gradient-to-r hover:from-[#ff7300] hover:to-[#ff477e] hover:text-white'}`}
                      onClick={() => {
                        setFormData((prev) => {
                          const already = prev.preferred_sectors.includes(industry.value);
                          return {
                            ...prev,
                            preferred_sectors: already
                              ? prev.preferred_sectors.filter((v) => v !== industry.value)
                              : [...prev.preferred_sectors, industry.value],
                          };
                        });
                      }}
                    >
                      <span className="inline-block align-middle mr-2">{industry.icon}</span>
                      <span className="align-middle">{industry.label}</span>
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formData.preferred_sectors.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                {formData.preferred_sectors.map((sector) => {
                  const ind = industries.find((i) => i.value === sector);
                  return (
                    <span key={sector} className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-white text-sm font-medium">
                      {ind?.icon}
                      <span className="ml-1">{ind?.label}</span>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        );

      case 'stage_preference':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>What stages do you prefer to invest in?</h2>
            </div>
            <div className="relative">
              <Select
                open={undefined}
                onOpenChange={undefined}
                value=""
                onValueChange={() => {}}
                // Dummy props to keep Select API, but we'll use custom dropdown below
              >
                <SelectTrigger className="text-lg p-6 border border-white rounded-full bg-transparent !bg-transparent text-white focus:border-white transition-colors pl-4 rounded-full text-left cursor-pointer" style={{ background: 'transparent !important' }}>
                  <span className="text-white/60">
                    {formData.preferred_stages.length > 0
                      ? `${formData.preferred_stages.length} stage${formData.preferred_stages.length > 1 ? 's' : ''} selected`
                      : 'Select your stages'}
                  </span>
                </SelectTrigger>
                <SelectContent className="bg-[#18181b30] backdrop-blur-2xl text-white rounded-xl border border-[#232326] max-h-96 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ff7300]/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#ff7300]/70">
                  {investmentStages.map((stage) => (
                    <div
                      key={stage.value}
                      className={`flex items-center px-4 py-2 cursor-pointer rounded-full transition-colors ${formData.preferred_stages.includes(stage.value) ? 'bg-gradient-to-r from-[#ff7300] to-[#ff477e] text-white' : 'hover:bg-gradient-to-r hover:from-[#ff7300] hover:to-[#ff477e] hover:text-white'}`}
                      onClick={() => {
                        setFormData((prev) => {
                          const already = prev.preferred_stages.includes(stage.value);
                          return {
                            ...prev,
                            preferred_stages: already
                              ? prev.preferred_stages.filter((v) => v !== stage.value)
                              : [...prev.preferred_stages, stage.value],
                          };
                        });
                      }}
                    >
                      <span className="align-middle">{stage.label}</span>
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formData.preferred_stages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                {formData.preferred_stages.map((stage) => {
                  const st = investmentStages.find((i) => i.value === stage);
                  return (
                    <span key={stage} className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-white text-sm font-medium">
                      <span className="ml-1">{st?.label}</span>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        );

      case 'regional_focus':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>Which countries do you focus on?</h2>
            </div>
            <div className="relative">
              <Select
                open={undefined}
                onOpenChange={undefined}
                value=""
                onValueChange={() => {}}
                // Dummy props to keep Select API, but we'll use custom dropdown below
              >
                <SelectTrigger className="text-lg p-6 border border-white rounded-full bg-transparent !bg-transparent text-white focus:border-white transition-colors pl-4 rounded-full text-left cursor-pointer" style={{ background: 'transparent !important' }}>
                  <span className="text-white/60">
                    {formData.regional_focus.length > 0
                      ? `${formData.regional_focus.length} countr${formData.regional_focus.length > 1 ? 'ies' : 'y'} selected`
                      : 'Select your countries'}
                  </span>
                </SelectTrigger>
                <SelectContent className="bg-[#18181b30] backdrop-blur-2xl text-white rounded-xl border border-[#232326] max-h-96 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ff7300]/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#ff7300]/70">
                  {countries.map((country) => (
                    <div
                      key={country}
                      className={`flex items-center px-4 py-2 cursor-pointer rounded-full transition-colors ${formData.regional_focus.includes(country) ? 'bg-gradient-to-r from-[#ff7300] to-[#ff477e] text-white' : 'hover:bg-gradient-to-r hover:from-[#ff7300] hover:to-[#ff477e] hover:text-white'}`}
                      onClick={() => {
                        setFormData((prev) => {
                          const already = prev.regional_focus.includes(country);
                          return {
                            ...prev,
                            regional_focus: already
                              ? prev.regional_focus.filter((v) => v !== country)
                              : [...prev.regional_focus, country],
                          };
                        });
                      }}
                    >
                      <span className="align-middle">{country}</span>
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formData.regional_focus.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                {formData.regional_focus.map((country) => (
                  <span key={country} className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-white text-sm font-medium">
                    {country}
                  </span>
                ))}
              </div>
            )}
          </div>
        );

      case 'why_good_fit':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>What key problems are you hoping PitchFlic can help solve for you?</h2>
            </div>
            <Textarea
              placeholder="Describe the main challenges or problems you want to address with PitchFlic..."
              value={formData.why_good_fit}
              onChange={(e) => setFormData(prev => ({ ...prev, why_good_fit: e.target.value }))}
              className="text-lg p-6 border focus:border-white transition-colors rounded-2xl min-h-[120px] border-white/20 text-white placeholder:text-white/60"
              style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}
            />
            <p className="text-sm text-white/60 text-right mt-2">
              Please use a minimum of 25 words. Current word count: {formData.why_good_fit.trim().split(/\s+/).filter(Boolean).length}
            </p>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="flex justify-center">
                <img src="/pitchflic-logo.png" alt="PitchFlic Logo" width={64} height={64} style={{ display: 'block', objectFit: 'contain' }} />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                That's it — Your profile is being created!
              </h1>
              <p className="text-lg text-white/80">Preparing for launch</p>
            </div>
          </div>
        );

      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <AuroraBackground>
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div className="w-full max-w-3xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-white/80">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-white">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
                background: 'linear-gradient(90deg, #ff7300 0%, #ff477e 50%, #017ed5 100%)'
              }}
            />
          </div>
          <div className="mt-2" style={{ height: '20px' }} />
        </div>

        {/* Main content */}
        <Card className="border-white/20 backdrop-blur-sm text-white rounded-xl transition-all duration-300 relative z-10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}>
          <CardContent className="p-8 md:p-12">
            {renderSlide()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="group w-32 font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleComplete}
              className="group w-32 font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              Launch <Rocket className="h-4 w-4 inline ml-2" />
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!canContinue()}
              className="group w-32 font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
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
    </AuroraBackground>
  );
};