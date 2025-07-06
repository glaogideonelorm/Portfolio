import { Buffer } from "buffer";

// Build the base URL and guarantee it ends with "/api".
let _baseUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  (typeof window === "undefined"
    ? "http://localhost:8080" // Server-side (dev) fallback
    : ""); // Client-side (prod) fallback relies on same-origin rewrites

if (!_baseUrl.endsWith("/api")) {
  // Avoid double slashes
  _baseUrl = _baseUrl.replace(/\/?$/, "");
  _baseUrl += "/api";
}

// When _baseUrl is empty (client-side prod without env var) default to "/api".
export const API_BASE_URL = _baseUrl || "/api";

export interface Project {
  id?: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
  images: string[];
}

interface Credentials {
  username: string;
  password: string;
}

export function authHeader(creds?: Credentials): Record<string, string> {
  if (!creds) return {};
  const token =
    typeof window === "undefined"
      ? Buffer.from(`${creds.username}:${creds.password}`, "utf-8").toString("base64")
      : btoa(`${creds.username}:${creds.password}`);
  return { Authorization: `Basic ${token}` };
}

export async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json() as Promise<T>;
}

// GET all projects
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// GET project by ID
export async function getProject(id: number): Promise<Project | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    return null;
  }
}

// POST create new project
export async function createProject(project: Omit<Project, 'id'>): Promise<Project | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
}

// PUT update project
export async function updateProject(id: number, project: Project): Promise<Project | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating project ${id}:`, error);
    return null;
  }
}

// DELETE project
export async function deleteProject(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error);
    return false;
  }
}

// Analytics API Functions
export interface PageViewData {
  page: string;
  sessionId: string;
}

export interface ClickEventData {
  sessionId: string;
  page: string;
  elementType: string;
  elementId?: string;
  elementText?: string;
  targetUrl?: string;
  x?: number;
  y?: number;
}

export interface AnalyticsStats {
  totalPageViews: number;
  uniqueVisitors: number;
  totalClicks: number;
  avgSessionDuration: number;
  avgPageViewsPerSession: number;
  returningVisitors: number;
  newVisitors: number;
  popularPages: Array<{ label: string; value: number }>;
  topClickedElements: Array<{ label: string; value: number; extra?: string }>;
  entryPages: Array<{ label: string; value: number }>;
  exitPages: Array<{ label: string; value: number }>;
  deviceStats: Array<{ label: string; value: number }>;
  browserStats: Array<{ label: string; value: number }>;
  countryStats: Array<{ label: string; value: number }>;
  referrerStats: Array<{ label: string; value: number }>;
  pageViewTrend: Array<{ time: string; count: number }>;
  clickTrend: Array<{ time: string; count: number }>;
}

export interface ActivityItem {
  type: 'pageview' | 'click';
  page?: string;
  element?: string;
  timestamp: string;
  device?: string;
  country?: string;
}

// POST track page view
export async function trackPageView(data: PageViewData): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/track/pageview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error tracking page view:', error);
    return false;
  }
}

// POST track click event
export async function trackClick(data: ClickEventData): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/track/click`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error tracking click:', error);
    return false;
  }
}

// GET analytics dashboard stats
export async function getAnalyticsStats(period: string = 'week'): Promise<AnalyticsStats | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/dashboard?period=${period}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics stats:', error);
    return null;
  }
}

// GET recent activity
export async function getRecentActivity(limit: number = 50): Promise<ActivityItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/activity?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return [];
  }
} 