
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot } from 'lucide-react';
import { Challenge } from '@/context/ChallengeContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistPrompts {
  [key: string]: string;
}

const AIChat = ({ challenge }: { challenge: Challenge }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);

  // Pre-defined prompts based on different whiteboarding activities
  const assistPrompts: AIAssistPrompts = {
    problemUnderstanding: "Help me understand the problem in this challenge.",
    requirements: "What are some key requirements I should focus on?",
    userPersonas: "Help me identify user personas for this problem.",
    wireframeIdeas: "What are some wireframing approaches I could use?",
    solutionApproach: "Guide me on structuring my solution approach."
  };

  useEffect(() => {
    // Initial greeting from the AI
    setMessages([
      {
        role: 'assistant',
        content: `Hi there! I'm your design assistant for the "${challenge.title}" challenge. I can help guide you through your whiteboarding process. What would you like assistance with?`
      }
    ]);

    // Set initial suggested prompts
    setSuggestedPrompts([
      assistPrompts.problemUnderstanding,
      assistPrompts.requirements,
      assistPrompts.userPersonas
    ]);
  }, [challenge.title]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;
    
    setIsLoading(true);
    
    // Add user message to chat
    const userMessage = { role: 'user' as const, content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    try {
      // Send message to Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: { 
          message: messageText,
          challenge: {
            title: challenge.title,
            company: challenge.company,
            description: challenge.description,
            requirements: challenge.requirements
          },
          history: messages
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Add AI response to chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response 
      }]);
      
      // Update suggested prompts based on context
      updateSuggestedPrompts(data.response);
      
    } catch (error) {
      console.error('Error calling AI assistant:', error);
      toast({
        title: "Error",
        description: "Failed to get a response from the AI assistant. Please try again.",
        variant: "destructive"
      });
      
      // Add fallback message
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting right now. Please try again in a moment." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSuggestedPrompts = (lastResponse: string) => {
    // Change suggested prompts based on conversation context
    if (lastResponse.includes("problem") || lastResponse.includes("understand")) {
      setSuggestedPrompts([
        assistPrompts.requirements,
        assistPrompts.userPersonas,
        assistPrompts.wireframeIdeas
      ]);
    } else if (lastResponse.includes("requirements") || lastResponse.includes("criteria")) {
      setSuggestedPrompts([
        assistPrompts.userPersonas,
        assistPrompts.wireframeIdeas,
        assistPrompts.solutionApproach
      ]);
    } else if (lastResponse.includes("wireframe") || lastResponse.includes("sketch")) {
      setSuggestedPrompts([
        "What elements should I include in my wireframe?",
        "How can I improve my sketches?",
        assistPrompts.solutionApproach
      ]);
    } else {
      // Fallback to general helpful prompts
      setSuggestedPrompts([
        "What should I focus on next?",
        "Help me brainstorm ideas for this challenge.",
        "How can I make my solution stand out?"
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center bg-gray-50">
        <Avatar className="mr-2 h-8 w-8 bg-primary text-white">
          <Bot size={16} />
        </Avatar>
        <div>
          <h3 className="font-medium text-sm">Design Assistant</h3>
          <p className="text-xs text-gray-500">Powered by Gemini AI</p>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {suggestedPrompts.length > 0 && (
        <div className="px-3 py-2 border-t">
          <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt, index) => (
              <Button 
                key={index}
                variant="outline" 
                size="sm" 
                className="text-xs py-1 h-auto"
                onClick={() => handleSuggestedPrompt(prompt)}
                disabled={isLoading}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for design guidance..."
          className="resize-none"
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={isLoading || !input.trim()}
          className="h-auto"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default AIChat;
