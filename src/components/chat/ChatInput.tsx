
import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    onSendMessage(input);
    setInput('');
  };

  return (
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
  );
};

export default ChatInput;
