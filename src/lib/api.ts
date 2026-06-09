const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("admin_token");
  } catch {
    return null;
  }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Request failed");
  return json.data;
}

export interface ProjectData {
  title: string;
  slug: string;
  location: string;
  status: string;
  category: string;
  plotSize?: string;
  features?: string[];
  description?: string;
  images?: string[];
  amenities?: string[];
  nearbyLandmarks?: { name: string; distance: string }[];
  coordinates?: { lat: number; lng: number };
  brochure?: string;
  masterPlan?: string;
}

export function fetchProjects() {
  return request<any[]>("projects");
}

export function fetchProject(id: string) {
  return request<any>(`projects/${id}`);
}

export function createProject(data: ProjectData) {
  return request<any>("projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateProject(id: string, data: Partial<ProjectData>) {
  return request<any>(`projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteProject(id: string) {
  return request<any>(`projects/${id}`, { method: "DELETE" });
}
