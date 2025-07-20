import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Bell, Shield, CreditCard, HelpCircle, LogOut, Star, Trash2 } from "lucide-react";
import { PageType } from "../MainApp";
import { useAuth } from "../AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
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

interface SettingsPageProps {
  onNavigate: (page: PageType) => void;
}

export function SettingsPage({ onNavigate }: SettingsPageProps) {
  const { signOut } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };
  return (
    <div className="h-full bg-gradient-to-br from-[#1a1a1d] via-[#131315] to-[#0a0a0c] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigate("profile")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <div className="w-10"></div>
      </header>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Premium Status */}
        <Card className="p-6 border-border">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-6 h-6 text-primary-foreground" />
            <h3 className="text-lg font-semibold text-primary-foreground">Pitchify Premium</h3>
          </div>
          <p className="text-primary-foreground/80 mb-4">
            Unlock unlimited swipes, SuperLikes, and AI features
          </p>
          <Button variant="glass" className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
            Manage Subscription
          </Button>
        </Card>

        {/* Notifications */}
        <Card className="p-6 border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">New Matches</p>
                <p className="text-sm text-muted-foreground">Get notified when you have a new match</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Messages</p>
                <p className="text-sm text-muted-foreground">Get notified about new messages</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">SuperLikes</p>
                <p className="text-sm text-muted-foreground">Get notified when someone SuperLikes you</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Privacy & Security */}
        <Card className="p-6 border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy & Security
          </h3>
          
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start h-12">
              Privacy Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12">
              Blocked Users
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12">
              Data & Privacy
            </Button>
          </div>
        </Card>

        {/* Account */}
        <Card className="p-6 border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Account
          </h3>
          
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start h-12">
              Subscription & Billing
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-start h-12 text-destructive hover:text-destructive">
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
        </Card>

        {/* Support */}
        <Card className="p-6 border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Support
          </h3>
          
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start h-12">
              Help Center
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12">
              Contact Support
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12">
              Terms of Service
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12">
              Privacy Policy
            </Button>
          </div>
        </Card>

        {/* Sign Out */}
        <Card className="p-6 border-border">
          <Button variant="destructive" className="w-full" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </Card>
      </div>
    </div>
  );
}