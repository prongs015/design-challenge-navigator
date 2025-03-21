import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useChallengeContext } from '@/context/ChallengeContext';
import SubmissionForm from '@/components/SubmissionForm';
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
const Submit = () => {
  const {
    companyId,
    challengeId
  } = useParams<{
    companyId: string;
    challengeId: string;
  }>();
  const navigate = useNavigate();
  const {
    getChallengeById,
    setCurrentChallenge,
    currentChallenge
  } = useChallengeContext();
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
    return <div className="container mx-auto px-4 py-12 text-center">
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.5
      }}>
          <p className="text-lg">Loading challenge...</p>
        </motion.div>
      </div>;
  }
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.3
  }} className="container mx-auto px-4 py-6">
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
          <Button variant="ghost" size="sm" onClick={() => navigate(`/challenge/${companyId}/${challengeId}/whiteboard`)} className="mb-2 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Whiteboard
          </Button>
          <h1 className="text-2xl font-bold gradient-text">{currentChallenge.title}</h1>
          <p className="text-gray-600">{currentChallenge.company} - Submit Solution</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <SubmissionForm challengeId={challengeId || ''} onComplete={handleComplete} />
        </div>
        
        <div className="lg:col-span-1">
          <Card gradient={true} className="animate-fadeIn">
            
          </Card>
        </div>
      </div>
    </motion.div>;
};
export default Submit;