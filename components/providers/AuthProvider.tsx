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

  // MAINTENANCE STATE
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [mainMessage, setMainMessage] = useState("");

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

  // CHECK MAINTENANCE LOOP
  useEffect(() => {
    const checkMaintenance = async () => {
      try {
        const res = await fetch("/api/maintenance");
        const data = await res.json();
        
        // Bỏ qua chặn nếu là Administrator đang đăng nhập
        const isAdmin = localStorage.getItem("sof_admin");

        if (data.maintenance && !isAdmin) {
          setIsMaintenance(true);
          setMainMessage(data.message);
          // KHÔNG logout user ở đây để khi tắt bảo trì, user vẫn đang đăng nhập!
        } else {
          setIsMaintenance(false);
        }
      } catch(e) {}
    };

    checkMaintenance();
    const iv = setInterval(checkMaintenance, 15000); // Check 15 giây / lần
    return () => clearInterval(iv);
  }, [user]);

  // TỰ ĐỘNG KIỂM TRA TRẠNG THÁI TÀI KHOẢN (KICK-OUT LOGIC) - ĐÃ TỐI ƯU CACHING
  useEffect(() => {
    if (user?.email && !isLoading && !isMaintenance) {
      const checkAccountStatus = async () => {
        try {
          const lastCheck = sessionStorage.getItem("last_auth_check");
          const now = Date.now();
          if (lastCheck && now - parseInt(lastCheck) < 5 * 60 * 1000) {
            return; 
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
            sessionStorage.setItem("last_auth_check", now.toString());
          }
        } catch (e) {
          console.error("[Auth] Failed to check status", e);
        }
      };

      checkAccountStatus();
    }
  }, [user?.email, isLoading, isMaintenance]);

  if (isMaintenance) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f9fc] p-6 text-center font-sans">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#0f426c] mb-4 tracking-tight">HỆ THỐNG ĐANG BẢO TRÌ</h1>
          <p className="text-[16px] text-[#507588] font-medium max-w-[500px] leading-relaxed mb-8">
            {mainMessage || 'Hệ thống đang được nâng cấp để mang lại trải nghiệm tốt nhất. Vui lòng quay lại sau 15-30 phút nữa.'}
          </p>
          <div className="text-[13px] font-bold text-blue-500 uppercase tracking-widest">
            Vui lòng chờ đợi...
          </div>
      </div>
    );
  }

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
