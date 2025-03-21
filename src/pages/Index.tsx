
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
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <Card className="border-0 shadow-soft overflow-hidden h-full">
    <CardContent className="p-6">
      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </CardContent>
  </Card>
);

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
      <div className="text-center mb-20 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <Sparkles size={16} className="mr-1" />
              Practice like you interview
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-gradient-to-r from-gray-900 via-primary to-gray-800 bg-clip-text text-transparent">
            Master Product Design Interviews
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Sharpen your design skills with real-world challenges from top tech companies.
            Practice at your own pace and get role-specific feedback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="flex items-center group">
              <Link to="/companies">
                Find a Challenge
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/progress">
                View My Progress
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Featured Challenges Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-20"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Popular Challenges</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Start practicing with these featured design challenges from top companies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <ChallengeCard challenge={challenge} featured={index === 0} />
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="group">
            <Link to="/companies">
              View all challenges
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </motion.div>
      
      {/* How It Works Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-16"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A simple three-step process to improve your design skills
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Briefcase}
            title="1. Choose a Challenge"
            description="Select from real-world design challenges based on actual interviews from top companies."
          />
          <FeatureCard 
            icon={PenTool}
            title="2. Design Solution"
            description="Use our built-in whiteboard to sketch and document your design process and solution."
          />
          <FeatureCard 
            icon={CheckCircle}
            title="3. Get Feedback"
            description="Submit your solution and receive AI-powered feedback based on your experience level."
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
