
import { Avatar } from "@/components/ui/avatar";
import { Bot, AlertCircle } from 'lucide-react';
import { Challenge } from '@/context/ChallengeContext';
import { useAIChat } from '@/hooks/useAIChat';
import ChatMessage from './chat/ChatMessage';
import SuggestedPrompts from './chat/SuggestedPrompts';
import ChatInput from './chat/ChatInput';
import { Alert, AlertDescription } from "@/components/ui/alert";

const AIChat = ({ challenge }: { challenge: Challenge }) => {
  const { 
    messages, 
    isLoading, 
    suggestedPrompts, 
    sendMessage, 
    messagesEndRef,
    error
  } = useAIChat(challenge);

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
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        {messages.map((message, index) => (
          <ChatMessage 
            key={index}
            role={message.role}
            content={message.content}
          />
        ))}
        
        {isLoading && (
          <ChatMessage 
            role="assistant"
            content=""
            isLoading={true}
          />
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <SuggestedPrompts 
        prompts={suggestedPrompts}
        onSelectPrompt={sendMessage}
        isLoading={isLoading}
      />
      
      <ChatInput 
        onSendMessage={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AIChat;
