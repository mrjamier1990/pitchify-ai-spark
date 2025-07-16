import { useState } from "react";
import { SwipeInterface } from "./SwipeInterface";
import { MatchesPage } from "./pages/MatchesPage";
import { MessagesPage } from "./pages/MessagesPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PersonalProfilePage } from "./pages/PersonalProfilePage";
import { EnhancedMessagesPage } from "./pages/EnhancedMessagesPage";
import { FiltersPage } from "./pages/FiltersPage";
import { SettingsPage } from "./pages/SettingsPage";
import { PitchCoachPage } from "./pages/PitchCoachPage";
import { BottomNavigation } from "./BottomNavigation";

export type PageType = "swipe" | "matches" | "messages" | "profile" | "filters" | "settings" | "pitch-coach";

export function MainApp() {
  const [currentPage, setCurrentPage] = useState<PageType>("swipe");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "swipe":
        return <SwipeInterface onNavigate={setCurrentPage} />;
      case "matches":
        return <MatchesPage onNavigate={setCurrentPage} />;
      case "messages":
        return <EnhancedMessagesPage onNavigate={setCurrentPage} />;
      case "profile":
        return <PersonalProfilePage onNavigate={setCurrentPage} />;
      case "filters":
        return <FiltersPage onNavigate={setCurrentPage} />;
      case "settings":
        return <SettingsPage onNavigate={setCurrentPage} />;
      case "pitch-coach":
        return <PitchCoachPage onNavigate={setCurrentPage} />;
      default:
        return <SwipeInterface onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="flex-1 overflow-hidden">
        {renderCurrentPage()}
      </div>
      <BottomNavigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
      />
    </div>
  );
}