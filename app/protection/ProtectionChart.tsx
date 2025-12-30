'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface DogData {
  city: string;
  start: number;
  end: number | null;
  status: string;
  reason: string;
}

const dogData: DogData[] = [
  { city: "深圳", start: 2006, end: 2020, status: "已解禁", reason: "文化认同、管理精细化" },
  { city: "广州", start: 2010, end: 2025, status: "已解禁", reason: "管理精细化、文化认同" },
  { city: "长沙", start: 2019, end: 2025, status: "已解禁", reason: "管理精细化、社会诉求" },
  { city: "昆明", start: 2008, end: 2025, status: "已解禁", reason: "管理精细化" },
  { city: "成都", start: 2024, end: null, status: "禁养中", reason: "安全考量、体型超标" },
  { city: "西安", start: 2012, end: null, status: "禁养中", reason: "安全考量、历史惯性" },
  { city: "沈阳", start: 2022, end: null, status: "禁养中", reason: "体型超标、安全考量" },
  { city: "武汉", start: 2005, end: null, status: "禁养中", reason: "安全考量、历史惯性" },
  { city: "杭州", start: 2007, end: null, status: "限养中", reason: "历史惯性、体型超标" }
];

export default function ProtectionChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    data: DogData | null;
  }>({ visible: false, x: 0, y: 0, data: null });

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    const container = containerRef.current;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 850;
    const height = 360; // Reduced to 4/5 of 480
    const padding = 100;
    const chartWidth = width - padding * 1.5;
    const startY = 40; // Reduced from 80
    const rowHeight = 32; // Reduced from 35
    const startYear = 2004;
    const endYear = 2026;

    // Set SVG attributes
    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMax meet")
      .style("width", "100%")
      .style("height", "auto")
      .style("display", "block"); // Remove default inline spacing

    // Background
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "rgba(0, 0, 0)") // slightly transparent or match p5 background(252)
      .attr("stroke", "#33827E")
      .attr("stroke-width", 5)
      .attr("rx",30);

    // X Scale
    const xScale = d3.scaleLinear()
      .domain([startYear, endYear])
      .range([padding, padding + chartWidth]);

    // Axis line
    svg.append("line")
      .attr("x1", padding)
      .attr("y1", height - 30) // Moved down from height-60
      .attr("x2", padding + chartWidth)
      .attr("y2", height - 30) // Moved down from height-60
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1);

    // Ticks
    for (let year = startYear; year <= endYear; year++) {
      const x = xScale(year);
      // Tick line
      svg.append("line")
        .attr("x1", x)
        .attr("y1", height - 30) // Start at axis line
        .attr("x2", x)
        .attr("y2", height - 35) // Go upwards (y is smaller)
        .attr("stroke", "#ccc");
      
      // Tick text
      svg.append("text")
        .attr("x", x)
        .attr("y", height - 15) // Positioned below the tick
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", "#aaa")
        .text(year);
    }

    // Draw rows
    dogData.forEach((d, i) => {
      const yPos = startY + i * rowHeight;
      const xStart = xScale(d.start);
      const isStillBanned = d.end === null;
      const xEnd = isStillBanned ? padding + chartWidth : xScale(d.end!);

      // Group for the row
      const g = svg.append("g")
        .attr("class", "row-group")
        .style("cursor", "pointer");

      // Alignment line
      g.append("line")
        .attr("x1", padding - 80)
        .attr("y1", yPos + 15)
        .attr("x2", padding + chartWidth)
        .attr("y2", yPos + 15)
        .attr("stroke", "#37837C")
        .attr("stroke-opacity", 0.2)
        .attr("stroke-width", 1);

      // City name
      g.append("text")
        .attr("x", padding - 15)
        .attr("y", yPos + 5)
        .attr("text-anchor", "end")
        .style("font-size", "14px")
        .style("fill", "#ddd")
        .text(d.city);

      // Line
      const color = isStillBanned ? "#EE9B00" : "#753C7E";
      
      if (isStillBanned) {
        // Red line
        g.append("line")
          .attr("x1", xStart)
          .attr("y1", yPos)
          .attr("x2", xEnd)
          .attr("y2", yPos)
          .attr("stroke", color)
          .attr("stroke-width", 6);
        
        // Start Icon (dot2)
        g.append("image")
          .attr("xlink:href", "/frames/dot2.png")
          .attr("x", xStart - 10)
          .attr("y", yPos - 10)
          .attr("width", 20)
          .attr("height", 20);

      } else {
        // Green line
        g.append("line")
          .attr("x1", xStart)
          .attr("y1", yPos)
          .attr("x2", xEnd)
          .attr("y2", yPos)
          .attr("stroke", color)
          .attr("stroke-width", 6);
        
        // Start Icon (dot1)
        g.append("image")
          .attr("xlink:href", "/frames/dot1.png")
          .attr("x", xStart - 10)
          .attr("y", yPos - 10)
          .attr("width", 20)
          .attr("height", 20);
        
        // End Icon (dot1)
        g.append("image")
          .attr("xlink:href", "/frames/dot1.png")
          .attr("x", xEnd - 10)
          .attr("y", yPos - 10)
          .attr("width", 20)
          .attr("height", 20);
      }

      // Invisible interaction rect
      g.append("rect")
        .attr("x", padding - 80)
        .attr("y", yPos - 15)
        .attr("width", width - padding + 50)
        .attr("height", 30)
        .attr("fill", "transparent")
        .on("mouseenter", (event) => {
          // Highlight background
          d3.select(event.currentTarget.parentNode)
            .insert("rect", ":first-child")
            .attr("class", "highlight-bg")
            .attr("x", padding - 80)
            .attr("y", yPos - 15)
            .attr("width", width - padding + 50)
            .attr("height", 30)
            .attr("rx", 5)
            .attr("fill", "rgba(200, 200, 200, 0.1)");
            
          const [mx, my] = d3.pointer(event, container);
          setTooltip({
            visible: true,
            x: mx,
            y: my,
            data: d
          });
        })
        .on("mousemove", (event) => {
          const [mx, my] = d3.pointer(event, container);
          setTooltip(prev => ({ ...prev, x: mx, y: my }));
        })
        .on("mouseleave", (event) => {
          d3.select(event.currentTarget.parentNode).select(".highlight-bg").remove();
          setTooltip(prev => ({ ...prev, visible: false }));
        });
    });

  }, []);

  return (
    <div ref={containerRef} className="w-full relative">
      <svg ref={svgRef} className="w-full h-auto" />
      
      {/* Tooltip */}
      {tooltip.visible && tooltip.data && (
        <div 
          className="absolute z-50 pointer-events-none bg-gray-800 text-white p-4 rounded-lg shadow-lg border border-gray-700"
          style={{
            left: Math.min(tooltip.x + 15, 850 - 215), // Constrain logic from p5
            top: tooltip.y - 60,
            width: '200px'
          }}
        >
          <div className="text-xs space-y-2">
            <div>
              <span className="text-gray-400">时间区间: </span>
              {tooltip.data.end ? `${tooltip.data.start} 至 ${tooltip.data.end}` : `${tooltip.data.start} 至今`}
            </div>
            <div>
              <span className="text-gray-400">政策状态: </span>
              {tooltip.data.status}
            </div>
            <div>
              <span className="text-gray-400">核心原因: </span>
              {tooltip.data.reason}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
