import { Buffer } from "buffer";

const API_BASE_URL = 'http://localhost:8080/api';

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