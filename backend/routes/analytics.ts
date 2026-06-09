import { Router, Response } from 'express';
import Project from '../models/Project';
import Lead from '../models/Lead';
import auth, { AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', auth, async (_req: AuthRequest, res: Response) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: 'Ongoing' });
    const totalLeads = await Lead.countDocuments();
    const monthlyLeads = await Lead.countDocuments({ createdAt: { $gte: startOfMonth } });
    const whatsappClicks = await Lead.countDocuments({ source: 'WhatsApp' });
    const siteVisitRequests = await Lead.countDocuments({ source: 'Site Visit' });

    const projectPerformance = await Lead.aggregate([
      { $group: { _id: '$interestedProject', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const monthlyBreakdown = await Lead.aggregate([
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

    const sourceBreakdown = await Lead.aggregate([
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
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;
