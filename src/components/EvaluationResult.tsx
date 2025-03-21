
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Lightbulb, AlertCircle } from 'lucide-react';

type CategoryScore = {
  score: number;
  feedback: string;
  improvement: string;
};

export type EvaluationResult = {
  problem_understanding: CategoryScore;
  design_thinking: CategoryScore;
  requirements_fulfillment: CategoryScore;
  communication: CategoryScore;
  overall_score: number;
  summary: string;
};

interface EvaluationResultProps {
  result?: EvaluationResult;
  isLoading: boolean;
  error?: string;
}

const EvaluationResult: React.FC<EvaluationResultProps> = ({ 
  result, 
  isLoading, 
  error 
}) => {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-3/4" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <div className="space-y-2 pt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center text-destructive">
            <AlertCircle className="mr-2 h-5 w-5" />
            Evaluation Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">
            {error}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!result) return null;

  // Helper function to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 20) return "bg-green-500";
    if (score >= 15) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Helper function to calculate overall color
  const getOverallColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const categories = [
    { key: 'problem_understanding', label: 'Problem Understanding', data: result.problem_understanding },
    { key: 'design_thinking', label: 'Design Thinking', data: result.design_thinking },
    { key: 'requirements_fulfillment', label: 'Requirements Fulfillment', data: result.requirements_fulfillment },
    { key: 'communication', label: 'Communication', data: result.communication },
  ];

  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-primary" />
          Solution Evaluation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <span className={`text-4xl font-bold ${getOverallColor(result.overall_score)}`}>
            {result.overall_score}/100
          </span>
          <p className="text-sm text-gray-500 mt-1">Overall Score</p>
        </div>

        <p className="text-sm text-gray-600 my-4">{result.summary}</p>

        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.key} className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">{category.label}</h4>
                <span className="text-sm font-medium">{category.data.score}/25</span>
              </div>
              <Progress value={(category.data.score / 25) * 100} className={getScoreColor(category.data.score)} />
              <p className="text-sm text-gray-600 mt-1">{category.data.feedback}</p>
              <div className="flex items-start mt-1 bg-gray-50 p-2 rounded">
                <Lightbulb className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600 italic">
                  {category.data.improvement}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EvaluationResult;
