"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Testimonial_1 = __importDefault(require("../models/Testimonial"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const testimonials = await Testimonial_1.default.find().sort({ createdAt: -1 });
        res.json({ success: true, data: testimonials });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
router.post('/', auth_1.default, async (req, res) => {
    try {
        const testimonial = await Testimonial_1.default.create(req.body);
        res.status(201).json({ success: true, data: testimonial });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
router.put('/:id', auth_1.default, async (req, res) => {
    try {
        const testimonial = await Testimonial_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!testimonial) {
            res.status(404).json({ success: false, error: 'Testimonial not found' });
            return;
        }
        res.json({ success: true, data: testimonial });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
router.delete('/:id', auth_1.default, async (req, res) => {
    try {
        const testimonial = await Testimonial_1.default.findByIdAndDelete(req.params.id);
        if (!testimonial) {
            res.status(404).json({ success: false, error: 'Testimonial not found' });
            return;
        }
        res.json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=testimonials.js.map