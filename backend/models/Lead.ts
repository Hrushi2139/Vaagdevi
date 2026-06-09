import mongoose, { Document, Schema } from 'mongoose';

export interface ILead extends Document {
  name: string;
  phone: string;
  email?: string;
  interestedProject?: string;
  message?: string;
  source?: 'Website' | 'WhatsApp' | 'Site Visit';
  status?: 'New' | 'Contacted' | 'Qualified' | 'Converted';
  notes?: string;
  createdAt: Date;
}

const leadSchema = new Schema<ILead>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  interestedProject: { type: String },
  message: { type: String },
  source: { type: String, enum: ['Website', 'WhatsApp', 'Site Visit'] },
  status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Converted'], default: 'New' },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ILead>('Lead', leadSchema);
