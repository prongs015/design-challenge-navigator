
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenTool, CheckCircle } from 'lucide-react';
import RoleSelector from '@/components/RoleSelector';
import { Challenge } from '@/context/ChallengeContext';

interface ChallengeDetailsProps {
  challenge: Challenge;
  selectedRole: string;
  completed: boolean;
  isTimerActive: boolean;
  showGuidance: boolean;
  onStartWhiteboard: () => void;
}

const ChallengeDetails = ({
  challenge,
  selectedRole,
  completed,
  isTimerActive,
  showGuidance,
  onStartWhiteboard
}: ChallengeDetailsProps) => {
  const getGuidance = () => {
    switch (selectedRole) {
      case 'junior':
        return challenge.juniorGuidance;
      case 'senior':
        return challenge.seniorGuidance;
      case 'lead':
        return challenge.leadGuidance;
      default:
        return challenge.juniorGuidance;
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">Challenge Scenario</h2>
          <div className="w-56">
            <RoleSelector />
          </div>
        </div>
        
        <p className="text-gray-700">{challenge.scenario}</p>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {challenge.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
        
        {showGuidance && (
          <div>
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <CheckCircle size={20} className="mr-2 text-green-500" />
              Role-Specific Guidance ({selectedRole} Designer)
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {getGuidance().map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChallengeDetails;
