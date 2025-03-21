
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import ChallengeCard from '@/components/ChallengeCard';
import { Challenge } from '@/context/ChallengeContext';

interface CompanyChallengesListProps {
  companyName: string;
  challenges: Challenge[];
  onGoBack: () => void;
}

const CompanyChallengesList = ({ companyName, challenges, onGoBack }: CompanyChallengesListProps) => {
  return (
    <>
      <Button variant="ghost" onClick={onGoBack} className="mb-6">
        <ArrowLeft className="mr-2" size={16} />
        Back
      </Button>
      
      <h1 className="text-3xl font-bold mb-2">{companyName} Challenges</h1>
      <p className="text-gray-600 mb-8">Select a challenge to practice</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
      
      {challenges.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No challenges available for this company.</p>
        </div>
      )}
    </>
  );
};

export default CompanyChallengesList;
