
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChallengeContext } from '@/context/ChallengeContext';
import ChallengeCard from '@/components/ChallengeCard';
import { ArrowRight, Search } from 'lucide-react';

const Index = () => {
  const { challenges } = useChallengeContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChallenges = challenges.filter(challenge => 
    challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    challenge.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Group companies for the company section
  const companies = Array.from(new Set(challenges.map(c => c.companyId))).map(companyId => {
    const challenge = challenges.find(c => c.companyId === companyId);
    return {
      id: companyId,
      name: challenge?.company || ''
    };
  });

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-16 md:py-24 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl mx-auto">
          <div className="relative mb-8 mx-auto w-64 h-64 md:w-80 md:h-80">
            <img 
              src="/lovable-uploads/6846541c-53e6-478d-9175-12531d5bb242.png" 
              alt="Design Challenges Illustration" 
              className="w-full h-full object-contain animate-float"
            />
          </div>
          <h1 className="hero-heading mb-6 animate-fadeIn">
            Master Your Design Whiteboard Challenges!
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-slideUp">
            Practice with real-world design scenarios from top tech companies and get role-specific feedback to ace your next interview.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-primary">
              <Link to="#challenges">Start Practicing</Link>
            </Button>
            <Button variant="outline" size="lg" className="btn-outline">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-full flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-tag-blue flex items-center justify-center">
                <span className="text-tag-blue-text text-lg font-semibold">1</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Industry-Specific Scenarios</h3>
            <p className="text-gray-600">Real challenges from top companies like Uber, Airbnb, Meta, and more.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-full flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-tag-red flex items-center justify-center">
                <span className="text-tag-red-text text-lg font-semibold">2</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Adaptive Challenge Levels</h3>
            <p className="text-gray-600">Tailored feedback based on your career level: Junior, Senior, or Lead Designer.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-full flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-tag-green flex items-center justify-center">
                <span className="text-tag-green-text text-lg font-semibold">3</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Live Conversational Feedback</h3>
            <p className="text-gray-600">Get real-time guidance and critiques as you work through each challenge.</p>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-12 md:py-16" id="companies">
        <h2 className="section-heading text-center mb-12">Practice with Top Companies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {companies.map((company) => (
            <Link 
              key={company.id}
              to={`/challenge/${company.id}`}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold">{company.name}</h3>
              <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
                <span>View challenges</span>
                <ArrowRight size={14} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Challenges Section */}
      <section className="py-12 md:py-16" id="challenges">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="section-heading">Featured Challenges</h2>
          <div className="relative mt-4 md:mt-0 w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search challenges..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.slice(0, 6).map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
        
        {filteredChallenges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No challenges found matching your search.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-heading mb-6">Ready to Ace Your Next Design Interview?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Start practicing with real-world challenges and level up your whiteboarding skills today.
          </p>
          <Button asChild size="lg" className="btn-primary">
            <Link to="#challenges">Start Practicing</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
