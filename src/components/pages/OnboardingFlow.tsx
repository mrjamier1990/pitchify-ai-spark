import React, { useState } from 'react';
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
  { value: 'fintech', label: 'FinTech', icon: <DollarSign className="h-4 w-4" /> },
  { value: 'edtech', label: 'EdTech', icon: <GraduationCap className="h-4 w-4" /> },
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
  { value: 'mvp', label: 'MVP / Beta', icon: <Wrench className="h-4 w-4" /> },
  { value: 'launched', label: 'Launched with some traction', icon: <Rocket className="h-4 w-4" /> },
  { value: 'revenue', label: 'Generating revenue', icon: <Banknote className="h-4 w-4" /> },
  { value: 'scaling', label: 'Scaling', icon: <TrendingUp className="h-4 w-4" /> }
];

const investorTypes = [
  { value: 'angel', label: 'Angel Investor', icon: <Users className="h-4 w-4" /> },
  { value: 'vc', label: 'VC', icon: <Building className="h-4 w-4" /> },
  { value: 'syndicate', label: 'Syndicate', icon: <Users className="h-4 w-4" /> },
  { value: 'family_office', label: 'Family Office', icon: <Home className="h-4 w-4" /> },
  { value: 'other', label: 'Other', icon: <Building className="h-4 w-4" /> }
];

const investorTypePreferences = [
  { value: 'angel', label: 'Angel Investor' },
  { value: 'strategic', label: 'Strategic Partner' },
  { value: 'vc', label: 'VC / Fund' },
  { value: 'open', label: 'Open to all' }
];

const investmentStages = [
  { value: 'idea', label: 'Idea / Early' },
  { value: 'mvp', label: 'MVP' },
  { value: 'seed', label: 'Pre-seed / Seed' },
  { value: 'growth', label: 'Growth Stage' }
];

const regions = [
  { value: 'north_america', label: 'North America' },
  { value: 'mena', label: 'MENA' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia_pacific', label: 'Asia-Pacific' },
  { value: 'global', label: 'Global' }
];

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Australia',
  'Singapore',
  'UAE',
  'India',
  'Brazil',
  'Other'
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

  const getSteps = (): OnboardingStep[] => {
    const universalSteps = [
      { id: 'welcome', title: 'Welcome', required: false },
      { id: 'name', title: 'Full Name', required: true },
      { id: 'linkedin', title: 'LinkedIn', required: false },
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
        { id: 'pitch_deck', title: 'Pitch Deck', required: false },
        { id: 'startup_website', title: 'Website', required: false },
        { id: 'video_pitch', title: 'Video Pitch', required: false },
        { id: 'why_good_fit', title: 'Why Good Fit', required: true },
        { id: 'complete', title: 'Complete', required: false },
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
        { id: 'why_good_fit', title: 'Why Good Fit', required: true },
        { id: 'complete', title: 'Complete', required: false },
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
        { id: 'video_pitch', title: 'Video Pitch', required: false },
        { id: 'investor_type', title: 'Investor Type', required: true },
        { id: 'investment_status', title: 'Investment Status', required: true },
        { id: 'check_size', title: 'Check Size', required: true },
        { id: 'sector_preference', title: 'Sector Preference', required: true },
        { id: 'stage_preference', title: 'Stage Preference', required: true },
        { id: 'regional_focus', title: 'Regional Focus', required: true },
        { id: 'why_good_fit', title: 'Why Good Fit', required: true },
        { id: 'complete', title: 'Complete', required: false },
      ];
    }
  };

  const steps = getSteps();

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
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully.`,
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
      const profileData = {
        user_id: userId,
        email: userEmail,
        full_name: formData.full_name,
        linkedin_url: formData.linkedin_url || null,
        country: formData.country,
        role: formData.role,
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
        .upsert([profileData]);

      if (error) throw error;

      toast({
        title: "Profile created successfully!",
        description: "Welcome to Pitchify. Let's find your perfect matches.",
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
        return formData.why_good_fit.trim() !== '';
      case 'bio':
        return formData.bio.trim() !== '';
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
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] bg-clip-text text-transparent">
                Welcome to Pitchify
              </h1>
              <p className="text-lg text-muted-foreground">Let's personalize your experience</p>
            </div>
            <div className="flex justify-center">
              <div className="p-6 rounded-full bg-primary/10">
                <Rocket className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>
        );

      case 'name':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">What's your full name?</h2>
            </div>
            <Input
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              className="text-lg p-6 border-2 focus:border-primary transition-colors"
            />
          </div>
        );

      case 'linkedin':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">What's your LinkedIn profile?</h2>
              <p className="text-muted-foreground">(Optional)</p>
            </div>
            <div className="relative">
              <Input
                placeholder="https://linkedin.com/in/yourname"
                value={formData.linkedin_url}
                onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                className="text-lg p-6 border-2 focus:border-primary transition-colors pl-12"
              />
              <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Where are you currently based?</h2>
            </div>
            <div className="relative">
              <Select
                value={formData.country}
                onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
              >
                <SelectTrigger className="text-lg p-6 border-2 focus:border-primary transition-colors pl-12">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        );

      case 'role':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Which best describes you?</h2>
            </div>
            <div className="grid gap-4">
              <Card 
                className={`cursor-pointer border-2 transition-all hover-scale ${
                  formData.role === 'entrepreneur' ? 'border-primary bg-primary/10 shadow-lg' : 'border-border hover:border-primary/50 hover:shadow-md'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, role: 'entrepreneur' }))}
              >
                <CardContent className="flex items-center space-x-4 p-6">
                  <div className="p-3 rounded-full bg-primary/20">
                    <Rocket className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-xl">🚀 I'm a Founder</h3>
                    <p className="text-muted-foreground">Looking for investment and strategic partners</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer border-2 transition-all hover-scale ${
                  formData.role === 'investor' ? 'border-primary bg-primary/10 shadow-lg' : 'border-border hover:border-primary/50 hover:shadow-md'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, role: 'investor' }))}
              >
                <CardContent className="flex items-center space-x-4 p-6">
                  <div className="p-3 rounded-full bg-primary/20">
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-xl">💰 I'm an Investor</h3>
                    <p className="text-muted-foreground">Looking for promising startups to invest in</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer border-2 transition-all hover-scale ${
                  formData.role === 'both' ? 'border-primary bg-primary/10 shadow-lg' : 'border-border hover:border-primary/50 hover:shadow-md'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, role: 'both' }))}
              >
                <CardContent className="flex items-center space-x-4 p-6">
                  <div className="p-3 rounded-full bg-primary/20">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-xl">🤝 I'm Both</h3>
                    <p className="text-muted-foreground">I'm both building and investing</p>
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
              <h2 className="text-3xl font-bold text-foreground">What's the name of your startup?</h2>
            </div>
            <Input
              placeholder="Enter your startup name"
              value={formData.startup_name}
              onChange={(e) => setFormData(prev => ({ ...prev, startup_name: e.target.value }))}
              className="text-lg p-6 border-2 focus:border-primary transition-colors"
            />
          </div>
        );

      case 'industry':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">What industry or category best fits your startup?</h2>
            </div>
            <MultiSelect
              variant="cards"
              options={industries}
              selected={formData.industry ? [formData.industry] : []}
              onChange={(selected) => setFormData(prev => ({ ...prev, industry: selected[0] || '' }))}
              className="max-h-96 overflow-y-auto"
            />
          </div>
        );

      case 'stage':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">What stage are you currently at?</h2>
            </div>
            <div className="grid gap-3">
              {startupStages.map((stage) => (
                <Card
                  key={stage.value}
                  className={`cursor-pointer border-2 transition-all hover-scale ${
                    formData.funding_stage === stage.value ? 'border-primary bg-primary/10 shadow-lg' : 'border-border hover:border-primary/50 hover:shadow-md'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, funding_stage: stage.value }))}
                >
                  <CardContent className="flex items-center space-x-4 p-6">
                    <div className="p-2 rounded-full bg-primary/20">
                      {stage.icon}
                    </div>
                    <p className="font-medium text-lg">{stage.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'funding_amount':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">How much are you looking to raise?</h2>
            </div>
            <div className="space-y-6">
              <div className="px-4">
                <Slider
                  value={[parseInt(formData.funding_amount_seeking) || 100000]}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, funding_amount_seeking: value[0].toString() }))}
                  max={5000000}
                  min={10000}
                  step={10000}
                  className="w-full"
                />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {formatFundingAmount(parseInt(formData.funding_amount_seeking) || 100000)}
                </div>
                <p className="text-muted-foreground">Funding goal</p>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground px-4">
                <span>$10K</span>
                <span>$5M+</span>
              </div>
            </div>
          </div>
        );

      case 'investor_preference':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">What type of investor are you looking for?</h2>
            </div>
            <MultiSelect
              variant="chips"
              options={investorTypePreferences}
              selected={formData.investor_type_preference}
              onChange={(selected) => setFormData(prev => ({ ...prev, investor_type_preference: selected }))}
            />
          </div>
        );

      case 'pitch_deck':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Do you have a pitch deck ready?</h2>
              <p className="text-muted-foreground">Upload your pitch deck or skip for now</p>
            </div>
            <FileUpload
              accept=".pdf,.ppt,.pptx"
              onUpload={(files) => handleFileUpload(files, 'pitch_deck_url')}
              placeholder="Upload pitch deck"
              description="PDF, PPT, or PPTX formats supported"
              maxSize={25}
            />
            {!formData.pitch_deck_url && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setFormData(prev => ({ ...prev, pitch_deck_url: 'not_ready' }))}
              >
                Not ready yet
              </Button>
            )}
          </div>
        );

      case 'startup_website':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">What's your startup website or landing page?</h2>
              <p className="text-muted-foreground">(Optional)</p>
            </div>
            <div className="relative">
              <Input
                placeholder="https://yourstartup.com"
                value={formData.startup_website}
                onChange={(e) => setFormData(prev => ({ ...prev, startup_website: e.target.value }))}
                className="text-lg p-6 border-2 focus:border-primary transition-colors pl-12"
              />
              <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        );

      case 'video_pitch':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Upload a short video pitch</h2>
              <p className="text-muted-foreground">30–60s, optional but boosts visibility</p>
            </div>
            <FileUpload
              accept=".mp4,.mov,.avi"
              onUpload={(files) => handleFileUpload(files, 'video_pitch_url')}
              placeholder="Upload video pitch"
              description="MP4, MOV, or AVI formats, max 60 seconds"
              maxSize={100}
            />
          </div>
        );

      case 'investor_type':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">What kind of investor are you?</h2>
            </div>
            <MultiSelect
              variant="cards"
              options={investorTypes}
              selected={formData.investor_type ? [formData.investor_type] : []}
              onChange={(selected) => setFormData(prev => ({ ...prev, investor_type: selected[0] || '' }))}
            />
          </div>
        );

      case 'investment_status':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Are you currently looking to invest?</h2>
            </div>
            <div className="grid gap-4">
              <Card
                className={`cursor-pointer border-2 transition-all hover-scale ${
                  formData.investment_status === 'actively_investing' ? 'border-primary bg-primary/10 shadow-lg' : 'border-border hover:border-primary/50 hover:shadow-md'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, investment_status: 'actively_investing' }))}
              >
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="font-medium text-lg">Yes, actively investing</p>
                </CardContent>
              </Card>
              <Card
                className={`cursor-pointer border-2 transition-all hover-scale ${
                  formData.investment_status === 'just_exploring' ? 'border-primary bg-primary/10 shadow-lg' : 'border-border hover:border-primary/50 hover:shadow-md'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, investment_status: 'just_exploring' }))}
              >
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="font-medium text-lg">Just exploring</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'check_size':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">What's your typical check size?</h2>
            </div>
            <div className="space-y-6">
              <div className="px-4">
                <Slider
                  value={[parseInt(formData.investor_check_size) || 50000]}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, investor_check_size: value[0].toString() }))}
                  max={1000000}
                  min={5000}
                  step={5000}
                  className="w-full"
                />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {formatFundingAmount(parseInt(formData.investor_check_size) || 50000)}
                </div>
                <p className="text-muted-foreground">Typical check size</p>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground px-4">
                <span>$5K</span>
                <span>$1M+</span>
              </div>
            </div>
          </div>
        );

      case 'sector_preference':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">What sectors are you most interested in?</h2>
            </div>
            <MultiSelect
              variant="chips"
              options={industries}
              selected={formData.preferred_sectors}
              onChange={(selected) => setFormData(prev => ({ ...prev, preferred_sectors: selected }))}
            />
          </div>
        );

      case 'stage_preference':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">What stage do you prefer to invest in?</h2>
            </div>
            <MultiSelect
              variant="chips"
              options={investmentStages}
              selected={formData.preferred_stages}
              onChange={(selected) => setFormData(prev => ({ ...prev, preferred_stages: selected }))}
            />
          </div>
        );

      case 'regional_focus':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Which regions do you focus on?</h2>
            </div>
            <MultiSelect
              variant="chips"
              options={regions}
              selected={formData.regional_focus}
              onChange={(selected) => setFormData(prev => ({ ...prev, regional_focus: selected }))}
            />
          </div>
        );

      case 'why_good_fit':
        return (
          <div className="space-y-6 animate-slide-in-right">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">In one sentence, why are you a good fit for Pitchify?</h2>
            </div>
            <Textarea
              placeholder="Tell us what makes you unique and valuable to the Pitchify community..."
              value={formData.why_good_fit}
              onChange={(e) => setFormData(prev => ({ ...prev, why_good_fit: e.target.value }))}
              className="min-h-32 text-lg p-6 border-2 focus:border-primary transition-colors"
              maxLength={200}
            />
            <p className="text-sm text-muted-foreground text-right">
              {formData.why_good_fit.length}/200 characters
            </p>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="text-6xl">🎉</div>
              <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] bg-clip-text text-transparent">
                That's it — Your profile is being created!
              </h1>
              <p className="text-xl text-muted-foreground">We're curating the best matches for you.</p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-secondary/50 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs text-muted-foreground font-medium tracking-wide">
              {steps[currentStep]?.title || 'Unknown'}
            </span>
          </div>
        </div>

        {/* Main content */}
        <Card className="border-2 border-border/50 shadow-2xl backdrop-blur-sm bg-card/95">
          <CardContent className="p-8 md:p-12">
            {renderSlide()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 border-2 hover:border-primary/50 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button 
              onClick={handleComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] hover:from-[#FF4A4F] hover:to-[#FF7E43] transition-all shadow-lg"
            >
              Launch Pitchify
              <Trophy className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!canContinue()}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] hover:from-[#FF4A4F] hover:to-[#FF7E43] disabled:from-muted disabled:to-muted transition-all shadow-lg"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};