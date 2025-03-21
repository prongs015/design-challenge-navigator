
import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useChallengeContext } from '@/context/ChallengeContext';
import SubmissionForm from '@/components/SubmissionForm';
import { Button } from "@/components/ui/button";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const Submit = () => {
  const { companyId, challengeId } = useParams<{ companyId: string; challengeId: string }>();
  const navigate = useNavigate();
  const { getChallengeById, setCurrentChallenge, currentChallenge } = useChallengeContext();
  
  useEffect(() => {
    if (challengeId) {
      const challenge = getChallengeById(challengeId);
      if (challenge) {
        setCurrentChallenge(challenge);
      } else {
        // Navigate back if challenge not found
        navigate('/');
      }
    }
    
    return () => {
      // Clean up when component unmounts
      setCurrentChallenge(null);
    };
  }, [challengeId, getChallengeById, setCurrentChallenge, navigate]);
  
  const handleComplete = () => {
    navigate('/progress');
  };

  if (!currentChallenge) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Loading challenge...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/" className="underline hover:text-primary">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <Link to={`/challenge/${companyId}`} className="underline hover:text-primary">
                {currentChallenge.company}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <Link to={`/challenge/${companyId}?id=${challengeId}`} className="underline hover:text-primary">
                {currentChallenge.title}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Submit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/challenge/${companyId}/${challengeId}/whiteboard`)}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Whiteboard
          </Button>
          <h1 className="text-2xl font-bold">{currentChallenge.title}</h1>
          <p className="text-gray-600">{currentChallenge.company} - Submit Solution</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <SubmissionForm 
            challengeId={challengeId || ''} 
            onComplete={handleComplete} 
          />
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Challenge Summary</h3>
                <p className="text-sm text-gray-600">{currentChallenge.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Key Requirements</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {currentChallenge.requirements.map((req, index) => (
                    <li key={index} className="text-sm text-gray-600">{req}</li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-2">What's Next?</h3>
                <p className="text-sm text-gray-600 mb-2">
                  After submission, your challenge will be recorded and you can:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-sm text-gray-600">Review your completed challenges</li>
                  <li className="text-sm text-gray-600">Track your progress over time</li>
                  <li className="text-sm text-gray-600">Share with peers for feedback</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Submit;
