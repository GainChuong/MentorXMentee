'use client';

import React from 'react';
import { SkillAssessment } from '@/lib/types';
import { motion } from 'framer-motion';

interface RadarChartProps {
  data: SkillAssessment[];
  size?: number;
}

export default function RadarChart({ data, size = 300 }: RadarChartProps) {
  if (!data || data.length === 0) return null;

  const center = size / 2;
  const radius = (size / 2) * 0.8;
  const angleStep = (Math.PI * 2) / data.length;

  // Generate points for the radar
  const points = data.map((item, i) => {
    const r = (item.score / 10) * radius;
    const x = center + r * Math.sin(i * angleStep);
    const y = center - r * Math.cos(i * angleStep);
    return `${x},${y}`;
  }).join(' ');

  // Generate axis lines and labels
  const axisLines = data.map((item, i) => {
    const x = center + radius * Math.sin(i * angleStep);
    const y = center - radius * Math.cos(i * angleStep);
    const labelX = center + (radius + 20) * Math.sin(i * angleStep);
    const labelY = center - (radius + 20) * Math.cos(i * angleStep);

    return { x, y, labelX, labelY, label: item.skill };
  });

  // Generate background circles (grid)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      <svg width={size + 100} height={size + 100} viewBox={`0 0 ${size + 100} ${size + 100}`} className="overflow-visible">
        <g transform="translate(50, 50)">
          {/* Grid levels */}
          {gridLevels.map((level, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius * level}
              fill="none"
              stroke="rgba(15, 63, 115, 0.05)"
              strokeWidth="1"
            />
          ))}

          {/* Axis lines */}
          {axisLines.map((line, i) => (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={line.x}
              y2={line.y}
              stroke="rgba(15, 63, 115, 0.1)"
              strokeWidth="1"
            />
          ))}

          {/* Polygon area */}
          <motion.polygon
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            points={points}
            fill="rgba(15, 63, 115, 0.2)"
            stroke="rgb(15, 63, 115)"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {data.map((item, i) => {
            const r = (item.score / 10) * radius;
            const x = center + r * Math.sin(i * angleStep);
            const y = center - r * Math.cos(i * angleStep);
            return (
              <motion.circle
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                cx={x}
                cy={y}
                r="4"
                fill="rgb(241, 100, 41)"
                className="shadow-lg"
              />
            );
          })}

          {/* Labels */}
          {axisLines.map((line, i) => (
            <text
              key={i}
              x={line.labelX}
              y={line.labelY}
              textAnchor="middle"
              className="text-[10px] font-black fill-slate-500 uppercase tracking-tighter"
              dominantBaseline="middle"
            >
              {line.label}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
