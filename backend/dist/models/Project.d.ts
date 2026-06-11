import mongoose, { Document } from 'mongoose';
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
    nearbyLandmarks?: {
        name: string;
        distance: string;
    }[];
    coordinates?: {
        lat: number;
        lng: number;
    };
    completionDate?: string;
    createdAt: Date;
}
declare const _default: mongoose.Model<IProject, {}, {}, {}, mongoose.Document<unknown, {}, IProject, {}, {}> & IProject & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Project.d.ts.map