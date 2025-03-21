
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useChallengeContext } from '@/context/ChallengeContext';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle,
  BarChart2,
  Calendar,
  ArrowRight
} from 'lucide-react';

// This would come from a real database in a production app
interface CompletedChallenge {
  id: string;
  challengeId: string;
  completedAt: string;
  role: string;
}

const ProgressTracker = () => {
  // Mock data - in a real app, this would come from an API or database
  const [completedChallenges] = useState<CompletedChallenge[]>([
    {
      id: '1',
      challengeId: 'uber-1',
      completedAt: '2023-10-15T14:30:00Z',
      role: 'junior'
    },
    {
      id: '2',
      challengeId: 'airbnb-1',
      completedAt: '2023-10-20T10:15:00Z',
      role: 'junior'
    },
    {
      id: '3',
      challengeId: 'meta-1',
      completedAt: '2023-10-27T16:45:00Z',
      role: 'senior'
    }
  ]);
  
  const { challenges } = useChallengeContext();
  
  // Calculate stats
  const totalCompleted = completedChallenges.length;
  const juniorCount = completedChallenges.filter(c => c.role === 'junior').length;
  const seniorCount = completedChallenges.filter(c => c.role === 'senior').length;
  const leadCount = completedChallenges.filter(c => c.role === 'lead').length;
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  // Get challenge details by ID
  const getChallengeDetails = (challengeId: string) => {
    return challenges.find(c => c.id === challengeId);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-gray-500">Total Completed</p>
              <p className="text-3xl font-bold">{totalCompleted}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500 opacity-80" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-gray-500">By Role Level</p>
              <div className="flex space-x-2 mt-1">
                <Badge variant="secondary">{juniorCount} Junior</Badge>
                <Badge variant="secondary">{seniorCount} Senior</Badge>
                <Badge variant="secondary">{leadCount} Lead</Badge>
              </div>
            </div>
            <BarChart2 className="w-10 h-10 text-blue-500 opacity-80" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-gray-500">Streak</p>
              <p className="text-3xl font-bold">3 Days</p>
            </div>
            <Calendar className="w-10 h-10 text-purple-500 opacity-80" />
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-semibold mt-8 mb-4">Completed Challenges</h2>
      
      <div className="space-y-4">
        {completedChallenges.length > 0 ? (
          completedChallenges.map(challenge => {
            const details = getChallengeDetails(challenge.challengeId);
            return (
              <Card key={challenge.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge>{details?.company || 'Unknown'}</Badge>
                        <Badge variant="outline" className="capitalize">
                          {challenge.role} Level
                        </Badge>
                      </div>
                      <h3 className="font-medium text-lg">{details?.title || 'Unknown Challenge'}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Completed on {formatDate(challenge.completedAt)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0">
                      <Link to={`/challenge/${details?.companyId}?id=${challenge.challengeId}`}>
                        <Button variant="outline" className="flex items-center">
                          View Challenge
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-10 border rounded-lg bg-gray-50">
            <p className="text-gray-500">You haven't completed any challenges yet.</p>
            <Link to="/">
              <Button className="mt-4">Find a Challenge</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
