"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import AdminSidebar from "@/components/shared/AdminSidebar";
import {
  Building2,
  Activity,
  Users,
  TrendingUp,
  LogOut,
  Plus,
  Eye,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const stats = [
  { icon: Building2, label: "Total Projects", value: "6", color: "from-blue-500 to-blue-600" },
  { icon: Activity, label: "Active Projects", value: "4", color: "from-emerald-500 to-emerald-600" },
  { icon: Users, label: "Total Leads", value: "24", color: "from-accent to-accent-dark" },
  { icon: TrendingUp, label: "Monthly Leads", value: "8", color: "from-purple-500 to-purple-600" },
];

const recentLeads = [
  { name: "Rajesh Kumar", project: "Vaagdevi Heights", date: "2026-06-05", status: "New" },
  { name: "Priya Sharma", project: "Gold Crest Towers", date: "2026-06-04", status: "Contacted" },
  { name: "Amit Verma", project: "Green Valley Plots", date: "2026-06-03", status: "Qualified" },
  { name: "Sneha Reddy", project: "Vaagdevi Tech Park", date: "2026-06-02", status: "New" },
  { name: "Vikram Singh", project: "Royal Residency", date: "2026-06-01", status: "Converted" },
];

const statusColors: Record<string, string> = {
  New: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Contacted: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Qualified: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Converted: "bg-accent/20 text-accent border-accent/30",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function AdminDashboard() {
  const { isAuthenticated, loading } = useAdminAuth();
  if (loading) return null;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      <AdminSidebar />

      {/* Main Content */}
      <div className="md:ml-64 min-h-screen">
        {/* Top Navbar */}
        <div className="sticky top-0 z-30 bg-secondary/80 backdrop-blur-lg border-b border-accent/10 px-6 py-4 flex items-center justify-between">
          <h1 className="text-white/70 text-sm font-medium">
            Welcome, <span className="text-white font-semibold">Admin</span>
          </h1>
          <Link
            href="/admin"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-red-400 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            Logout
          </Link>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-8">
          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="relative overflow-hidden bg-secondary/60 border border-accent/10 rounded-xl p-5 group hover:border-accent/30 transition-all duration-500"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn(
                      "w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center",
                      stat.color
                    )}>
                      <Icon size={22} className="text-white" />
                    </div>
                    <span className="text-3xl font-bold text-white font-[family-name:var(--font-display)]">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm font-medium">{stat.label}</p>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Recent Leads Table */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-secondary/60 border border-accent/10 rounded-xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-accent/10 flex items-center justify-between">
              <h2 className="text-white font-semibold">Recent Leads</h2>
              <Link
                href="/admin/leads"
                className="text-accent text-sm hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-accent/5">
                    <th className="text-left px-6 py-3 text-white/40 font-medium">Name</th>
                    <th className="text-left px-6 py-3 text-white/40 font-medium">Project</th>
                    <th className="text-left px-6 py-3 text-white/40 font-medium">Date</th>
                    <th className="text-left px-6 py-3 text-white/40 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead, i) => (
                    <motion.tr
                      key={lead.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
                      className="border-b border-accent/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-white font-medium">{lead.name}</td>
                      <td className="px-6 py-4 text-white/60">{lead.project}</td>
                      <td className="px-6 py-4 text-white/40">{lead.date}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-block px-3 py-1 rounded-full text-xs font-semibold border",
                          statusColors[lead.status]
                        )}>
                          {lead.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <Link
              href="/admin/projects"
              className="flex items-center gap-3 p-4 bg-secondary/60 border border-accent/10 rounded-xl hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <Plus size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Add Project</p>
                <p className="text-white/40 text-xs">Create a new project</p>
              </div>
            </Link>
            <Link
              href="/admin/leads"
              className="flex items-center gap-3 p-4 bg-secondary/60 border border-accent/10 rounded-xl hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <Eye size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">View Leads</p>
                <p className="text-white/40 text-xs">Manage inquiries</p>
              </div>
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-3 p-4 bg-secondary/60 border border-accent/10 rounded-xl hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <BarChart3 size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Analytics</p>
                <p className="text-white/40 text-xs">View reports</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
