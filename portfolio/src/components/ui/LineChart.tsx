"use client";

import React from "react";

interface DataPoint {
  time: string;
  count: number;
}

interface LineChartProps {
  data: DataPoint[];
  title: string;
  height?: number;
  color?: string;
  className?: string;
}

export function LineChart({
  data,
  title,
  height = 300,
  color = "#3B82F6",
  className = "",
}: LineChartProps) {
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

  const maxValue = Math.max(...data.map((d) => d.count));
  const minValue = Math.min(...data.map((d) => d.count));
  const range = maxValue - minValue || 1;

  const width = 800;
  const chartHeight = height - 100;
  const padding = 40;

  // Generate SVG path
  const points = data.map((point, index) => {
    const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
    const y =
      chartHeight -
      padding -
      ((point.count - minValue) / range) * (chartHeight - 2 * padding);
    return {
      x: Number.isFinite(x) ? x : padding,
      y: Number.isFinite(y) ? y : chartHeight - padding,
      ...point,
    };
  });

  const pathD = points.reduce((path, point, index) => {
    const command = index === 0 ? "M" : "L";
    return `${path} ${command} ${point.x} ${point.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${
    chartHeight - padding
  } L ${points[0].x} ${chartHeight - padding} Z`;

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>

      <div className="relative">
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
        >
          {/* Grid lines */}
          <defs>
            <pattern
              id="grid"
              width="80"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 80 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-gray-200 dark:text-gray-700"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Area fill */}
          <path d={areaD} fill={color} fillOpacity="0.1" />

          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, index) => (
            <g key={index}>
              {Number.isFinite(point.x) && Number.isFinite(point.y) && (
                <>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill={color}
                    className="hover:r-6 transition-all duration-200"
                  />

                  {/* Tooltip on hover */}
                  <g className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <rect
                      x={point.x - 30}
                      y={point.y - 35}
                      width="60"
                      height="25"
                      fill="rgba(0, 0, 0, 0.8)"
                      rx="4"
                    />
                    <text
                      x={point.x}
                      y={point.y - 18}
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="medium"
                    >
                      {point.count}
                    </text>
                  </g>
                </>
              )}
            </g>
          ))}

          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
            const value = Math.round(minValue + range * ratio);
            const y =
              chartHeight - padding - ratio * (chartHeight - 2 * padding);
            return (
              <text
                key={index}
                x={padding - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="currentColor"
                className="text-gray-500"
              >
                {value}
              </text>
            );
          })}

          {/* X-axis labels (show every few points to avoid crowding) */}
          {points
            .filter((_, index) => index % Math.ceil(points.length / 6) === 0)
            .map((point, index) => (
              <text
                key={index}
                x={point.x}
                y={chartHeight - padding + 20}
                textAnchor="middle"
                fontSize="12"
                fill="currentColor"
                className="text-gray-500"
              >
                {point.time.split(" ")[0]}
              </text>
            ))}
        </svg>
      </div>
    </div>
  );
}
