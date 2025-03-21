
import { useState } from 'react';
import { Role, useChallengeContext } from '@/context/ChallengeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RoleSelector = () => {
  const { selectedRole, setSelectedRole } = useChallengeContext();
  
  const handleRoleChange = (role: string) => {
    setSelectedRole(role as Role);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg font-medium mb-3 text-center">Select Your Role Level</h3>
      <Tabs
        defaultValue={selectedRole}
        onValueChange={handleRoleChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="junior" className="text-sm">Junior Designer</TabsTrigger>
          <TabsTrigger value="senior" className="text-sm">Senior Designer</TabsTrigger>
          <TabsTrigger value="lead" className="text-sm">Lead Designer</TabsTrigger>
        </TabsList>
        <TabsContent value="junior" className="mt-4 text-sm text-gray-600">
          <p>Junior level focuses on core UI/UX skills and following established patterns. Expectations include strong attention to detail and solving defined problems.</p>
        </TabsContent>
        <TabsContent value="senior" className="mt-4 text-sm text-gray-600">
          <p>Senior level requires deeper problem solving and the ability to consider multiple user journeys. You'll be expected to think about edge cases and broader impacts.</p>
        </TabsContent>
        <TabsContent value="lead" className="mt-4 text-sm text-gray-600">
          <p>Lead level requires strategic thinking, business awareness, and ability to lead cross-functional efforts. You'll need to balance user, business and technical constraints.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoleSelector;
