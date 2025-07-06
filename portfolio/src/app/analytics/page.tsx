"use client";

import React, { useState, useEffect } from "react";
import { AnalyticsCard } from "@/components/ui/AnalyticsCard";
import { LineChart } from "@/components/ui/LineChart";
import { PieChart } from "@/components/ui/PieChart";
import { BarChart } from "@/components/ui/BarChart";
import { ActivityFeed } from "@/components/ui/ActivityFeed";
import CustomCursor from "@/components/ui/CustomCursor";
import {
  getAnalyticsStats,
  getRecentActivity,
  AnalyticsStats,
  ActivityItem,
} from "@/lib/api";

const PERIOD_OPTIONS = [
  { value: "hour", label: "Last Hour" },
  { value: "day", label: "Last 24 Hours" },
  { value: "week", label: "Last Week" },
  { value: "month", label: "Last Month" },
  { value: "year", label: "Last Year" },
];

export default function AnalyticsPage() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalyticsData = React.useCallback(
    async (period: string = selectedPeriod) => {
      try {
        setLoading(true);
        setError(null);

        const [statsData, activitiesData] = await Promise.all([
          getAnalyticsStats(period),
          getRecentActivity(100),
        ]);

        setStats(statsData);
        setActivities(activitiesData);
      } catch (err) {
        setError("Failed to load analytics data");
        console.error("Analytics fetch error:", err);
      } finally {
        setLoading(false);
      }
    },
    [selectedPeriod]
  );

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAnalyticsData();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchAnalyticsData]);

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <CustomCursor />
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"
                ></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <CustomCursor />
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Error Loading Analytics
            </h2>
            <p className="text-red-600 dark:text-red-300">{error}</p>
            <button
              onClick={() => fetchAnalyticsData()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    if (!seconds) return "0s";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <CustomCursor />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Portfolio Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Real-time insights into your portfolio performance
            </p>
          </div>

          {/* Period Selector */}
          <div className="mt-4 sm:mt-0">
            <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
              {PERIOD_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handlePeriodChange(option.value)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    selectedPeriod === option.value
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnalyticsCard
            title="Total Page Views"
            value={stats?.totalPageViews || 0}
            changeType="increase"
            icon={
              <svg
                className="w-5 h-5"
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
            }
          />

          <AnalyticsCard
            title="Unique Visitors"
            value={stats?.uniqueVisitors || 0}
            changeType="increase"
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            }
          />

          <AnalyticsCard
            title="Total Clicks"
            value={stats?.totalClicks || 0}
            changeType="increase"
            icon={
              <svg
                className="w-5 h-5"
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
            }
          />

          <AnalyticsCard
            title="Avg Session Duration"
            value={formatDuration(Math.round(stats?.avgSessionDuration || 0))}
            changeType="increase"
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Page Views Trend */}
          <LineChart
            data={stats?.pageViewTrend || []}
            title="Page Views Trend"
            color="#3B82F6"
          />

          {/* Clicks Trend */}
          <LineChart
            data={stats?.clickTrend || []}
            title="Clicks Trend"
            color="#10B981"
          />
        </div>

        {/* Distribution Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Device Stats */}
          <PieChart
            data={stats?.deviceStats || []}
            title="Devices"
            size={220}
          />

          {/* Browser Stats */}
          <PieChart
            data={stats?.browserStats || []}
            title="Browsers"
            size={220}
          />
        </div>

        {/* Popular Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Popular Pages */}
          <BarChart
            data={stats?.popularPages || []}
            title="Most Popular Pages"
            color="#F59E0B"
            maxItems={8}
          />

          {/* Top Clicked Elements */}
          <BarChart
            data={stats?.topClickedElements || []}
            title="Most Clicked Elements"
            color="#EF4444"
            maxItems={8}
          />
        </div>

        {/* User Behavior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Entry Pages */}
          <BarChart
            data={stats?.entryPages || []}
            title="Entry Pages"
            color="#8B5CF6"
            maxItems={6}
          />

          {/* Referrers */}
          <BarChart
            data={stats?.referrerStats || []}
            title="Top Referrers"
            color="#06B6D4"
            maxItems={6}
          />
        </div>

        {/* Activity Feed */}
        <div className="mb-8">
          <ActivityFeed
            activities={activities}
            title="Real-time Activity"
            maxItems={25}
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnalyticsCard
            title="New Visitors"
            value={stats?.newVisitors || 0}
            changeType="increase"
          />

          <AnalyticsCard
            title="Returning Visitors"
            value={stats?.returningVisitors || 0}
            changeType="increase"
          />

          <AnalyticsCard
            title="Avg Pages per Session"
            value={(stats?.avgPageViewsPerSession || 0).toFixed(1)}
            changeType="neutral"
          />
        </div>
      </div>
    </div>
  );
}
