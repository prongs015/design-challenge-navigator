
import { Link } from 'react-router-dom';
import { useChallengeContext } from '@/context/ChallengeContext';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Briefcase,
  ArrowRight,
  Search
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useState } from 'react';

const Companies = () => {
  const { challenges } = useChallengeContext();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get unique companies
  const uniqueCompanies = Array.from(
    new Set(challenges.map(challenge => challenge.companyId))
  ).map(companyId => {
    const company = challenges.find(c => c.companyId === companyId);
    return {
      id: companyId,
      name: company?.company || companyId,
      count: challenges.filter(c => c.companyId === companyId).length,
      tags: Array.from(
        new Set(
          challenges
            .filter(c => c.companyId === companyId)
            .flatMap(c => c.tags)
        )
      ),
      difficulty: challenges
        .filter(c => c.companyId === companyId)
        .map(c => c.difficulty)
    };
  });
  
  // Filter companies based on search query
  const filteredCompanies = uniqueCompanies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-2">Company Challenges</h1>
        <p className="text-gray-600 mb-6">
          Choose a company to view and practice their design challenges. Each company offers unique challenges that reflect their real-world product design problems.
        </p>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search by company name or challenge type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-purple-500" />
                  {company.name}
                </CardTitle>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                  {company.count} challenge{company.count !== 1 ? 's' : ''}
                </span>
              </div>
              <CardDescription>
                Tackle real-world design problems inspired by {company.name}'s products.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {company.tags.slice(0, 5).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <span>Difficulty: </span>
                    {company.difficulty.includes('hard') && (
                      <span className="text-red-500 font-medium">Hard</span>
                    )}
                    {!company.difficulty.includes('hard') && company.difficulty.includes('medium') && (
                      <span className="text-orange-500 font-medium">Medium</span>
                    )}
                    {company.difficulty.every(d => d === 'easy') && (
                      <span className="text-green-500 font-medium">Easy</span>
                    )}
                  </div>
                  
                  <Button asChild variant="ghost" size="sm">
                    <Link to={`/challenge/${company.id}`}>
                      View Challenges
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No companies found matching "{searchQuery}"</p>
          <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
        </div>
      )}
    </div>
  );
};

export default Companies;
