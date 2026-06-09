import mongoose, { Document, Schema } from 'mongoose';

export interface IGallery extends Document {
  type: 'image' | 'video' | 'drone';
  url: string;
  thumbnail?: string;
  title?: string;
  project?: string;
  createdAt: Date;
}

const gallerySchema = new Schema<IGallery>({
  type: { type: String, enum: ['image', 'video', 'drone'], required: true },
  url: { type: String, required: true },
  thumbnail: { type: String },
  title: { type: String },
  project: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IGallery>('Gallery', gallerySchema);
