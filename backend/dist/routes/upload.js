"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
const auth_1 = __importDefault(require("../middleware/auth"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        const allowed = /\.(jpg|jpeg|png|gif|webp|svg|pdf|ico)$/i;
        if (allowed.test(path_1.default.extname(file.originalname))) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type'));
        }
    },
});
const router = (0, express_1.Router)();
router.post('/', auth_1.default, upload.array('files', 20), async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            res.status(400).json({ success: false, error: 'No files uploaded' });
            return;
        }
        const uploadPromises = files.map((file) => new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({
                folder: 'vaagdevi',
                resource_type: 'auto',
                public_id: `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
            }, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result.secure_url);
            });
            stream.end(file.buffer);
        }));
        const urls = await Promise.all(uploadPromises);
        res.json({ success: true, data: urls });
    }
    catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, error: 'Upload failed' });
    }
});
exports.default = router;
//# sourceMappingURL=upload.js.map