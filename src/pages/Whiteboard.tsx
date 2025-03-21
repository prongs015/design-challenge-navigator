
import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useChallengeContext } from '@/context/ChallengeContext';
import WhiteboardCanvas from '@/components/WhiteboardCanvas';
import { Button } from "@/components/ui/button";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { ArrowLeft, ChevronRight } from 'lucide-react';

const Whiteboard = () => {
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
  
  const handleSubmit = () => {
    navigate(`/challenge/${companyId}/${challengeId}/submit`);
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
              <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to={`/challenge/${companyId}`}>
                {currentChallenge.company}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{currentChallenge.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/challenge/${companyId}?id=${challengeId}`)}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Challenge
          </Button>
          <h1 className="text-2xl font-bold">{currentChallenge.title}</h1>
          <p className="text-gray-600">{currentChallenge.company} - Whiteboarding</p>
        </div>
        
        <Button onClick={handleSubmit}>
          Submit Solution
        </Button>
      </div>
      
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden h-[calc(100vh-240px)] min-h-[500px]">
        <WhiteboardCanvas />
      </div>
    </div>
  );
};

export default Whiteboard;
