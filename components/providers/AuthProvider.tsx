"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  username: string;
  name?: string;
  email?: string;
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

  // TỰ ĐỘNG KIỂM TRA TRẠNG THÁI TÀI KHOẢN (KICK-OUT LOGIC)
  useEffect(() => {
    if (user?.email && !isLoading) {
      const checkAccountStatus = async () => {
        try {
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
          
          // Nếu API trả về thất bại (do đã bị xóa/khóa)
          if (!data.success) {
            console.warn("[Auth] Account is locked or deleted. Kicking out...");
            logout();
            // Hiển thị thông báo cho người dùng
            alert(data.message || "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.");
            window.location.href = "/"; // Đẩy về trang chủ
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
