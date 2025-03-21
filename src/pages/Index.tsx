
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
      
      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader>
            <Briefcase className="h-8 w-8 text-purple-500 mb-2" />
            <CardTitle>Company-Specific Challenges</CardTitle>
            <CardDescription>
              Practice with real-world design problems from top tech companies like Uber, Airbnb, and Meta.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader>
            <PenTool className="h-8 w-8 text-blue-500 mb-2" />
            <CardTitle>Digital Whiteboard</CardTitle>
            <CardDescription>
              Sketch, create wireframes, and organize your thoughts with our intuitive whiteboarding tool.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader>
            <LayoutDashboard className="h-8 w-8 text-green-500 mb-2" />
            <CardTitle>Role-Based Guidance</CardTitle>
            <CardDescription>
              Get tailored feedback based on your target role: Junior, Senior, or Lead Designer.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      {/* Featured Challenges */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Explore Challenges</h2>
          <div className="flex gap-2">
            <Button 
              variant={viewMode === 'featured' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('featured')}
            >
              Featured
            </Button>
            <Button 
              variant={viewMode === 'companies' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('companies')}
            >
              By Company
            </Button>
          </div>
        </div>
        
        {viewMode === 'featured' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((companyId) => {
              const company = challenges.find(c => c.companyId === companyId)?.company || companyId;
              const companyCount = challenges.filter(c => c.companyId === companyId).length;
              
              return (
                <Card key={companyId} className="overflow-hidden group hover:shadow-md transition-shadow">
                  <Link to={`/challenge/${companyId}`}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                        {company}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{companyCount} challenges available</span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        )}
        
        <div className="mt-6 text-center">
          <Button asChild variant="outline">
            <Link to="/companies">
              View All Challenges
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Designers Love Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gray-50 border-0">
            <CardContent className="pt-6">
              <p className="italic text-gray-600 mb-4">
                "This platform helped me nail my design interview at Meta. The challenges are so realistic!"
              </p>
              <p className="font-semibold">- Sarah K.</p>
              <p className="text-sm text-gray-500">Senior Product Designer</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50 border-0">
            <CardContent className="pt-6">
              <p className="italic text-gray-600 mb-4">
                "The role-specific feedback helped me understand what's expected at different career levels."
              </p>
              <p className="font-semibold">- Michael T.</p>
              <p className="text-sm text-gray-500">UX Designer</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50 border-0">
            <CardContent className="pt-6">
              <p className="italic text-gray-600 mb-4">
                "The whiteboarding tool is intuitive and perfect for practicing design challenges."
              </p>
              <p className="font-semibold">- Ava P.</p>
              <p className="text-sm text-gray-500">Product Designer</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-purple-50 rounded-xl p-8 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Ready to ace your next design interview?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Start practicing with real-world challenges and track your progress over time.
        </p>
        <Button asChild size="lg">
          <Link to="/companies">
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
