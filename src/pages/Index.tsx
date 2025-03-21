
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import TreesIllustration from '@/components/TreesIllustration';

const Index = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center">
      {/* Feature Tags */}
      <div className="relative w-full max-w-6xl mt-24 mb-16">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 md:translate-y-0 md:top-0">
          <div className="bg-pink-200 text-pink-900 px-6 py-3 rounded-full">
            Live Conversational Feedback
          </div>
        </div>
        
        <div className="absolute right-0 top-0">
          <div className="bg-red-200 text-red-900 px-6 py-3 rounded-full">
            Adaptive Challenge Levels
          </div>
        </div>
        
        <div className="absolute right-4 top-1/3 md:right-20 lg:right-40">
          <div className="bg-blue-200 text-blue-900 px-6 py-3 rounded-full">
            Industry-Specific Scenarios
          </div>
        </div>
        
        <div className="absolute left-4 md:left-20 bottom-0">
          <div className="bg-green-200 text-green-900 px-6 py-3 rounded-full">
            Voice-Enabled AI
          </div>
        </div>
        
        {/* Center Trees Illustration */}
        <div className="flex justify-center">
          <TreesIllustration />
        </div>
      </div>
      
      {/* Main Heading */}
      <div className="text-center mb-12 mt-8 px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
          Master Your Design<br />
          Whiteboard Challenges!
        </h1>
      </div>
      
      {/* CTA Button */}
      <div className="mb-20">
        <Button asChild size="lg" className="bg-[#1A1A1A] hover:bg-black text-white rounded-full px-12 py-6 text-lg h-auto">
          <Link to="/companies">
            Start Practicing
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
