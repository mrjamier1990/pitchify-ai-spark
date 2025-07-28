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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PageType } from "../MainApp";
import AuroraBackground from '../ui/aurora-background';
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
  Trash2,
  CheckCircle,
  XCircle,
  Sparkles,
  Heart,
  Briefcase,
  Globe,
  Mail,
  Phone,
  MapPin,
  Building,
  DollarSign,
  Clock,
  Users2,
  MessageCircle,
  ThumbsUp,
  EyeOff,
  Lock,
  Unlock
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

interface PersonalProfilePageV2Props {
  onNavigate: (page: PageType) => void;
}

interface SubscriptionTier {
  name: string;
  price: string;
  superlikes: number;
  features: string[];
  current: boolean;
  color: string;
  gradient: string;
}

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

const subscriptionTiers: SubscriptionTier[] = [
  {
    name: "Basic",
    price: "Free",
    superlikes: 5,
    features: ["5 SuperLikes per month", "Basic profile", "Secure role-based matching only"],
    current: false,
    color: "from-gray-400 to-gray-600",
    gradient: "bg-gradient-to-br from-gray-400 to-gray-600"
  },
  {
    name: "Premium",
    price: "$19/month",
    superlikes: 30,
    features: ["30 SuperLikes per month", "Profile boost", "Unlimited matches", "See who liked you", "Advanced filters"],
    current: true,
    color: "from-purple-400 to-pink-500",
    gradient: "bg-gradient-to-br from-purple-400 to-pink-500"
  },
  {
    name: "Elite",
    price: "$49/month",
    superlikes: 50,
    features: ["50 SuperLikes per month", "Priority placement", "Advanced filters", "Pitch coach", "AI-powered tools"],
    current: false,
    color: "from-yellow-400 to-orange-500",
    gradient: "bg-gradient-to-br from-yellow-400 to-orange-500"
  }
];

export function PersonalProfilePageV2({ onNavigate }: PersonalProfilePageV2Props) {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const { toast: useToastHook } = useToast();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingSocial, setEditingSocial] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
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
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
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
      color: 'text-blue-400'
    },
    { 
      key: 'twitter_url', 
      name: 'Twitter', 
      icon: Twitter, 
      placeholder: 'https://twitter.com/...',
      color: 'text-sky-400'
    },
    { 
      key: 'instagram_url', 
      name: 'Instagram', 
      icon: Instagram, 
      placeholder: 'https://instagram.com/...',
      color: 'text-pink-400'
    },
    { 
      key: 'facebook_url', 
      name: 'Facebook', 
      icon: Facebook, 
      placeholder: 'https://facebook.com/...',
      color: 'text-blue-500'
    },
    { 
      key: 'calendly_url', 
      name: 'Calendly', 
      icon: Calendar, 
      placeholder: 'https://calendly.com/...',
      color: 'text-orange-400'
    }
  ];

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
        await supabase.auth.signOut();
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
      <AuroraBackground>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Please sign in to view your profile</h2>
            <Button 
              onClick={() => onNavigate('swipe')}
              className="aurora-signin-btn"
            >
              Go to App
            </Button>
          </div>
        </div>
      </AuroraBackground>
    );
  }

  return (
    <AuroraBackground>
      <div className="min-h-screen p-4">
        {/* Header */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => onNavigate('swipe')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to App
            </button>
            
            <div className="flex items-center gap-4">
              {editMode && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => setEditMode(false)}
                    variant="outline"
                    className="aurora-signin-btn bg-transparent border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="aurora-signin-btn bg-gradient-to-r from-[#ff7300] to-[#ff477e] hover:from-[#ff7300]/80 hover:to-[#ff477e]/80"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              )}
              
              {!editMode && (
                <Button
                  onClick={() => setEditMode(true)}
                  className="aurora-signin-btn bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Profile Header */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-8" style={{ background: 'rgba(255,255,255,0.32)', backdropFilter: 'blur(12px)' }}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar Section */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ff7300] to-[#ff477e] p-1">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback className="bg-white/20 text-white text-2xl">
                      {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {editMode && (
                  <button className="absolute -bottom-2 -right-2 bg-white/20 backdrop-blur-md rounded-full p-2 border border-white/30 hover:bg-white/30 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">
                    {profile?.full_name || 'Your Name'}
                  </h1>
                  {profile?.role && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                      {profile.role}
                    </Badge>
                  )}
                </div>
                
                <p className="text-white/80 text-lg mb-4">
                  {profile?.bio || 'Tell us about yourself and your investment interests...'}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-white/60">
                    <MapPin className="w-4 h-4" />
                    <span>{profile?.country || 'Location'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <Building className="w-4 h-4" />
                    <span>{profile?.industry || 'Industry'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <DollarSign className="w-4 h-4" />
                    <span>{profile?.investment_range || 'Investment Range'}</span>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${formData.open_to_connect ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-white/80 text-sm">
                  {formData.open_to_connect ? 'Open to Connect' : 'Not Available'}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 gap-2 bg-transparent p-2 mb-4">
              <TabsTrigger value="profile" className="font-light text-base rounded-full px-4 py-2 text-white bg-transparent transition-all duration-300 shadow-none hover:bg-[#ff5757cc] hover:backdrop-blur-sm focus:bg-[#ff5757cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none data-[state=active]:border data-[state=active]:border-white/80" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Profile
              </TabsTrigger>
              <TabsTrigger value="filters" className="font-light text-base rounded-full px-4 py-2 text-white bg-transparent transition-all duration-300 shadow-none hover:bg-[#ff5757cc] hover:backdrop-blur-sm focus:bg-[#ff5757cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none data-[state=active]:border data-[state=active]:border-white/80" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Filters
              </TabsTrigger>
              <TabsTrigger value="subscription" className="font-light text-base rounded-full px-4 py-2 text-white bg-transparent transition-all duration-300 shadow-none hover:bg-[#ff5757cc] hover:backdrop-blur-sm focus:bg-[#ff5757cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none data-[state=active]:border data-[state=active]:border-white/80" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Premium
              </TabsTrigger>
              <TabsTrigger value="settings" className="font-light text-base rounded-full px-4 py-2 text-white bg-transparent transition-all duration-300 shadow-none hover:bg-[#ff5757cc] hover:backdrop-blur-sm focus:bg-[#ff5757cc] focus:backdrop-blur-sm focus:ring-0 focus:outline-none data-[state=active]:border data-[state=active]:border-white/80" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6 w-full min-w-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <Card className="border-border/50 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.32)', backdropFilter: 'blur(12px)' }}>
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-white/80">Full Name</Label>
                      <Input
                        value={formData.full_name}
                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                        disabled={!editMode}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-white/80">Bio</Label>
                      <Textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        disabled={!editMode}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="Tell us about yourself..."
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white/80">Role</Label>
                        <Select 
                          value={formData.role} 
                          onValueChange={(value) => setFormData({...formData, role: value})}
                          disabled={!editMode}
                        >
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                            <SelectItem value="investor">Investor</SelectItem>
                            <SelectItem value="advisor">Advisor</SelectItem>
                            <SelectItem value="mentor">Mentor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-white/80">Country</Label>
                        <Input
                          value={formData.country}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                          disabled={!editMode}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          placeholder="Your country"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Investment Preferences */}
                <Card className="border-border/50 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.32)', backdropFilter: 'blur(12px)' }}>
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Investment Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-white/80">Industry Focus</Label>
                      <Input
                        value={formData.industry}
                        onChange={(e) => setFormData({...formData, industry: e.target.value})}
                        disabled={!editMode}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="e.g., AI, FinTech, Healthcare"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white/80">Investment Range</Label>
                        <Select 
                          value={formData.investment_range} 
                          onValueChange={(value) => setFormData({...formData, investment_range: value})}
                          disabled={!editMode}
                        >
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-10k">$0 - $10K</SelectItem>
                            <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                            <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                            <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                            <SelectItem value="500k+">$500K+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-white/80">Funding Stage</Label>
                        <Select 
                          value={formData.funding_stage} 
                          onValueChange={(value) => setFormData({...formData, funding_stage: value})}
                          disabled={!editMode}
                        >
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="idea">Idea Stage</SelectItem>
                            <SelectItem value="seed">Seed</SelectItem>
                            <SelectItem value="series-a">Series A</SelectItem>
                            <SelectItem value="series-b">Series B</SelectItem>
                            <SelectItem value="series-c">Series C+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-white/80">Open to Connect</Label>
                      <Switch
                        checked={formData.open_to_connect}
                        onCheckedChange={(checked) => setFormData({...formData, open_to_connect: checked})}
                        disabled={!editMode}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Links */}
              <Card className="border-border/50 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Link2 className="w-5 h-5" />
                    Social Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {editMode ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-white/80">Social Media & Calendar</Label>
                        <div className="flex flex-row gap-3 items-center w-full justify-between mt-4">
                          {socialPlatforms.map((platform) => (
                            <button
                              key={platform.key}
                              type="button"
                              onClick={() => setEditingSocial(platform.key)}
                              className={`w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl transition-colors hover:bg-white/20 hover:shadow-[0_0_24px_0_#1ABC9C22] focus:bg-white/20 focus:shadow-[0_0_24px_0_#1ABC9C22] ${formData[platform.key as keyof typeof formData] ? 'ring-2 ring-[#1ABC9C] shadow-[0_0_24px_0_#1ABC9C22]' : ''}`}
                              title={platform.name}
                            >
                              <platform.icon className={`w-5 h-5 ${platform.color}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      {editingSocial && (
                        <div className="space-y-2 p-4 bg-white/5 rounded-lg border border-white/20 animate-fade-in">
                          <div className="flex items-center justify-between">
                            <Label className="flex items-center gap-2 text-white/80">
                              {(() => {
                                const platform = socialPlatforms.find(p => p.key === editingSocial);
                                const IconComponent = platform?.icon || Link2;
                                return (
                                  <>
                                    <IconComponent className={`w-4 h-4 ${platform?.color || 'text-white/60'}`} />
                                    {platform?.name} URL
                                  </>
                                );
                              })()}
                            </Label>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setEditingSocial(null)}
                              className="text-white/60 hover:text-white"
                            >
                              ✕
                            </Button>
                          </div>
                          <Input
                            value={formData[editingSocial as keyof typeof formData] as string || ''}
                            onChange={(e) => setFormData({...formData, [editingSocial]: e.target.value})}
                            placeholder={socialPlatforms.find(p => p.key === editingSocial)?.placeholder}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                      )}

                      {/* Display added social links */}
                      <div className="space-y-2">
                        {socialPlatforms
                          .filter(platform => formData[platform.key as keyof typeof formData])
                          .map((platform) => (
                            <div key={platform.key} className="flex items-center justify-between p-2 bg-white/5 rounded-md">
                              <div className="flex items-center gap-2">
                                <platform.icon className={`w-4 h-4 ${platform.color}`} />
                                <span className="text-sm font-medium text-white">{platform.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setEditingSocial(platform.key)}
                                  className="text-xs text-white/80 hover:text-white"
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setFormData({...formData, [platform.key]: ''})}
                                  className="text-xs text-red-400 hover:text-red-300"
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {socialPlatforms.map((platform) => (
                        <div key={platform.key}>
                          <Label className="text-white/80 flex items-center gap-2">
                            <platform.icon className="w-4 h-4" />
                            {platform.name}
                          </Label>
                          <Input
                            value={formData[platform.key as keyof typeof formData] as string}
                            onChange={(e) => setFormData({...formData, [platform.key]: e.target.value})}
                            disabled={!editMode}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            placeholder={platform.placeholder}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Profile Stats */}
              <Card className="border-border/50 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full overflow-hidden">
                    <div className="text-center p-3 bg-gradient-to-br from-[#ff7300]/60 to-[#ff477e]/40 backdrop-blur-xl rounded-lg border border-[#ff7300]/30">
                      <div className="text-xl md:text-2xl font-bold text-white">247</div>
                      <div className="text-xs md:text-sm text-white flex items-center justify-center gap-1">
                        <Eye className="w-3 h-3 text-white" />
                        Profile Views
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-[#017ed5]/60 to-[#017ed5]/40 backdrop-blur-xl rounded-lg border border-[#017ed5]/30">
                      <div className="text-xl md:text-2xl font-bold text-white">89</div>
                      <div className="text-xs md:text-sm text-white flex items-center justify-center gap-1">
                        <Users className="w-3 h-3 text-white" />
                        Connections
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-[#b53dff]/60 to-[#b53dff]/40 backdrop-blur-xl rounded-lg border border-[#b53dff]/30">
                      <div className="text-xl md:text-2xl font-bold text-white">156</div>
                      <div className="text-xs md:text-sm text-white flex items-center justify-center gap-1">
                        <MessageSquare className="w-3 h-3 text-white" />
                        Messages
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-[#8d00c4]/80 to-[#8d00c4]/60 backdrop-blur-xl rounded-lg border border-[#8d00c4]/30">
                      <div className="text-xl md:text-2xl font-bold text-white">23</div>
                      <div className="text-xs md:text-sm flex items-center justify-center gap-1 text-white">
                        <Star className="w-3 h-3 text-white" />
                        SuperLikes Left
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Videos Section */}
              <Card className="border-border/50 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    My Videos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white/80">About Me Video</Label>
                      <div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center border border-dashed border-white/20">
                        <div className="text-center">
                          <Play className="w-8 h-8 mx-auto mb-2 text-white/60" />
                          <p className="text-sm text-white/60">No video uploaded</p>
                          <Button size="sm" variant="outline" className="mt-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                            <Camera className="w-4 h-4 mr-2" />
                            Record/Upload
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-white/80">Pitch Video</Label>
                      <div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center border border-dashed border-white/20">
                        <div className="text-center">
                          <Play className="w-8 h-8 mx-auto mb-2 text-white/60" />
                          <p className="text-sm text-white/60">No video uploaded</p>
                          <Button size="sm" variant="outline" className="mt-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                            <Camera className="w-4 h-4 mr-2" />
                            Record/Upload
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Overview */}
              <Card className="border-border/50 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Activity Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-[#ff7300]/10 to-[#ff477e]/20 rounded-lg border border-[#ff7300]/20">
                      <div className="text-2xl font-bold text-[#ff7300]">4.8</div>
                      <div className="text-sm text-[#ff7300]/80 flex items-center justify-center gap-1">
                        <Star className="w-3 h-3" />
                        Profile Rating
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-[#017ed5]/10 to-[#017ed5]/20 rounded-lg border border-[#017ed5]/20">
                      <div className="text-2xl font-bold text-[#017ed5]">73%</div>
                      <div className="text-sm text-[#017ed5]/80 flex items-center justify-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Match Rate
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-white/80">
                      <span>Profile Completeness</span>
                      <span className="font-medium text-white">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2 w-full">
                    <Button variant="outline" size="sm" className="flex items-center gap-2 w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Download className="w-4 h-4" />
                      Export Data
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Share2 className="w-4 h-4" />
                      Share Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Filters Tab */}
            <TabsContent value="filters" className="space-y-6">
              <Card className="border-border/50 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Match Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border border-white/20 bg-white/5">
                    <div className="flex items-start space-x-2">
                      <Shield className="w-5 h-5 text-white mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          Idea Protection Policy
                        </p>
                        <p className="text-xs text-white/80 mt-1">
                          For confidentiality protection, entrepreneurs can only match with investors. Same-role matching is permanently disabled to prevent idea theft.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white/80">You can only match with</Label>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/20">
                        <p className="text-sm font-medium text-white">
                          {profile?.role === 'investor' ? 'Entrepreneurs Only' : 'Investors Only'}
                        </p>
                        <p className="text-xs text-white/60 mt-1">
                          This restriction protects intellectual property and prevents idea theft
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-white/80">Industry Focus</Label>
                      <Select defaultValue="all">
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/20 text-white">
                          {industryOptions.map((industry) => (
                            <SelectItem key={industry} value={industry.toLowerCase().replace(/\s+/g, '-')}>
                              {industry}
                            </SelectItem>
                          ))}
                          <SelectItem value="all">All Industries</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/80">Geographic Preference</Label>
                    <Select defaultValue="global">
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/20 text-white">
                        <SelectItem value="local">Local (Same Country)</SelectItem>
                        <SelectItem value="regional">Regional (Same Continent)</SelectItem>
                        {majorCountries.map((country) => (
                          <SelectItem key={country} value={country.toLowerCase().replace(/\s+/g, '-')}>
                            {country}
                          </SelectItem>
                        ))}
                        <SelectItem value="global">Global (All Countries)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/80">Funding Stage (for Entrepreneurs)</Label>
                    <Select defaultValue="all">
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/20 text-white">
                        <SelectItem value="pre-seed">Pre-seed</SelectItem>
                        <SelectItem value="seed">Seed</SelectItem>
                        <SelectItem value="series-a">Series A</SelectItem>
                        <SelectItem value="series-b">Series B</SelectItem>
                        <SelectItem value="series-c">Series C+</SelectItem>
                        <SelectItem value="all">All Stages</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/80">Investment Range (for Investors)</Label>
                    <Select defaultValue="all">
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/20 text-white">
                        <SelectItem value="under-10k">Under $10K</SelectItem>
                        <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                        <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                        <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                        <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                        <SelectItem value="1m-plus">$1M+</SelectItem>
                        <SelectItem value="all">All Ranges</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full aurora-signin-btn bg-gradient-to-r from-[#ff7300] to-[#ff477e] hover:from-[#ff7300]/80 hover:to-[#ff477e]/80">
                    Save Filter Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subscription Tab */}
            <TabsContent value="subscription" className="space-y-6">
              {/* Subscription Tiers */}
              <Card className="border-border/50 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Crown className="w-5 h-5" />
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
                          : "border-white/20 hover:border-white/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-white">{tier.name}</h3>
                            {tier.current && (
                              <Badge className="bg-gradient-to-r from-[#ff7300] to-[#ff477e] text-white border-0">
                                Current Plan
                              </Badge>
                            )}
                          </div>
                          <p className="text-2xl font-bold text-[#ff7300] mt-1">{tier.price}</p>
                          <p className="text-sm text-white/60">{tier.superlikes} SuperLikes/month</p>
                        </div>
                        
                        <div className="text-right">
                          {!tier.current && (
                            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                              <Zap className="w-4 h-4 mr-2" />
                              Upgrade
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="grid grid-cols-1 gap-1">
                          {tier.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-white/60">
                              <div className="w-1 h-1 bg-[#ff7300] rounded-full mr-2" />
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
              <Card className="border-border/50 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    AI-Powered Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#ff7300] to-[#ff477e] rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">PitchGPT</p>
                        <p className="text-sm text-white/60">Generate perfect pitch scripts</p>
                      </div>
                    </div>
                    <Badge className="bg-white/10 text-white border-white/20">Premium</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#ff7300] to-[#ff477e] rounded-lg flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">AI Pitch Coach</p>
                        <p className="text-sm text-white/60">Get feedback on your videos</p>
                      </div>
                    </div>
                    <Badge className="bg-white/10 text-white border-white/20">Premium</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#ff7300] to-[#ff477e] rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Smart Intro Assistant</p>
                        <p className="text-sm text-white/60">AI-generated conversation starters</p>
                      </div>
                    </div>
                    <Badge className="bg-white/10 text-white border-white/20">Elite</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Account Settings */}
                <Card className="border-border/50 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}>
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white/80">Email Notifications</Label>
                        <p className="text-white/60 text-sm">Receive updates about matches</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white/80">Push Notifications</Label>
                        <p className="text-white/60 text-sm">Get notified about new matches</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white/80">Profile Visibility</Label>
                        <p className="text-white/60 text-sm">Show your profile to others</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-border/50 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}>
                  <CardHeader>
                    <CardTitle className="text-red-400 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Danger Zone
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Button
                        onClick={handleSignOut}
                        variant="outline"
                        className="w-full bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                          disabled={isDeleting}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          {isDeleting ? 'Deleting...' : 'Delete Account'}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-gray-900 border border-white/20">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription className="text-white/80">
                            This action cannot be undone. This will permanently delete your account and remove all your data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteAccount}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Delete Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuroraBackground>
  );
} 