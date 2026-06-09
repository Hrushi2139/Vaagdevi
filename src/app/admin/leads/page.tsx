"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import AdminSidebar from "@/components/shared/AdminSidebar";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import {
  Search,
  X,
  Phone,
  Mail,
  Calendar,
  FileText,
} from "lucide-react";

const leadsData = [
  { id: "1", name: "Rajesh Kumar", phone: "+91 98765 43210", email: "rajesh@email.com", project: "Vaagdevi Heights", date: "2026-06-05", status: "New", notes: "Interested in 3BHK, wants ground floor" },
  { id: "2", name: "Priya Sharma", phone: "+91 87654 32109", email: "priya@email.com", project: "Gold Crest Towers", date: "2026-06-04", status: "Contacted", notes: "Called, will visit this weekend" },
  { id: "3", name: "Amit Verma", phone: "+91 76543 21098", email: "amit@email.com", project: "Green Valley Plots", date: "2026-06-03", status: "Qualified", notes: "Budget 50L, interested in 200sqyd plot" },
  { id: "4", name: "Sneha Reddy", phone: "+91 65432 10987", email: "sneha@email.com", project: "Vaagdevi Tech Park", date: "2026-06-02", status: "New", notes: "Looking for commercial office space" },
  { id: "5", name: "Vikram Singh", phone: "+91 54321 09876", email: "vikram@email.com", project: "Royal Residency", date: "2026-06-01", status: "Converted", notes: "Booked 4BHK, payment done" },
  { id: "6", name: "Ananya Gupta", phone: "+91 43210 98765", email: "ananya@email.com", project: "Vaagdevi Heights", date: "2026-05-30", status: "Contacted", notes: "Comparing with other builders" },
  { id: "7", name: "Rahul Joshi", phone: "+91 32109 87654", email: "rahul@email.com", project: "Gold Crest Towers", date: "2026-05-28", status: "Qualified", notes: "Ready to book, needs loan assistance" },
  { id: "8", name: "Neha Patel", phone: "+91 21098 76543", email: "neha@email.com", project: "Green Valley Plots", date: "2026-05-25", status: "New", notes: "Wants corner plot, premium location" },
  { id: "9", name: "Deepak Kumar", phone: "+91 10987 65432", email: "deepak@email.com", project: "Vaagdevi Galleria", date: "2026-05-22", status: "Contacted", notes: "Interested in retail space" },
  { id: "10", name: "Kavita Sharma", phone: "+91 99887 76655", email: "kavita@email.com", project: "Vaagdevi Tech Park", date: "2026-05-20", status: "Converted", notes: "Leased 2 floors for IT company" },
];

const statusColors: Record<string, string> = {
  New: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Contacted: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Qualified: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Converted: "bg-accent/20 text-accent border-accent/30",
};

const statusOptions = ["New", "Contacted", "Qualified", "Converted"];

const statsRow = [
  { label: "Total Leads", value: "10" },
  { label: "New", value: "3", color: "text-blue-400" },
  { label: "Contacted", value: "3", color: "text-yellow-400" },
  { label: "Qualified", value: "2", color: "text-emerald-400" },
  { label: "Converted", value: "2", color: "text-accent" },
];

export default function AdminLeads() {
  const [leads, setLeads] = useState(leadsData);
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<typeof leadsData[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredLeads = useMemo(
    () =>
      leads.filter((l) => {
        const matchesSearch =
          l.name.toLowerCase().includes(search.toLowerCase()) ||
          l.email.toLowerCase().includes(search.toLowerCase()) ||
          l.phone.includes(search);
        const matchesStatus = statusFilter === "All" || l.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [leads, search, statusFilter]
  );

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { Total: leads.length };
    statusOptions.forEach((s) => {
      counts[s] = leads.filter((l) => l.status === s).length;
    });
    return counts;
  }, [leads]);

  const { isAuthenticated, loading } = useAdminAuth();
  if (loading) return null;
  if (!isAuthenticated) return null;

  const updateStatus = (id: string, newStatus: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    if (selectedLead?.id === id) {
      setSelectedLead((prev) => prev ? { ...prev, status: newStatus } : null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      <AdminSidebar />

      <div className="md:ml-64 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-secondary/80 backdrop-blur-lg border-b border-accent/10 px-6 py-4">
          <h1 className="text-xl font-semibold text-white font-[family-name:var(--font-display)]">
            Lead Management
          </h1>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-4"
          >
            {statsRow.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 px-4 py-3 bg-secondary/60 border border-accent/10 rounded-lg"
              >
                <span className="text-white/50 text-sm">{stat.label}</span>
                <span className={cn(
                  "text-lg font-bold font-[family-name:var(--font-display)]",
                  stat.color || "text-white"
                )}>
                  {stat.label === "Total Leads" ? statusCounts.Total : statusCounts[stat.label]}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email or phone..."
                className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["All", ...statusOptions].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-xs font-medium transition-all border cursor-pointer",
                    statusFilter === s
                      ? "bg-accent/20 text-accent border-accent/30"
                      : "text-white/50 border-white/10 hover:border-accent/30 hover:text-white/70"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Leads Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary/60 border border-accent/10 rounded-xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-accent/5">
                    <th className="text-left px-6 py-4 text-white/40 font-medium">Name</th>
                    <th className="text-left px-6 py-4 text-white/40 font-medium">Phone</th>
                    <th className="text-left px-6 py-4 text-white/40 font-medium">Email</th>
                    <th className="text-left px-6 py-4 text-white/40 font-medium">Project</th>
                    <th className="text-left px-6 py-4 text-white/40 font-medium">Date</th>
                    <th className="text-left px-6 py-4 text-white/40 font-medium">Status</th>
                    <th className="text-left px-6 py-4 text-white/40 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filteredLeads.map((lead, i) => (
                      <motion.tr
                        key={lead.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: i * 0.02, duration: 0.2 }}
                        className="border-b border-accent/5 hover:bg-white/5 transition-colors cursor-pointer"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <td className="px-6 py-4 text-white font-medium">{lead.name}</td>
                        <td className="px-6 py-4 text-white/60">{lead.phone}</td>
                        <td className="px-6 py-4 text-white/50">{lead.email}</td>
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
                        <td className="px-6 py-4">
                          <select
                            value={lead.status}
                            onChange={(e) => {
                              e.stopPropagation();
                              updateStatus(lead.id, e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="px-2 py-1 bg-white/5 border border-white/10 rounded text-white/70 text-xs focus:outline-none focus:border-accent cursor-pointer appearance-none"
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s} className="bg-secondary">{s}</option>
                            ))}
                          </select>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            {filteredLeads.length === 0 && (
              <div className="text-center py-12 text-white/30 text-sm">No leads found</div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-secondary border border-accent/20 rounded-xl p-6 max-w-lg w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white font-[family-name:var(--font-display)]">
                  Lead Details
                </h3>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
                    {selectedLead.name}
                  </p>
                  <span className={cn(
                    "inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold border",
                    statusColors[selectedLead.status]
                  )}>
                    {selectedLead.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white/60">
                    <Phone size={16} className="text-accent" />
                    <span>{selectedLead.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <Mail size={16} className="text-accent" />
                    <span>{selectedLead.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <Calendar size={16} className="text-accent" />
                    <span>{selectedLead.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <FileText size={16} className="text-accent" />
                    <span>{selectedLead.project}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Status</label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => updateStatus(selectedLead.id, e.target.value)}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all appearance-none cursor-pointer"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s} className="bg-secondary">{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Notes</label>
                  <textarea
                    value={selectedLead.notes}
                    onChange={(e) => {
                      setLeads((prev) =>
                        prev.map((l) =>
                          l.id === selectedLead.id ? { ...l, notes: e.target.value } : l
                        )
                      );
                      setSelectedLead((prev) => prev ? { ...prev, notes: e.target.value } : null);
                    }}
                    rows={4}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all resize-none"
                    placeholder="Add notes..."
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
