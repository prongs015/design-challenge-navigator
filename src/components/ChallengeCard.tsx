
import { Link } from 'react-router-dom';
import { Challenge } from '@/context/ChallengeContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'bg-tag-green text-tag-green-text';
    case 'medium':
      return 'bg-tag-blue text-tag-blue-text';
    case 'hard':
      return 'bg-tag-red text-tag-red-text';
    default:
      return 'bg-tag-blue text-tag-blue-text';
  }
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  return (
    <Card className="overflow-hidden card-hover border border-gray-100 h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge className={`${getDifficultyColor(challenge.difficulty)} capitalize`}>
            {challenge.difficulty}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock size={14} className="mr-1" />
            <span>{challenge.duration} min</span>
          </div>
        </div>
        <CardTitle className="text-xl mt-2">{challenge.title}</CardTitle>
        <CardDescription className="text-gray-600">{challenge.company}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-gray-600 text-sm leading-relaxed">{challenge.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {challenge.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link
          to={`/challenge/${challenge.companyId}?id=${challenge.id}`}
          className="w-full inline-flex items-center justify-between rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring px-3 py-2 bg-black text-white hover:bg-gray-800"
        >
          <span>Start Challenge</span>
          <ArrowRight size={16} />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
