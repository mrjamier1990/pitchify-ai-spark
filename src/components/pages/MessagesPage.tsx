import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Video, Mic, Star } from "lucide-react";
import { PageType } from "../MainApp";
import profile1 from "@/assets/profile1.jpg";

interface MessagesPageProps {
  onNavigate: (page: PageType) => void;
}

const mockConversations = [
  {
    id: "1",
    name: "Sarah Chen",
    image: profile1,
    isSuper: true,
    lastMessage: "Excited to discuss our AI platform!",
    timestamp: "2h ago",
    unread: 2
  }
];

export function MessagesPage({ onNavigate }: MessagesPageProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const mockMessages = [
    {
      id: "1",
      senderId: "other",
      text: "Hi! Thanks for the SuperLike! 🌟",
      timestamp: "2h ago"
    },
    {
      id: "2",
      senderId: "me",
      text: "Hello Sarah! I'm really impressed with your AI platform. Would love to learn more about your vision.",
      timestamp: "2h ago"
    },
    {
      id: "3",
      senderId: "other",
      text: "Excited to discuss our AI platform! We're transforming how businesses automate workflows. When would be a good time for a quick call?",
      timestamp: "2h ago"
    }
  ];

  if (selectedConversation) {
    return (
      <div className="h-full bg-gradient-to-br from-[#1a1a1d] via-[#131315] to-[#0a0a0c] flex flex-col">
        {/* Chat Header */}
        <header className="flex items-center gap-3 p-4 border-b border-border bg-background/95 backdrop-blur-sm">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSelectedConversation(null)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <img 
                src={profile1} 
                alt="Sarah Chen"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-primary rounded-full flex items-center justify-center">
                <Star className="w-2.5 h-2.5 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Sarah Chen</h2>
              <p className="text-xs text-muted-foreground">CEO & Founder</p>
            </div>
          </div>

          <Button variant="glass" size="sm">
            <Video className="w-4 h-4" />
          </Button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  msg.senderId === "me"
                    ? "bg-gradient-primary text-primary-foreground ml-12"
                    : "bg-card text-card-foreground mr-12"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 opacity-70`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border bg-background/95 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Button variant="glass" size="icon">
              <Mic className="w-4 h-4" />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="pr-12 bg-card border-border rounded-xl"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                onClick={() => {
                  if (message.trim()) {
                    setMessage("");
                  }
                }}
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
        <h1 className="text-xl font-bold text-foreground">Messages</h1>
        <div className="w-10"></div>
      </header>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {mockConversations.length > 0 ? (
          <div className="p-4 space-y-2">
            {mockConversations.map((conversation) => (
              <Card
                key={conversation.id}
                className="p-4 border-border transition-colors duration-300 cursor-pointer"
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={conversation.image} 
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.isSuper && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Star className="w-2.5 h-2.5 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>

                  {conversation.unread > 0 && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs text-primary-foreground font-bold">
                        {conversation.unread}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No messages yet</h3>
            <p className="text-muted-foreground mb-6">Start conversations with your matches</p>
            <Button 
              variant="premium" 
              onClick={() => onNavigate("matches")}
            >
              View Matches
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}