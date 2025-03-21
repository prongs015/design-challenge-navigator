import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useChallengeContext } from '@/context/ChallengeContext';
import ChallengeCard from '@/components/ChallengeCard';
import {
  Briefcase,
  PenTool,
  LayoutDashboard,
  Clock,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  const { challenges } = useChallengeContext();
  const [viewMode, setViewMode] = useState<'featured' | 'companies'>('featured');
  
  // Get unique companies from challenges
  const companies = [...new Set(challenges.map(challenge => challenge.companyId))];
  
  // Get featured challenges (for the purposes of this demo, just take a couple)
  const featuredChallenges = challenges.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
          Practice Product Design Interviews Like Never Before
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Sharpen your design skills with real-world challenges from top tech companies.
          Practice at your own pace and get role-specific feedback.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="flex items-center">
            <Link to="/companies">
              Find a Challenge
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/progress">
              My Progress
            </Link>
          </Button>
        </div>
      </div>
      
      {/* I've removed the Features Section as requested */}
    </div>
  );
};

export default Index;
