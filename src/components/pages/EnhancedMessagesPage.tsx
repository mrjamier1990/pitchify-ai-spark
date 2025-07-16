import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search, Star, Heart, MessageCircle, Send, MoreHorizontal } from "lucide-react";
import { PageType } from "../MainApp";
import profile2 from "@/assets/profile2.jpg";
import profile3 from "@/assets/profile3.jpg";
import profile4 from "@/assets/profile4.jpg";

interface EnhancedMessagesPageProps {
  onNavigate: (page: PageType) => void;
}

interface Match {
  id: string;
  name: string;
  image: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  isSuperliker: boolean;
  canMessage: boolean;
}

interface Message {
  id: string;
  text: string;
  sender: "me" | "them";
  timestamp: string;
}

const mockMatches: Match[] = [
  {
    id: "1",
    name: "Michael Rodriguez",
    image: profile2,
    lastMessage: "I'd love to discuss your AI platform further...",
    timestamp: "2m ago",
    unread: true,
    isSuperliker: false,
    canMessage: true
  },
  {
    id: "2", 
    name: "Emma Thompson",
    image: profile3,
    lastMessage: "Thanks for the Superlike! Your profile...",
    timestamp: "1h ago",
    unread: false,
    isSuperliker: true,
    canMessage: true
  },
  {
    id: "3",
    name: "David Kim", 
    image: profile4,
    lastMessage: "Great to connect with another founder",
    timestamp: "3h ago",
    unread: false,
    isSuperliker: false,
    canMessage: false
  }
];

const mockMessages: Message[] = [
  { id: "1", text: "Hi Sarah! I saw your pitch video and I'm really impressed with TechFlow AI's vision.", sender: "them", timestamp: "10:30 AM" },
  { id: "2", text: "Thank you Michael! I'd love to hear more about your investment focus.", sender: "me", timestamp: "10:32 AM" },
  { id: "3", text: "I typically invest in Series A rounds for AI companies. What's your current funding status?", sender: "them", timestamp: "10:35 AM" },
  { id: "4", text: "We're looking to raise our Series A in Q2. Would love to schedule a call to discuss further.", sender: "me", timestamp: "10:37 AM" }
];

export function EnhancedMessagesPage({ onNavigate }: EnhancedMessagesPageProps) {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const currentMatch = mockMatches.find(m => m.id === selectedMatch);

  if (selectedMatch && currentMatch) {
    return (
      <div className="h-screen bg-background flex flex-col">
        {/* Chat Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm">
          <Button
            variant="ghost" 
            size="icon"
            className="w-10 h-10 rounded-full"
            onClick={() => setSelectedMatch(null)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={currentMatch.image} 
                alt={currentMatch.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {currentMatch.isSuperliker && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-primary-foreground fill-current" />
                </div>
              )}
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{currentMatch.name}</h2>
              <p className="text-xs text-muted-foreground">
                {currentMatch.isSuperliker ? "Superliked you" : "Mutual match"}
              </p>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] ${
                message.sender === "me" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-foreground"
              } rounded-2xl px-4 py-2`}>
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        {currentMatch.canMessage ? (
          <div className="p-4 border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-4 py-2 bg-muted rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="icon" className="rounded-full">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="text-center py-4">
              <Heart className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                You both need to like each other to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm">
        <Button
          variant="ghost" 
          size="icon"
          className="w-10 h-10 rounded-full"
          onClick={() => onNavigate("swipe")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-foreground">Messages</h1>
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
          <Search className="w-5 h-5" />
        </Button>
      </header>

      {/* Matches List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {mockMatches.map((match) => (
            <Card 
              key={match.id}
              className="p-4 hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => setSelectedMatch(match.id)}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={match.image} 
                    alt={match.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  {match.isSuperliker && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-primary-foreground fill-current" />
                    </div>
                  )}
                  {match.unread && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground truncate">{match.name}</h3>
                    <span className="text-xs text-muted-foreground">{match.timestamp}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    {match.isSuperliker && (
                      <span className="text-xs bg-gradient-primary text-primary-foreground px-2 py-1 rounded-full">
                        Superliked you
                      </span>
                    )}
                    {!match.canMessage && (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                        Match to message
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground truncate">{match.lastMessage}</p>
                </div>
                
                <MessageCircle className={`w-5 h-5 ${match.unread ? "text-primary" : "text-muted-foreground"}`} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}