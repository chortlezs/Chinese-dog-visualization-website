'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const FRAME_COUNT = 9;
const FRAME_INTERVAL = 250//0.25秒间隔

export default function ScrollFrames() {
  const router = useRouter();
  const [currentFrame, setCurrentFrame] = useState(1);
  const [showText, setShowText] = useState(false);
  const [textAtTop, setTextAtTop] = useState(false); // 文字是否移动到顶部
  const [playVideo, setPlayVideo] = useState(false); // 是否播放视频
  const [videoEnded, setVideoEnded] = useState(false); // 视频是否播放结束
  const [showArrow, setShowArrow] = useState(false); // 是否显示向下箭头
  const [showAncientSection, setShowAncientSection] = useState(false); // 是否显示古代文物板块
  const [showTitle, setShowTitle] = useState(true); // 是否显示开场Title GIF
  const isPlayingRef = useRef(false);
  const animationTimer = useRef<NodeJS.Timeout | null>(null);
  const hasTriggered = useRef(false);
  const animationCompleted = useRef(false);
  const textTriggerScrollY = useRef(0);
  const textShown = useRef(false); // 标记文字是否已显示
  const textShownScrollY = useRef(0); // 文字显示时的滚动位置
  const textAtTopScrollY = useRef(0); // 文字移动到顶部时的滚动位置
  const videoRef = useRef<HTMLVideoElement>(null);

  const startAnimation = useCallback(() => {
    // 如果动画已经完成，不再触发
    if (animationCompleted.current) {
      return;
    }
    
    // 如果正在播放，不重复触发
    if (isPlayingRef.current || hasTriggered.current) {
      return;
    }

    hasTriggered.current = true;
    isPlayingRef.current = true;
    
    // 清除之前的定时器（如果存在）
    if (animationTimer.current) {
      clearInterval(animationTimer.current);
      animationTimer.current = null;
    }
    
    // 开始播放动画
    setCurrentFrame(1);
    
    // 自动播放9帧
    let frameIndex = 1;
    animationTimer.current = setInterval(() => {
      frameIndex++;
      if (frameIndex <= FRAME_COUNT) {
        setCurrentFrame(frameIndex);
      } else {
        // 播放完成，确保停留在最后一帧
        setCurrentFrame(FRAME_COUNT);
        if (animationTimer.current) {
          clearInterval(animationTimer.current);
          animationTimer.current = null;
        }
        isPlayingRef.current = false;
        animationCompleted.current = true; // 标记动画已完成
        // 记录动画完成时的滚动位置，用于后续显示文字
        textTriggerScrollY.current = window.scrollY;
        // 播放完成后，不再重置 hasTriggered，保持最后一帧
      }
    }, FRAME_INTERVAL);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 检测向下滚动（deltaY > 0 表示向下）
      if (e.deltaY > 0) {
        if (showTitle) {
          setShowTitle(false);
          // 如果显示Title，第一次滚动只用于隐藏Title，不触发动画
          return;
        }

        if (!animationCompleted.current) {
          startAnimation();
        } else if (animationCompleted.current && !textShown.current) {
          // 动画完成后，继续向下滚动时显示文字（只显示一次）
          setShowText(true);
          textShown.current = true;
          textShownScrollY.current = window.scrollY;
        } else if (animationCompleted.current && textShown.current && !textAtTop) {
          // 文字显示后，继续向下滚动时让文字移动到顶部
          setTextAtTop(true);
          textAtTopScrollY.current = window.scrollY;
        }
      }
    };

    // 监听点击事件触发视频播放
    const handleClick = () => {
      if (animationCompleted.current && textShown.current && textAtTop && !playVideo) {
        console.log('点击触发视频播放');
        setPlayVideo(true);
      }
    };

    // 同时监听 wheel 和 scroll 事件
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('click', handleClick);
    
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 10 && showTitle) {
        setShowTitle(false);
      }
      
      if (!showTitle && scrollY > 50 && !animationCompleted.current) {
        startAnimation();
      }
      
      // 当动画完成后，根据滚动位置显示文字（只显示一次）
      if (animationCompleted.current && !textShown.current) {
        const scrollDelta = scrollY - textTriggerScrollY.current;
        if (scrollDelta > 100) {
          setShowText(true);
          textShown.current = true;
          textShownScrollY.current = scrollY;
        }
      }
      
      // 文字显示后，继续滚动时让文字移动到顶部
      if (animationCompleted.current && textShown.current && !textAtTop) {
        const scrollDelta = scrollY - textShownScrollY.current;
        if (scrollDelta > 100) {
          setTextAtTop(true);
          textAtTopScrollY.current = scrollY;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      if (animationTimer.current) {
        clearInterval(animationTimer.current);
      }
    };
  }, [startAnimation, textAtTop, playVideo, showTitle]);

  // 预加载所有图片
  useEffect(() => {
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = `/frames/curtain${i}.png`;
    }
  }, []);

  // 控制视频播放
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    console.log('视频播放 useEffect 触发:', {
      playVideo,
      animationCompleted: animationCompleted.current,
      showText,
      textAtTop
    });
    
    // 确保视频元素存在且条件满足时才播放
    if (playVideo && animationCompleted.current && showText && textAtTop) {
      console.log('所有条件满足，准备播放视频');
      // 使用 setTimeout 确保 DOM 已更新
      timer = setTimeout(() => {
        if (videoRef.current) {
          const video = videoRef.current;
          console.log('准备播放视频，video元素:', video);
          
          // 重置视频状态，确保每次都能播放
          video.currentTime = 0;
          video.muted = true;
          
          // 确保视频加载后再播放
          const playVideoElement = async () => {
            try {
              // 先加载视频
              video.load();
              // 等待视频可以播放
              await video.play();
              console.log('视频播放成功');
            } catch (error) {
              console.error('视频播放失败:', error);
              // 如果自动播放失败，尝试用户交互后播放
              if (video) {
                video.muted = true;
                video.play().catch((err) => {
                  console.error('重试播放失败:', err);
                });
              }
            }
          };
          playVideoElement();
        } else {
          console.warn('videoRef.current 不存在');
        }
      }, 100);
    } else if (!playVideo && videoRef.current) {
      // 当 playVideo 为 false 时，暂停并重置视频
      const video = videoRef.current;
      video.pause();
      video.currentTime = 0;
    }
    
    // 始终返回清理函数，确保依赖数组大小固定
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [playVideo, showText, textAtTop]); // 依赖所有相关状态

  return (
    <>
      {/* 滚动容器：提供滚动空间，增加额外空间用于显示文字 */}
      <div style={{ height: `${(FRAME_COUNT + 2) * 100}vh` }} />

      {/* Title GIF 开场动画 */}
      <div 
        className="fixed inset-0 flex items-center justify-center"
        style={{
          zIndex: 20, // 最高层级
          opacity: showTitle ? 1 : 0,
          pointerEvents: showTitle ? 'auto' : 'none',
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <img
          src="/frames/title.GIF"
          alt="Title"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
      
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
      
      {/* 固定定位的图片容器：图片固定在视口，不跟随滚动 */}
      <div 
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{
          zIndex: 5,
        }}
      >
        {/* 图片始终显示 */}
        <img
          key={currentFrame}
          src={`/frames/curtain${currentFrame}.png`}
          alt={`Frame ${currentFrame}`}
          className="w-full h-full object-contain"
          style={{ 
            transition: 'none !important',
            animation: 'none !important',
            willChange: 'auto',
            display: 'block',
            position: 'absolute',
            zIndex: 1,
          }}
          draggable={false}
        />
        
        {/* 文字叠加显示在图片上方 */}
        {animationCompleted.current && showText && (
          <div 
            className="text-center"
            style={{
              fontSize: 'clamp(2rem, 10vw, 6rem)',
              fontWeight: 'bold',
              color: '#FF9000',
              lineHeight: '1.4',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: textAtTop ? 'flex-start' : 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              letterSpacing: '0.1em',
              position: 'absolute',
              zIndex: 2,
              paddingTop: textAtTop ? '2rem' : '0',
              transition: textAtTop ? 'padding-top 0.5s ease-out' : 'none',
            }}
          >
            <div style={{ marginBottom: '0em', fontFamily: 'var(--font-zcool-xiaowei), "Wawati SC", "Wawati TC", "Yuanti SC", "YouYuan", "STCaiyun", "Huawen Caiyun", "Microsoft YaHei", sans-serif' }}>中国本土犬</div>
            <div style={{ fontSize: '1.5em', fontFamily: 'var(--font-fredoka), "Comic Sans MS", "Arial Rounded MT Bold", sans-serif' }}>SHOWTIME</div>
          </div>
        )}
      </div>
      
      {/* 视频容器：位于 curtain9 下方 */}
      {/* 始终渲染视频元素，通过样式控制显示 */}
      <div 
        className="fixed bottom-0 left-0 w-full flex items-end justify-center pointer-events-none"
        style={{
          zIndex: 1,
          paddingTop: '20%', // 为 side 图片和文字留出空间
          display: (animationCompleted.current && showText && textAtTop && playVideo) ? 'flex' : 'none',
        }}
      >
        <video
          key={`video-${playVideo}-${textAtTop}`} // 添加 key 确保视频元素重新渲染
          ref={videoRef}
          src="/frames/video1.mp4"
          className="w-full object-cover"
          style={{
            display: 'block',
            width: '85vw',
            objectFit: 'cover',
          }}
          playsInline
          muted
          // loop // 移除循环播放，以便检测播放结束
          onEnded={() => {
            console.log('视频播放结束');
            setVideoEnded(true);
            // 视频结束后，延迟2秒显示箭头，给文字展示留出时间
            setTimeout(() => {
              setShowArrow(true);
            }, 2000);
          }}
          preload="auto"
        />
      </div>

      {/* 结尾文字：视频播放结束后显示 */}
      {videoEnded && (
        <div
          className="fixed top-2/3 right-[15%] transform -translate-y-1/2"
          style={{
            zIndex: 40, // 提高层级，确保在最上层
            fontFamily: 'var(--font-zcool-xiaowei), "Wawati SC", "Wawati TC", "Yuanti SC", "YouYuan", "STCaiyun", "Huawen Caiyun", "Microsoft YaHei", sans-serif',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 'bold',
            color: '#FF9000',
            // writingMode: 'vertical-rl', // 改为横排
            // textOrientation: 'upright',
            letterSpacing: '0.1em',
            width: '50vw', // 限制宽度以触发换行
            textAlign: 'left', // 文字右对齐
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            opacity: 1, // 确保显示
            animation: 'fadeIn 1s ease-in forwards',
          }}
        >
          自古以来，
          <br />
          我们一直是人类的好朋友。
        </div>
      )}

      {/* 向下箭头：视频播放结束且延迟后显示 */}
      {showArrow && (
        <div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          style={{ zIndex: 40 }} // 提高层级
          onClick={() => {
            console.log('点击向下箭头，跳转到古代文物页面');
            router.push('/ancient');
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
      )}
    </>
  );
}

