
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useChallengeContext } from '@/context/ChallengeContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import EvaluationResult from '@/components/EvaluationResult';

const Evaluation = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();
  const { getChallengeById, setCurrentChallenge, currentChallenge } = useChallengeContext();
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [error, setError] = useState<string | null>(null);
  
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

  const evaluateSolution = async () => {
    if (!currentChallenge) return;
    
    setIsEvaluating(true);
    setError(null);
    
    try {
      // This would typically include the whiteboard content/screenshot
      const solutionData = {
        challengeId: currentChallenge.id,
        solution: "User's whiteboard solution would be captured here",
        challenge: {
          title: currentChallenge.title,
          description: currentChallenge.description,
          requirements: currentChallenge.requirements
        }
      };
      
      const { data, error: functionError } = await supabase.functions.invoke('evaluate-solution', {
        body: solutionData
      });
      
      if (functionError) {
        throw new Error(functionError.message || 'Failed to evaluate solution');
      }
      
      setEvaluationResult(data);
      toast({
        title: "Evaluation Complete",
        description: "Your solution has been evaluated by Gemini AI",
      });
      
    } catch (error) {
      console.error('Error evaluating solution:', error);
      setError(error.message || 'Failed to evaluate solution');
      toast({
        title: "Evaluation Error",
        description: error.message || "Could not evaluate your solution",
        variant: "destructive"
      });
    } finally {
      setIsEvaluating(false);
    }
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
            onClick={() => navigate(`/whiteboard/${challengeId}`)}
            className="mb-2 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Whiteboard
          </Button>
          <h1 className="text-2xl font-bold gradient-text">{currentChallenge.title}</h1>
          <p className="text-gray-600">{currentChallenge.company} - Evaluation</p>
        </div>
        
        <Button asChild variant="outline">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Submit Your Solution for Evaluation</h2>
                <p className="text-gray-600 mb-4">
                  Get detailed feedback on your whiteboard solution powered by Gemini AI.
                </p>
                
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
                    <p className="font-medium">Error:</p>
                    <p>{error}</p>
                  </div>
                )}
                
                <Button 
                  onClick={evaluateSolution} 
                  disabled={isEvaluating}
                  className="w-full"
                >
                  {isEvaluating ? "Evaluating..." : "Evaluate My Solution"}
                </Button>
              </div>
              
              {evaluationResult && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Evaluation Results</h2>
                  <EvaluationResult evaluation={evaluationResult} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card gradient={true}>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2 gradient-text">Challenge Summary</h3>
                <p className="text-sm text-gray-600">{currentChallenge.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2 gradient-text">Key Requirements</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {currentChallenge.requirements.map((req, index) => (
                    <li key={index} className="text-sm text-gray-600">{req}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Evaluation;
