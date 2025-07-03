import { Buffer } from "buffer";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1/portfolio";

export interface Project {
  id?: number;
  title: string;
  description: string;
  techStack?: string[];
  githubUrl?: string;
  demoUrl?: string;
  images?: string[];
  tags?: string[]; // legacy field for front-end filtering
}

interface Credentials {
  username: string;
  password: string;
}

function authHeader(creds?: Credentials): Record<string, string> {
  if (!creds) return {};
  const token =
    typeof window === "undefined"
      ? Buffer.from(`${creds.username}:${creds.password}`, "utf-8").toString("base64")
      : btoa(`${creds.username}:${creds.password}`);
  return { Authorization: `Basic ${token}` };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json() as Promise<T>;
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/projects`, {
    cache: "no-store",
  });
  return handleResponse<Project[]>(res);
}

export async function createProject(
  data: Project,
  creds?: Credentials
): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(creds),
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Project>(res);
}

export async function updateProject(
  id: number,
  data: Project,
  creds?: Credentials
): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(creds),
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Project>(res);
}

export async function deleteProject(id: number, creds?: Credentials): Promise<void> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeader(creds),
    },
  });
  if (!res.ok) throw new Error(await res.text());
} 