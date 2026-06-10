"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/shared/AdminSidebar";
import { Loader2 } from "lucide-react";

function getAuthState() {
  if (typeof window === "undefined") return { token: null, user: null };
  try {
    const token = localStorage.getItem("admin_token");
    const userData = localStorage.getItem("admin_user");
    const user = token && userData && userData !== "undefined" ? JSON.parse(userData) : null;
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const initRef = useRef(false);

  const isLoginPage = pathname === "/admin";

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const { token, user } = getAuthState();

    if (isLoginPage && token && user) {
      router.replace("/admin/dashboard");
      return;
    }

    if (!isLoginPage && (!token || !user)) {
      router.replace("/admin");
      setReady(true);
      return;
    }

    setReady(true);
  }, [isLoginPage, router]);

  if (!ready && !isLoginPage) {
    return (
      <div className="min-h-screen w-full bg-[#1A1A1A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="text-accent animate-spin" />
          <p className="text-white/50 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex">
      <AdminSidebar />
      <div className="flex-1 md:ml-64 min-h-screen">
        {children}
      </div>
    </div>
  );
}
