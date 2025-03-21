
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
  PenTool,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  const { challenges } = useChallengeContext();
  
  // Get featured challenges (for the purposes of this demo, just take first few)
  const featuredChallenges = challenges.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
          Practice Whiteboarding with AI Feedback
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Select a design challenge, work on the whiteboard, and get AI-powered evaluation of your solutions.
        </p>
      </div>
      
      {/* Challenges Grid */}
      <h2 className="text-2xl font-bold mb-6">Select a Challenge</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {featuredChallenges.map((challenge) => (
          <Card key={challenge.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{challenge.title}</CardTitle>
              <CardDescription>{challenge.company}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-2">{challenge.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {challenge.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
              <Button asChild className="w-full">
                <Link to={`/whiteboard/${challenge.id}`} className="flex items-center justify-center">
                  <PenTool className="mr-2 h-4 w-4" />
                  Start Whiteboarding
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
