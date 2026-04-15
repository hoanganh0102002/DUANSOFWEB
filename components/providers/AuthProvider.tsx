"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  username: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  role?: string;
  token?: string;
}

interface AuthContextValue {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem("sof_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user", e);
        localStorage.removeItem("sof_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (u: User) => {
    setUser(u);
    localStorage.setItem("sof_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sof_user");
  };

  // TỰ ĐỘNG KIỂM TRA TRẠNG THÁI TÀI KHOẢN (KICK-OUT LOGIC) - ĐÃ TỐI ƯU CACHING
  useEffect(() => {
    if (user?.email && !isLoading) {
      const checkAccountStatus = async () => {
        try {
          // KIỂM TRA CACHING ĐỂ TĂNG TỐC: Chỉ check thực sự 5 phút một lần
          const lastCheck = sessionStorage.getItem("last_auth_check");
          const now = Date.now();
          if (lastCheck && now - parseInt(lastCheck) < 5 * 60 * 1000) {
            return; // Chưa quá 5 phút, bỏ qua không gọi API để web mượt hơn
          }

          const res = await fetch("/api/admin/users/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              email: user.email, 
              name: user.name, 
              provider: (user as any).provider || 'google' 
            })
          });
          
          const data = await res.json();
          
          if (!data.success) {
            logout();
            alert(data.message || "Tài khoản của bạn đã bị khóa.");
            window.location.href = "/login";
          } else {
            // Lưu lại thời điểm check thành công
            sessionStorage.setItem("last_auth_check", now.toString());
          }
        } catch (e) {
          console.error("[Auth] Failed to check status", e);
        }
      };

      checkAccountStatus();
    }
  }, [user?.email, isLoading]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
