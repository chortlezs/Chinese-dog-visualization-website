'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as d3 from 'd3';

interface PoemData {
  '行ID': number;
  '诗词标题': string;
  '作者': string;
  '朝代': string;
  '犬类词汇占比(%)': number;
  '诗词内容': string;
  '文体': string;
  '犬类职责': string;
  '犬类品性': string;
}

const capabilityIcons: Record<string, string> = {
  '交通牵引': '/poetry/marks/capbility3.svg',
  '看家护院': '/poetry/marks/capbility1.svg',
  '陪伴随行': '/poetry/marks/capbility4.svg',
  '狩猎放牧': '/poetry/marks/capbility2.svg',
  '巡逻警戒': '/poetry/marks/capbility5.svg',
};

const temperamentColors: Record<string, string> = {
  '机警': '#EBEBEB',
  '温顺': '#FE6CB9',
  '勇敢': '#009FAC',
  '忠诚': '#75D988',
  '凶猛': '#E31F00',
};

interface SimulationNode extends d3.SimulationNodeDatum {
  id: number;
  data: PoemData;
  x?: number;
  y?: number;
  r?: number;
  targetX?: number;
  targetY?: number;
}

interface SvgTemplate {
  viewBox: string;
  content: string;
}

export default function PoetryPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PoemData[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [svgTemplates, setSvgTemplates] = useState<Record<string, SvgTemplate>>({});
  const [viewMode, setViewMode] = useState<'scatter' | 'temperament' | 'duty'>('scatter');
  const [isExiting, setIsExiting] = useState(false);

  // 监听容器大小变化
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    // 初始设置
    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // 加载SVG模板
  useEffect(() => {
    const loadSvgs = async () => {
      const templates: Record<string, SvgTemplate> = {};
      const duties = Object.keys(capabilityIcons);
      
      await Promise.all(duties.map(async (duty) => {
        try {
          const url = capabilityIcons[duty];
          const res = await fetch(url);
          const text = await res.text();
          
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'image/svg+xml');
          const svgElement = doc.querySelector('svg');
          
          if (svgElement) {
            const viewBox = svgElement.getAttribute('viewBox') || '0 0 100 100';
            const styleElement = svgElement.querySelector('style');
            let redClass = '';
            let blackClass = '';

            if (styleElement) {
              const styleContent = styleElement.textContent || '';
              
              // 查找红色类 (大致匹配 #a93d38, #aa403b, #ac433e)
              const redMatch = styleContent.match(/\.(\w[\w-]*)\s*\{[^}]*fill:\s*#(a93d38|aa403b|ac433e|A93D38|AA403B|AC433E)/i);
              if (redMatch) redClass = redMatch[1];

              // 查找黑色类 (大致匹配 #010001, #020101, #030101, #040202)
              const blackMatch = styleContent.match(/\.(\w[\w-]*)\s*\{[^}]*fill:\s*#(010001|020101|030101|040202|030101)/i);
              if (blackMatch) blackClass = blackMatch[1];
              
              // 移除 style 标签
              styleElement.remove();
            }

            // 获取内容字符串
            let content = svgElement.innerHTML;

            // 替换类名为 fill 属性
            if (redClass) {
              const regex = new RegExp(`class="${redClass}"`, 'g');
              content = content.replace(regex, 'fill="{{FILL_COLOR}}"');
            }
            if (blackClass) {
              const regex = new RegExp(`class="${blackClass}"`, 'g');
              content = content.replace(regex, 'fill="#0B0B63"');
            }
            
            // 如果只有一个红色类且没有黑色类（如capbility5），可能需要额外处理，但上述逻辑已覆盖
            
            templates[duty] = { viewBox, content };
          }
        } catch (error) {
          console.error(`Error loading SVG for ${duty}:`, error);
        }
      }));
      
      setSvgTemplates(templates);
    };

    loadSvgs();
  }, []);

  // 加载数据
  useEffect(() => {
    fetch('/poetry/data.json')
      .then(res => res.json())
      .then(jsonData => {
        setData(jsonData);
      })
      .catch(err => console.error('Error loading poetry data:', err));
  }, []);

  // D3 可视化逻辑
  useEffect(() => {
    if (!containerRef.current || data.length === 0 || dimensions.width === 0 || dimensions.height === 0 || Object.keys(svgTemplates).length === 0) return;

    const container = containerRef.current;
    const { width, height } = dimensions;

    // 清除现有的 SVG
    d3.select(container).selectAll('*').remove();

    // 创建 SVG
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // 定义半径比例尺
    const vocabularyExtent = d3.extent(data, d => d['犬类词汇占比(%)']) as [number, number];
    // 如果数据有问题，给一个默认范围
    const minVal = vocabularyExtent[0] || 0;
    const maxVal = vocabularyExtent[1] || 1;
    
    // 使用平方根比例尺，因为视觉面积与半径的平方成正比
    const radiusScale = d3.scaleSqrt()
      .domain([minVal, maxVal])
      .range([3, 15]); // 最小半径3px，最大半径15px

    // 准备节点数据
    const nodes: SimulationNode[] = data.map(d => ({
      id: d['行ID'],
      data: d,
      // 初始位置随机
      x: Math.random() * width,
      y: Math.random() * height,
      r: radiusScale(d['犬类词汇占比(%)']) // 预计算半径
    }));

    // 创建力导向模拟
    const simulation = d3.forceSimulation<SimulationNode>(nodes)
      .force('charge', d3.forceManyBody().strength(-10)) // 增加排斥力，让点更松散
      .force('collide', d3.forceCollide<SimulationNode>().radius((d: SimulationNode) => (d.r || 0) + 5).strength(0.7)); // 增加碰撞半径缓冲

    const ranges: Record<string, {minX: number, maxX: number, minY?: number, maxY?: number}> = {};

    if (viewMode === 'temperament') {
       // 按用户要求调整顺序和宽度
       // 机警最宽，忠诚第二宽、温顺、勇敢一样宽、凶猛最窄
       const targetCategories = ['机警', '忠诚', '温顺', '勇敢', '凶猛'];
       
       // 定义权重
       const categoryWeights: Record<string, number> = {
         '机警': 30,
         '忠诚': 25,
         '温顺': 17.5,
         '勇敢': 17.5,
         '凶猛': 10
       };
       const totalWeight = 100;

       let currentX = 0;
       
       // 添加分隔线组
       const separators = svg.append('g').attr('class', 'separators');
       // 添加列标题
       const labels = svg.append('g').attr('class', 'column-labels');

       targetCategories.forEach((cat, index) => {
         const weight = categoryWeights[cat];
         const ratio = weight / totalWeight;
         const sectionWidth = width * ratio;
         
         // 绘制分隔线（第一列左侧不需要）
         if (index > 0) {
            separators.append('line')
                .attr('x1', currentX)
                .attr('y1', height * 0.05)
                .attr('x2', currentX)
                .attr('y2', height * 0.95)
                .attr('stroke', 'rgba(255, 255, 255, 0.3)')
                .attr('stroke-width', 1)
                .attr('stroke-dasharray', '5,5');
         }

         // 记录该类别的X轴范围
         ranges[cat] = { minX: currentX, maxX: currentX + sectionWidth };
         
         const centerX = currentX + sectionWidth / 2;
         
         labels.append('text')
           .attr('x', centerX)
           .attr('y', height * 0.08) // 稍微往上提，避免遮挡
           .attr('text-anchor', 'middle')
           .attr('fill', temperamentColors[cat] || '#FFFFFF')
           .attr('font-size', '18px') 
           .attr('font-weight', 'bold')
           .text(cat);

         currentX += sectionWidth;
       });
       
       // 为每个节点分配一个在目标区域内的随机位置
       nodes.forEach(node => {
         const cat = node.data['犬类品性'];
         if (targetCategories.includes(cat) && ranges[cat]) {
           const { minX, maxX } = ranges[cat];
           // 减少水平方向的边距缓冲，让点能更均匀地分布在整个区域，避免看起来偏向一侧
           // 使用较小的固定值加上节点半径，而不是原来的 + 10
           const padding = (node.r || 0) + 2; 
           
           const sectionWidth = maxX - minX;
           // 计算可用宽度，如果区域太窄（小于2倍padding），则居中
           const availableWidth = Math.max(0, sectionWidth - 2 * padding);
           
           // 重新计算目标位置：从区域中心开始，向两侧随机偏移
           // 这样可以确保整体是居中的
           const centerX = minX + sectionWidth / 2;
           node.targetX = centerX + (Math.random() - 0.5) * availableWidth;
           
           node.targetY = height * 0.18 + Math.random() * (height * 0.8 - 2 * padding); // 避开顶部标题区，调整起始位置
         }
       });

       simulation
        .force('x', d3.forceX((d: SimulationNode) => {
          const temperament = d.data['犬类品性'];
          if (targetCategories.includes(temperament) && d.targetX !== undefined) {
            return d.targetX;
          }
          return -1000; // 其他类移出可视区域
        }).strength(0.2)) // 增加X轴引力强度，确保点更准确地到达目标位置
        .force('y', d3.forceY((d: SimulationNode) => {
           const temperament = d.data['犬类品性'];
           if (targetCategories.includes(temperament) && d.targetY !== undefined) {
             return d.targetY;
           }
           return height / 2;
        }).strength(0.1))
        .force('charge', d3.forceManyBody().strength(-5)) // 减小排斥力，主要靠随机分布和碰撞
        .force('collide', d3.forceCollide<SimulationNode>().radius((d: SimulationNode) => (d.r || 0) + 2).strength(1));
    } else if (viewMode === 'duty') {
        // 聚类2：按犬类职责分5个区域，矩形分布，上3下2排布
        // 上层：看家护院、狩猎放牧、交通牵引
        // 下层：陪伴随行、巡逻警戒
        const topDuties = ['看家护院', '狩猎放牧', '交通牵引'];
        const bottomDuties = ['陪伴随行', '巡逻警戒'];
        const targetDuties = [...topDuties, ...bottomDuties];
        
        // 计算每个职责的数量
        const dutyCounts: Record<string, number> = {};
        targetDuties.forEach(d => dutyCounts[d] = 0);
        
        // 计算各层总数
         let topTotal = 0;
         let bottomTotal = 0;
         
         // 权重调整：看家护院、狩猎放牧稍微窄一点，交通牵引宽一点
         const dutyWeights: Record<string, number> = {
             '看家护院': 0.8,
             '狩猎放牧': 0.8,
             '交通牵引': 1.4,
             '陪伴随行': 1,
             '巡逻警戒': 1
         };

         nodes.forEach(node => {
             const duty = node.data['犬类职责'];
             if (targetDuties.includes(duty)) {
                 dutyCounts[duty] = (dutyCounts[duty] || 0) + 1;
                 // 计算加权总数
                 const weight = dutyWeights[duty] || 1;
                 if (topDuties.includes(duty)) topTotal += weight;
                 else bottomTotal += weight; // 下层暂无特殊权重，保持默认
             }
         });
  
         const separators = svg.append('g').attr('class', 'separators');
         const labels = svg.append('g').attr('class', 'duty-labels');
  
         // 上层布局
         let currentX = 0;
         topDuties.forEach((duty, index) => {
              const count = dutyCounts[duty] || 0;
              const weight = dutyWeights[duty] || 1;
              // 使用加权后的比例
              const ratio = topTotal > 0 ? (count * weight) / topTotal : 0;
              const sectionWidth = width * ratio;
             
             // 绘制分隔线（第一列左侧不需要）
             if (index > 0) {
                separators.append('line')
                    .attr('x1', currentX)
                    .attr('y1', height * 0.05)
                    .attr('x2', currentX)
                    .attr('y2', height * 0.48)
                    .attr('stroke', 'rgba(255, 255, 255, 0.3)')
                    .attr('stroke-width', 1)
                    .attr('stroke-dasharray', '5,5');
             }

             // 记录范围：上层高度范围约 0-50%
             ranges[duty] = { 
                 minX: currentX, 
                 maxX: currentX + sectionWidth,
                 minY: height * 0.15,
                 maxY: height * 0.48 
             };
             
             const centerX = currentX + sectionWidth / 2;
             
             labels.append('text')
                .attr('x', centerX)
                .attr('y', height * 0.1) // 上层标题位置
                .attr('text-anchor', 'middle')
                .attr('fill', '#FFFFFF')
                .attr('font-size', '18px')
                .attr('font-weight', 'bold')
                .text(duty);
             
             currentX += sectionWidth;
        });

        // 绘制上下层分隔线
        separators.append('line')
            .attr('x1', 0)
            .attr('y1', height * 0.5)
            .attr('x2', width)
            .attr('y2', height * 0.5)
            .attr('stroke', 'rgba(255, 255, 255, 0.3)')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '5,5');

        // 下层布局
         currentX = 0;
         bottomDuties.forEach((duty, index) => {
              const count = dutyCounts[duty] || 0;
              const weight = dutyWeights[duty] || 1;
              const ratio = bottomTotal > 0 ? (count * weight) / bottomTotal : 0;
              const sectionWidth = width * ratio;
             
             // 绘制分隔线（第一列左侧不需要）
             if (index > 0) {
                separators.append('line')
                    .attr('x1', currentX)
                    .attr('y1', height * 0.52)
                    .attr('x2', currentX)
                    .attr('y2', height * 0.95)
                    .attr('stroke', 'rgba(255, 255, 255, 0.3)')
                    .attr('stroke-width', 1)
                    .attr('stroke-dasharray', '5,5');
             }

             // 记录范围：下层高度范围约 50-100%
             ranges[duty] = { 
                 minX: currentX, 
                 maxX: currentX + sectionWidth,
                 minY: height * 0.6,
                 maxY: height * 0.95 
             };
             
             const centerX = currentX + sectionWidth / 2;
             
             labels.append('text')
                .attr('x', centerX)
                .attr('y', height * 0.55) // 下层标题位置
                .attr('text-anchor', 'middle')
                .attr('fill', '#FFFFFF')
                .attr('font-size', '18px')
                .attr('font-weight', 'bold')
                .text(duty);
             
             currentX += sectionWidth;
        });

        nodes.forEach(node => {
            const duty = node.data['犬类职责'];
            if (targetDuties.includes(duty) && ranges[duty]) {
                const { minX, maxX, minY, maxY } = ranges[duty];
                const padding = (node.r || 0) + 2;
                const sectionWidth = maxX - minX;
                const sectionHeight = (maxY || height) - (minY || 0);
                
                const availableWidth = Math.max(0, sectionWidth - 2 * padding);
                const availableHeight = Math.max(0, sectionHeight - 2 * padding);
                
                const centerX = minX + sectionWidth / 2;
                const centerY = (minY || 0) + sectionHeight / 2;
                
                // 确保 availableWidth 不会因为 padding 过大而变成负数或太小
                // 增加一点安全余量
                const safeAvailableWidth = Math.max(10, availableWidth);
                const safeAvailableHeight = Math.max(10, availableHeight);

                node.targetX = centerX + (Math.random() - 0.5) * safeAvailableWidth;
                node.targetY = centerY + (Math.random() - 0.5) * safeAvailableHeight;
            } else {
                node.targetX = -1000;
            }
        });

        simulation
            .force('x', d3.forceX((d: SimulationNode) => {
                 const duty = d.data['犬类职责'];
                 if (targetDuties.includes(duty) && d.targetX !== undefined) {
                     return d.targetX;
                 }
                 return -1000;
            }).strength(0.4)) // 增加X轴引力，确保点更准确地到达目标位置，避免偏移
            .force('y', d3.forceY((d: SimulationNode) => {
                 const duty = d.data['犬类职责'];
                 if (targetDuties.includes(duty) && d.targetY !== undefined) {
                     return d.targetY;
                 }
                 return height / 2;
            }).strength(0.4)) // 增加Y轴引力
            .force('charge', d3.forceManyBody().strength(-2)) // 减小排斥力，避免把点推向边缘导致看起来偏了
            .force('collide', d3.forceCollide<SimulationNode>().radius((d: SimulationNode) => (d.r || 0) + 2).strength(1));
    } else {
       simulation
        .force('center', d3.forceCenter(width / 2, height / 2).strength(0.5)) // 减弱中心引力
        .force('x', d3.forceX(width / 2).strength(0.01)) // 减弱X轴引力
        .force('y', d3.forceY(height / 2).strength(0.01)); // 减弱Y轴引力
    }

    // 绘制点
    const nodeGroups = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', 'node-group')
      .attr('cursor', 'pointer')
      .attr('opacity', (d: SimulationNode) => {
        if (viewMode === 'temperament') {
           const targetCategories = ['机警', '温顺', '勇敢', '忠诚', '凶猛'];
           return targetCategories.includes(d.data['犬类品性']) ? 1 : 0;
        } else if (viewMode === 'duty') {
            const targetDuties = ['看家护院', '狩猎放牧', '交通牵引', '陪伴随行', '巡逻警戒'];
            return targetDuties.includes(d.data['犬类职责']) ? 1 : 0;
        }
        return 1;
      });

    // 添加圆形背景
    nodeGroups.append('circle')
        .attr('r', (d: SimulationNode) => d.r || 0) // 使用计算好的半径
        .attr('fill', (d: SimulationNode) => {
          const style = d.data['文体'];
          if (style === '诗') return '#F5D25A';
          if (style === '词') return '#B1E5B4';
          if (style === '曲') return '#FF9DEA';
          return '#FF8100'; // 其他
        })
        .attr('opacity', 0.8);

    // 添加职责图标 (使用动态SVG注入)
    nodeGroups.append('svg')
        .each(function(d: SimulationNode) {
          const duty = d.data['犬类职责'];
          const template = svgTemplates[duty];
          if (template) {
            const svgNode = d3.select(this);
            svgNode.attr('viewBox', template.viewBox);
            
            const temperament = d.data['犬类品性'];
            const color = temperamentColors[temperament] || '#E31F00'; // 默认红色
            
            const content = template.content.replace(/{{FILL_COLOR}}/g, color);
            svgNode.html(content);
          }
        })
        .attr('width', (d: SimulationNode) => (d.r || 0) * 1.6) // 稍微调整大小以适应
        .attr('height', (d: SimulationNode) => (d.r || 0) * 1.6)
        .attr('x', (d: SimulationNode) => -((d.r || 0) * 1.6) / 2) // 居中
        .attr('y', (d: SimulationNode) => -((d.r || 0) * 1.6) / 2)
        .style('display', (d: SimulationNode) => svgTemplates[d.data['犬类职责']] ? 'block' : 'none')
        .style('pointer-events', 'none'); // 让鼠标事件穿透到 circle 或 group

    console.log('Radius range:', radiusScale.domain(), radiusScale.range());
    console.log('Sample radii:', nodes.slice(0, 5).map(n => ({ val: n.data['犬类词汇占比(%)'], r: n.r })));

    // 添加简单的交互（可选，方便调试看到是哪个点）
    nodeGroups.append('title')
      .text(d => `${d.data['诗词标题']} - ${d.data['作者']} (${d.data['犬类职责'] || '无'} - ${d.data['犬类品性'] || '无'})`);

    // 添加交互效果：鼠标悬停放大
    nodeGroups
      .on('mouseover', function(event: MouseEvent, d: SimulationNode) {
        // 将当前元素移到最上层
        d3.select(this).raise();

        // 放大圆形背景
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', (d.r || 0) * 1.5);

        // 放大图标
        const scaledSize = (d.r || 0) * 1.6 * 1.5;
        d3.select(this).select('svg')
          .transition()
          .duration(200)
          .attr('width', scaledSize)
          .attr('height', scaledSize)
          .attr('x', -scaledSize / 2)
          .attr('y', -scaledSize / 2);
      })
      .on('mouseout', function(event: MouseEvent, d: SimulationNode) {
        // 恢复圆形背景大小
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', d.r || 0);

        // 恢复图标大小
        const originalSize = (d.r || 0) * 1.6;
        d3.select(this).select('svg')
          .transition()
          .duration(200)
          .attr('width', originalSize)
          .attr('height', originalSize)
          .attr('x', -originalSize / 2)
          .attr('y', -originalSize / 2);
      });

    // 更新位置
    simulation.on('tick', () => {
      nodeGroups
        .attr('transform', (d: SimulationNode) => {
          let minX = 0, maxX = width;
          
          let minY: number | undefined = 0;
          let maxY: number | undefined = height;
          
          if (viewMode === 'temperament') {
              const cat = d.data['犬类品性'];
              if (ranges[cat]) {
                  ({ minX, maxX, minY, maxY } = ranges[cat]);
              }
          } else if (viewMode === 'duty') {
              const duty = d.data['犬类职责'];
              if (ranges[duty]) {
                  ({ minX, maxX, minY, maxY } = ranges[duty]);
              }
          }

          // 限制在画布范围内，预留半径大小的边距
          const r = d.r || 0;
          
          // 如果是聚类模式且有特定范围，限制在特定范围内
          if ((viewMode === 'temperament' && ranges[d.data['犬类品性']]) || 
              (viewMode === 'duty' && ranges[d.data['犬类职责']])) {
              d.x = Math.max(minX + r, Math.min(maxX - r, d.x || 0));
              
              // 使用 ranges 中定义的 Y 轴范围，如果有的话
              const currentMinY = minY !== undefined ? minY : 0;
              const currentMaxY = maxY !== undefined ? maxY : height;
              d.y = Math.max(currentMinY + r, Math.min(currentMaxY - r, d.y || 0));
          } else {
              // 否则限制在整个画布内
              d.x = Math.max(r, Math.min(width - r, d.x || 0));
              d.y = Math.max(r, Math.min(height - r, d.y || 0));
          }
          return `translate(${d.x},${d.y})`;
        });
    });

    // 清理函数
    return () => {
      simulation.stop();
    };
  }, [data, dimensions, viewMode]);

  return (
    <div className="w-full min-h-screen overflow-hidden" style={{ backgroundColor: '#00100A' }}>
      {/* 页面过渡遮罩 */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#00100A] pointer-events-none transition-opacity duration-1000 ease-in-out ${isExiting ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* side 图片始终固定在画面最上方 */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          zIndex: 10,
        }}
      >
        <img
          src="/frames/side.png"
          alt="Side"
          className="w-full h-full"
          style={{
            display: 'block',
            objectFit: 'fill', // 强制拉伸填满
          }}
          draggable={false}
        />
      </div>

      <div className="container mx-auto px-10 h-screen flex flex-row relative z-10 box-border">
         {/* 左侧区域：标题和图例 */}
         <div className="w-[18%] h-full flex flex-col pr-5 z-20">
            {/* 上部分：标题和图例 */}
            <div className="flex-1 flex flex-col justify-end items-center pb-2 min-h-0">
               <img 
                  src="/frames/subtitle1.png" 
                  alt="Subtitle" 
                  className="w-full h-full object-contain object-bottom" 
               />
            </div>

            {/* 下部分：Ruler 图片 */}
            <div className="h-[80%] w-full relative flex items-end">
               <img 
                  src="/frames/ruler.png" 
                  alt="Ruler" 
                  className="w-full h-full object-contain object-bottom"
               />
            </div>
         </div>

         {/* 右侧区域：可视化点阵 */}
         <div className="flex-1 h-full relative">
            <div ref={containerRef} className="w-full h-full"></div>
         </div>
      </div>

      {/* 向下箭头，点击切换到聚类模式或进入下一个视图 */}
      <div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        style={{ zIndex: 50 }}
        onClick={() => {
          if (viewMode === 'scatter') {
            setViewMode('temperament');
          } else if (viewMode === 'temperament') {
            setViewMode('duty');
          } else {
            setIsExiting(true);
            setTimeout(() => {
              router.push('/science');
            }, 1000);
          }
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
