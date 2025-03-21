
import { useState } from 'react';
import { Role, useChallengeContext } from '@/context/ChallengeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, LucideIcon, Lightbulb, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isSelected: boolean;
}

const RoleCard = ({ title, description, icon: Icon, isSelected }: RoleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0.8, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-3 rounded-lg transition-all duration-300 ${
        isSelected ? 'bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 shadow-md' : 'bg-gray-50 border border-gray-100'
      }`}
    >
      <div className="flex items-start gap-2">
        <div className={`p-1.5 rounded-md ${isSelected ? 'bg-primary/20 text-primary' : 'bg-gray-200 text-gray-500'}`}>
          <Icon size={16} />
        </div>
        <div>
          <h3 className={`font-medium text-sm ${isSelected ? 'text-primary' : 'text-gray-700'}`}>{title}</h3>
          <p className="text-xs text-gray-600 mt-0.5">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const RoleSelector = () => {
  const {
    selectedRole,
    setSelectedRole
  } = useChallengeContext();
  
  const handleRoleChange = (role: string) => {
    setSelectedRole(role as Role);
  };
  
  return (
    <div className="w-full space-y-3">
      <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-1">Select Experience Level</h3>
      
      <Tabs defaultValue={selectedRole} onValueChange={handleRoleChange} className="w-full">
        <TabsList className="grid grid-cols-3 mb-2 p-1">
          <TabsTrigger value="junior" className="text-xs">Junior</TabsTrigger>
          <TabsTrigger value="senior" className="text-xs">Senior</TabsTrigger>
          <TabsTrigger value="lead" className="text-xs">Lead</TabsTrigger>
        </TabsList>
        
        <div className="space-y-2 mt-2">
          <RoleCard 
            title="Junior Designer"
            description="Focus on core UX principles and simple solutions."
            icon={Code}
            isSelected={selectedRole === 'junior'}
          />
          
          <RoleCard 
            title="Senior Designer"
            description="Balance user needs with technical constraints."
            icon={Lightbulb}
            isSelected={selectedRole === 'senior'}
          />
          
          <RoleCard 
            title="Lead Designer"
            description="Strategic thinking and business awareness."
            icon={Briefcase}
            isSelected={selectedRole === 'lead'}
          />
        </div>
      </Tabs>
    </div>
  );
};

export default RoleSelector;
