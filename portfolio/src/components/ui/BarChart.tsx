"use client";

import React from "react";

interface DataItem {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: DataItem[];
  title: string;
  maxItems?: number;
  color?: string;
  className?: string;
}

export function BarChart({
  data,
  title,
  maxItems = 10,
  color = "#3B82F6",
  className = "",
}: BarChartProps) {
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

  const displayData = data.slice(0, maxItems);
  const maxValue = Math.max(...displayData.map((item) => item.value));

  const formatLabel = (label: string) => {
    // Clean up page paths for better display
    if (label.startsWith("/")) {
      return label === "/"
        ? "Home"
        : label.split("/").filter(Boolean).join(" › ") || "Home";
    }
    return label;
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        {title}
      </h3>

      <div className="space-y-4">
        {displayData.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          const itemColor = item.color || color;

          return (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white truncate flex-1 mr-4">
                  {formatLabel(item.label)}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                  {item.value.toLocaleString()}
                </span>
              </div>

              <div className="relative">
                {/* Background bar */}
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  {/* Progress bar */}
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out group-hover:brightness-110"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: itemColor,
                    }}
                  />
                </div>

                {/* Percentage text overlay */}
                {percentage > 15 && (
                  <div
                    className="absolute inset-y-0 left-2 flex items-center"
                    style={{ width: `${percentage}%` }}
                  >
                    <span className="text-xs font-medium text-white">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {data.length > maxItems && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Showing top {maxItems} of {data.length} items
          </p>
        </div>
      )}
    </div>
  );
}
