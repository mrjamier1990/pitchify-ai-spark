import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Mic, Camera, Brain, Star, TrendingUp } from "lucide-react";
import { PageType } from "../MainApp";

interface PitchCoachPageProps {
  onNavigate: (page: PageType) => void;
}

export function PitchCoachPage({ onNavigate }: PitchCoachPageProps) {
  const [currentTab, setCurrentTab] = useState<"coach" | "score" | "templates">("coach");

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
        <h1 className="text-xl font-bold text-foreground">AI Pitch Coach</h1>
        <div className="w-10"></div>
      </header>

      {/* Tab Navigation */}
      <div className="flex border-b border-border bg-background/95">
        {[
          { id: "coach", label: "Coach", icon: Brain },
          { id: "score", label: "Score", icon: TrendingUp },
          { id: "templates", label: "Templates", icon: Star }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={currentTab === tab.id ? "premium" : "ghost"}
              className="flex-1 rounded-none"
              onClick={() => setCurrentTab(tab.id as any)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {currentTab === "coach" && (
          <div className="space-y-6">
            {/* Upload Section */}
            <Card className="p-6 bg-gradient-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Practice Your Pitch</h3>
              <p className="text-muted-foreground mb-6">
                Record your pitch and get AI-powered feedback on tone, clarity, and structure.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="premium" className="h-24 flex-col gap-2">
                  <Camera className="w-8 h-8" />
                  <span>Record Video</span>
                </Button>
                <Button variant="glass" className="h-24 flex-col gap-2">
                  <Mic className="w-8 h-8" />
                  <span>Audio Only</span>
                </Button>
              </div>
            </Card>

            {/* Recent Analysis */}
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Latest Analysis</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/10 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Play className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Pitch Analysis #3</p>
                      <p className="text-sm text-muted-foreground">2 hours ago • Score: 8.5/10</p>
                    </div>
                  </div>
                  <Button variant="glass" size="sm">View</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/10 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Play className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Pitch Analysis #2</p>
                      <p className="text-sm text-muted-foreground">1 day ago • Score: 7.2/10</p>
                    </div>
                  </div>
                  <Button variant="glass" size="sm">View</Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {currentTab === "score" && (
          <div className="space-y-6">
            {/* Overall Score */}
            <Card className="p-6 bg-gradient-primary border-border text-center">
              <h3 className="text-lg font-semibold text-primary-foreground mb-2">Your Pitch Score</h3>
              <div className="text-4xl font-bold text-primary-foreground mb-2">8.5</div>
              <p className="text-primary-foreground/80">out of 10</p>
            </Card>

            {/* Score Breakdown */}
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Score Breakdown</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Clarity</span>
                    <span className="text-sm text-muted-foreground">9.2/10</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Confidence</span>
                    <span className="text-sm text-muted-foreground">8.7/10</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Structure</span>
                    <span className="text-sm text-muted-foreground">7.8/10</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Engagement</span>
                    <span className="text-sm text-muted-foreground">8.9/10</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
              </div>
            </Card>

            {/* AI Recommendations */}
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">AI Recommendations</h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-foreground font-medium">💡 Improve Structure</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Consider adding a clearer problem statement at the beginning
                  </p>
                </div>
                
                <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-sm text-foreground font-medium">🎯 Call to Action</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    End with a specific ask or next step for investors
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {currentTab === "templates" && (
          <div className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Pitch Templates</h3>
              <p className="text-muted-foreground mb-6">
                AI-generated templates tailored to your industry and business stage.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-muted/10 rounded-xl border border-border">
                  <h4 className="font-medium text-foreground mb-2">The Classic Elevator Pitch</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Perfect for networking events and brief introductions
                  </p>
                  <Button variant="glass" size="sm">Use Template</Button>
                </div>

                <div className="p-4 bg-muted/10 rounded-xl border border-border">
                  <h4 className="font-medium text-foreground mb-2">The Investor Pitch</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Structured for funding rounds and investor meetings
                  </p>
                  <Button variant="glass" size="sm">Use Template</Button>
                </div>

                <div className="p-4 bg-muted/10 rounded-xl border border-border">
                  <h4 className="font-medium text-foreground mb-2">The Problem-Solution Pitch</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Focus on the problem you're solving and your unique solution
                  </p>
                  <Button variant="glass" size="sm">Use Template</Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}