"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Eye, EyeOff, Mail, Lock, Shield, ArrowRight,
  Loader2, AlertCircle, Sparkles
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if already logged in (from either admin login or main login)
  useEffect(() => {
    const admin = localStorage.getItem("sof_admin");
    if (admin) {
      router.push("/admin");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("sof_admin", JSON.stringify(data.data));
        router.push("/admin");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Không thể kết nối đến máy chủ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2847 30%, #132e52 60%, #0a1628 100%)" }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] bg-cyan-400/6 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[180px]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[460px] mx-4">
        {/* Top badge */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <img
              src="/hinhanh/favicon-96x96.png"
              alt="SOF Logo"
              className="w-8 h-8 object-contain bg-white rounded-lg p-1"
            />
            <span className="text-lg font-black text-white tracking-tight">SOF ADMIN</span>
          </div>
        </div>

        {/* Main card */}
        <div className="bg-white/[0.04] backdrop-blur-2xl rounded-[2rem] border border-white/[0.08] shadow-[0_32px_64px_rgba(0,0,0,0.4)] p-10 relative overflow-hidden">
          {/* Subtle gradient overlay at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600" />
          
          {/* Shield icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 border border-blue-400/20 flex items-center justify-center">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-[26px] font-black text-white mb-2 tracking-tight">
              Đăng nhập Quản trị
            </h1>
            <p className="text-blue-200/60 text-sm font-medium">
              Truy cập bảng điều khiển quản trị SOF
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-red-300 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-200/70 uppercase tracking-wider ml-1">Email</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/40 group-focus-within:text-blue-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  placeholder="admin@sof.com.vn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-13 pl-12 pr-5 bg-white/[0.06] border border-white/[0.08] rounded-xl text-white text-[15px] font-medium placeholder:text-blue-200/25 focus:border-blue-400/40 focus:bg-white/[0.08] focus:ring-2 focus:ring-blue-400/15 outline-none transition-all"
                  style={{ height: "52px" }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-200/70 uppercase tracking-wider ml-1">Mật khẩu</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/40 group-focus-within:text-blue-400 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 bg-white/[0.06] border border-white/[0.08] rounded-xl text-white text-[15px] font-bold placeholder:text-blue-200/25 focus:border-blue-400/40 focus:bg-white/[0.08] focus:ring-2 focus:ring-blue-400/15 outline-none transition-all"
                  style={{ height: "52px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300/40 hover:text-blue-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-[52px] rounded-xl font-bold text-[15px] flex items-center justify-center gap-3 transition-all mt-2 ${
                isLoading
                  ? "bg-blue-500/20 text-blue-300/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-400/30 active:scale-[0.98]"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang xác thực...
                </>
              ) : (
                <>
                  Đăng nhập
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
            <p className="text-blue-200/30 text-xs font-medium">
              SOF Solutions © 2024 • Bảng điều khiển quản trị
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
