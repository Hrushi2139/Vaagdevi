import mongoose, { Document } from 'mongoose';
export interface IGallery extends Document {
    type: 'image' | 'video' | 'drone';
    url: string;
    thumbnail?: string;
    title?: string;
    project?: string;
    createdAt: Date;
}
declare const _default: mongoose.Model<IGallery, {}, {}, {}, mongoose.Document<unknown, {}, IGallery, {}, {}> & IGallery & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Gallery.d.ts.map