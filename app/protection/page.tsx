'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import ProtectionChart from './ProtectionChart';

export default function ProtectionPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden flex flex-col items-center" style={{ backgroundColor: '#00100A' }}>
      {/* Page Transition Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#00100A] pointer-events-none transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      />
      
      {/* Side Decoration */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <img
          src="/frames/side.png"
          alt="Side"
          className="w-full h-full"
          style={{ display: 'block', objectFit: 'fill' }}
          draggable={false}
        />
      </div>

      {/* Top Decoration */}
      <div 
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ zIndex: 60 }}
      >
        <img
          src="/frames/top.png"
          alt="Top Decoration"
          className="w-full h-auto"
          style={{ display: 'block', width: '100%', height: 'auto' }}
          draggable={false}
        />
      </div>

      {/* Title Area */}
      <div className="pt-20 pb-5 relative z-10 container mx-auto px-10 flex-shrink-0">
        <div className="relative flex justify-center">
          <img 
            src="/frames/subtitle3.png" 
            alt="保护与保育" 
            className="h-12 md:h-30 w-auto object-contain"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 container mx-auto px-10 flex-grow w-full flex flex-col overflow-hidden pb-10">
        <div className="flex-1 w-full relative flex items-end h-full">
           {/* Left 1/5 Placeholder */}
           <div className="w-1/5 h-full hidden md:block"></div>
           
           {/* Right 4/5 Area */}
           <div className="w-full md:w-4/5 h-full relative flex flex-col justify-end gap-2">
             {/* Info Area */}
              <div className="w-full flex gap-4 h-[20%]">
                {/* Left Text Rectangle */}
               <div className="flex-grow bg-black border-[5px] border-[#33827E] p-6 text-[16px] text-gray-300 leading-relaxed text-justify rounded-[30px] overflow-hidden">
                 随着广州、深圳、长沙等城市相继解禁，城市养犬管理正<span className="text-[#EE9B00]">从“禁品种”向“管行为”转变</span>，精细化养犬管理正在取代“一刀切”禁养模式。<span className="text-[#EE9B00]">随着更多城市加入解禁行列，养犬人的责任意识与科学管理措施的完善，将共同构建人犬和谐共处的城市空间。</span>
               </div>
               
               {/* Right Ruler Image */}
               <div className="flex-shrink-0 flex items-center justify-center h-full w-auto">
                 <img 
                   src="/frames/ruler3.png" 
                   alt="Ruler" 
                   className="h-full w-auto object-contain"
                 />
               </div>
             </div>

             {/* Chart Visualization */}
             <div className="w-full h-[80%] relative overflow-hidden flex items-end">
               <ProtectionChart />
             </div>
           </div>
        </div>
      </div>

      {/* Dog Decoration */}
      <div 
        className="absolute bottom-0 left-25.5 pointer-events-none"
        style={{ zIndex: 90 }}
      >
        <img
          src="/frames/dog.png"
          alt="Dog Decoration"
          className="max-w-[26vw] w-auto h-auto object-contain"
          draggable={false}
        />
      </div>

      {/* Down Arrow to Final/Next Screen */}
      <div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        style={{ zIndex: 100 }}
        onClick={() => {
          setIsLoaded(false); // Trigger fade out
          setTimeout(() => {
            router.push('/ending');
          }, 1000); // Wait for transition duration
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="#ededed" 
          className="w-12 h-12"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
  );
}
