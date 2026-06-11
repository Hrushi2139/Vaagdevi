"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Lead_1 = __importDefault(require("../models/Lead"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.get('/', auth_1.default, async (_req, res) => {
    try {
        const leads = await Lead_1.default.find().sort({ createdAt: -1 });
        res.json({ success: true, data: leads });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
router.get('/:id', auth_1.default, async (req, res) => {
    try {
        const lead = await Lead_1.default.findById(req.params.id);
        if (!lead) {
            res.status(404).json({ success: false, error: 'Lead not found' });
            return;
        }
        res.json({ success: true, data: lead });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
router.post('/', async (req, res) => {
    try {
        const lead = await Lead_1.default.create(req.body);
        res.status(201).json({ success: true, data: lead });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
router.put('/:id', auth_1.default, async (req, res) => {
    try {
        const lead = await Lead_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!lead) {
            res.status(404).json({ success: false, error: 'Lead not found' });
            return;
        }
        res.json({ success: true, data: lead });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
router.delete('/:id', auth_1.default, async (req, res) => {
    try {
        const lead = await Lead_1.default.findByIdAndDelete(req.params.id);
        if (!lead) {
            res.status(404).json({ success: false, error: 'Lead not found' });
            return;
        }
        res.json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=leads.js.map