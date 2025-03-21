
import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useChallengeContext } from '@/context/ChallengeContext';
import WhiteboardCanvas from '@/components/WhiteboardCanvas';
import { Button } from "@/components/ui/button";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { ArrowLeft, ChevronRight, Send } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg">Loading challenge...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-6"
    >
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
            className="mb-2 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Challenge
          </Button>
          <h1 className="text-2xl font-bold gradient-text">{currentChallenge.title}</h1>
          <p className="text-gray-600">{currentChallenge.company} - Whiteboarding</p>
        </div>
        
        <Button 
          variant="gradient" 
          rounded="full"
          onClick={handleSubmit}
          className="group"
        >
          <span className="flex items-center">
            Submit Solution
            <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>
      </div>
      
      <div className="bg-white border rounded-xl shadow-soft overflow-hidden h-[calc(100vh-240px)] min-h-[500px]">
        <WhiteboardCanvas />
      </div>
    </motion.div>
  );
};

export default Whiteboard;
