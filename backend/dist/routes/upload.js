"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const supabase_js_1 = require("@supabase/supabase-js");
const auth_1 = __importDefault(require("../middleware/auth"));
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const BUCKET = 'vaagdevi';
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
        const urls = await Promise.all(files.map(async (file) => {
            const ext = path_1.default.extname(file.originalname);
            const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
            const { error } = await supabase.storage
                .from(BUCKET)
                .upload(filename, file.buffer, {
                contentType: file.mimetype,
                upsert: true,
            });
            if (error)
                throw error;
            const { data: { publicUrl } } = supabase.storage
                .from(BUCKET)
                .getPublicUrl(filename);
            return publicUrl;
        }));
        res.json({ success: true, data: urls });
    }
    catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, error: 'Upload failed' });
    }
});
exports.default = router;
//# sourceMappingURL=upload.js.map