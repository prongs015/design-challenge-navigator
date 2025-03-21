
import { Link } from 'react-router-dom';
import { Challenge } from '@/context/ChallengeContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChallengeCardProps {
  challenge: Challenge;
  featured?: boolean;
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

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, featured = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card 
        gradient={true} 
        className={`overflow-hidden border border-gray-100 h-full flex flex-col ${
          featured ? 'ring-2 ring-purple-500/20' : ''
        }`}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge className={`${getDifficultyColor(challenge.difficulty)} capitalize font-medium`}>
              {challenge.difficulty}
            </Badge>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock size={14} className="mr-1" />
              <span>{challenge.duration} min</span>
            </div>
          </div>
          
          <CardTitle className="text-xl mt-2 group">
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-gradient-start group-hover:to-gradient-end transition-all duration-300">
              {challenge.title}
            </span>
            {featured && (
              <span className="ml-2 inline-flex items-center text-amber-500">
                <Sparkles size={14} />
              </span>
            )}
          </CardTitle>
          
          <CardDescription className="text-gray-600">{challenge.company}</CardDescription>
        </CardHeader>
        
        <CardContent className="pb-2 flex-grow">
          <p className="text-gray-600 text-sm leading-relaxed">{challenge.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {challenge.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600 transition-colors hover:bg-gray-200">
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="pt-2">
          <Link
            to={`/challenge/${challenge.companyId}?id=${challenge.id}`}
            className="w-full inline-flex items-center justify-between rounded-full text-sm font-medium px-4 py-2.5 relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gradient-start to-gradient-end opacity-100 group-hover:opacity-90 transition-opacity duration-300"></span>
            <span className="relative z-10 text-white">Start Challenge</span>
            <ArrowRight size={16} className="relative z-10 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ChallengeCard;
