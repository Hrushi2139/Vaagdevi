import mongoose, { Document } from 'mongoose';
export interface ITestimonial extends Document {
    name: string;
    location?: string;
    image?: string;
    rating?: number;
    content: string;
    project?: string;
    createdAt: Date;
}
declare const _default: mongoose.Model<ITestimonial, {}, {}, {}, mongoose.Document<unknown, {}, ITestimonial, {}, {}> & ITestimonial & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Testimonial.d.ts.map