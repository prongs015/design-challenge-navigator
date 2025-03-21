import { useState } from 'react';
import { Role, useChallengeContext } from '@/context/ChallengeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const RoleSelector = () => {
  const {
    selectedRole,
    setSelectedRole
  } = useChallengeContext();
  const handleRoleChange = (role: string) => {
    setSelectedRole(role as Role);
  };
  return <div className="w-full max-w-md mx-auto">
      
      <Tabs defaultValue={selectedRole} onValueChange={handleRoleChange} className="w-full">
        
        <TabsContent value="junior" className="mt-4 text-sm text-gray-600">
          
        </TabsContent>
        <TabsContent value="senior" className="mt-4 text-sm text-gray-600">
          
        </TabsContent>
        <TabsContent value="lead" className="mt-4 text-sm text-gray-600">
          <p>Lead level requires strategic thinking, business awareness, and ability to lead cross-functional efforts. You'll need to balance user, business and technical constraints.</p>
        </TabsContent>
      </Tabs>
    </div>;
};
export default RoleSelector;