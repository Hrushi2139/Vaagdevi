"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function readAuthState(): { isAuthenticated: boolean; user: { email: string; name: string } | null } {
  if (typeof window === "undefined") return { isAuthenticated: false, user: null };
  try {
    const token = localStorage.getItem("admin_token");
    const userData = localStorage.getItem("admin_user");
    if (token && userData && userData !== "undefined") {
      return { isAuthenticated: true, user: JSON.parse(userData) };
    }
  } catch {}
  return { isAuthenticated: false, user: null };
}

export function useAdminAuth(requireAuth = true) {
  const router = useRouter();
  const [state, setState] = useState(() => readAuthState());
  const [loading, setLoading] = useState(false);
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (!state.isAuthenticated && requireAuth && !redirectedRef.current) {
      redirectedRef.current = true;
      router.replace("/admin");
    }
  }, [state.isAuthenticated, requireAuth, router]);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    const token = data.data?.token || data.token;
    const user = data.data?.user || data.user;
    localStorage.setItem("admin_token", token);
    localStorage.setItem("admin_user", JSON.stringify(user));
    setState({ isAuthenticated: true, user });
    return data;
  };

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("vaagdevi_admin");
    setState({ isAuthenticated: false, user: null });
    router.replace("/admin");
  }, [router]);

  return {
    isAuthenticated: state.isAuthenticated,
    loading,
    user: state.user,
    login,
    logout,
  };
}
