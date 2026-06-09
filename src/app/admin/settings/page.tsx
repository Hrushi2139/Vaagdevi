"use client";

import { useState } from "react";
import AdminSidebar from "@/components/shared/AdminSidebar";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Save } from "lucide-react";

export default function AdminSettings() {
  const [form, setForm] = useState({ siteName: "Vaagdevi Infra Projects", email: "info@vaagdeviinfra.com", phone: "+91 97009 25393" });
  const { isAuthenticated, loading } = useAdminAuth();
  if (loading) return null;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      <AdminSidebar />
      <div className="md:ml-64 min-h-screen">
        <div className="sticky top-0 z-30 bg-secondary/80 backdrop-blur-lg border-b border-accent/10 px-6 py-4">
          <h1 className="text-xl font-semibold text-white font-[family-name:var(--font-display)]">Settings</h1>
        </div>
        <div className="p-6 max-w-2xl">
          <div className="bg-secondary/60 border border-accent/10 rounded-xl p-6 space-y-5">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Site Name</label>
              <input value={form.siteName} onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent transition-all" />
            </div>
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent transition-all" />
            </div>
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent transition-all" />
            </div>
            <button className="gold-gradient text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 cursor-pointer">
              <Save size={16} /> Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
