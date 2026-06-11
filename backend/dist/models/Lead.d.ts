import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<ILead, {}, {}, {}, mongoose.Document<unknown, {}, ILead, {}, {}> & ILead & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Lead.d.ts.map