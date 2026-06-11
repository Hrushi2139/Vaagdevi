"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Gallery_1 = __importDefault(require("../models/Gallery"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const items = await Gallery_1.default.find().sort({ createdAt: -1 });
        res.json({ success: true, data: items });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
router.post('/', auth_1.default, async (req, res) => {
    try {
        const item = await Gallery_1.default.create(req.body);
        res.status(201).json({ success: true, data: item });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
router.delete('/:id', auth_1.default, async (req, res) => {
    try {
        const item = await Gallery_1.default.findByIdAndDelete(req.params.id);
        if (!item) {
            res.status(404).json({ success: false, error: 'Gallery item not found' });
            return;
        }
        res.json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=gallery.js.map