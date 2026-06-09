import { Router, Response } from 'express';
import Project from '../models/Project';
import Lead from '../models/Lead';
import auth, { AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', auth, async (_req: AuthRequest, res: Response) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: 'Ongoing' });
    const totalLeads = await Lead.countDocuments();
    const monthlyLeads = await Lead.countDocuments({ createdAt: { $gte: startOfMonth } });
    const whatsappClicks = await Lead.countDocuments({ source: 'WhatsApp' });
    const siteVisitRequests = await Lead.countDocuments({ status: 'Site Visit' });

    const projectPerformance = await Lead.aggregate([
      { $group: { _id: '$interestedProject', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: {
        totalProjects,
        activeProjects,
        totalLeads,
        monthlyLeads,
        whatsappClicks,
        siteVisitRequests,
        projectPerformance,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;
