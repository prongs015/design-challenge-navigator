
import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useChallengeContext } from '@/context/ChallengeContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import ChallengeHeader from '@/components/ChallengeHeader';
import ChallengeDetails from '@/components/ChallengeDetails';
import ChallengeTimer from '@/components/ChallengeTimer';
import CompanyChallengesList from '@/components/CompanyChallengesList';

const Challenge = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const challengeId = searchParams.get('id');
  
  const { 
    getChallengesByCompany, 
    getChallengeById, 
    setCurrentChallenge, 
    currentChallenge,
    selectedRole 
  } = useChallengeContext();
  
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!companyId) return;
    
    if (challengeId) {
      const challenge = getChallengeById(challengeId);
      if (challenge) {
        setCurrentChallenge(challenge);
      }
    }
    
    return () => {
      setCurrentChallenge(null);
    };
  }, [companyId, challengeId, getChallengeById, setCurrentChallenge]);

  const goBack = () => {
    navigate(-1);
  };

  const startWhiteboard = () => {
    if (currentChallenge) {
      navigate(`/challenge/${companyId}/${currentChallenge.id}/whiteboard`);
    }
  };

  const startTimer = () => {
    setIsTimerActive(true);
  };

  const pauseTimer = () => {
    setIsTimerActive(false);
  };

  const completeChallenge = () => {
    setIsTimerActive(false);
    setCompleted(true);
  };

  const companyName = currentChallenge?.company || companyId;
  const companyChallenges = companyId ? getChallengesByCompany(companyId) : [];

  if (!companyId) {
    return <div>Challenge not found</div>;
  }

  if (!currentChallenge && challengeId) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Challenge not found</h1>
        <Button onClick={goBack}>
          <ArrowLeft className="mr-2" size={16} />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {!currentChallenge ? (
        <CompanyChallengesList 
          companyName={companyName || ''}
          challenges={companyChallenges}
          onGoBack={goBack}
        />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ChallengeHeader challenge={currentChallenge} onGoBack={goBack} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Challenge Scenario - Takes 8/12 of the space */}
            <div className="lg:col-span-8">
              <ChallengeDetails 
                challenge={currentChallenge}
                selectedRole={selectedRole}
                completed={completed}
                isTimerActive={isTimerActive}
                showGuidance={completed}
                onStartWhiteboard={startWhiteboard}
              />
            </div>
            
            {/* Timer - Takes 4/12 of the space */}
            <div className="lg:col-span-4">
              <ChallengeTimer 
                initialDuration={currentChallenge.duration * 60}
                onComplete={completeChallenge}
                onTimerStart={startTimer}
                onTimerPause={pauseTimer}
                onWhiteboardOpen={startWhiteboard}
                completed={completed}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Challenge;
