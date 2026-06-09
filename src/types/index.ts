export interface Project {
  _id: string;
  title: string;
  slug: string;
  location: string;
  status: "Ongoing" | "Completed" | "Upcoming";
  category: "Residential" | "Commercial" | "Open Plots";
  plotSize: string;
  features: string[];
  description: string;
  images: string[];
  videos: string[];
  droneFootage: string[];
  brochure: string;
  masterPlan: string;
  amenities: string[];
  nearbyLandmarks: { name: string; distance: string }[];
  coordinates: { lat: number; lng: number };
  completionDate?: string;
  createdAt: string;
}

export interface Lead {
  _id: string;
  name: string;
  phone: string;
  email: string;
  interestedProject?: string;
  message: string;
  source: "Website" | "WhatsApp" | "Site Visit";
  status: "New" | "Contacted" | "Qualified" | "Converted";
  notes: string;
  createdAt: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  content: string;
  project?: string;
  createdAt: string;
}

export interface GalleryItem {
  _id: string;
  type: "image" | "video" | "drone";
  url: string;
  thumbnail?: string;
  title: string;
  project?: string;
  createdAt: string;
}

export interface Analytics {
  totalProjects: number;
  activeProjects: number;
  totalLeads: number;
  monthlyLeads: number;
  whatsappClicks: number;
  siteVisitRequests: number;
  projectPerformance: { name: string; leads: number; visits: number }[];
}
