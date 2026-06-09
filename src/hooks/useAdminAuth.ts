"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function useAdminAuth(requireAuth = true) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const userData = localStorage.getItem("admin_user");

    if (token && userData && userData !== "undefined") {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    } else if (requireAuth) {
      router.replace("/admin");
    }

    setLoading(false);
  }, [requireAuth, router]);

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
    setIsAuthenticated(true);
    setUser(user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("vaagdevi_admin");
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/admin";
  };

  return { isAuthenticated, loading, user, login, logout };
}
