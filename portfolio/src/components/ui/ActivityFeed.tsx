"use client";

import React from "react";
import { ActivityItem } from "@/lib/api";

interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
  maxItems?: number;
  className?: string;
}

export function ActivityFeed({
  activities,
  title = "Recent Activity",
  maxItems = 20,
  className = "",
}: ActivityFeedProps) {
  const displayActivities = activities.slice(0, maxItems);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "pageview":
        return (
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
        );
      case "click":
        return (
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          </div>
        );
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const formatPage = (page?: string) => {
    if (!page) return "";
    if (page === "/") return "Home";
    return page.split("/").filter(Boolean).join(" › ") || "Home";
  };

  const getActivityDescription = (activity: ActivityItem) => {
    switch (activity.type) {
      case "pageview":
        return (
          <span>
            Visited{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              {formatPage(activity.page)}
            </span>
            {activity.device && (
              <span className="text-gray-500"> on {activity.device}</span>
            )}
            {activity.country && (
              <span className="text-gray-500"> from {activity.country}</span>
            )}
          </span>
        );
      case "click":
        return (
          <span>
            Clicked{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              {activity.element}
            </span>
            {activity.page && (
              <span className="text-gray-500">
                {" "}
                on {formatPage(activity.page)}
              </span>
            )}
          </span>
        );
      default:
        return "Unknown activity";
    }
  };

  if (!displayActivities || displayActivities.length === 0) {
    return (
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 ${className}`}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No recent activity
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {activities.length} total events
        </span>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {displayActivities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {getActivityIcon(activity.type)}

            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {getActivityDescription(activity)}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {formatTimestamp(activity.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {activities.length > maxItems && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Showing {maxItems} of {activities.length} activities
          </p>
        </div>
      )}
    </div>
  );
}
