
import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useChallengeContext, Challenge as ChallengeType } from '@/context/ChallengeContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ChallengeCard from '@/components/ChallengeCard';
import RoleSelector from '@/components/RoleSelector';
import { Clock, ArrowLeft, CheckCircle, AlertCircle, HelpCircle, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [timeLeft, setTimeLeft] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!companyId) return;
    
    if (challengeId) {
      const challenge = getChallengeById(challengeId);
      if (challenge) {
        setCurrentChallenge(challenge);
        setTimeLeft(challenge.duration * 60);
      }
    }
    
    return () => {
      setCurrentChallenge(null);
    };
  }, [companyId, challengeId, getChallengeById, setCurrentChallenge]);

  useEffect(() => {
    let interval: number | undefined;
    
    if (isTimerActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (isTimerActive && timeLeft === 0) {
      setIsTimerActive(false);
      setCompleted(true);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [isTimerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsTimerActive(true);
  };

  const pauseTimer = () => {
    setIsTimerActive(false);
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    if (currentChallenge) {
      setTimeLeft(currentChallenge.duration * 60);
    }
    setCompleted(false);
  };

  const completeChallenge = () => {
    setIsTimerActive(false);
    setCompleted(true);
  };

  const goBack = () => {
    navigate(-1);
  };

  const startWhiteboard = () => {
    if (currentChallenge) {
      navigate(`/challenge/${companyId}/${currentChallenge.id}/whiteboard`);
    }
  };

  const getGuidance = () => {
    if (!currentChallenge) return [];
    
    switch (selectedRole) {
      case 'junior':
        return currentChallenge.juniorGuidance;
      case 'senior':
        return currentChallenge.seniorGuidance;
      case 'lead':
        return currentChallenge.leadGuidance;
      default:
        return currentChallenge.juniorGuidance;
    }
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
      <Button variant="ghost" onClick={goBack} className="mb-6">
        <ArrowLeft className="mr-2" size={16} />
        Back
      </Button>
      
      {!currentChallenge ? (
        <>
          <h1 className="text-3xl font-bold mb-2">{companyName} Challenges</h1>
          <p className="text-gray-600 mb-8">Select a challenge to practice</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
          
          {companyChallenges.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No challenges available for this company.</p>
            </div>
          )}
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <Badge className="mr-2 bg-gray-100 text-gray-700 hover:bg-gray-200">
              {currentChallenge.company}
            </Badge>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock size={14} className="mr-1" />
              <span>{currentChallenge.duration} min</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-6">{currentChallenge.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {currentChallenge.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Challenge Scenario - Now takes 8/12 of the space */}
            <div className="lg:col-span-8">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-xl font-semibold">Challenge Scenario</h2>
                    
                    {/* Embed RoleSelector in a smaller card within the Challenge card */}
                    <div className="w-56">
                      <RoleSelector />
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{currentChallenge.scenario}</p>
                  
                  <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-2 mb-6">
                    {currentChallenge.requirements.map((req, index) => (
                      <li key={index} className="text-gray-700">{req}</li>
                    ))}
                  </ul>
                  
                  {completed && (
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
                  onClick={startWhiteboard}
                  className="w-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center mb-6"
                  size="lg"
                >
                  <PenTool className="mr-2" size={18} />
                  Open Whiteboard
                </Button>
              )}
            </div>
            
            {/* Timer - Now takes 4/12 of the space */}
            <div className="lg:col-span-4">
              <Card className="sticky top-20 mb-6">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-mono mb-2">{formatTime(timeLeft)}</div>
                    <p className="text-sm text-gray-500">Time Remaining</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {!isTimerActive && !completed ? (
                      <Button onClick={startTimer} className="w-full bg-black text-white hover:bg-gray-800">
                        Start Challenge
                      </Button>
                    ) : isTimerActive ? (
                      <>
                        <Button onClick={pauseTimer} variant="outline" className="w-full">
                          Pause Timer
                        </Button>
                        <Button onClick={completeChallenge} className="w-full bg-green-600 hover:bg-green-700">
                          Complete Challenge
                        </Button>
                      </>
                    ) : (
                      <Button onClick={resetTimer} variant="outline" className="w-full">
                        Restart Challenge
                      </Button>
                    )}
                    
                    {completed && (
                      <Button
                        onClick={startWhiteboard}
                        className="w-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center"
                      >
                        <PenTool className="mr-2" size={16} />
                        Open Whiteboard
                      </Button>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-2">Tips</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <HelpCircle size={16} className="mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                        <span className="text-gray-700">Use the timer to simulate a real interview</span>
                      </li>
                      <li className="flex items-start">
                        <HelpCircle size={16} className="mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                        <span className="text-gray-700">Talk through your thinking process</span>
                      </li>
                      <li className="flex items-start">
                        <HelpCircle size={16} className="mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                        <span className="text-gray-700">Consider both user and business needs</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Challenge;
