'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SciencePage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [selectedWork, setSelectedWork] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  useEffect(() => {
    // 稍微延迟以确保过渡动画平滑执行
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const handleWheel = (e: WheelEvent) => {
      // Adjust sensitivity as needed (0.001 means 1000px of scroll delta to full range)
      setProgress(prev => {
        const newProgress = prev + e.deltaY * 0.001;
        return Math.min(Math.max(newProgress, 0), 1);
      });
    };
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(timer);
    };
  }, []);

  // Start at 50% (center), move to 88% (bottom area)
  const startTop = 50;
  const endTop = 88;
  const currentTop = startTop + (endTop - startTop) * progress;

  return (
    <div className="w-full h-screen relative overflow-hidden" style={{ backgroundColor: '#00100A' }}>
      {/* 页面过渡遮罩 */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#00100A] pointer-events-none transition-opacity duration-1000 ease-in-out ${isLoaded && !isExiting ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* side 图片始终固定在画面最上方 */}
      <div 
        className="fixed top-0 left-0 w-full pointer-events-none"
        style={{
          zIndex: 10,
        }}
      >
        <img
          src="/frames/side.png"
          alt="Side"
          className="w-full h-auto"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
          }}
          draggable={false}
        />
      </div>

      {/* top 图片固定在画面最上方，位于 side 之下 */}
      <div 
        className="fixed top-0 left-0 w-full pointer-events-none"
        style={{
          zIndex: 5, // 低于 side.png (zIndex 10)
        }}
      >
        <img
          src="/frames/top.png"
          alt="Top Decoration"
          className="w-full h-auto"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
          }}
          draggable={false}
        />
      </div>

      {/* 图片展示区域 */}
      <div 
        className="fixed left-0 w-full px-10 z-15 transition-opacity duration-500 flex justify-center"
        style={{
          top: '45%',
          transform: 'translateY(-50%)',
          opacity: Math.max(0, (progress - 0.5) * 2), // 进度超过 0.5 时开始显示
          pointerEvents: progress > 0.5 ? 'auto' : 'none',
        }}
      >
        <div className={`flex items-center justify-center gap-8 transition-all duration-500 w-full max-w-7xl`}>
          {/* 左侧 Grid */}
          <div className={`grid grid-cols-3 gap-6 transition-all duration-500 ${selectedWork ? 'w-[60%]' : 'w-full max-w-6xl'}`}>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div 
                key={num} 
                className={`aspect-[4/3] relative flex items-center justify-center cursor-pointer transition-all duration-300 ${selectedWork === num ? 'scale-105 ring-2 ring-[#BE7D12] rounded-lg' : 'hover:scale-105'}`}
                onClick={() => setSelectedWork(selectedWork === num ? null : num)}
              >
                 <img 
                   src={`/frames/work${num}.png`}
                   alt={`Work ${num}`}
                   className="w-full h-full object-contain"
                 />
              </div>
            ))}
          </div>

          {/* 右侧 Info Card */}
          <div 
            className={`transition-all duration-500 overflow-hidden ${selectedWork ? 'w-[35%] opacity-100' : 'w-0 opacity-0'}`}
          >
             {selectedWork && (
               <img 
                 src={`/frames/infor${selectedWork}.png`}
                 alt={`Info ${selectedWork}`}
                 className="w-full h-auto object-contain animate-fadeIn"
               />
             )}
          </div>
        </div>
      </div>

      {/* 动态文本区域 */}
      <div 
        className="fixed left-0 w-full px-20 text-center transition-all duration-300 ease-out z-20"
        style={{
          top: `${currentTop}%`,
          transform: 'translateY(-50%)',
        }}
      >
         <p className="text-[#ededed] text-lg leading-relaxed tracking-wider">
           而到了现代，中国犬类的现代职能已经从传统的
           <span style={{ color: '#BE7D12', fontWeight: 'bold' }}>看家护院、狩猎</span>
           ，拓展到
           <span style={{ color: '#BE7D12', fontWeight: 'bold' }}>工作、伴侣、服务、特殊行业辅助</span>
           等多个领域。
         </p>
         
         <p 
           className="text-[#ededed] text-lg leading-relaxed tracking-wider mt-4 transition-opacity duration-500"
           style={{
             opacity: Math.max(0, (progress - 0.5) * 2),
           }}
         >
           除了上面六种主要职能，还包括 畜牧犬 
           {['缉私犬', '助听犬', '导盲犬', '家庭伴侣犬', '检疫犬'].map((item, i) => (
             <span key={i} className="inline-block mx-1 px-3 py-1 bg-[#BE7D12] text-black font-bold rounded-2xl text-base">
               {item}
             </span>
           ))}
           等多种更丰富的职能。
         </p>
      </div>

      {/* 向下箭头：跳转到所有种类展示页面 */}
      <div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce transition-opacity duration-500"
        style={{ 
          zIndex: 50,
          opacity: progress > 0.9 ? 1 : 0, // 只有滚动到底部才显示
          pointerEvents: progress > 0.9 ? 'auto' : 'none'
        }}
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => {
            router.push('/science/all-breeds');
          }, 1000);
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
