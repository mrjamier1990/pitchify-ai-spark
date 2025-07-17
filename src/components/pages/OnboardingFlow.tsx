import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, Rocket, DollarSign, Handshake, Link, MapPin, CheckCircle, Zap } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
  userEmail: string;
  userId: string;
}

type OnboardingStep = 
  | 'welcome'
  | 'full-name'
  | 'linkedin'
  | 'location'
  | 'role'
  | 'startup-name'
  | 'startup-industry'
  | 'startup-stage'
  | 'complete';

interface FormData {
  fullName: string;
  linkedinProfile: string;
  country: string;
  role: 'founder' | 'investor' | 'both' | '';
  startupName: string;
  startupIndustry: string[];
  startupStage: string;
}

const industries = [
  { label: 'SaaS', icon: '💻' },
  { label: 'AI/ML', icon: '🤖' },
  { label: 'FinTech', icon: '💰' },
  { label: 'HealthTech', icon: '🏥' },
  { label: 'Web3/Crypto', icon: '⛓️' },
  { label: 'E-commerce', icon: '🛒' },
  { label: 'EdTech', icon: '📚' },
  { label: 'CleanTech', icon: '🌱' },
  { label: 'Gaming', icon: '🎮' },
  { label: 'Social', icon: '👥' },
  { label: 'Travel', icon: '✈️' },
  { label: 'Food Tech', icon: '🍕' }
];

const startupStages = [
  { label: 'Just an Idea', icon: '🧠' },
  { label: 'MVP / Beta', icon: '🔧' },
  { label: 'Launched with some traction', icon: '🚀' },
  { label: 'Generating revenue', icon: '💵' },
  { label: 'Scaling', icon: '📈' }
];

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Germany', 'France', 'Netherlands',
  'Australia', 'Singapore', 'Israel', 'India', 'UAE', 'Saudi Arabia', 'Other'
];

export function OnboardingFlow({ onComplete, userEmail, userId }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    linkedinProfile: '',
    country: '',
    role: '',
    startupName: '',
    startupIndustry: [],
    startupStage: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getSteps = (): OnboardingStep[] => {
    const universalSteps: OnboardingStep[] = ['welcome', 'full-name', 'linkedin', 'location', 'role'];
    
    if (formData.role === 'founder' || formData.role === 'both') {
      return [...universalSteps, 'startup-name', 'startup-industry', 'startup-stage', 'complete'];
    }
    
    return [...universalSteps, 'complete'];
  };

  const steps = getSteps();
  const currentStepIndex = steps.indexOf(currentStep);

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const profileData = {
        user_id: userId,
        email: userEmail,
        full_name: formData.fullName,
        role: formData.role,
        country: formData.country,
        linkedin_url: formData.linkedinProfile,
        open_to_connect: true
      };

      if (formData.role === 'founder' || formData.role === 'both') {
        Object.assign(profileData, {
          industry: formData.startupIndustry.join(', '),
          funding_stage: formData.startupStage
        });
      }

      const { error } = await supabase
        .from('profiles')
        .upsert(profileData);

      if (error) throw error;

      toast({
        title: '🎉 Welcome to Pitchify!',
        description: 'Your profile is ready. Let\'s find your perfect matches.',
      });

      onComplete();
    } catch (error: any) {
      toast({
        title: 'Error creating profile',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const canContinue = () => {
    switch (currentStep) {
      case 'welcome':
        return true;
      case 'full-name':
        return formData.fullName.trim().length > 0;
      case 'linkedin':
        return true; // Optional
      case 'location':
        return formData.country.length > 0;
      case 'role':
        return formData.role.length > 0;
      case 'startup-name':
        return formData.startupName.trim().length > 0;
      case 'startup-industry':
        return formData.startupIndustry.length > 0;
      case 'startup-stage':
        return formData.startupStage.length > 0;
      default:
        return true;
    }
  };

  const renderSlide = () => {
    const slideClass = `
      min-h-screen bg-gradient-to-br from-[#FF5A5F] via-[#1E1F26] to-[#2B2C34] 
      flex items-center justify-center p-6 transition-all duration-700 ease-in-out
      animate-fade-in
    `;

    switch (currentStep) {
      case 'welcome':
        return (
          <div className={slideClass}>
            <div className="text-center text-white max-w-md space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Welcome to Pitchify</h1>
                <p className="text-xl text-white/80">Let's personalize your experience</p>
              </div>
              <Button 
                onClick={nextStep}
                size="lg"
                className="bg-white text-[#FF5A5F] hover:bg-white/90 font-semibold px-8 py-3 rounded-full"
              >
                Start <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        );

      case 'full-name':
        return (
          <div className={slideClass}>
            <div className="w-full max-w-md text-center space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">What's your full name?</h2>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                className="text-center text-xl py-6 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                onKeyPress={(e) => e.key === 'Enter' && canContinue() && nextStep()}
                autoFocus
              />
              {canContinue() && (
                <Button 
                  onClick={nextStep}
                  size="lg"
                  className="bg-white text-[#FF5A5F] hover:bg-white/90 font-semibold px-8 py-3 rounded-full animate-scale-in"
                >
                  Continue <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        );

      case 'linkedin':
        return (
          <div className={slideClass}>
            <div className="w-full max-w-md text-center space-y-8 animate-fade-in">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white">What's your LinkedIn profile?</h2>
                <p className="text-white/70">(Optional)</p>
              </div>
              <div className="relative">
                <Input
                  value={formData.linkedinProfile}
                  onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })}
                  placeholder="linkedin.com/in/yourprofile"
                  className="text-center text-lg py-6 pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  onKeyPress={(e) => e.key === 'Enter' && nextStep()}
                />
                <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              </div>
              <Button 
                onClick={nextStep}
                size="lg"
                className="bg-white text-[#FF5A5F] hover:bg-white/90 font-semibold px-8 py-3 rounded-full"
              >
                Continue <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className={slideClass}>
            <div className="w-full max-w-md text-center space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">Where are you currently based?</h2>
              <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                <SelectTrigger className="text-center text-lg py-6 bg-white/10 border-white/20 text-white">
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <SelectValue placeholder="Select your country" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {canContinue() && (
                <Button 
                  onClick={nextStep}
                  size="lg"
                  className="bg-white text-[#FF5A5F] hover:bg-white/90 font-semibold px-8 py-3 rounded-full animate-scale-in"
                >
                  Continue <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        );

      case 'role':
        return (
          <div className={slideClass}>
            <div className="w-full max-w-2xl text-center space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">Which best describes you?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { value: 'founder', icon: Rocket, label: "I'm a Founder", desc: 'Looking for investors' },
                  { value: 'investor', icon: DollarSign, label: "I'm an Investor", desc: 'Looking for startups' },
                  { value: 'both', icon: Handshake, label: "I'm Both", desc: 'Founder & Investor' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, role: option.value as any })}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      formData.role === option.value
                        ? 'border-white bg-white/20 scale-105'
                        : 'border-white/30 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <option.icon className="w-8 h-8 text-white mx-auto mb-3" />
                    <div className="text-white font-semibold text-lg">{option.label}</div>
                    <div className="text-white/70 text-sm mt-1">{option.desc}</div>
                  </button>
                ))}
              </div>
              {canContinue() && (
                <Button 
                  onClick={nextStep}
                  size="lg"
                  className="bg-white text-[#FF5A5F] hover:bg-white/90 font-semibold px-8 py-3 rounded-full animate-scale-in"
                >
                  Continue <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        );

      case 'startup-name':
        return (
          <div className={slideClass}>
            <div className="w-full max-w-md text-center space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">What's the name of your startup?</h2>
              <Input
                value={formData.startupName}
                onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
                placeholder="Enter your startup name"
                className="text-center text-xl py-6 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                onKeyPress={(e) => e.key === 'Enter' && canContinue() && nextStep()}
                autoFocus
              />
              {canContinue() && (
                <Button 
                  onClick={nextStep}
                  size="lg"
                  className="bg-white text-[#FF5A5F] hover:bg-white/90 font-semibold px-8 py-3 rounded-full animate-scale-in"
                >
                  Continue <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        );

      case 'startup-industry':
        return (
          <div className={slideClass}>
            <div className="w-full max-w-2xl text-center space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">What industry or category best fits your startup?</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {industries.map((industry) => (
                  <button
                    key={industry.label}
                    onClick={() => {
                      const isSelected = formData.startupIndustry.includes(industry.label);
                      setFormData({
                        ...formData,
                        startupIndustry: isSelected
                          ? formData.startupIndustry.filter(i => i !== industry.label)
                          : [...formData.startupIndustry, industry.label]
                      });
                    }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.startupIndustry.includes(industry.label)
                        ? 'border-white bg-white/20'
                        : 'border-white/30 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-2xl mb-2">{industry.icon}</div>
                    <div className="text-white font-medium text-sm">{industry.label}</div>
                  </button>
                ))}
              </div>
              {canContinue() && (
                <Button 
                  onClick={nextStep}
                  size="lg"
                  className="bg-white text-[#FF5A5F] hover:bg-white/90 font-semibold px-8 py-3 rounded-full animate-scale-in"
                >
                  Continue <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        );

      case 'startup-stage':
        return (
          <div className={slideClass}>
            <div className="w-full max-w-2xl text-center space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">What stage are you currently at?</h2>
              <div className="space-y-4">
                {startupStages.map((stage) => (
                  <button
                    key={stage.label}
                    onClick={() => setFormData({ ...formData, startupStage: stage.label })}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${
                      formData.startupStage === stage.label
                        ? 'border-white bg-white/20'
                        : 'border-white/30 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-2xl">{stage.icon}</div>
                    <div className="text-white font-medium text-left">{stage.label}</div>
                  </button>
                ))}
              </div>
              {canContinue() && (
                <Button 
                  onClick={nextStep}
                  size="lg"
                  className="bg-white text-[#FF5A5F] hover:bg-white/90 font-semibold px-8 py-3 rounded-full animate-scale-in"
                >
                  Continue <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className={slideClass}>
            <div className="text-center text-white max-w-md space-y-8 animate-fade-in">
              <div className="space-y-6">
                <CheckCircle className="w-16 h-16 text-white mx-auto" />
                <h1 className="text-4xl font-bold tracking-tight">🎉 That's it!</h1>
                <p className="text-xl text-white/80">Your profile is being created!</p>
                <p className="text-white/70">We're curating the best matches for you.</p>
              </div>
              <Button 
                onClick={handleComplete}
                disabled={loading}
                size="lg"
                className="bg-white text-[#FF5A5F] hover:bg-white/90 font-semibold px-8 py-3 rounded-full"
              >
                {loading ? 'Creating Profile...' : 'Launch Pitchify'} <Zap className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className={slideClass}>
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold">Step not implemented yet</h2>
              <Button onClick={nextStep} className="mt-4">Continue</Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Progress indicator */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-white/90 text-sm font-medium">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
        </div>
      </div>

      {/* Slide content */}
      {renderSlide()}
    </div>
  );
}