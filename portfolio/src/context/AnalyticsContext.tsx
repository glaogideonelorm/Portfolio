"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";

interface AnalyticsContextType {
  sessionId: string;
  trackClick: (
    elementType: string,
    elementId?: string,
    elementText?: string,
    targetUrl?: string,
    event?: MouseEvent
  ) => void;
  trackInteraction: (event: MouseEvent) => void;
  isPageVisible: () => boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined
);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const analytics = useAnalytics();

  // Enable analytics tracking for the entire app
  useEffect(() => {
    // The useAnalytics hook already handles page view tracking and click tracking
    console.log("Analytics tracking enabled for session:", analytics.sessionId);
  }, [analytics.sessionId]);

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error(
      "useAnalyticsContext must be used within an AnalyticsProvider"
    );
  }
  return context;
}

// Optional hook for components that want analytics but don't want to throw if not available
export function useOptionalAnalytics() {
  return useContext(AnalyticsContext);
}
