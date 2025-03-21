
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Check, Share2, FileText, Send } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface SubmissionFormProps {
  challengeId: string;
  onComplete: () => void;
}

const SubmissionForm = ({ challengeId, onComplete }: SubmissionFormProps) => {
  const [reflections, setReflections] = useState('');
  const [challenges, setChallenges] = useState('');
  const [selectedTab, setSelectedTab] = useState('reflections');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Solution submitted!",
        description: "Your challenge solution has been saved successfully.",
      });
      onComplete();
    }, 1500);
  };

  const handleShare = () => {
    // In a real app, this would generate a shareable link
    const dummyLink = `https://designbuddy.app/shared/${challengeId}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(dummyLink).then(
      () => {
        toast({
          title: "Link copied to clipboard!",
          description: "Share this link with others to get feedback on your solution.",
        });
      },
      () => {
        toast({
          title: "Failed to copy link",
          description: "Please try again or manually share the URL.",
          variant: "destructive",
        });
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Complete Your Challenge</h2>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="reflections">Reflections</TabsTrigger>
            <TabsTrigger value="challenges">Challenges & Learnings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reflections" className="mt-4">
            <p className="text-sm text-gray-600 mb-2">
              Reflect on your design process and solution. What went well? How does your solution meet the requirements?
            </p>
            <Textarea
              value={reflections}
              onChange={(e) => setReflections(e.target.value)}
              placeholder="Share your reflections..."
              className="min-h-[150px]"
            />
          </TabsContent>
          
          <TabsContent value="challenges" className="mt-4">
            <p className="text-sm text-gray-600 mb-2">
              What challenges did you face? What would you do differently next time? What did you learn?
            </p>
            <Textarea
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              placeholder="Share your challenges and learnings..."
              className="min-h-[150px]"
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleShare}
            className="flex items-center"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share for Feedback
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                View Summary
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Challenge Summary</SheetTitle>
                <SheetDescription>
                  Review your challenge solution before submitting
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <h3 className="font-medium mb-2">Reflections</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {reflections || "No reflections added yet."}
                </p>
                
                <h3 className="font-medium mb-2">Challenges & Learnings</h3>
                <p className="text-sm text-gray-600">
                  {challenges || "No challenges or learnings added yet."}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <Button 
          className="flex items-center" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>Submitting...</>
          ) : (
            <>
              <Check className="w-4 h-4 mr-2" />
              Complete Challenge
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SubmissionForm;
