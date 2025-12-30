'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function EndingPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 页面加载时的淡入效果
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // 尝试自动播放视频
      if (videoRef.current) {
        videoRef.current.play().catch(err => {
          console.error("Auto-play failed:", err);
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black flex items-center justify-center">
      {/* Page Transition Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-black pointer-events-none transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      />

      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="/frames/video2.mp4"
        autoPlay
        playsInline
        muted={false} // 如果需要声音可以设为 false，但通常自动播放需要 muted
        controls={false} // 根据需求决定是否显示控件
        onEnded={() => {
            console.log("Video ended");
            // 视频播放结束后的逻辑，比如重播或显示结束语
        }}
      />
      
      {/* 可选：添加返回首页或其他导航 */}
      <div 
        className="absolute bottom-8 right-8 z-50 text-white/50 hover:text-white cursor-pointer transition-colors"
        onClick={() => router.push('/')}
      >
        回到首页
      </div>
    </div>
  );
}
