
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft } from 'lucide-react';
import { Challenge } from '@/context/ChallengeContext';

interface ChallengeHeaderProps {
  challenge: Challenge;
  onGoBack: () => void;
}

const ChallengeHeader = ({ challenge, onGoBack }: ChallengeHeaderProps) => {
  return (
    <>
      <Button variant="ghost" onClick={onGoBack} className="mb-6">
        <ArrowLeft className="mr-2" size={16} />
        Back
      </Button>
      
      <div className="flex items-center mb-4">
        <Badge className="mr-2 bg-gray-100 text-gray-700 hover:bg-gray-200">
          {challenge.company}
        </Badge>
        <div className="flex items-center text-gray-500 text-sm">
          <Clock size={14} className="mr-1" />
          <span>{challenge.duration} min</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">{challenge.title}</h1>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {challenge.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600">
            {tag}
          </span>
        ))}
      </div>
    </>
  );
};

export default ChallengeHeader;
