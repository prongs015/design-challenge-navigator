
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { challenges } from '@/data/challenges';

export type Role = 'junior' | 'senior' | 'lead';

export interface Challenge {
  id: string;
  company: string;
  companyId: string;
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  scenario: string;
  requirements: string[];
  juniorGuidance: string[];
  seniorGuidance: string[];
  leadGuidance: string[];
}

interface ChallengeContextType {
  challenges: Challenge[];
  currentChallenge: Challenge | null;
  selectedRole: Role;
  setCurrentChallenge: (challenge: Challenge | null) => void;
  setSelectedRole: (role: Role) => void;
  getChallengesByCompany: (companyId: string) => Challenge[];
  getChallengeById: (id: string) => Challenge | undefined;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export const ChallengeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>('junior');

  const getChallengesByCompany = (companyId: string) => {
    return challenges.filter((challenge) => challenge.companyId === companyId);
  };

  const getChallengeById = (id: string) => {
    return challenges.find((challenge) => challenge.id === id);
  };

  return (
    <ChallengeContext.Provider
      value={{
        challenges,
        currentChallenge,
        selectedRole,
        setCurrentChallenge,
        setSelectedRole,
        getChallengesByCompany,
        getChallengeById,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallengeContext = () => {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallengeContext must be used within a ChallengeProvider');
  }
  return context;
};
