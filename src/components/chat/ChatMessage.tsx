
import { Avatar } from "@/components/ui/avatar";
import { Bot } from 'lucide-react';
import { Loader } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
  isLoading?: boolean;
}

const ChatMessage = ({ content, role, isLoading }: ChatMessageProps) => {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {role === 'assistant' && isLoading ? (
        <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800 rounded-tl-none flex items-center space-x-2">
          <Loader className="w-4 h-4 animate-spin text-primary" />
          <span>Generating response...</span>
        </div>
      ) : (
        <div 
          className={`max-w-[80%] p-3 rounded-lg ${
            role === 'user' 
              ? 'bg-primary text-white rounded-tr-none' 
              : 'bg-gray-100 text-gray-800 rounded-tl-none'
          }`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
