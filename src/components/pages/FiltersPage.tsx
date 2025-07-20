import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, X } from "lucide-react";
import { PageType } from "../MainApp";

interface FiltersPageProps {
  onNavigate: (page: PageType) => void;
}

export function FiltersPage({ onNavigate }: FiltersPageProps) {
  const [userType, setUserType] = useState<"all" | "entrepreneurs" | "investors">("all");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);

  const industries = [
    "AI/Machine Learning", "FinTech", "HealthTech", "CleanTech", 
    "E-commerce", "SaaS", "EdTech", "Gaming", "Biotech", "Cybersecurity"
  ];

  const fundingStages = [
    "Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Growth"
  ];

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industry) 
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };

  const toggleStage = (stage: string) => {
    setSelectedStages(prev => 
      prev.includes(stage) 
        ? prev.filter(s => s !== stage)
        : [...prev, stage]
    );
  };

  const clearAllFilters = () => {
    setUserType("all");
    setSelectedIndustries([]);
    setSelectedStages([]);
  };

  return (
    <div className="h-full bg-gradient-to-br from-[#1a1a1d] via-[#131315] to-[#0a0a0c] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigate("swipe")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-foreground">Filters</h1>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={clearAllFilters}
        >
          Clear All
        </Button>
      </header>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* User Type Filter */}
        <Card className="p-6 border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Show Me</h3>
          
          <div className="grid grid-cols-1 gap-3">
            {[
              { value: "all", label: "Everyone" },
              { value: "entrepreneurs", label: "Entrepreneurs Only" },
              { value: "investors", label: "Investors Only" }
            ].map((option) => (
              <Button
                key={option.value}
                variant={userType === option.value ? "premium" : "glass"}
                className="justify-start h-12"
                onClick={() => setUserType(option.value as any)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Industry Filter */}
        <Card className="p-6 border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Industries</h3>
          
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <Badge
                key={industry}
                variant={selectedIndustries.includes(industry) ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedIndustries.includes(industry) 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => toggleIndustry(industry)}
              >
                {industry}
                {selectedIndustries.includes(industry) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Funding Stage Filter */}
        <Card className="p-6 border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Funding Stage</h3>
          
          <div className="flex flex-wrap gap-2">
            {fundingStages.map((stage) => (
              <Badge
                key={stage}
                variant={selectedStages.includes(stage) ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedStages.includes(stage) 
                    ? "bg-accent text-accent-foreground border-accent" 
                    : "border-border hover:border-accent/50"
                }`}
                onClick={() => toggleStage(stage)}
              >
                {stage}
                {selectedStages.includes(stage) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Active Filters Summary */}
        {(selectedIndustries.length > 0 || selectedStages.length > 0 || userType !== "all") && (
          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Active Filters</h3>
            
            <div className="space-y-3">
              {userType !== "all" && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">User Type:</span>
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    {userType === "entrepreneurs" ? "Entrepreneurs" : "Investors"}
                  </Badge>
                </div>
              )}
              
              {selectedIndustries.length > 0 && (
                <div>
                  <span className="text-sm text-muted-foreground block mb-2">
                    Industries ({selectedIndustries.length}):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedIndustries.map((industry) => (
                      <Badge key={industry} variant="secondary" className="text-xs">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedStages.length > 0 && (
                <div>
                  <span className="text-sm text-muted-foreground block mb-2">
                    Stages ({selectedStages.length}):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedStages.map((stage) => (
                      <Badge key={stage} variant="secondary" className="text-xs">
                        {stage}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Apply Button */}
        <div className="sticky bottom-0 pb-4">
          <Button 
            variant="premium" 
            size="lg" 
            className="w-full"
            onClick={() => onNavigate("swipe")}
          >
            <Search className="w-4 h-4 mr-2" />
            Apply Filters & Search
          </Button>
        </div>
      </div>
    </div>
  );
}