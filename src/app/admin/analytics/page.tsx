"use client";

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

const stats = [
  { icon: Building2, label: "Total Projects", value: "6", color: "from-blue-500 to-blue-600" },
  { icon: Activity, label: "Active Projects", value: "4", color: "from-emerald-500 to-emerald-600" },
  { icon: Users, label: "Total Leads", value: "24", color: "from-accent to-accent-dark" },
  { icon: MessageCircle, label: "WhatsApp Clicks", value: "87", color: "from-green-500 to-green-600" },
  { icon: MapPin, label: "Site Visit Requests", value: "32", color: "from-purple-500 to-purple-600" },
];

const monthlyLeads = [
  { month: "Jan", leads: 12 },
  { month: "Feb", leads: 18 },
  { month: "Mar", leads: 15 },
  { month: "Apr", leads: 22 },
  { month: "May", leads: 28 },
  { month: "Jun", leads: 24 },
  { month: "Jul", leads: 30 },
  { month: "Aug", leads: 26 },
  { month: "Sep", leads: 20 },
  { month: "Oct", leads: 16 },
  { month: "Nov", leads: 14 },
  { month: "Dec", leads: 19 },
];

const projectPerformance = [
  { name: "Vaagdevi Heights", leads: 8, visits: 5 },
  { name: "Gold Crest Towers", leads: 6, visits: 4 },
  { name: "Vaagdevi Tech Park", leads: 4, visits: 3 },
  { name: "Green Valley Plots", leads: 10, visits: 7 },
  { name: "Royal Residency", leads: 3, visits: 2 },
  { name: "Vaagdevi Galleria", leads: 5, visits: 4 },
];

const leadSources = [
  { name: "Website", value: 45 },
  { name: "WhatsApp", value: 30 },
  { name: "Site Visit", value: 15 },
  { name: "Referral", value: 10 },
];

const COLORS = ["#0B3D91", "#D4A24C", "#10b981", "#8b5cf6"];

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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-secondary border border-accent/30 rounded-lg px-4 py-3 shadow-xl">
        <p className="text-white/70 text-xs mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminAnalytics() {
  const { isAuthenticated, loading } = useAdminAuth();
  if (loading) return null;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
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
                          fill={i === monthlyLeads.length - 1 ? "#D4A24C" : "#0B3D91"}
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
                    <Bar dataKey="leads" name="Leads" fill="#0B3D91" radius={[0, 4, 4, 0]} maxBarSize={16} />
                    <Bar dataKey="visits" name="Visits" fill="#D4A24C" radius={[0, 4, 4, 0]} maxBarSize={16} />
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
                      <span className="text-white/70 text-sm">{source.name}</span>
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
