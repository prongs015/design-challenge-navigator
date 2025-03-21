
import React from 'react';

const TreesIllustration: React.FC = () => {
  return (
    <div className="relative h-64 w-64">
      {/* Clouds */}
      <div className="absolute top-6 left-0 w-20 h-12 bg-white rounded-full"></div>
      <div className="absolute top-2 left-14 w-24 h-14 bg-white rounded-full"></div>
      
      <div className="absolute top-10 right-2 w-16 h-10 bg-white rounded-full"></div>
      <div className="absolute top-6 right-12 w-20 h-12 bg-white rounded-full"></div>
      
      {/* Large Tree */}
      <div className="absolute left-1/2 top-14 transform -translate-x-1/2">
        <div className="relative">
          {/* Tree Trunk */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-16 bg-orange-500 rounded-sm"></div>
          
          {/* Tree Base */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black rounded-full"></div>
          
          {/* Tree Layers */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-20 bg-green-500 rounded-tl-[60%] rounded-tr-[60%] rounded-bl-[20%] rounded-br-[20%]"></div>
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-green-500 rounded-tl-[60%] rounded-tr-[60%] rounded-bl-[20%] rounded-br-[20%]"></div>
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-16 h-14 bg-green-500 rounded-tl-[60%] rounded-tr-[60%] rounded-bl-[20%] rounded-br-[20%]"></div>
        </div>
      </div>
      
      {/* Small Tree */}
      <div className="absolute left-1/4 top-36 transform -translate-x-1/2">
        <div className="relative">
          {/* Tree Trunk */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-10 bg-orange-500 rounded-sm"></div>
          
          {/* Tree Base */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-black rounded-full"></div>
          
          {/* Tree Layers */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-14 bg-green-500 rounded-tl-[60%] rounded-tr-[60%] rounded-bl-[20%] rounded-br-[20%]"></div>
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-14 h-12 bg-green-500 rounded-tl-[60%] rounded-tr-[60%] rounded-bl-[20%] rounded-br-[20%]"></div>
          <div className="absolute bottom-22 left-1/2 transform -translate-x-1/2 w-12 h-10 bg-green-500 rounded-tl-[60%] rounded-tr-[60%] rounded-bl-[20%] rounded-br-[20%]"></div>
        </div>
      </div>
    </div>
  );
};

export default TreesIllustration;
