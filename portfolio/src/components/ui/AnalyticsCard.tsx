"use client";

import React from "react";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  icon?: React.ReactNode;
  suffix?: string;
  className?: string;
}

export function AnalyticsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  suffix = "",
  className = "",
}: AnalyticsCardProps) {
  const formatValue = (val: string | number): string => {
    if (typeof val === "number") {
      if (val >= 1000000) {
        return (val / 1000000).toFixed(1) + "M";
      } else if (val >= 1000) {
        return (val / 1000).toFixed(1) + "K";
      }
      return val.toLocaleString();
    }
    return val;
  };

  const getChangeColor = () => {
    switch (changeType) {
      case "increase":
        return "text-green-500";
      case "decrease":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case "increase":
        return "↗";
      case "decrease":
        return "↘";
      default:
        return "→";
    }
  };

  return (
    <div
      className={`
      bg-white dark:bg-gray-800 
      rounded-xl shadow-sm border border-gray-200 dark:border-gray-700
      p-6 hover:shadow-md transition-shadow duration-200
      ${className}
    `}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
          {title}
        </h3>
        {icon && <div className="text-gray-400 dark:text-gray-500">{icon}</div>}
      </div>

      <div className="flex items-baseline gap-2">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {formatValue(value)}
          {suffix}
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center text-sm font-medium ${getChangeColor()}`}
          >
            <span className="mr-1">{getChangeIcon()}</span>
            {Math.abs(change)}%
          </div>
        )}
      </div>
    </div>
  );
}
