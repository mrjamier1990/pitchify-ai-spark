import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PageType } from "../MainApp";
import { 
  Settings, 
  ArrowLeft,
  Crown,
  Edit3,
  Video,
  Link2,
  Download,
  Users,
  Eye,
  TrendingUp,
  Upload,
  Plus,
  Star,
  Calendar,
  MessageSquare,
  Share2,
  Save,
  LogOut,
  User,
  Shield,
  Bell,
  CreditCard,
  Filter,
  Camera,
  Play,
  ExternalLink,
  Award,
  Zap,
  Target,
  ChevronDown,
  Instagram,
  Facebook,
  Twitter,
  Trash2
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import AuroraBackground from '@/components/ui/aurora-background';

interface PersonalProfilePageProps {
  onNavigate: (page: PageType) => void;
}

interface SubscriptionTier {
  name: string;
  price: string;
  superlikes: number;
  features: string[];
  current: boolean;
}

const subscriptionTiers: SubscriptionTier[] = [
  {
    name: "Basic",
    price: "Free",
    superlikes: 5,
    features: ["5 SuperLikes per month", "Basic profile", "Secure role-based matching only"],
    current: false,
  },
  {
    name: "Premium",
    price: "$19/month",
    superlikes: 30,
    features: ["30 SuperLikes per month", "Profile boost", "Unlimited matches", "See who liked you", "Advanced filters"],
    current: true,
  },
  {
    name: "Elite",
    price: "$49/month",
    superlikes: 50,
    features: ["50 SuperLikes per month", "Priority placement", "Advanced filters", "Pitch coach", "AI-powered tools"],
    current: false,
  },
];

const majorCountries = [
  "United States", "United Kingdom", "Canada", "Germany", "France", "Spain", "Italy", "Netherlands", 
  "Switzerland", "Sweden", "Norway", "Denmark", "Finland", "Australia", "New Zealand", "Singapore", 
  "Hong Kong", "Japan", "South Korea", "Israel", "United Arab Emirates", "India", "China", "Brazil", 
  "Mexico", "Argentina", "Chile", "South Africa", "Ireland", "Belgium", "Austria", "Portugal", 
  "Luxembourg", "Iceland", "Estonia", "Latvia", "Lithuania", "Poland", "Czech Republic", "Hungary", 
  "Russia", "Turkey", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman", "Jordan", "Egypt", 
  "Morocco", "Kenya", "Nigeria", "Ghana", "Rwanda", "Botswana", "Mauritius", "Thailand", "Malaysia", 
  "Indonesia", "Philippines", "Vietnam", "Taiwan", "Pakistan", "Bangladesh", "Sri Lanka", "Nepal"
];

const industryOptions = [
  "Technology", "Fintech", "Healthcare", "Biotech", "E-commerce", "SaaS", "Mobile Apps", "AI/ML", 
  "Blockchain", "Cryptocurrency", "Cybersecurity", "EdTech", "PropTech", "CleanTech", "Energy", 
  "Renewable Energy", "Transportation", "Logistics", "Supply Chain", "Manufacturing", "Robotics", 
  "Aerospace", "Defense", "Food & Beverage", "Agriculture", "Fashion", "Beauty", "Sports", "Gaming", 
  "Entertainment", "Media", "Marketing", "Advertising", "Real Estate", "Construction", "Hospitality", 
  "Travel", "Tourism", "Retail", "Consumer Goods", "Telecommunications", "Internet of Things", 
  "Smart Cities", "Sustainability", "Circular Economy", "Social Impact", "Non-profit", "Government", 
  "Legal Services", "Professional Services", "Consulting", "Human Resources", "Recruitment", 
  "Financial Services", "Insurance", "Investment", "Venture Capital", "Private Equity", "Banking", 
  "Accounting", "Tax Services", "Real Estate Investment", "Commodity Trading", "Import/Export", 
  "International Trade", "B2B Services", "B2C Services", "Marketplace", "Platform", "Hardware", 
  "Software", "Cloud Computing", "Data Analytics", "Business Intelligence", "Customer Service", 
  "Sales", "Operations", "Research & Development", "Innovation", "Startup Incubator", "Accelerator"
];

export function PersonalProfilePage({ onNavigate }: PersonalProfilePageProps) {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const { toast: useToastHook } = useToast();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingSocial, setEditingSocial] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    role: 'entrepreneur',
    country: '',
    industry: '',
    investment_range: '',
    funding_stage: '',
    linkedin_url: '',
    calendly_url: '',
    twitter_url: '',
    instagram_url: '',
    facebook_url: '',
    tiktok_url: '',
    open_to_connect: true
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        bio: profile.bio || '',
        role: profile.role || 'entrepreneur',
        country: profile.country || '',
        industry: profile.industry || '',
        investment_range: profile.investment_range || '',
        funding_stage: profile.funding_stage || '',
        linkedin_url: profile.linkedin_url || '',
        calendly_url: profile.calendly_url || '',
        twitter_url: profile.twitter_url || '',
        instagram_url: profile.instagram_url || '',
        facebook_url: profile.facebook_url || '',
        tiktok_url: profile.tiktok_url || '',
        open_to_connect: profile.open_to_connect ?? true
      });
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('user_id', user.id);

      if (error) throw error;

      await refreshProfile();
      setEditMode(false);
      useToastHook({
        title: 'Profile updated',
        description: 'Your profile has been saved successfully.',
      });
    } catch (error: any) {
      useToastHook({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const socialPlatforms = [
    { 
      key: 'linkedin_url', 
      name: 'LinkedIn', 
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 8a6 6 0 0 1 6 6v5h-4v-5a2 2 0 0 0-4 0v5h-4v-9h4v1.5" />
          <circle cx="8" cy="11" r="1" />
        </svg>
      ),
      placeholder: 'https://linkedin.com/in/...',
      color: 'text-blue-600'
    },
    { 
      key: 'twitter_url', 
      name: 'Twitter', 
      icon: Twitter, 
      placeholder: 'https://twitter.com/...',
      color: 'text-sky-500'
    },
    { 
      key: 'instagram_url', 
      name: 'Instagram', 
      icon: Instagram, 
      placeholder: 'https://instagram.com/...',
      color: 'text-pink-500'
    },
    { 
      key: 'facebook_url', 
      name: 'Facebook', 
      icon: Facebook, 
      placeholder: 'https://facebook.com/...',
      color: 'text-blue-700'
    },
    { 
      key: 'tiktok_url', 
      name: 'TikTok', 
      icon: (props: any) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" {...props}>
          <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
        </svg>
      ),
      placeholder: 'https://tiktok.com/@...',
      color: 'text-black dark:text-white'
    },
    { 
      key: 'calendly_url', 
      name: 'Calendly', 
      icon: Calendar, 
      placeholder: 'https://calendly.com/...',
      color: 'text-orange-500'
    }
  ];

  const calculateProfileCompleteness = () => {
    if (!profile) return 0;
    
    const requiredFields = [
      'full_name',
      'bio',
      'role',
      'country',
      'industry'
    ];
    
    const optionalFields = [
      'linkedin_url',
      'calendly_url',
      'twitter_url',
      'instagram_url',
      'facebook_url',
      'tiktok_url',
      'investment_range',
      'funding_stage'
    ];
    
    let completedRequired = 0;
    let completedOptional = 0;
    
    // Check required fields (weighted more heavily)
    requiredFields.forEach(field => {
      if (profile[field as keyof typeof profile] && profile[field as keyof typeof profile] !== '') {
        completedRequired++;
      }
    });
    
    // Check optional fields
    optionalFields.forEach(field => {
      if (profile[field as keyof typeof profile] && profile[field as keyof typeof profile] !== '') {
        completedOptional++;
      }
    });
    
    // Calculate percentage: 70% weight for required fields, 30% for optional
    const requiredPercentage = (completedRequired / requiredFields.length) * 70;
    const optionalPercentage = (completedOptional / optionalFields.length) * 30;
    
    return Math.round(requiredPercentage + optionalPercentage);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      
      const { data, error } = await supabase.functions.invoke('delete-account');
      
      if (error) {
        console.error('Delete account error:', error);
        toast.error('Failed to delete account. Please try again.');
        return;
      }

      if (data?.success) {
        toast.success('Account deleted successfully');
        // Force logout and redirect to home
        await supabase.auth.signOut();
        // Clear local storage to ensure clean state
        localStorage.clear();
        window.location.href = '/';
      } else {
        toast.error('Failed to delete account. Please try again.');
      }
      
    } catch (error) {
      console.error('Unexpected error during account deletion:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your profile</h2>
          <Button onClick={() => onNavigate('swipe')}>
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <AuroraBackground>
      <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 flex-shrink-0">
        <div className="flex items-center justify-between p-4">
          <Button 
            onClick={() => onNavigate("swipe")}
            className="font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <h1 className="text-xl font-semibold text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>My Profile</h1>
          
          <Button 
            onClick={handleSignOut}
            className="font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-4 pt-8 space-y-8 max-w-4xl mx-auto pb-8 w-full min-w-0">
          <Tabs defaultValue="profile" className="w-full md:w-[800px] md:mx-auto">
            <TabsList className="grid w-full grid-cols-4 gap-2 bg-transparent p-0 mb-8">
                            <TabsTrigger value="profile" className="font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none data-[state=active]:border data-[state=active]:border-white/80" style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>Profile</TabsTrigger>
              <TabsTrigger value="filters" className="font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none data-[state=active]:border data-[state=active]:border-white/80" style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>Filters</TabsTrigger>
              <TabsTrigger value="subscription" className="font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none data-[state=active]:border data-[state=active]:border-white/80" style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>Plans</TabsTrigger>
              <TabsTrigger value="settings" className="font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none data-[state=active]:border data-[state=active]:border-white/80" style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6 w-full min-w-0">
              <div className="w-full">
                {/* Profile Header */}
                <Card className="border-border/50 backdrop-blur-sm relative w-full" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)', width: '100%', maxWidth: '100%' }}>
                <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                  <Button 
                    onClick={() => editMode ? handleSaveProfile() : setEditMode(true)}
                    disabled={loading}
                    className="font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    {editMode ? (
                      <Save className="w-4 h-4" />
                    ) : (
                      <Edit3 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <CardContent className="p-3">
                  <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 flex-1 min-w-0 w-full">
                    {/* Profile info card - full width on mobile, left side on desktop */}
                    <div 
                      className="w-full md:w-36 bg-gradient-to-b from-white/10 to-white/5 rounded-lg p-3 border border-white/20 backdrop-blur-sm relative flex-shrink-0"
                      style={{
                        background: `
                          linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(255,255,255,0.05)),
                          repeating-linear-gradient(120deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 0.5px, transparent 1px, transparent 5px)
                        `
                      }}
                    >
                      {/* Profile picture - positioned half in/out on mobile */}
                      <div className="relative flex justify-center">
                        <div className="relative -mt-10 md:mt-0">
                          <Avatar className="w-24 h-24 md:w-20 md:h-20 border border-transparent bg-gradient-to-r from-[#ff7300] via-[#ff477e] to-[#017ed5] p-[1px] rounded-full">
                            <div className="w-full h-full rounded-full overflow-hidden">
                              <AvatarImage src={profile?.profile_image_url || "/placeholder.svg"} alt="Profile" />
                              <AvatarFallback className="bg-background">
                                {profile?.full_name ? profile.full_name.split(' ').map((n: string) => n[0]).join('') : user?.email?.[0].toUpperCase()}
                              </AvatarFallback>
                            </div>
                          </Avatar>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 mt-4 md:mt-0 w-full">
                        {/* Name */}
                        <div className="w-full">
                          <h2 className="text-lg md:text-base font-bold text-white break-words w-full text-center">
                            {profile?.full_name || 'Complete your profile'}
                          </h2>
                        </div>
                        
                        {/* Entrepreneur badge */}
                        <div className="flex justify-center">
                          <span className="capitalize bg-white/20 px-2 py-0.5 rounded-full text-white border border-white/30 text-xs">
                            {profile?.role || 'entrepreneur'}
                          </span>
                        </div>
                        
                        {/* Location */}
                        <div className="flex justify-center">
                          <div className="flex items-center gap-1 text-xs text-white/80">
                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            <span className="text-xs">{profile?.country || 'Location not set'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bio content - full width on mobile, right side on desktop */}
                    <div className="w-full md:flex-1 min-w-0 space-y-3 flex-1">
                      <div 
                        className="rounded-lg p-3 border border-white/20 backdrop-blur-sm"
                        style={{
                          background: `
                            linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(255,255,255,0.05)),
                            repeating-linear-gradient(120deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 0.5px, transparent 1px, transparent 5px)
                          `
                        }}
                      >
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          {profile?.bio || 'Add a bio to tell others about yourself and what you\'re looking for. This helps potential matches understand your goals and interests.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {editMode && (
                    <div className="mt-6 space-y-4 pt-6 border-t border-border/50">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="full_name">Full Name</Label>
                          <Input
                            id="full_name"
                            value={formData.full_name}
                            onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                            placeholder="Enter your full name"
                            className="text-lg p-6 border border-white focus:border-[#ff7300] transition-colors rounded-full placeholder:text-sm placeholder:font-light placeholder:text-muted-foreground"
                          />
                        </div>
                        
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => setFormData({...formData, bio: e.target.value})}
                          placeholder="Tell others about yourself..."
                          className="text-lg p-6 border border-white focus:border-[#ff7300] transition-colors rounded-2xl min-h-[120px] placeholder:text-sm placeholder:font-light placeholder:text-muted-foreground"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                            <SelectTrigger className="text-base font-normal p-6 border border-white rounded-full bg-transparent !bg-transparent text-white focus:border-white transition-colors pl-4 rounded-full text-left placeholder:text-sm placeholder:font-light placeholder:text-muted-foreground" style={{ background: 'transparent !important' }}>
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#18181b55] backdrop-blur-2xl text-white rounded-xl border border-[#232326] max-h-60">
                              {majorCountries.map((country) => (
                                <SelectItem key={country} value={country} className="focus:bg-[#ff7300] focus:text-white data-[state=checked]:bg-[#ff7300] data-[state=checked]:text-white rounded-full px-4 py-2 transition-colors">{country}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="industry">Industry Focus</Label>
                          <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})}>
                            <SelectTrigger className="text-base font-normal p-6 border border-white rounded-full bg-transparent !bg-transparent text-white focus:border-white transition-colors pl-4 rounded-full text-left placeholder:text-sm placeholder:font-light placeholder:text-muted-foreground" style={{ background: 'transparent !important' }}>
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#18181b55] backdrop-blur-2xl text-white rounded-xl border border-[#232326] max-h-60">
                              {industryOptions.map((industry) => (
                                <SelectItem key={industry} value={industry} className="focus:bg-[#ff7300] focus:text-white data-[state=checked]:bg-[#ff7300] data-[state=checked]:text-white rounded-full px-4 py-2 transition-colors">{industry}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {formData.role === 'investor' && (
                        <div className="space-y-2">
                          <Label htmlFor="investment_range">Investment Range</Label>
                          <Input
                            id="investment_range"
                            value={formData.investment_range}
                            onChange={(e) => setFormData({...formData, investment_range: e.target.value})}
                            placeholder="e.g., $10K - $100K"
                            className="text-lg p-6 border border-white/20 focus:border-[#ff7300] transition-colors rounded-full"
                          />
                        </div>
                      )}

                      {formData.role === 'entrepreneur' && (
                        <div className="space-y-2">
                          <Label htmlFor="funding_stage">Funding Stage</Label>
                          <Select value={formData.funding_stage} onValueChange={(value) => setFormData({...formData, funding_stage: value})}>
                            <SelectTrigger className="text-base font-normal p-6 border border-white rounded-full bg-transparent !bg-transparent text-white focus:border-white transition-colors pl-4 rounded-full text-left placeholder:text-sm placeholder:font-light placeholder:text-muted-foreground" style={{ background: 'transparent !important' }}>
                              <SelectValue placeholder="Select funding stage" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#18181b55] backdrop-blur-2xl text-white rounded-xl border border-[#232326]">
                              <SelectItem value="pre-seed" className="focus:bg-[#ff7300] focus:text-white data-[state=checked]:bg-[#ff7300] data-[state=checked]:text-white rounded-full px-4 py-2 transition-colors">Pre-seed</SelectItem>
                              <SelectItem value="seed" className="focus:bg-[#ff7300] focus:text-white data-[state=checked]:bg-[#ff7300] data-[state=checked]:text-white rounded-full px-4 py-2 transition-colors">Seed</SelectItem>
                              <SelectItem value="series-a" className="focus:bg-[#ff7300] focus:text-white data-[state=checked]:bg-[#ff7300] data-[state=checked]:text-white rounded-full px-4 py-2 transition-colors">Series A</SelectItem>
                              <SelectItem value="series-b" className="focus:bg-[#ff7300] focus:text-white data-[state=checked]:bg-[#ff7300] data-[state=checked]:text-white rounded-full px-4 py-2 transition-colors">Series B</SelectItem>
                              <SelectItem value="series-c" className="focus:bg-[#ff7300] focus:text-white data-[state=checked]:bg-[#ff7300] data-[state=checked]:text-white rounded-full px-4 py-2 transition-colors">Series C+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Social Media & Calendar</Label>
                          <div style={{height: '24px'}} />
                          <div className="flex flex-row gap-3 items-center w-full justify-between mt-10">
                            {socialPlatforms.map((platform) => (
                              <button
                                key={platform.key}
                                type="button"
                                onClick={() => setEditingSocial(platform.key)}
                                className={`w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-[#18181bdd] backdrop-blur-xl transition-colors hover:bg-gradient-to-r hover:from-[#ff730011] hover:to-[#ff477e11] hover:shadow-[0_0_24px_0_#ff730022] focus:bg-gradient-to-r focus:from-[#ff730011] focus:to-[#ff477e11] focus:shadow-[0_0_24px_0_#ff730022] ${formData[platform.key as keyof typeof formData] ? 'ring-2 ring-[#ff7300] shadow-[0_0_24px_0_#ff730022]' : ''}`}
                                title={platform.name}
                              >
                                <platform.icon className={`w-5 h-5 ${platform.color}`} />
                              </button>
                            ))}
                          </div>
                        </div>

                        {editingSocial && (
                          <div className="space-y-2 p-4 bg-muted/30 rounded-lg border border-border animate-fade-in">
                            <div className="flex items-center justify-between">
                              <Label className="flex items-center gap-2">
                                {(() => {
                                  const platform = socialPlatforms.find(p => p.key === editingSocial);
                                  const IconComponent = platform?.icon || Link2;
                                  return (
                                    <>
                                      <IconComponent className={`w-4 h-4 ${platform?.color || 'text-muted-foreground'}`} />
                                      {platform?.name} URL
                                    </>
                                  );
                                })()}
                              </Label>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setEditingSocial(null)}
                                className="text-muted-foreground hover:text-[#ff7300]"
                              >
                                ✕
                              </Button>
                            </div>
                            <Input
                              value={formData[editingSocial as keyof typeof formData] as string || ''}
                              onChange={(e) => setFormData({...formData, [editingSocial]: e.target.value})}
                              placeholder={socialPlatforms.find(p => p.key === editingSocial)?.placeholder}
                              className="text-lg p-6 border border-white/20 focus:border-primary transition-colors rounded-full bg-[#18181bdd] text-white placeholder:text-sm placeholder:font-light placeholder:text-muted-foreground"
                            />
                          </div>
                        )}

                        {/* Display added social links */}
                        <div className="space-y-2">
                          {socialPlatforms
                            .filter(platform => formData[platform.key as keyof typeof formData])
                            .map((platform) => (
                              <div key={platform.key} className="flex items-center justify-between p-2 bg-muted/20 rounded-md">
                                <div className="flex items-center gap-2">
                                  <platform.icon className={`w-4 h-4 ${platform.color}`} />
                                  <span className="text-sm font-medium">{platform.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => setEditingSocial(platform.key)}
                                    className="text-xs hover:text-[#ff7300]"
                                  >
                                    Edit
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => setFormData({...formData, [platform.key]: ''})}
                                    className="text-xs text-destructive hover:text-[#ff7300]"
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Profile Stats */}
              <Card className="border-border/50 backdrop-blur-sm w-full" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full overflow-hidden">
                    <div className="text-center p-3 bg-gradient-to-br from-[#ff7300]/20 via-[#ff477e]/15 to-[#017ed5]/10 backdrop-blur-xl rounded-lg border border-[#ff7300]/20">
                      <div className="text-xl md:text-2xl font-bold text-white">247</div>
                      <div className="text-xs md:text-sm text-white/80 flex items-center justify-center gap-1">
                        <Eye className="w-3 h-3 text-white/80" />
                        Profile Views
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-[#017ed5]/20 via-[#b53dff]/15 to-[#8d00c4]/10 backdrop-blur-xl rounded-lg border border-[#017ed5]/20">
                      <div className="text-xl md:text-2xl font-bold text-white">89</div>
                      <div className="text-xs md:text-sm text-white/80 flex items-center justify-center gap-1">
                        <Users className="w-3 h-3 text-white/80" />
                        Connections
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-[#b53dff]/20 via-[#8d00c4]/15 to-[#ff7300]/10 backdrop-blur-xl rounded-lg border border-[#b53dff]/20">
                      <div className="text-xl md:text-2xl font-bold text-white">156</div>
                      <div className="text-xs md:text-sm text-white/80 flex items-center justify-center gap-1">
                        <MessageSquare className="w-3 h-3 text-white/80" />
                        Messages
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-[#8d00c4]/20 via-[#ff7300]/15 to-[#ff477e]/10 backdrop-blur-xl rounded-lg border border-[#8d00c4]/20">
                      <div className="text-xl md:text-2xl font-bold text-white">23</div>
                      <div className="text-xs md:text-sm flex items-center justify-center gap-1 text-white/80">
                        <Star className="w-3 h-3 text-white/80" />
                        SuperLikes Left
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Videos Section */}
              <Card className="border-border/50 backdrop-blur-sm w-full" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="w-5 h-5 mr-2 text-primary" />
                    My Videos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>About Me Video</Label>
                      <div 
                        className="aspect-video rounded-lg flex items-center justify-center border border-white/20 backdrop-blur-sm"
                        style={{
                          background: `
                            linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(255,255,255,0.05)),
                            repeating-linear-gradient(120deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 0.5px, transparent 1px, transparent 5px)
                          `
                        }}
                      >
                        <div className="text-center">
                          <Play className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">No video uploaded</p>
                          <Button size="sm" variant="outline" className="mt-2 font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none" style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                            <Camera className="w-4 h-4 mr-2" />
                            Record/Upload
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Pitch Video</Label>
                      <div 
                        className="aspect-video rounded-lg flex items-center justify-center border border-white/20 backdrop-blur-sm"
                        style={{
                          background: `
                            linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(255,255,255,0.05)),
                            repeating-linear-gradient(120deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 0.5px, transparent 1px, transparent 5px)
                          `
                        }}
                      >
                        <div className="text-center">
                          <Play className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">No video uploaded</p>
                          <Button size="sm" variant="outline" className="mt-2 font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none" style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                            <Camera className="w-4 h-4 mr-2" />
                            Record/Upload
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="border-border/50 backdrop-blur-sm w-full" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                    Activity Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-[#ff7300]/10 via-[#ff477e]/15 to-[#017ed5]/10 rounded-lg border border-[#ff7300]/20">
                      <div className="text-2xl font-bold text-white">4.8</div>
                      <div className="text-sm text-white/80 flex items-center justify-center gap-1">
                        <Star className="w-3 h-3" />
                        Profile Rating
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-[#017ed5]/10 via-[#b53dff]/15 to-[#8d00c4]/10 rounded-lg border border-[#017ed5]/20">
                      <div className="text-2xl font-bold text-white">73%</div>
                      <div className="text-sm text-white/80 flex items-center justify-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Match Rate
                      </div>
                    </div>
                  </div>
                  

                  
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2 w-full">
                    <Button variant="outline" size="sm" className="flex items-center gap-2 w-full sm:w-auto font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none" style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                      <Download className="w-4 h-4" />
                      Export Data
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 w-full sm:w-auto font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none" style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                      <Share2 className="w-4 h-4" />
                      Share Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </div>
            </TabsContent>

            <TabsContent value="filters" className="space-y-6 w-full min-w-0">
                              <Card className="border-border/50 backdrop-blur-sm relative w-full" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)', width: '100%', maxWidth: '100%' }}>
                <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                  <Button className="font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none" style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-primary" />
                    Match Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">                  <div className="p-4 rounded-lg border-coral" style={{ background: 'transparent' }}>
                    <div className="flex items-start space-x-2">
                      <Shield className="w-5 h-5 text-white mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          Idea Protection Policy
                        </p>
                        <p className="text-xs text-white mt-1">
                          For confidentiality protection, entrepreneurs can only match with investors. Same-role matching is permanently disabled to prevent idea theft.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>You can only match with</Label>
                      <div className="p-3 bg-muted/50 rounded-lg border">
                        <p className="text-sm font-medium">
                          {profile?.role === 'investor' ? 'Entrepreneurs Only' : 'Investors Only'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          This restriction protects intellectual property and prevents idea theft
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Industry Focus</Label>
                      <Select defaultValue="all">
                        <SelectTrigger className="text-lg p-6 border border-white rounded-full bg-transparent !bg-transparent text-white focus:border-white transition-colors pl-4 rounded-full text-left" style={{ background: 'transparent !important' }}>
                          <SelectValue placeholder="Select industry focus" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#18181b55] backdrop-blur-2xl text-white rounded-xl border border-[#232326] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ff7300]/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#ff7300]/70 [&_*]:focus:outline-none [&_*]:focus:ring-0">
                          {industryOptions.map((industry) => (
                            <SelectItem key={industry} value={industry.toLowerCase().replace(/\s+/g, '-')} className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">
                              {industry}
                            </SelectItem>
                          ))}
                          <SelectItem value="all" className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">All Industries</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Geographic Preference</Label>
                    <Select defaultValue="global">
                      <SelectTrigger className="text-lg p-6 border border-white rounded-full bg-transparent !bg-transparent text-white focus:border-white transition-colors pl-4 rounded-full text-left" style={{ background: 'transparent !important' }}>
                        <SelectValue placeholder="Select geographic preference" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#18181b55] backdrop-blur-2xl text-white rounded-xl border border-[#232326] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ff7300]/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#ff7300]/70 [&_*]:focus:outline-none [&_*]:focus:ring-0">
                        <SelectItem value="local" className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">Local (Same Country)</SelectItem>
                        <SelectItem value="regional" className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">Regional (Same Continent)</SelectItem>
                        {majorCountries.map((country) => (
                          <SelectItem key={country} value={country.toLowerCase().replace(/\s+/g, '-')} className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">
                            {country}
                          </SelectItem>
                        ))}
                        <SelectItem value="global" className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">Global (All Countries)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Funding Stage (for Entrepreneurs)</Label>
                    <Select defaultValue="all">
                      <SelectTrigger className="text-lg p-6 border border-white rounded-full bg-transparent !bg-transparent text-white focus:border-white transition-colors pl-4 rounded-full text-left" style={{ background: 'transparent !important' }}>
                        <SelectValue placeholder="Select funding stage" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#18181b55] backdrop-blur-2xl text-white rounded-xl border border-[#232326] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ff7300]/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#ff7300]/70 [&_*]:focus:outline-none [&_*]:focus:ring-0">
                        <SelectItem value="pre-seed" className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">Pre-seed</SelectItem>
                        <SelectItem value="seed" className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">Seed</SelectItem>
                        <SelectItem value="series-a" className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">Series A</SelectItem>
                        <SelectItem value="series-b" className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">Series B</SelectItem>
                        <SelectItem value="series-c" className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">Series C+</SelectItem>
                        <SelectItem value="all" className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">All Stages</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Investment Range (for Investors)</Label>
                    <Select defaultValue="all">
                      <SelectTrigger className="text-lg p-6 border border-white rounded-full bg-transparent !bg-transparent text-white focus:border-white transition-colors pl-4 rounded-full text-left" style={{ background: 'transparent !important' }}>
                        <SelectValue placeholder="Select investment range" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#18181b55] backdrop-blur-2xl text-white rounded-xl border border-[#232326] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ff7300]/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#ff7300]/70 [&_*]:focus:outline-none [&_*]:focus:ring-0">
                        <SelectItem value="under-10k" className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">Under $10K</SelectItem>
                        <SelectItem value="10k-50k" className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">$10K - $50K</SelectItem>
                        <SelectItem value="50k-100k" className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">$50K - $100K</SelectItem>
                        <SelectItem value="100k-500k" className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">$100K - $500K</SelectItem>
                        <SelectItem value="500k-1m" className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">$500K - $1M</SelectItem>
                        <SelectItem value="1m-plus" className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">$1M+</SelectItem>
                        <SelectItem value="all" className="text-white focus:bg-gradient-to-r focus:from-[#ff7300] focus:to-[#ff477e] focus:text-white focus:outline-none focus:ring-0 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#ff7300] data-[state=checked]:to-[#ff477e] data-[state=checked]:text-white data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#ff7300] data-[highlighted]:to-[#ff477e] data-[highlighted]:text-white rounded-full px-4 py-2 transition-colors">All Ranges</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

                        <TabsContent value="subscription" className="space-y-6 w-full min-w-0">
                {/* Subscription Tiers */}
                <Card className="border-border/50 backdrop-blur-sm w-full" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)', width: '100%', maxWidth: '100%' }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="w-5 h-5 mr-2 text-primary" />
                    Subscription Plans
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {subscriptionTiers.map((tier) => (
                    <div
                      key={tier.name}
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        tier.current
                          ? "border-[#ff7300] bg-[#ff7300]/5 ring-1 ring-[#ff7300]/20"
                          : "border-border/50 hover:border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{tier.name}</h3>
                            {tier.current && (
                              <Badge variant="default" className="bg-gradient-to-r from-[#ff7300] via-[#ff477e] to-[#017ed5] text-white">
                                Current Plan
                              </Badge>
                            )}
                          </div>
                          <p className="text-2xl font-bold text-white mt-1">{tier.price}</p>
                          <p className="text-sm text-muted-foreground">{tier.superlikes} SuperLikes/month</p>
                        </div>
                        
                        <div className="text-right">
                          {!tier.current && (
                            <Button variant="outline" size="sm" className="font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-[#ff7300cc] hover:backdrop-blur-sm focus:bg-[#ff7300cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none" style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                              <Zap className="w-4 h-4 mr-2" />
                              {tier.name === "Basic" ? "Downgrade" : "Upgrade"}
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="grid grid-cols-1 gap-1">
                          {tier.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-white">
                              <div className="w-1 h-1 bg-gradient-to-r from-[#ff7300] to-[#ff477e] rounded-full mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* AI Tools */}
              <Card className="border-border/50 backdrop-blur-sm w-full" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-primary" />
                    AI-Powered Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#ff7300] via-[#ff477e] to-[#017ed5] rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">PitchGPT</p>
                        <p className="text-sm text-muted-foreground">Generate perfect pitch scripts</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Premium</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#017ed5] via-[#b53dff] to-[#8d00c4] rounded-lg flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">AI Pitch Coach</p>
                        <p className="font-medium">Get feedback on your videos</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Premium</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#b53dff] via-[#8d00c4] to-[#ff7300] rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Smart Intro Assistant</p>
                        <p className="text-sm text-muted-foreground">AI-generated conversation starters</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Elite</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

                        <TabsContent value="settings" className="space-y-6 w-full min-w-0">
                <Card className="border-border/50 backdrop-blur-sm w-full" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)', width: '100%', maxWidth: '100%' }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-primary" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive match and message notifications</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Get notified about new matches</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Profile Visibility</p>
                        <p className="text-sm text-muted-foreground">Allow others to find your profile</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium">Danger Zone</h4>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full font-light text-base rounded-full px-4 py-2 text-white transition-all duration-300 shadow-none hover:bg-red-600/80 hover:backdrop-blur-sm focus:bg-red-600/80 focus:backdrop-blur-sm focus:ring-0 focus:outline-none" style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'rgba(239, 68, 68, 0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Account Permanently</AlertDialogTitle>
                          <AlertDialogDescription className="space-y-2">
                            <p>This action cannot be undone. This will permanently:</p>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              <li>Delete your profile and all personal data</li>
                              <li>Remove all your matches and conversations</li>
                              <li>Delete your account from our system</li>
                            </ul>
                            <p className="text-destructive font-semibold">
                              If you sign up again with the same email, you'll start completely fresh.
                            </p>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteAccount}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {isDeleting ? 'Deleting...' : 'Delete Forever'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
    </AuroraBackground>
  );
}
