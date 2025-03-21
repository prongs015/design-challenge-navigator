
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
    <>
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold">Challenge Scenario</h2>
            
            {/* Embed RoleSelector in a smaller card within the Challenge card */}
            <div className="w-56">
              <RoleSelector />
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">{challenge.scenario}</p>
          
          <h2 className="text-xl font-semibold mb-3">Requirements</h2>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            {challenge.requirements.map((req, index) => (
              <li key={index} className="text-gray-700">{req}</li>
            ))}
          </ul>
          
          {showGuidance && (
            <>
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <CheckCircle size={20} className="mr-2 text-green-500" />
                Role-Specific Guidance ({selectedRole} Designer)
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                {getGuidance().map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </>
          )}
        </CardContent>
      </Card>
      
      {isTimerActive && !completed && (
        <Button
          onClick={onStartWhiteboard}
          className="w-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center mb-6"
          size="lg"
        >
          <PenTool className="mr-2" size={18} />
          Open Whiteboard
        </Button>
      )}
    </>
  );
};

export default ChallengeDetails;
