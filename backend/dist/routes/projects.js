"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Project_1 = __importDefault(require("../models/Project"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const projects = await Project_1.default.find().sort({ createdAt: -1 });
        res.json({ success: true, data: projects });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const project = await Project_1.default.findById(req.params.id);
        if (!project) {
            res.status(404).json({ success: false, error: 'Project not found' });
            return;
        }
        res.json({ success: true, data: project });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
router.post('/', auth_1.default, async (req, res) => {
    try {
        const project = await Project_1.default.create(req.body);
        res.status(201).json({ success: true, data: project });
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ success: false, error: 'Slug already exists' });
            return;
        }
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
router.put('/:id', auth_1.default, async (req, res) => {
    try {
        const project = await Project_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!project) {
            res.status(404).json({ success: false, error: 'Project not found' });
            return;
        }
        res.json({ success: true, data: project });
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ success: false, error: 'Slug already exists' });
            return;
        }
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
router.delete('/:id', auth_1.default, async (req, res) => {
    try {
        const project = await Project_1.default.findByIdAndDelete(req.params.id);
        if (!project) {
            res.status(404).json({ success: false, error: 'Project not found' });
            return;
        }
        res.json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=projects.js.map