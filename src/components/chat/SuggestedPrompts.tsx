
import { Button } from "@/components/ui/button";

interface SuggestedPromptsProps {
  prompts: string[];
  onSelectPrompt: (prompt: string) => void;
  isLoading: boolean;
}

const SuggestedPrompts = ({ prompts, onSelectPrompt, isLoading }: SuggestedPromptsProps) => {
  if (prompts.length === 0) {
    return null;
  }
  
  return (
    <div className="px-3 py-2 border-t">
      <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt, index) => (
          <Button 
            key={index}
            variant="outline" 
            size="sm" 
            className="text-xs py-1 h-auto"
            onClick={() => onSelectPrompt(prompt)}
            disabled={isLoading}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;
