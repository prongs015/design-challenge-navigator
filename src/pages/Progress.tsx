
import { Link } from 'react-router-dom';
import ProgressTracker from '@/components/ProgressTracker';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

const Progress = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mb-4"
        >
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2">My Progress</h1>
        <p className="text-gray-600">
          Track your journey and review your completed challenges.
        </p>
      </div>
      
      <ProgressTracker />
    </div>
  );
};

export default Progress;
