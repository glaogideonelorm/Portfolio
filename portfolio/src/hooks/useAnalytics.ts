'use client';

import { useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView, trackClick, ClickEventData } from '@/lib/api';

// Generate a unique session ID
function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Get or create session ID from sessionStorage
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

// Page visibility tracking
function usePageVisibility() {
  const isVisible = useRef(true);
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisible.current = !document.hidden;
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);
  
  return isVisible;
}

export function useAnalytics() {
  const pathname = usePathname();
  const sessionId = getSessionId();
  const isVisible = usePageVisibility();
  const pageStartTime = useRef<number>(Date.now());

  // Track page view on route change
  useEffect(() => {
    if (!sessionId || !pathname) return;
    
    // Reset page start time
    pageStartTime.current = Date.now();
    
    // Track the page view
    trackPageView({
      page: pathname,
      sessionId
    });
  }, [pathname, sessionId]);

  // Track page view duration on unmount or route change
  useEffect(() => {
    return () => {
      // Calculate duration when leaving page
      const duration = Math.round((Date.now() - pageStartTime.current) / 1000);
      
      // You could send this to an endpoint that updates the page view duration
      // For now, we'll just log it
      console.log(`Page ${pathname} viewed for ${duration} seconds`);
    };
  }, [pathname]);

  // Click tracking function
  const trackElementClick = useCallback((
    elementType: string,
    elementId?: string,
    elementText?: string,
    targetUrl?: string,
    event?: MouseEvent
  ) => {
    if (!sessionId || !pathname) return;
    
    const clickData: ClickEventData = {
      sessionId,
      page: pathname,
      elementType,
      elementId,
      elementText,
      targetUrl,
      x: event?.clientX,
      y: event?.clientY
    };
    
    trackClick(clickData);
  }, [sessionId, pathname]);

  // Enhanced click tracking with automatic element detection
  const trackInteraction = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target) return;
    
    let elementType = target.tagName.toLowerCase();
    let elementId = target.id;
    let elementText = target.textContent?.trim() || '';
    let targetUrl: string | undefined;
    
    // Handle different element types
    if (elementType === 'a') {
      targetUrl = (target as HTMLAnchorElement).href;
      elementType = 'link';
    } else if (elementType === 'button') {
      elementType = 'button';
    } else if (target.onclick || target.dataset.clickable) {
      elementType = 'clickable';
    } else if (target.closest('button')) {
      const button = target.closest('button');
      elementType = 'button';
      elementId = button?.id || elementId;
      elementText = button?.textContent?.trim() || elementText;
    } else if (target.closest('a')) {
      const link = target.closest('a');
      elementType = 'link';
      elementId = link?.id || elementId;
      elementText = link?.textContent?.trim() || elementText;
      targetUrl = link?.href;
    }
    
    // Only track meaningful interactions
    if (['link', 'button', 'clickable'].includes(elementType) || elementId || target.dataset.track) {
      trackElementClick(elementType, elementId, elementText, targetUrl, event);
    }
  }, [trackElementClick]);

  // Auto-track clicks on page
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    document.addEventListener('click', trackInteraction);
    return () => document.removeEventListener('click', trackInteraction);
  }, [trackInteraction]);

  return {
    sessionId,
    trackClick: trackElementClick,
    trackInteraction,
    isPageVisible: () => isVisible.current
  };
}

// Convenience hook for manual tracking
export function useManualAnalytics() {
  const sessionId = getSessionId();
  const pathname = usePathname();

  const trackEvent = useCallback((
    elementType: string,
    elementId?: string,
    elementText?: string,
    targetUrl?: string
  ) => {
    if (!sessionId || !pathname) return;
    
    trackClick({
      sessionId,
      page: pathname,
      elementType,
      elementId,
      elementText,
      targetUrl
    });
  }, [sessionId, pathname]);

  const trackPageManually = useCallback((page?: string) => {
    if (!sessionId) return;
    
    trackPageView({
      page: page || pathname,
      sessionId
    });
  }, [sessionId, pathname]);

  return {
    sessionId,
    trackEvent,
    trackPageManually,
    currentPage: pathname
  };
} 