"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import AdminSidebar from "@/components/shared/AdminSidebar";
import {
  Building2,
  Activity,
  Users,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const COLORS = ["#081528", "#D4AF37", "#10b981", "#8b5cf6"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-secondary border border-accent/30 rounded-lg px-4 py-3 shadow-xl">
        <p className="text-white/70 text-xs mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface AnalyticsData {
  totalProjects: number;
  activeProjects: number;
  totalLeads: number;
  monthlyLeads: number;
  whatsappClicks: number;
  siteVisitRequests: number;
  monthlyLeadsChart: { month: string; leads: number }[];
  projectPerformance: { name: string; leads: number; visits: number }[];
  leadSources: { name: string; value: number }[];
}

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [fetching, setFetching] = useState(true);
  const { isAuthenticated, loading } = useAdminAuth();

  useEffect(() => {
    if (!isAuthenticated) return;
    const token = localStorage.getItem("admin_token");
    fetch(`${API_URL}/analytics`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setAnalytics(res.data);
      })
      .catch(() => {})
      .finally(() => setFetching(false));
  }, [isAuthenticated]);

  if (loading || fetching) return null;
  if (!isAuthenticated) return null;

  const stats = [
    { icon: Building2, label: "Total Projects", value: String(analytics?.totalProjects ?? 0), color: "from-blue-500 to-blue-600" },
    { icon: Activity, label: "Active Projects", value: String(analytics?.activeProjects ?? 0), color: "from-emerald-500 to-emerald-600" },
    { icon: Users, label: "Total Leads", value: String(analytics?.totalLeads ?? 0), color: "from-accent to-accent-dark" },
    { icon: MessageCircle, label: "WhatsApp Clicks", value: String(analytics?.whatsappClicks ?? 0), color: "from-green-500 to-green-600" },
    { icon: MapPin, label: "Site Visit Requests", value: String(analytics?.siteVisitRequests ?? 0), color: "from-purple-500 to-purple-600" },
  ];

  const monthlyLeads = analytics?.monthlyLeadsChart ?? [];
  const projectPerformance = analytics?.projectPerformance ?? [];
  const leadSources = analytics?.leadSources ?? [];

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <AdminSidebar />

      <div className="md:ml-64 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-secondary/80 backdrop-blur-lg border-b border-accent/10 px-6 py-4">
          <h1 className="text-xl font-semibold text-white font-[family-name:var(--font-display)]">
            Analytics
          </h1>
        </div>

        <div className="p-6 space-y-8">
          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="bg-secondary/60 border border-accent/10 rounded-xl p-4 hover:border-accent/30 transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center",
                      stat.color
                    )}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-white/50 text-xs font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Leads Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-secondary/60 border border-accent/10 rounded-xl p-6"
            >
              <h3 className="text-white font-semibold mb-6">Monthly Leads</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyLeads} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
                    <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="leads" radius={[4, 4, 0, 0]} maxBarSize={32}>
                      {monthlyLeads.map((_, i) => (
                        <Cell
                          key={i}
                          fill={i === monthlyLeads.length - 1 ? "#D4AF37" : "#081528"}
                          fillOpacity={0.8}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Project Performance Horizontal Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-secondary/60 border border-accent/10 rounded-xl p-6"
            >
              <h3 className="text-white font-semibold mb-6">Project Performance</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={projectPerformance}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis type="number" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      stroke="rgba(255,255,255,0.3)"
                      tick={{ fontSize: 11 }}
                      width={110}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="leads" name="Leads" fill="#081528" radius={[0, 4, 4, 0]} maxBarSize={16} />
                    <Bar dataKey="visits" name="Visits" fill="#D4AF37" radius={[0, 4, 4, 0]} maxBarSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Lead Sources Pie Chart */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-secondary/60 border border-accent/10 rounded-xl p-6 lg:col-span-2"
            >
              <h3 className="text-white font-semibold mb-6">Lead Sources</h3>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="h-64 w-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leadSources}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {leadSources.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-3">
                  {leadSources.map((source, i) => (
                    <div key={source.name} className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[i % COLORS.length] }}
                      />
                      <span className="text-white/70 text-sm">{source.name || "Unknown"}</span>
                      <span className="text-white font-semibold text-sm ml-auto">
                        {source.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
