import { Button } from "@/components/ui/button";
import { Home, Heart, MessageCircle, User, Filter, Star } from "lucide-react";
import { PageType } from "./MainApp";

interface BottomNavigationProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export function BottomNavigation({ currentPage, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: "swipe" as PageType, icon: Home, label: "Home" },
    { id: "matches" as PageType, icon: Heart, label: "Matches" },
    { id: "messages" as PageType, icon: MessageCircle, label: "Messages" },
    { id: "profile" as PageType, icon: User, label: "Profile" },
    { id: "filters" as PageType, icon: Filter, label: "Filters" },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-md border-t border-border px-2 py-2 sm:py-3">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 px-3 py-2 h-auto rounded-xl transition-all duration-300 ${
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:shadow-glow"
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
              <span className={`text-xs font-medium ${isActive ? "text-primary" : ""}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
              )}
            </Button>
          );
        })}
      </div>
    </nav>
  );
}