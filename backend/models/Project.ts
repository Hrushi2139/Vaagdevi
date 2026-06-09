import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  location: string;
  status: 'Ongoing' | 'Completed' | 'Upcoming';
  category: 'Residential' | 'Commercial' | 'Open Plots';
  plotSize?: string;
  features?: string[];
  description?: string;
  images?: string[];
  videos?: string[];
  droneFootage?: string[];
  brochure?: string;
  masterPlan?: string;
  amenities?: string[];
  nearbyLandmarks?: { name: string; distance: string }[];
  coordinates?: { lat: number; lng: number };
  completionDate?: string;
  createdAt: Date;
}

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['Ongoing', 'Completed', 'Upcoming'], required: true },
  category: { type: String, enum: ['Residential', 'Commercial', 'Open Plots'], required: true },
  plotSize: { type: String },
  features: [{ type: String }],
  description: { type: String },
  images: [{ type: String }],
  videos: [{ type: String }],
  droneFootage: [{ type: String }],
  brochure: { type: String },
  masterPlan: { type: String },
  amenities: [{ type: String }],
  nearbyLandmarks: [{ name: { type: String }, distance: { type: String } }],
  coordinates: { lat: { type: Number }, lng: { type: Number } },
  completionDate: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProject>('Project', projectSchema);
