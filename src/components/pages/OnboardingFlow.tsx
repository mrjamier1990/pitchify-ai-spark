import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, ArrowLeft, Check, Star, Crown, Zap, Users, Building2, TrendingUp, Heart, Target, Globe } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
  userEmail: string;
  userId: string;
}

type OnboardingStep = 'role' | 'basic-info' | 'entrepreneur-details' | 'investor-details' | 'preferences' | 'premium-tier' | 'complete';

interface FormData {
  role: 'entrepreneur' | 'investor' | '';
  fullName: string;
  bio: string;
  country: string;
  industry: string;
  // Entrepreneur specific
  fundingStage: string;
  companySize: string;
  seekingAmount: string;
  // Investor specific
  investmentRange: string;
  portfolioSize: string;
  preferredStages: string[];
  // Preferences
  preferredIndustries: string[];
  locationPreference: string;
  connectionGoals: string[];
  // Premium
  subscriptionTier: 'free' | 'premium' | 'pro';
}

const industries = [
  'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 'Real Estate',
  'Manufacturing', 'Energy', 'Transportation', 'Food & Beverage', 'Entertainment',
  'Agriculture', 'Biotech', 'CleanTech', 'Gaming', 'AI/ML', 'Blockchain', 'Other'
];

const fundingStages = [
  'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Growth Stage', 'Not seeking funding'
];

const investmentRanges = [
  '$1K - $10K', '$10K - $50K', '$50K - $100K', '$100K - $500K', 
  '$500K - $1M', '$1M - $5M', '$5M - $10M', '$10M+'
];

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Germany', 'France', 'Netherlands',
  'Australia', 'Singapore', 'Israel', 'India', 'Other'
];

export function OnboardingFlow({ onComplete, userEmail, userId }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('role');
  const [formData, setFormData] = useState<FormData>({
    role: '',
    fullName: '',
    bio: '',
    country: '',
    industry: '',
    fundingStage: '',
    companySize: '',
    seekingAmount: '',
    investmentRange: '',
    portfolioSize: '',
    preferredStages: [],
    preferredIndustries: [],
    locationPreference: '',
    connectionGoals: [],
    subscriptionTier: 'free'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const steps: OnboardingStep[] = ['role', 'basic-info', 
    formData.role === 'entrepreneur' ? 'entrepreneur-details' : 'investor-details',
    'preferences', 'premium-tier', 'complete'];

  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: userId,
          email: userEmail,
          full_name: formData.fullName,
          role: formData.role,
          bio: formData.bio,
          country: formData.country,
          industry: formData.industry,
          funding_stage: formData.fundingStage,
          investment_range: formData.investmentRange,
          subscription_tier: formData.subscriptionTier,
          open_to_connect: true
        });

      if (error) throw error;

      toast({
        title: 'Profile created successfully!',
        description: 'Welcome to Pitchify. Let\'s find your perfect matches.',
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

  const renderRoleSelection = () => (
    <Card className="border-border/50 backdrop-blur-sm bg-card/95">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">What best describes you?</CardTitle>
        <CardDescription>Choose your primary role to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant={formData.role === 'entrepreneur' ? 'default' : 'outline'}
            className={`h-32 flex flex-col items-center space-y-3 ${
              formData.role === 'entrepreneur' ? 'bg-primary text-primary-foreground' : ''
            }`}
            onClick={() => setFormData({ ...formData, role: 'entrepreneur' })}
          >
            <Building2 className="w-8 h-8" />
            <div className="text-center">
              <div className="font-semibold">Entrepreneur</div>
              <div className="text-xs opacity-75">Looking for investors</div>
            </div>
          </Button>
          
          <Button
            variant={formData.role === 'investor' ? 'default' : 'outline'}
            className={`h-32 flex flex-col items-center space-y-3 ${
              formData.role === 'investor' ? 'bg-primary text-primary-foreground' : ''
            }`}
            onClick={() => setFormData({ ...formData, role: 'investor' })}
          >
            <TrendingUp className="w-8 h-8" />
            <div className="text-center">
              <div className="font-semibold">Investor</div>
              <div className="text-xs opacity-75">Looking for opportunities</div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderBasicInfo = () => (
    <Card className="border-border/50 backdrop-blur-sm bg-card/95">
      <CardHeader>
        <CardTitle>Tell us about yourself</CardTitle>
        <CardDescription>Basic information to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
            <SelectTrigger>
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Primary Industry</Label>
          <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us a bit about yourself and your goals..."
            className="min-h-20"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderEntrepreneurDetails = () => (
    <Card className="border-border/50 backdrop-blur-sm bg-card/95">
      <CardHeader>
        <CardTitle>Your Startup Journey</CardTitle>
        <CardDescription>Help investors understand your venture</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fundingStage">Current Funding Stage</Label>
          <Select value={formData.fundingStage} onValueChange={(value) => setFormData({ ...formData, fundingStage: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select funding stage" />
            </SelectTrigger>
            <SelectContent>
              {fundingStages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="companySize">Company Size</Label>
          <Select value={formData.companySize} onValueChange={(value) => setFormData({ ...formData, companySize: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Just me (Solo founder)</SelectItem>
              <SelectItem value="2-5">2-5 employees</SelectItem>
              <SelectItem value="6-10">6-10 employees</SelectItem>
              <SelectItem value="11-25">11-25 employees</SelectItem>
              <SelectItem value="26-50">26-50 employees</SelectItem>
              <SelectItem value="50+">50+ employees</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="seekingAmount">Seeking Investment Amount</Label>
          <Select value={formData.seekingAmount} onValueChange={(value) => setFormData({ ...formData, seekingAmount: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select amount range" />
            </SelectTrigger>
            <SelectContent>
              {investmentRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );

  const renderInvestorDetails = () => (
    <Card className="border-border/50 backdrop-blur-sm bg-card/95">
      <CardHeader>
        <CardTitle>Your Investment Profile</CardTitle>
        <CardDescription>Help entrepreneurs understand your investment criteria</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="investmentRange">Typical Investment Range</Label>
          <Select value={formData.investmentRange} onValueChange={(value) => setFormData({ ...formData, investmentRange: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select investment range" />
            </SelectTrigger>
            <SelectContent>
              {investmentRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolioSize">Portfolio Size</Label>
          <Select value={formData.portfolioSize} onValueChange={(value) => setFormData({ ...formData, portfolioSize: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select portfolio size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">First-time investor</SelectItem>
              <SelectItem value="1-5">1-5 investments</SelectItem>
              <SelectItem value="6-10">6-10 investments</SelectItem>
              <SelectItem value="11-25">11-25 investments</SelectItem>
              <SelectItem value="25+">25+ investments</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Preferred Funding Stages</Label>
          <div className="grid grid-cols-2 gap-2">
            {fundingStages.slice(0, -1).map((stage) => (
              <label key={stage} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={formData.preferredStages.includes(stage)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({
                        ...formData,
                        preferredStages: [...formData.preferredStages, stage]
                      });
                    } else {
                      setFormData({
                        ...formData,
                        preferredStages: formData.preferredStages.filter(s => s !== stage)
                      });
                    }
                  }}
                />
                <span className="text-sm">{stage}</span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderPreferences = () => (
    <Card className="border-border/50 backdrop-blur-sm bg-card/95">
      <CardHeader>
        <CardTitle>Matching Preferences</CardTitle>
        <CardDescription>Customize your connection experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Industries of Interest</Label>
          <div className="grid grid-cols-2 gap-2">
            {industries.slice(0, 12).map((industry) => (
              <label key={industry} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={formData.preferredIndustries.includes(industry)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({
                        ...formData,
                        preferredIndustries: [...formData.preferredIndustries, industry]
                      });
                    } else {
                      setFormData({
                        ...formData,
                        preferredIndustries: formData.preferredIndustries.filter(i => i !== industry)
                      });
                    }
                  }}
                />
                <span className="text-sm">{industry}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Connection Goals</Label>
          <div className="space-y-2">
            {[
              'Secure funding',
              'Find investment opportunities',
              'Strategic partnerships',
              'Mentorship',
              'Board positions',
              'Market expansion',
              'Networking'
            ].map((goal) => (
              <label key={goal} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={formData.connectionGoals.includes(goal)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({
                        ...formData,
                        connectionGoals: [...formData.connectionGoals, goal]
                      });
                    } else {
                      setFormData({
                        ...formData,
                        connectionGoals: formData.connectionGoals.filter(g => g !== goal)
                      });
                    }
                  }}
                />
                <span className="text-sm">{goal}</span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderPremiumTiers = () => (
    <Card className="border-border/50 backdrop-blur-sm bg-card/95">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Choose Your Plan</CardTitle>
        <CardDescription>Start free and upgrade anytime</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Free Tier */}
          <div className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
            formData.subscriptionTier === 'free' ? 'border-primary bg-primary/5' : 'border-border'
          }`}
          onClick={() => setFormData({ ...formData, subscriptionTier: 'free' })}>
            <div className="text-center space-y-3">
              <Heart className="w-8 h-8 mx-auto text-muted-foreground" />
              <div className="space-y-1">
                <h3 className="font-semibold">Free</h3>
                <p className="text-2xl font-bold">$0<span className="text-sm text-muted-foreground">/month</span></p>
              </div>
              <ul className="text-sm space-y-2 text-left">
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />5 matches per day</li>
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />Basic messaging</li>
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />Profile creation</li>
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />Basic filters</li>
              </ul>
            </div>
          </div>

          {/* Premium Tier */}
          <div className={`p-4 rounded-lg border-2 transition-all cursor-pointer relative ${
            formData.subscriptionTier === 'premium' ? 'border-primary bg-primary/5' : 'border-border'
          }`}
          onClick={() => setFormData({ ...formData, subscriptionTier: 'premium' })}>
            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
              Most Popular
            </Badge>
            <div className="text-center space-y-3">
              <Star className="w-8 h-8 mx-auto text-primary" />
              <div className="space-y-1">
                <h3 className="font-semibold">Premium</h3>
                <p className="text-2xl font-bold">$29<span className="text-sm text-muted-foreground">/month</span></p>
              </div>
              <ul className="text-sm space-y-2 text-left">
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />Unlimited matches</li>
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />Advanced messaging</li>
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />Priority matching</li>
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />Advanced filters</li>
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />Video pitches</li>
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />Analytics insights</li>
              </ul>
            </div>
          </div>

          {/* Pro Tier */}
          <div className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
            formData.subscriptionTier === 'pro' ? 'border-primary bg-primary/5' : 'border-border'
          }`}
          onClick={() => setFormData({ ...formData, subscriptionTier: 'pro' })}>
            <div className="text-center space-y-3">
              <Crown className="w-8 h-8 mx-auto text-yellow-500" />
              <div className="space-y-1">
                <h3 className="font-semibold">Pro</h3>
                <p className="text-2xl font-bold">$99<span className="text-sm text-muted-foreground">/month</span></p>
              </div>
              <ul className="text-sm space-y-2 text-left">
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />Everything in Premium</li>
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />AI pitch coaching</li>
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />Direct introductions</li>
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />Deal room access</li>
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />Market intelligence</li>
                <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" />Concierge support</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderComplete = () => (
    <Card className="border-border/50 backdrop-blur-sm bg-card/95">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
          <Check className="w-8 h-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl">You're all set!</CardTitle>
        <CardDescription>
          Your profile is ready. Let's start connecting you with the right people.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Profile Summary</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>Role:</strong> {formData.role === 'entrepreneur' ? 'Entrepreneur' : 'Investor'}</p>
            <p><strong>Industry:</strong> {formData.industry}</p>
            <p><strong>Location:</strong> {formData.country}</p>
            <p><strong>Plan:</strong> {formData.subscriptionTier === 'free' ? 'Free' : formData.subscriptionTier === 'premium' ? 'Premium' : 'Pro'}</p>
          </div>
        </div>
        
        <Button 
          onClick={handleComplete} 
          className="w-full" 
          size="lg"
          disabled={loading}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Zap className="w-4 h-4 mr-2" />
          )}
          Start Matching
        </Button>
      </CardContent>
    </Card>
  );

  const canContinue = () => {
    switch (currentStep) {
      case 'role':
        return !!formData.role;
      case 'basic-info':
        return !!(formData.fullName && formData.country && formData.industry);
      case 'entrepreneur-details':
        return !!(formData.fundingStage && formData.companySize);
      case 'investor-details':
        return !!(formData.investmentRange && formData.portfolioSize);
      case 'preferences':
        return formData.preferredIndustries.length > 0;
      case 'premium-tier':
        return !!formData.subscriptionTier;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStepIndex + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 'role' && renderRoleSelection()}
          {currentStep === 'basic-info' && renderBasicInfo()}
          {currentStep === 'entrepreneur-details' && renderEntrepreneurDetails()}
          {currentStep === 'investor-details' && renderInvestorDetails()}
          {currentStep === 'preferences' && renderPreferences()}
          {currentStep === 'premium-tier' && renderPremiumTiers()}
          {currentStep === 'complete' && renderComplete()}

          {/* Navigation */}
          {currentStep !== 'complete' && (
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStepIndex === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={nextStep}
                disabled={!canContinue()}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}