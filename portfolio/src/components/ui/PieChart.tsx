"use client";

import React, { useState } from "react";

interface DataItem {
  label: string;
  value: number;
  color?: string;
}

interface PieChartProps {
  data: DataItem[];
  title: string;
  size?: number;
  className?: string;
}

const DEFAULT_COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#06B6D4", // Cyan
  "#F97316", // Orange
  "#84CC16", // Lime
];

export function PieChart({
  data,
  title,
  size = 200,
  className = "",
}: PieChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 ${className}`}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const center = size / 2;
  const radius = center - 20;

  // Calculate angles and segments
  let currentAngle = -90; // Start from top
  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    // Calculate arc path
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const startX = center + radius * Math.cos(startAngleRad);
    const startY = center + radius * Math.sin(startAngleRad);
    const endX = center + radius * Math.cos(endAngleRad);
    const endY = center + radius * Math.sin(endAngleRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathD = [
      `M ${center} ${center}`,
      `L ${startX} ${startY}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      "Z",
    ].join(" ");

    // Calculate label position
    const labelAngle = (startAngle + endAngle) / 2;
    const labelAngleRad = (labelAngle * Math.PI) / 180;
    const labelRadius = radius * 0.7;
    const labelX = center + labelRadius * Math.cos(labelAngleRad);
    const labelY = center + labelRadius * Math.sin(labelAngleRad);

    currentAngle += angle;

    return {
      ...item,
      pathD,
      percentage,
      color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      labelX,
      labelY,
      index,
    };
  });

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>

      <div className="flex items-center gap-6">
        {/* Pie Chart */}
        <div className="relative">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {segments.map((segment, index) => (
              <g key={index}>
                <path
                  d={segment.pathD}
                  fill={segment.color}
                  stroke="white"
                  strokeWidth="2"
                  className={`transition-all duration-300 cursor-pointer ${
                    hoveredIndex === index ? "filter brightness-110" : ""
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />

                {/* Percentage labels on segments (only show if > 5%) */}
                {segment.percentage > 5 && (
                  <text
                    x={segment.labelX}
                    y={segment.labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="12"
                    fill="white"
                    fontWeight="medium"
                    className="pointer-events-none"
                  >
                    {segment.percentage.toFixed(0)}%
                  </text>
                )}
              </g>
            ))}

            {/* Center circle for donut effect */}
            <circle
              cx={center}
              cy={center}
              r={radius * 0.4}
              fill="white"
              className="dark:fill-gray-800"
            />

            {/* Total in center */}
            <text
              x={center}
              y={center - 8}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
              fontWeight="bold"
              className="fill-gray-900 dark:fill-white"
            >
              Total
            </text>
            <text
              x={center}
              y={center + 8}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              className="fill-gray-600 dark:fill-gray-400"
            >
              {total.toLocaleString()}
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {segments.map((segment, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                hoveredIndex === index ? "bg-gray-50 dark:bg-gray-700" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: segment.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {segment.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {segment.value.toLocaleString()} (
                  {segment.percentage.toFixed(1)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
