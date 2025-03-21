
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useChallengeContext } from '@/context/ChallengeContext';
import WhiteboardCanvas from '@/components/WhiteboardCanvas';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, Send, MessageSquare, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import AIChat from '@/components/AIChat';

const Whiteboard = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();
  const { getChallengeById, setCurrentChallenge, currentChallenge } = useChallengeContext();
  const [isChatOpen, setIsChatOpen] = useState(false);
  
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
    navigate(`/evaluation/${challengeId}`);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="mb-2 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Challenges
          </Button>
          <h1 className="text-2xl font-bold gradient-text">{currentChallenge.title}</h1>
          <p className="text-gray-600">{currentChallenge.company} - Whiteboarding</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={isChatOpen ? "default" : "outline"} 
            className="group"
            onClick={toggleChat}
          >
            <MessageSquare className="mr-2 w-4 h-4" />
            AI Assistant
          </Button>
          
          <Button 
            variant="gradient" 
            rounded="full"
            onClick={handleSubmit}
            className="group"
          >
            <span className="flex items-center">
              Submit for Evaluation
              <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>
      </div>
      
      <div className="flex gap-4 h-[calc(100vh-240px)] min-h-[500px]">
        <div className={`bg-white border rounded-xl shadow-soft overflow-hidden ${isChatOpen ? 'w-3/4' : 'w-full'} transition-all duration-300`}>
          <WhiteboardCanvas />
        </div>
        
        {isChatOpen && (
          <div className="w-1/4 bg-white border rounded-xl shadow-soft overflow-hidden">
            <AIChat challenge={currentChallenge} />
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Challenge Requirements</h2>
          <ul className="list-disc pl-5 space-y-1">
            {currentChallenge.requirements.map((req, index) => (
              <li key={index} className="text-gray-700">{req}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Whiteboard;
