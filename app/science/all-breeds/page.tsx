'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { breeds, Breed } from './data';

const BreedMap = dynamic(() => import('./BreedMap'), { ssr: false });

export default function AllBreedsPage() {
  const router = useRouter();
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    // 稍微延迟以确保过渡动画平滑执行
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen relative overflow-hidden flex flex-col items-center" style={{ backgroundColor: '#00100A' }}>
      {/* 页面过渡遮罩 */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#00100A] pointer-events-none transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
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

      {/* top 图片固定在画面最上方，位于 side 之上 */}
      <div 
        className="fixed top-0 left-0 w-full pointer-events-none"
        style={{
          zIndex: 60, // 最顶层，高于 modal (z-50)
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

      {/* 标题区域 */}
      {!showMap && (
        <div className="pt-20 pb-10 relative z-10 container mx-auto px-10">
           <div className="relative flex justify-end">
              <img 
                src="/frames/subtitle2.png" 
                alt="Subtitle"
                className="h-16 md:h-26 w-auto object-contain"
              />
           </div>
        </div>
      )}

      {/* 主要内容区域：Grid 列表 或 地图 */}
      <div className="container mx-auto px-10 relative z-10 flex-grow w-full flex flex-col">
        {!showMap ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {breeds.map((breed) => (
                <div 
                  key={breed.id}
                  className="group relative bg-white/5 border border-[#34817A]/30 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-[#BE7D12]"
                  onClick={() => setSelectedBreed(breed)}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img 
                      src={breed.image} 
                      alt={breed.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[#ededed] text-xl font-bold mb-1 group-hover:text-[#BE7D12] transition-colors">{breed.name}</h3>
                    <div className="flex gap-2 mb-2 flex-wrap">
                      <span className="inline-block px-2 py-0.5 bg-[#34817A]/20 text-[#34817A] text-xs rounded border border-[#34817A]/40">
                        {breed.category}
                      </span>
                      <span className="inline-block px-2 py-0.5 bg-[#BE7D12]/20 text-[#BE7D12] text-xs rounded border border-[#BE7D12]/40">
                        {breed.title}
                      </span>
                      <span className="inline-block px-2 py-0.5 bg-[#8B5E3C]/20 text-[#D2B48C] text-xs rounded border border-[#8B5E3C]/40">
                        {breed.region}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300">
                      {breed.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 切换到地图模式的按钮 */}
            <div
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
              style={{ zIndex: 40 }}
              onClick={() => setShowMap(true)}
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
          </>
        ) : (
          <div className="w-full relative animate-fadeIn flex-grow">
            <BreedMap breeds={breeds} onBack={() => setShowMap(false)} />
          </div>
        )}
      </div>

      {/* 详情弹窗 Modal */}
      {selectedBreed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedBreed(null)}
        >
          <div 
            className="bg-[#001812] border border-[#BE7D12] rounded-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-[0_0_30px_rgba(190,125,18,0.3)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
              onClick={() => setSelectedBreed(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto relative">
               <img 
                 src={selectedBreed.image} 
                 alt={selectedBreed.name}
                 className="w-full h-full object-cover"
               />
            </div>
            
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <h2 className="text-[#BE7D12] text-3xl font-bold mb-2">{selectedBreed.name}</h2>
              <div className="mb-6 flex gap-2">
                <span className="px-3 py-1 bg-[#BE7D12]/20 text-[#BE7D12] rounded-full text-sm font-medium border border-[#BE7D12]/40">
                  {selectedBreed.category}
                </span>
                <span className="px-3 py-1 bg-[#8B5E3C]/20 text-[#D2B48C] rounded-full text-sm font-medium border border-[#8B5E3C]/40">
                  {selectedBreed.region}
                </span>
              </div>
              <p className="text-[#ededed] text-lg leading-relaxed mb-8">
                {selectedBreed.description}
              </p>
              <div className="text-sm text-gray-500 italic">
                * 点击任意空白处关闭详情
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
