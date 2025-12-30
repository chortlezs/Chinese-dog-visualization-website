'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { Breed } from './data';
import chinaMapData from './china.json';

interface BreedMapProps {
  breeds: Breed[];
  onBack: () => void;
}

// Region coordinates (approximate centers)
const regionCoords: Record<string, [number, number]> = {
  '西南地区': [102.0, 27.0],
  '华南地区': [113.0, 23.5],
  '华北地区': [115.0, 39.0],
  '华东地区': [119.0, 31.0],
  '西北地区': [95.0, 38.0],
  '东北地区': [125.0, 45.0],
  '华中地区': [112.0, 30.0],
  '全国分布': [105.0, 34.0],
  '不详': [135.0, 30.0],
};

// Province to Region Mapping
const provinceToRegion: Record<string, string> = {
  '北京市': '华北地区', '天津市': '华北地区', '河北省': '华北地区', '山西省': '华北地区', '内蒙古自治区': '华北地区',
  '辽宁省': '东北地区', '吉林省': '东北地区', '黑龙江省': '东北地区',
  '上海市': '华东地区', '江苏省': '华东地区', '浙江省': '华东地区', '安徽省': '华东地区', '福建省': '华东地区', '江西省': '华东地区', '山东省': '华东地区', '台湾省': '华东地区',
  '河南省': '华中地区', '湖北省': '华中地区', '湖南省': '华中地区',
  '广东省': '华南地区', '广西壮族自治区': '华南地区', '海南省': '华南地区', '香港特别行政区': '华南地区', '澳门特别行政区': '华南地区',
  '重庆市': '西南地区', '四川省': '西南地区', '贵州省': '西南地区', '云南省': '西南地区', '西藏自治区': '西南地区',
  '陕西省': '西北地区', '甘肃省': '西北地区', '青海省': '西北地区', '宁夏回族自治区': '西北地区', '新疆维吾尔自治区': '西北地区'
};

// Region Colors - Updated for better distinction
const regionColors: Record<string, string> = {
  '华北地区': '#8D6E63', // Brown
  '东北地区': '#78909C', // Blue Grey
  '华东地区': '#26A69A', // Teal
  '华中地区': '#FF7043', // Deep Orange
  '华南地区': '#66BB6A', // Green
  '西南地区': '#FFA726', // Orange
  '西北地区': '#AB47BC', // Purple
  '全国分布': '#1A2B25', // Default
  '不详': '#1A2B25'      // Default
};

export default function BreedMap({ breeds, onBack }: BreedMapProps) {
  const router = useRouter();
  const [mapData, setMapData] = useState<typeof chinaMapData | null>(null);
  const chartRef = useRef<ReactECharts>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftListRef = useRef<HTMLDivElement>(null);
  const rightListRef = useRef<HTMLDivElement>(null);
  const [, forceUpdate] = useState({});
  const [regionPoints, setRegionPoints] = useState<Record<string, [number, number]>>({});
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const isInternalClick = useRef(false);

  const handleScroll = () => forceUpdate({});

  // Group breeds by layout position
  const breedGroups = useMemo(() => {
    // Left Column: Northwest, Southwest, Central
    const leftRegions = ['西北地区', '西南地区', '华中地区'];
    // Right Column: Northeast, North, East, South
    const rightRegions = ['东北地区', '华北地区', '华东地区', '华南地区'];
    // Bottom: National, Unknown
    const bottomRegions = ['全国分布', '不详'];

    const leftBreeds: Breed[] = [];
    const rightBreeds: Breed[] = [];
    const bottomBreeds: Breed[] = [];

    // Sort by region to group them together
    const sortedBreeds = [...breeds].sort((a, b) => (a.region || '').localeCompare(b.region || ''));

    sortedBreeds.forEach(breed => {
      const region = breed.region || '不详';
      if (leftRegions.includes(region)) {
        leftBreeds.push(breed);
      } else if (rightRegions.includes(region)) {
        rightBreeds.push(breed);
      } else {
        bottomBreeds.push(breed);
      }
    });

    // Custom sort order for better visual connection lines
    // Left: Northwest (top), Central (middle), Southwest (bottom)
    const leftOrder = ['西北地区', '华中地区', '西南地区'];
    leftBreeds.sort((a, b) => leftOrder.indexOf(a.region!) - leftOrder.indexOf(b.region!));

    // Right: Northeast (top), North (upper-mid), East (lower-mid), South (bottom)
    const rightOrder = ['东北地区', '华北地区', '华东地区', '华南地区'];
    rightBreeds.sort((a, b) => rightOrder.indexOf(a.region!) - rightOrder.indexOf(b.region!));

    return { leftBreeds, rightBreeds, bottomBreeds };
  }, [breeds]);

  // Calculate region statistics for top bar chart
  const regionStats = useMemo(() => {
    const stats: Record<string, number> = {};
    const total = breeds.length;
    breeds.forEach(breed => {
      const region = breed.region || '不详';
      stats[region] = (stats[region] || 0) + 1;
    });
    
    // Define a specific order for the bar to match map visually (North to South, West to East approx)
    const order = [
      '东北地区', '华北地区', '西北地区', 
      '华东地区', '华中地区', '西南地区', '华南地区',
      '全国分布', '不详'
    ];
    
    return order.map(region => ({
      region,
      count: stats[region] || 0,
      percent: total > 0 ? ((stats[region] || 0) / total) * 100 : 0,
      color: regionColors[region] || '#BE7D12'
    })).filter(item => item.count > 0);
  }, [breeds]);

  const updateRegionPoints = () => {
    if (chartRef.current) {
      const chart = chartRef.current.getEchartsInstance();
      if (!chart || chart.isDisposed()) return;

      // Add click event listener if not already added (though ECharts handles events via onEvents prop usually)
      // We'll rely on onEvents prop for click handling

      try {
        // Check if geo component is ready in option
        const option = chart.getOption() as { geo?: unknown };
        if (!option || !option.geo) return;

        const points: Record<string, [number, number]> = {};
        
        Object.keys(regionCoords).forEach(region => {
          const coord = regionCoords[region];
          // convertToPixel can throw if geo system is not fully initialized
          try {
            const pixel = chart.convertToPixel('geo', coord);
            if (pixel) {
              points[region] = pixel as [number, number];
            }
          } catch (e) {
            // Ignore individual point conversion errors
          }
        });

        if (Object.keys(points).length > 0) {
          setRegionPoints(points);
        }
      } catch (e) {
        console.debug('Map not ready for coordinate conversion');
      }
    }
  };

  useEffect(() => {
    if (chinaMapData) {
      echarts.registerMap('china', chinaMapData as unknown as Parameters<typeof echarts.registerMap>[1]);
      setMapData(chinaMapData);
    }

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      updateRegionPoints();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);



  // Re-calculate points when map is rendered or resized
  useEffect(() => {
    if (mapData) {
      // Delay slightly to ensure map is rendered
      setTimeout(updateRegionPoints, 100);
    }
  }, [mapData, windowSize]);

  const getOption = () => {
    if (!mapData) return {};

      // Add series for selected region glow effect (simulating merged region)
      // This is a workaround since we can't easily merge geoJSON polygons on the fly
      // We'll just rely on the color change for now, or we could add a scatter point with large glow
      
      const regionScatterData = Object.keys(regionCoords).map(region => {
        if (region === '不详' || region === '全国分布') return null;
        const isActive = selectedRegion === region || hoveredRegion === region;
        const activeRegion = hoveredRegion || selectedRegion;
        const isDimmed = activeRegion && activeRegion !== region;

        return {
            name: region,
            value: [...regionCoords[region], 10],
            itemStyle: { 
                color: regionColors[region] || '#BE7D12',
                opacity: isActive ? 1 : (isDimmed ? 0.3 : 1),
                shadowBlur: isActive ? 20 : 0,
                shadowColor: isActive ? regionColors[region] : 'transparent'
            },
            symbol: 'circle',
            symbolSize: isActive ? 15 : 8,
            label: { show: false }
        };
      }).filter(Boolean);

    // Generate regions config for coloring
    const regions = Object.keys(provinceToRegion).map(province => {
      const regionName = provinceToRegion[province];
      const color = regionColors[regionName];
      // Active if selected OR hovered
      const isActive = selectedRegion === regionName || hoveredRegion === regionName;
      // Dim if something else is active (selected or hovered) and this is not it
      const activeRegion = hoveredRegion || selectedRegion; // Hover takes precedence visually if needed, or just combine
      const isDimmed = activeRegion && activeRegion !== regionName;
      
      if (color) {
        return {
          name: province,
          itemStyle: {
            areaColor: color,
            opacity: isActive ? 1 : (isDimmed ? 0.3 : 0.9), // Highlight active, dim others
            borderWidth: isActive ? 0 : 1, // Remove internal borders for active region to merge visually
            borderColor: isActive ? color : 'rgba(255,255,255,0.2)', // Match color to merge visually
            shadowBlur: isActive ? 20 : 0, // Strong glow for edge highlight effect
            shadowColor: isActive ? '#fff' : 'transparent' // White glow for edges
          },
          emphasis: {
             disabled: true // Disable individual hover
          }
        };
      }
      return null;
    }).filter(Boolean);

    return {
      backgroundColor: 'transparent',
      geo: {
        map: 'china',
        roam: false, // Disable zoom/pan
        layoutCenter: ['50%', '60%'], // Moved down slightly
        layoutSize: '85%', // Reduced map size
        label: { show: false },
        itemStyle: {
          areaColor: '#1A2B25',
          borderColor: '#00100A',
          borderWidth: 1
        },
        emphasis: {
          disabled: false, // Enable hover effect
          itemStyle: { areaColor: '#1A2B25' }
        },
        regions: regions // Apply region coloring
      },
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: regionScatterData,
          z: 10
        }
      ]
    };
  };

  // Helper to get card element position
  const getCardPosition = (id: string, side: 'left' | 'right') => {
    if (typeof document === 'undefined') return null;
    const el = document.getElementById(`breed-card-${id}`);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return null;

    // Check visibility
    const listRef = side === 'left' ? leftListRef : rightListRef;
    const listRect = listRef.current?.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;

    // If list container exists, check if center is visible
    if (listRect) {
        // Allow a small buffer (e.g., 5px) to prevent flickering at edges
        if (centerY < listRect.top || centerY > listRect.bottom) {
            return null; // Hide line if connection point is out of view
        }
    }

    // Connect from the inner edge of the card
    const x = side === 'left' ? rect.right - containerRect.left : rect.left - containerRect.left;
    const y = centerY - containerRect.top;
    return { x, y };
  };

  // Helper to render connecting line
  const renderConnectingLine = (breed: Breed, side: 'left' | 'right') => {
    const region = breed.region || '不详';
    if (region === '不详' || region === '全国分布') return null;
    
    const mapPoint = regionPoints[region];
    const cardPos = getCardPosition(breed.id.toString(), side);
    
    if (!mapPoint || !cardPos) return null;

    const [mx, my] = mapPoint;
    const { x: cx, y: cy } = cardPos;

    // Control points for bezier curve
    // Curve out horizontally from card, then to map point
    const cp1x = side === 'left' ? cx + 50 : cx - 50;
    const cp1y = cy;
    const cp2x = side === 'left' ? mx - 50 : mx + 50;
    const cp2y = my;

    return (
      <path
        key={`line-${breed.id}`}
        d={`M ${cx} ${cy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${mx} ${my}`}
        fill="none"
        stroke={regionColors[region] || '#BE7D12'}
        strokeWidth="1"
        strokeOpacity="0.6"
      />
    );
  };

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden bg-[#00100A]">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Top Bar Chart */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-1/2 h-3 flex z-50 shadow-sm">
        {regionStats.map((item, index) => (
            <div 
                key={item.region}
                style={{ 
                    width: `${item.percent}%`,
                    backgroundColor: item.color
                }}
                className="h-full relative group hover:brightness-125 transition-all cursor-pointer first:rounded-l-full last:rounded-r-full"
            >
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 border border-white/20 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-sm shadow-lg">
                    <span className="font-bold" style={{ color: item.color }}>{item.region}</span>
                    <span className="ml-2 text-gray-300">{item.count}种 ({item.percent.toFixed(1)}%)</span>
                </div>
            </div>
        ))}
      </div>

      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {mapData && (
            <div 
                className="w-full h-full"
                onClick={() => {
                    if (isInternalClick.current) {
                        isInternalClick.current = false;
                        return;
                    }
                    setSelectedRegion(null);
                }}
            >
                 <ReactECharts 
                    ref={chartRef}
                    option={getOption()} 
                    style={{ height: '100%', width: '100%' }}
                    notMerge={false} // Changed to false to prevent recreation on state change (fixes getRawIndex error)
                    lazyUpdate={true}
                    opts={{ renderer: 'svg' }} // Use SVG for sharper rendering
                    onEvents={{
                        'finished': updateRegionPoints,
                        'click': (params: { componentType: string; name?: string; seriesType?: string }) => {
                            isInternalClick.current = true;
                            if (params.componentType === 'geo') {
                                const province = params.name;
                                const region = provinceToRegion[province!];
                                if (region) {
                                    setSelectedRegion(prev => prev === region ? null : region);
                                }
                            } else if (params.componentType === 'series' && params.seriesType === 'scatter') {
                                const region = params.name;
                                if (region) {
                                    setSelectedRegion(prev => prev === region ? null : region);
                                }
                            }
                        },
                        'mouseover': (params: { componentType: string; name?: string; seriesType?: string }) => {
                            if (params.componentType === 'geo') {
                                const province = params.name;
                                const region = provinceToRegion[province!];
                                if (region) {
                                    setHoveredRegion(region);
                                }
                            } else if (params.componentType === 'series' && params.seriesType === 'scatter') {
                                const region = params.name;
                                if (region) {
                                    setHoveredRegion(region);
                                }
                            }
                        },
                        'mouseout': () => {
                            setHoveredRegion(null);
                        }
                    }}
                />
            </div>
        )}
      </div>

      {/* Connecting Lines SVG Layer */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        {breedGroups.leftBreeds.map(breed => renderConnectingLine(breed, 'left'))}
        {breedGroups.rightBreeds.map(breed => renderConnectingLine(breed, 'right'))}
      </svg>

      {/* Cards Layer - Removed bottom padding as requested */}
      <div className="absolute inset-0 z-20 pointer-events-none flex justify-between px-4 pt-24 pb-0">
        
        {/* Left Column */}
        <div 
            ref={leftListRef}
            onScroll={handleScroll}
            className="flex flex-col gap-2 pointer-events-auto overflow-y-auto w-44 pl-4 pr-2 py-4 no-scrollbar" 
            style={{ maxHeight: '100vh' }}
        >
            {breedGroups.leftBreeds.map(breed => (
                <BreedCard 
                  key={breed.id} 
                  breed={breed} 
                  id={`breed-card-${breed.id}`} 
                  side="left" 
                  isHighlighted={selectedRegion === breed.region || hoveredRegion === breed.region}
                  isDimmed={(selectedRegion !== null || hoveredRegion !== null) && (selectedRegion !== breed.region && hoveredRegion !== breed.region)}
                />
            ))}
        </div>

        {/* Right Column */}
        <div 
            ref={rightListRef}
            onScroll={handleScroll}
            className="flex flex-col gap-2 pointer-events-auto overflow-y-auto w-44 pl-2 pr-4 py-4 no-scrollbar items-end" 
            style={{ maxHeight: '100vh' }}
        >
            {breedGroups.rightBreeds.map(breed => (
                <BreedCard 
                  key={breed.id} 
                  breed={breed} 
                  id={`breed-card-${breed.id}`} 
                  side="right" 
                  isHighlighted={selectedRegion === breed.region || hoveredRegion === breed.region}
                  isDimmed={(selectedRegion !== null || hoveredRegion !== null) && (selectedRegion !== breed.region && hoveredRegion !== breed.region)}
                />
            ))}
        </div>
      </div>

       {/* Bottom Layer for National/Unknown */}
       <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 pointer-events-auto flex gap-4">
            {breedGroups.bottomBreeds.map(breed => {
                const isActive = selectedRegion === breed.region || hoveredRegion === breed.region;
                const activeRegion = hoveredRegion || selectedRegion;
                const isDimmed = activeRegion && activeRegion !== breed.region;
                
                return (
                <div 
                  key={breed.id} 
                  className={`flex flex-col items-center bg-black/40 border border-[#34817A]/30 p-2 rounded backdrop-blur-sm w-24 transition-all duration-300 ${isActive ? 'scale-110 border-white bg-black/60 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : ''} ${isDimmed ? 'opacity-30 blur-[1px]' : ''}`}
                >
                    <div className="w-12 h-12 rounded-full overflow-hidden mb-1 border border-[#BE7D12]/50">
                        <img src={breed.image} alt={breed.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[#ededed] text-xs font-bold">{breed.name}</span>
                    <span className="text-gray-400 text-[10px]">{breed.region}</span>
                </div>
            )})}
       </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-30 cursor-pointer pointer-events-auto" onClick={onBack}>
         <div className="flex items-center gap-2 text-[#ededed] px-4 py-2 hover:opacity-80 transition-all bg-black/20 rounded-full backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-lg">返回</span>
        </div>
      </div>

      {/* Down Arrow to Protection Section */}
      <div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        style={{ zIndex: 50 }}
        onClick={() => router.push('/protection')}
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

// Subcomponent for Breed Card
function BreedCard({ breed, id, side, isHighlighted, isDimmed }: { breed: Breed, id: string, side: 'left' | 'right', isHighlighted?: boolean, isDimmed?: boolean }) {
    // Get color based on region
    const color = regionColors[breed.region || ''] || '#BE7D12';
    
    return (
        <div 
            id={id}
            className={`
                group relative flex items-center gap-2 p-2 bg-black/30 border border-transparent rounded-lg 
                hover:bg-black/50 transition-all cursor-pointer backdrop-blur-sm w-full duration-300
                ${side === 'right' ? 'flex-row-reverse text-right' : 'flex-row text-left'}
                ${isHighlighted ? 'scale-105 bg-black/60 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : ''}
                ${isDimmed ? 'opacity-30 blur-[1px]' : ''}
            `}
            style={{ 
                borderColor: isHighlighted ? '#fff' : `${color}4D` // 30% opacity
            }}
        >
            <div 
                className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden border transition-colors"
                style={{ borderColor: `${color}80` }} // 50% opacity
            >
                <img src={breed.image} alt={breed.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0 flex-grow">
                <span 
                    className="text-[#ededed] text-xs font-bold truncate transition-colors group-hover:text-white"
                >
                    {breed.name}
                </span>
                <span className="text-gray-400 text-[10px] truncate">{breed.region}</span>
            </div>
            
            {/* Tooltip on Hover */}
            <div className={`
                absolute top-1/2 transform -translate-y-1/2 
                ${side === 'left' ? 'left-full ml-2' : 'right-full mr-2'}
                w-48 bg-black/90 border p-3 rounded z-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
            `}
            style={{ borderColor: color }}
            >
                <h4 className="font-bold text-sm mb-1" style={{ color: color }}>{breed.name}</h4>
                <p className="text-gray-300 text-xs leading-tight">{breed.description}</p>
            </div>
        </div>
    );
}
