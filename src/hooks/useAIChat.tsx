
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Challenge } from '@/context/ChallengeContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistPrompts {
  [key: string]: string;
}

export const useAIChat = (challenge: Challenge) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    setError(null); // Clear any previous errors
    
    // Add user message to chat
    const userMessage = { role: 'user' as const, content: messageText };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      console.log("Sending message to chat-assistant function:", {
        message: messageText,
        challenge: {
          title: challenge.title,
          company: challenge.company,
          description: challenge.description,
          requirements: challenge.requirements
        },
        historyLength: messages.length
      });
      
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
        console.error('Error from chat-assistant function:', error);
        throw new Error(error.message || 'Failed to get a response from the AI assistant');
      }
      
      console.log("Response from chat-assistant function:", data);
      
      if (!data) {
        console.error('Empty response from chat-assistant function');
        throw new Error('Empty response from the AI assistant');
      }
      
      if (data.error) {
        console.error('Error reported by chat-assistant function:', data.error);
        throw new Error(data.error.details || data.error);
      }
      
      if (!data.response) {
        console.error('Invalid response structure from chat-assistant function:', data);
        throw new Error('Invalid response from the AI assistant (missing response field)');
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
      
      // Set error state
      setError(error.message || "Failed to connect to AI assistant");
      
      toast({
        title: "AI Assistant Error",
        description: error.message || "Failed to get a response from the AI assistant. Please try again.",
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

  return {
    messages,
    isLoading,
    suggestedPrompts,
    sendMessage,
    messagesEndRef,
    error
  };
};
