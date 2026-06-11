"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Project_1 = __importDefault(require("../models/Project"));
const Lead_1 = __importDefault(require("../models/Lead"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.get('/', auth_1.default, async (_req, res) => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const totalProjects = await Project_1.default.countDocuments();
        const activeProjects = await Project_1.default.countDocuments({ status: 'Ongoing' });
        const totalLeads = await Lead_1.default.countDocuments();
        const monthlyLeads = await Lead_1.default.countDocuments({ createdAt: { $gte: startOfMonth } });
        const whatsappClicks = await Lead_1.default.countDocuments({ source: 'WhatsApp' });
        const siteVisitRequests = await Lead_1.default.countDocuments({ source: 'Site Visit' });
        const projectPerformance = await Lead_1.default.aggregate([
            { $group: { _id: '$interestedProject', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);
        const monthlyBreakdown = await Lead_1.default.aggregate([
            { $match: { createdAt: { $gte: startOfYear } } },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    leads: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyLeadsChart = monthNames.map((month, i) => {
            const found = monthlyBreakdown.find((m) => m._id === i + 1);
            return { month, leads: found ? found.leads : 0 };
        });
        const sourceBreakdown = await Lead_1.default.aggregate([
            { $group: { _id: '$source', count: { $sum: 1 } } },
        ]);
        const totalSourceCount = sourceBreakdown.reduce((sum, s) => sum + s.count, 0);
        const leadSources = sourceBreakdown.map((s) => ({
            name: s._id || 'Unknown',
            value: totalSourceCount > 0 ? Math.round((s.count / totalSourceCount) * 100) : 0,
        }));
        res.json({
            success: true,
            data: {
                totalProjects,
                activeProjects,
                totalLeads,
                monthlyLeads,
                whatsappClicks,
                siteVisitRequests,
                projectPerformance: projectPerformance.map((p) => ({
                    name: p._id || 'Unknown',
                    leads: p.count,
                    visits: 0,
                })),
                monthlyLeadsChart,
                leadSources,
            },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=analytics.js.map