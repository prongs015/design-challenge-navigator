
import { Avatar } from "@/components/ui/avatar";
import { Bot } from 'lucide-react';

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
}

const ChatMessage = ({ content, role }: ChatMessageProps) => {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          role === 'user' 
            ? 'bg-primary text-white rounded-tr-none' 
            : 'bg-gray-100 text-gray-800 rounded-tl-none'
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;
