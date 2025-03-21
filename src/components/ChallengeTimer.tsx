
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, PenTool } from 'lucide-react';

interface ChallengeTimerProps {
  initialDuration: number;
  onComplete: () => void;
  onTimerStart: () => void;
  onTimerPause: () => void;
  onWhiteboardOpen: () => void;
  completed: boolean;
}

const ChallengeTimer = ({
  initialDuration,
  onComplete,
  onTimerStart,
  onTimerPause,
  onWhiteboardOpen,
  completed
}: ChallengeTimerProps) => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initialDuration);

  useEffect(() => {
    let interval: number | undefined;
    
    if (isTimerActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (isTimerActive && timeLeft === 0) {
      setIsTimerActive(false);
      onComplete();
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [isTimerActive, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsTimerActive(true);
    onTimerStart();
  };

  const pauseTimer = () => {
    setIsTimerActive(false);
    onTimerPause();
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    setTimeLeft(initialDuration);
  };

  return (
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
              <Button onClick={onComplete} className="w-full bg-green-600 hover:bg-green-700">
                Complete Challenge
              </Button>
            </>
          ) : (
            <Button onClick={resetTimer} variant="outline" className="w-full">
              Restart Challenge
            </Button>
          )}
          
          {(completed || isTimerActive) && (
            <Button
              onClick={onWhiteboardOpen}
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
  );
};

export default ChallengeTimer;
