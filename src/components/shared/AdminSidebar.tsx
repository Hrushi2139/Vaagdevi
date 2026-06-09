"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Users,
  Star,
  Image,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: Building2 },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Gallery", href: "/admin/gallery", icon: Image },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout, user } = useAdminAuth();

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-secondary/80 backdrop-blur-lg p-2.5 rounded-lg border border-accent/20 text-white hover:bg-accent/20 transition-colors cursor-pointer"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 bg-secondary border-r border-accent/10 transition-transform duration-300",
          "hidden md:flex flex-col",
          mobileOpen ? "flex" : "hidden"
        )}
      >
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white/70 hover:text-accent transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 border-b border-accent/10">
          <Link href="/admin/dashboard" className="flex flex-col items-start">
            <span className="gold-text text-2xl font-bold tracking-[0.15em] font-[family-name:var(--font-display)] leading-none">
              VAAGDEVI
            </span>
            <span className="text-[10px] tracking-[0.3em] text-white/50 font-medium uppercase mt-1">
              Admin Panel
            </span>
          </Link>
          {user && (
            <p className="text-white/40 text-xs mt-3 truncate">{user.email}</p>
          )}
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 group",
                  isActive
                    ? "bg-accent/15 text-accent border border-accent/20"
                    : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                <Icon size={18} className={isActive ? "text-accent" : "text-white/40 group-hover:text-white/70"} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-accent/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 w-full cursor-pointer"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 z-50 h-full w-72 bg-secondary border-r border-accent/10 shadow-2xl flex flex-col md:hidden"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white/70 hover:text-accent transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-6 pb-6 border-b border-accent/10">
              <Link href="/admin/dashboard" className="flex flex-col items-start" onClick={() => setMobileOpen(false)}>
                <span className="gold-text text-2xl font-bold tracking-[0.15em] font-[family-name:var(--font-display)] leading-none">
                  VAAGDEVI
                </span>
                <span className="text-[10px] tracking-[0.3em] text-white/50 font-medium uppercase mt-1">
                  Admin Panel
                </span>
              </Link>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                      isActive
                        ? "bg-accent/15 text-accent border border-accent/20"
                        : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                    )}
                  >
                    <Icon size={18} className={isActive ? "text-accent" : "text-white/40"} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-accent/10">
              <button
                onClick={() => { setMobileOpen(false); logout(); }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 w-full cursor-pointer"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
