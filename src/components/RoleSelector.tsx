
import { Role, useChallengeContext } from '@/context/ChallengeContext';
import { Code, LucideIcon, Lightbulb, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isSelected: boolean;
  onClick: () => void;
}

const RoleCard = ({ title, description, icon: Icon, isSelected, onClick }: RoleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0.8, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-3 rounded-lg transition-all duration-300 cursor-pointer ${
        isSelected ? 'bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 shadow-md' : 'bg-gray-50 border border-gray-100 hover:bg-gray-100'
      }`}
      onClick={onClick}
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
  
  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
  };
  
  return (
    <div className="w-full space-y-3">
      <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-1">Experience Level</h3>
      
      <div className="space-y-2">
        <RoleCard 
          title="Junior Designer"
          description="Focus on core UX principles and simple solutions."
          icon={Code}
          isSelected={selectedRole === 'junior'}
          onClick={() => handleRoleSelect('junior')}
        />
        
        <RoleCard 
          title="Senior Designer"
          description="Balance user needs with technical constraints."
          icon={Lightbulb}
          isSelected={selectedRole === 'senior'}
          onClick={() => handleRoleSelect('senior')}
        />
        
        <RoleCard 
          title="Lead Designer"
          description="Strategic thinking and business awareness."
          icon={Briefcase}
          isSelected={selectedRole === 'lead'}
          onClick={() => handleRoleSelect('lead')}
        />
      </div>
    </div>
  );
};

export default RoleSelector;
