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
  Target
} from "lucide-react";

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
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
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
      toast({
        title: 'Profile updated',
        description: 'Your profile has been saved successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
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
    <div className="h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/50 flex-shrink-0">
        <div className="flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onNavigate("swipe")}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="text-xl font-semibold">Profile</h1>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleSignOut}
            className="hover:bg-destructive/10 text-destructive"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-6 max-w-4xl mx-auto pb-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="filters">Filters</TabsTrigger>
            <TabsTrigger value="subscription">Premium</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Header */}
            <Card className="border-border/50 bg-card/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Avatar className="w-20 h-20 border-2 border-primary/20">
                        <AvatarImage src={profile?.profile_image_url || "/placeholder.svg"} alt="Profile" />
                        <AvatarFallback>
                          {profile?.full_name ? profile.full_name.split(' ').map((n: string) => n[0]).join('') : user?.email?.[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Badge 
                        variant="secondary" 
                        className="absolute -bottom-1 -right-1 bg-gradient-to-r from-primary to-accent text-primary-foreground px-2 py-1"
                      >
                        <Crown className="w-3 h-3 mr-1" />
                        {profile?.subscription_tier || 'Free'}
                      </Badge>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-bold">{profile?.full_name || 'Complete your profile'}</h2>
                      <p className="text-muted-foreground capitalize">
                        {profile?.role || 'entrepreneur'} • {profile?.country || 'Location not set'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {profile?.bio || 'Add a bio to tell others about yourself'}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant={editMode ? "default" : "outline"}
                    onClick={() => editMode ? handleSaveProfile() : setEditMode(true)}
                    disabled={loading}
                  >
                    {editMode ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Profile
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>

                {editMode && (
                  <div className="mt-6 space-y-4 pt-6 border-t border-border/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                          id="full_name"
                          value={formData.full_name}
                          onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                            <SelectItem value="investor">Investor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        placeholder="Tell others about yourself..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            {majorCountries.map((country) => (
                              <SelectItem key={country} value={country}>{country}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry Focus</Label>
                        <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industryOptions.map((industry) => (
                              <SelectItem key={industry} value={industry}>{industry}</SelectItem>
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
                        />
                      </div>
                    )}

                    {formData.role === 'entrepreneur' && (
                      <div className="space-y-2">
                        <Label htmlFor="funding_stage">Funding Stage</Label>
                        <Select value={formData.funding_stage} onValueChange={(value) => setFormData({...formData, funding_stage: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select funding stage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pre-seed">Pre-seed</SelectItem>
                            <SelectItem value="seed">Seed</SelectItem>
                            <SelectItem value="series-a">Series A</SelectItem>
                            <SelectItem value="series-b">Series B</SelectItem>
                            <SelectItem value="series-c">Series C+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                        <Input
                          id="linkedin_url"
                          value={formData.linkedin_url}
                          onChange={(e) => setFormData({...formData, linkedin_url: e.target.value})}
                          placeholder="https://linkedin.com/in/..."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="calendly_url">Calendly URL</Label>
                        <Input
                          id="calendly_url"
                          value={formData.calendly_url}
                          onChange={(e) => setFormData({...formData, calendly_url: e.target.value})}
                          placeholder="https://calendly.com/..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="twitter_url">Twitter URL</Label>
                        <Input
                          id="twitter_url"
                          value={formData.twitter_url}
                          onChange={(e) => setFormData({...formData, twitter_url: e.target.value})}
                          placeholder="https://twitter.com/..."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="instagram_url">Instagram URL</Label>
                        <Input
                          id="instagram_url"
                          value={formData.instagram_url}
                          onChange={(e) => setFormData({...formData, instagram_url: e.target.value})}
                          placeholder="https://instagram.com/..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="facebook_url">Facebook URL</Label>
                        <Input
                          id="facebook_url"
                          value={formData.facebook_url}
                          onChange={(e) => setFormData({...formData, facebook_url: e.target.value})}
                          placeholder="https://facebook.com/..."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tiktok_url">TikTok URL</Label>
                        <Input
                          id="tiktok_url"
                          value={formData.tiktok_url}
                          onChange={(e) => setFormData({...formData, tiktok_url: e.target.value})}
                          placeholder="https://tiktok.com/@..."
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="open_to_connect"
                        checked={formData.open_to_connect}
                        onCheckedChange={(checked) => setFormData({...formData, open_to_connect: checked})}
                      />
                      <Label htmlFor="open_to_connect">Open to new connections</Label>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Videos Section */}
            <Card className="border-border/50 bg-card/95 backdrop-blur-sm">
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
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border border-dashed border-border">
                      <div className="text-center">
                        <Play className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">No video uploaded</p>
                        <Button size="sm" variant="outline" className="mt-2">
                          <Camera className="w-4 h-4 mr-2" />
                          Record/Upload
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Pitch Video</Label>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border border-dashed border-border">
                      <div className="text-center">
                        <Play className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">No video uploaded</p>
                        <Button size="sm" variant="outline" className="mt-2">
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
            <Card className="border-border/50 bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Profile Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">247</div>
                    <div className="text-sm text-muted-foreground flex items-center justify-center">
                      <Eye className="w-4 h-4 mr-1" />
                      Profile Views
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground flex items-center justify-center">
                      <Users className="w-4 h-4 mr-1" />
                      Matches
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">85</div>
                    <div className="text-sm text-muted-foreground flex items-center justify-center">
                      <Award className="w-4 h-4 mr-1" />
                      Profile Score
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="filters" className="space-y-6">
            <Card className="border-border/50 bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-primary" />
                  Match Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start space-x-2">
                    <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                        Idea Protection Policy
                      </p>
                      <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                        For confidentiality protection, {profile?.role === 'investor' 
                          ? 'investors can only match with entrepreneurs'
                          : 'entrepreneurs can only match with investors'
                        }. Same-role matching is permanently disabled to prevent idea theft.
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
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
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
                  <Label>Geographic Preference</Label>
                  <Select defaultValue="global">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
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
                  <Label>Funding Stage (for Entrepreneurs)</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
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
                  <Label>Investment Range (for Investors)</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
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

                <Button className="w-full">
                  Save Filter Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            {/* Subscription Tiers */}
            <Card className="border-border/50 bg-card/95 backdrop-blur-sm">
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
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                        : "border-border/50 hover:border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{tier.name}</h3>
                          {tier.current && (
                            <Badge variant="default" className="bg-primary text-primary-foreground">
                              Current Plan
                            </Badge>
                          )}
                        </div>
                        <p className="text-2xl font-bold text-primary mt-1">{tier.price}</p>
                        <p className="text-sm text-muted-foreground">{tier.superlikes} SuperLikes/month</p>
                      </div>
                      
                      <div className="text-right">
                        {!tier.current && (
                          <Button variant="outline" size="sm">
                            <Zap className="w-4 h-4 mr-2" />
                            Upgrade
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="grid grid-cols-1 gap-1">
                        {tier.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1 h-1 bg-primary rounded-full mr-2" />
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
            <Card className="border-border/50 bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  AI-Powered Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
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
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">AI Pitch Coach</p>
                      <p className="text-sm text-muted-foreground">Get feedback on your videos</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Premium</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
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

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-border/50 bg-card/95 backdrop-blur-sm">
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
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  );
}