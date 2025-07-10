import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm here to help you with any questions about our MT4 Trading Bot. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", { message });
      return response.json();
    },
    onSuccess: (data) => {
      const aiMessage: Message = {
        id: Date.now().toString() + "_ai",
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    },
    onError: () => {
      const errorMessage: Message = {
        id: Date.now().toString() + "_error",
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again later or contact our support team directly.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    },
  });

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full shadow-lg bg-trading-accent hover:bg-green-600 transition-all transform hover:scale-110"
        size="lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-2xl border">
          <div className="bg-trading-primary text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-trading-accent rounded-full flex items-center justify-center mr-3">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold">AI Assistant</div>
                  <div className="text-xs text-blue-100">Online</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-blue-100 hover:text-white hover:bg-blue-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex items-start ${message.isUser ? "justify-end" : ""}`}>
                {!message.isUser && (
                  <div className="w-6 h-6 bg-trading-accent rounded-full flex items-center justify-center flex-shrink-0 mr-2">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-lg max-w-xs text-sm ${
                    message.isUser
                      ? "bg-trading-primary text-white ml-2"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex items-start">
                <div className="w-6 h-6 bg-trading-accent rounded-full flex items-center justify-center flex-shrink-0 mr-2">
                  <Bot className="h-3 w-3 text-white" />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg max-w-xs text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                disabled={chatMutation.isPending}
              />
              <Button
                onClick={handleSend}
                className="bg-trading-primary hover:bg-blue-800"
                disabled={chatMutation.isPending || !inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
