import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  location?: string;
  image?: string;
  rating?: number;
  content: string;
  project?: string;
  createdAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  location: { type: String },
  image: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  content: { type: String, required: true },
  project: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
