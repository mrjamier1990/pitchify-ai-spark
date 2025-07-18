import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Phone, Video, Calendar, Heart, MoreVertical, MoreHorizontal, Paperclip, Mic, FileText, Zap, Star, MessageSquare, MessageCircle, Play, Search } from "lucide-react";
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
  role: "Entrepreneur" | "Investor";
  company: string;
  image: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  isSuperliker: boolean;
  canMessage: boolean;
  category: "matches" | "superliked" | "archived";
  isHighEngagement: boolean;
  isOnline: boolean;
  videoThumbnail: string;
}

interface Message {
  id: string;
  text: string;
  sender: "me" | "them";
  timestamp: string;
  status: "sent" | "delivered" | "seen";
  type: "text" | "video" | "file";
  reactions: string[];
}

const mockMatches: Match[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Investor",
    company: "Sequoia Capital",
    image: profile2,
    lastMessage: "I'd love to schedule a call to discuss your AI startup. Your pitch video was impressive!",
    timestamp: "2m ago",
    unread: true,
    isSuperliker: false,
    canMessage: true,
    category: "matches",
    isHighEngagement: true,
    isOnline: true,
    videoThumbnail: profile2
  },
  {
    id: "2", 
    name: "Marcus Johnson",
    role: "Entrepreneur",
    company: "TechFlow AI",
    image: profile3,
    lastMessage: "Thanks for the super like! Here's my updated pitch deck with financials...",
    timestamp: "1h ago",
    unread: false,
    isSuperliker: true,
    canMessage: true,
    category: "superliked",
    isHighEngagement: false,
    isOnline: false,
    videoThumbnail: profile3
  },
  {
    id: "3",
    name: "Elena Rodriguez", 
    role: "Investor",
    company: "FinVest Partners",
    image: profile4,
    lastMessage: "Your fintech solution looks promising. Let's connect! When can we schedule a demo?",
    timestamp: "1 day ago",
    unread: true,
    isSuperliker: false,
    canMessage: true,
    category: "matches",
    isHighEngagement: true,
    isOnline: true,
    videoThumbnail: profile4
  },
  {
    id: "4",
    name: "David Kim",
    role: "Entrepreneur", 
    company: "GreenTech Solutions",
    image: profile2,
    lastMessage: "Thanks for considering my sustainability platform. Looking forward to hearing from you.",
    timestamp: "3 days ago",
    unread: false,
    isSuperliker: false,
    canMessage: false,
    category: "archived",
    isHighEngagement: false,
    isOnline: false,
    videoThumbnail: profile2
  }
];

const mockMessages: Message[] = [
  { 
    id: "1", 
    text: "Hi Alex! I saw your pitch video and I'm really impressed with your AI solution. Would love to learn more about your traction and funding needs.", 
    sender: "them", 
    timestamp: "10:30 AM",
    status: "seen",
    type: "text",
    reactions: []
  },
  { 
    id: "2", 
    text: "Thank you so much! We've grown 300% in the last 6 months and are looking to raise our Series A. I'd love to share more details with you.", 
    sender: "me", 
    timestamp: "10:35 AM",
    status: "seen",
    type: "text",
    reactions: ["👍"]
  },
  { 
    id: "3", 
    text: "That's fantastic growth! I'd love to schedule a call this week. Are you available Thursday afternoon?", 
    sender: "them", 
    timestamp: "10:45 AM",
    status: "delivered",
    type: "text",
    reactions: []
  },
  { 
    id: "4", 
    text: "Perfect! Thursday at 3 PM works great. I'll send you the Calendly link and pitch deck.", 
    sender: "me", 
    timestamp: "11:00 AM",
    status: "sent",
    type: "text",
    reactions: []
  }
];

export function EnhancedMessagesPage({ onNavigate }: EnhancedMessagesPageProps) {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("matches");
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  const filteredMatches = mockMatches.filter(match => match.category === activeTab);
  const currentMatch = mockMatches.find(m => m.id === selectedMatch);

  if (selectedMatch && currentMatch) {
    return (
      <div className="h-full bg-gradient-to-br from-background via-background/98 to-background/95 flex flex-col">
        {/* Frosted Glass Chat Header */}
        <div className="bg-background/70 backdrop-blur-xl border-b border-border/20 p-4 shadow-lg">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedMatch(null)}
              className="text-muted-foreground hover:text-primary transition-colors rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="relative">
              <Avatar className="w-12 h-12 ring-2 ring-primary/30 shadow-glow">
                <AvatarImage src={currentMatch.image} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/40">
                  {currentMatch.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {currentMatch.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                {currentMatch.name}
                {currentMatch.isHighEngagement && <span className="text-lg">🔥</span>}
              </h3>
              <p className="text-sm text-muted-foreground">{currentMatch.role} • {currentMatch.company}</p>
            </div>
            
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary rounded-full">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary rounded-full">
                <Video className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary rounded-full">
                <Calendar className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary rounded-full">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages with Elegant Styling */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {mockMessages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[75%] ${message.sender === "me" ? "ml-8" : "mr-8"}`}>
                <div className={`p-4 rounded-2xl shadow-sm ${
                  message.sender === "me" 
                    ? "bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground" 
                    : "bg-muted/40 backdrop-blur-sm text-foreground border border-border/20"
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  {message.reactions.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {message.reactions.map((reaction, idx) => (
                        <span key={idx} className="text-xs bg-background/20 rounded-full px-2 py-1">
                          {reaction}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className={`flex items-center gap-2 mt-1 px-2 ${
                  message.sender === "me" ? "justify-end" : "justify-start"
                }`}>
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  {message.sender === "me" && (
                    <div className={`w-2 h-2 rounded-full ${
                      message.status === "seen" ? "bg-primary" : 
                      message.status === "delivered" ? "bg-muted-foreground" : "bg-muted-foreground/50"
                    }`}></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Message Input */}
        <div className="bg-background/70 backdrop-blur-xl border-t border-border/20 p-4 shadow-lg">
          <div className="space-y-3">
            {/* Quick Actions */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button variant="outline" size="sm" className="whitespace-nowrap text-xs border-border/30 hover:bg-primary/10 hover:border-primary/30">
                <Calendar className="w-3 h-3 mr-1" />
                Request Call
              </Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap text-xs border-border/30 hover:bg-primary/10 hover:border-primary/30">
                <Zap className="w-3 h-3 mr-1" />
                AI Suggest Reply
              </Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap text-xs border-border/30 hover:bg-primary/10 hover:border-primary/30">
                <FileText className="w-3 h-3 mr-1" />
                Share Pitch Deck
              </Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap text-xs border-border/30 hover:bg-primary/10 hover:border-primary/30">
                <Star className="w-3 h-3 mr-1" />
                Smart Intro
              </Button>
            </div>
            
            {/* Input Area */}
            <div className="flex gap-3 items-end">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary rounded-full">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary rounded-full">
                <Mic className="w-5 h-5" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="bg-muted/20 backdrop-blur-sm border-border/30 rounded-2xl pr-12 focus:ring-2 focus:ring-primary/30 focus:border-primary/30"
                />
              </div>
              <Button 
                className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-2xl px-6 shadow-glow"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-background via-background/98 to-background/95">
      {/* Frosted Glass Header */}
      <div className="bg-background/70 backdrop-blur-xl border-b border-border/20 p-4 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate("swipe")}
            className="text-muted-foreground hover:text-primary transition-colors rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Messages
          </h1>
          <div className="w-10" />
        </div>
        
        {/* Elegant Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/20 backdrop-blur-sm rounded-2xl p-1 border border-border/20">
            <TabsTrigger 
              value="matches" 
              className="rounded-xl text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all"
            >
              Matches
            </TabsTrigger>
            <TabsTrigger 
              value="superliked"
              className="rounded-xl text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all"
            >
              SuperLiked You
            </TabsTrigger>
            <TabsTrigger 
              value="archived"
              className="rounded-xl text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all"
            >
              Archived
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Conversations List with Frosted Glass Cards */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <Card 
              key={match.id} 
              className="backdrop-blur-sm border-border/20 transition-all duration-300 cursor-pointer group hover:shadow-glow"
              onClick={() => setSelectedMatch(match.id)}
              onMouseEnter={() => setHoveredVideo(match.id)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all shadow-md">
                      <AvatarImage src={match.image} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/40 text-foreground font-semibold">
                        {match.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    {/* Video Preview on Hover */}
                    {hoveredVideo === match.id && (
                      <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    )}
                    
                    {match.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-background rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {match.name}
                      </h3>
                      <Badge variant="outline" className="text-xs border-border/40 bg-background/50">
                        {match.role}
                      </Badge>
                      {match.isHighEngagement && (
                        <span className="text-lg animate-pulse">🔥</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{match.company}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                      {match.lastMessage}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {match.timestamp}
                      </span>
                      <div className="flex items-center gap-2">
                        {match.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        )}
                        <MessageSquare className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="bg-muted/10 backdrop-blur-sm rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 border border-border/20">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">No messages yet</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
              Start matching with entrepreneurs and investors to begin meaningful conversations and build your network!
            </p>
            <Button 
              onClick={() => onNavigate("swipe")}
              className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-2xl px-8 py-3 shadow-glow text-lg"
            >
              Start Swiping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}