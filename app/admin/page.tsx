"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  Phone, Mail, MapPin, Send, MessageSquare, 
  CheckCircle2, ChevronRight, Globe, ShieldCheck ,ChevronDown, 
  Check, Clock, MessageCircle, HelpCircle, Video, FileText,
  AlertCircle, Loader2, X, Sparkles, LayoutDashboard, LogOut, RefreshCw, Search,
  Users, Trash2, TrendingUp, Calendar, XCircle, Shield
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

// Types
interface ContactRequest {
  id: number;
  full_name: string;
  phone: string;
  email: string | null;
  services: string;
  message: string | null;
  status: "pending" | "contacted" | "completed" | "cancelled";
  email_sent: number;
  created_at: string;
  updated_at: string;
}

interface AdminUser {
  username: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

const STATUS_CONFIG = {
  pending: { label: "Chờ xử lý", color: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: Clock, dotColor: "bg-amber-400" },
  contacted: { label: "Đã liên hệ", color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: Phone, dotColor: "bg-blue-400" },
  completed: { label: "Hoàn thành", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: CheckCircle2, dotColor: "bg-emerald-400" },
  cancelled: { label: "Đã hủy", color: "bg-red-500/10 text-red-400 border-red-500/20", icon: XCircle, dotColor: "bg-red-400" },
};

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "contacts" | "users" | "trash">("overview");
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [trashData, setTrashData] = useState<{ contacts: any[], users: any[] }>({ contacts: [], users: [] });
  const [statsData, setStatsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedContact, setSelectedContact] = useState<ContactRequest | null>(null);
  const [isUpdating, setIsUpdating] = useState<number | null>(null);
  

  const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; type: 'contact' | 'user' } | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  // Auth check
  useEffect(() => {
    const stored = localStorage.getItem("sof_admin");
    if (!stored) {
      router.push("/admin/login");
      return;
    }
    try {
      setAdmin(JSON.parse(stored));
    } catch {
      localStorage.removeItem("sof_admin");
      router.push("/admin/login");
    }
  }, [router]);

  // Load data
  const loadContacts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/contacts");
      const data = await res.json();
      if (data.success) setContacts(data.data || []);
    } catch (e) {
      console.error("Failed to load contacts:", e);
    }
  }, []);

  const loadUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) setUsers(data.data || []);
    } catch (e) {
      console.error("Failed to load users:", e);
    }
  }, []);

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) setStatsData(data.data);
    } catch (e) {
      console.error("Failed to load stats:", e);
    }
  }, []);

  const loadTrash = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/trash");
      const data = await res.json();
      if (data.success) setTrashData(data.data);
    } catch (e) {
      console.error("Failed to load trash:", e);
    }
  }, []);

  useEffect(() => {
    if (!admin) return;
    setIsLoading(true);
    const promises = [loadContacts(), loadUsers(), loadStats()];
    if (activeTab === "trash") promises.push(loadTrash());
    Promise.all(promises).finally(() => setIsLoading(false));
  }, [admin, activeTab, loadContacts, loadUsers, loadStats, loadTrash]);

  // Actions
  const handleLogout = () => {
    localStorage.removeItem("sof_admin");
    router.push("/admin/login");
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    setIsUpdating(id);
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus as any } : c));
        if (selectedContact?.id === id) {
          setSelectedContact(prev => prev ? { ...prev, status: newStatus as any } : null);
        }
        loadStats(); // Refresh stats on update
      }
    } catch (e) {
      console.error("Failed to update:", e);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: number, type: 'contact' | 'user') => {
    // Chỉ là bước mở Modal xác nhận
    setDeleteConfirm({ id, type });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    const { id, type } = deleteConfirm;
    
    setIsDeleting(id);
    const toastId = toast.loading("Đang đưa vào thùng rác...");
    setDeleteConfirm(null); // Đóng modal ngay

    try {
      const res = await fetch(`/api/admin/delete?id=${id}&type=${type}`, {
        method: "DELETE",
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success("Đã đưa vào thùng rác!", { id: toastId });
        if (type === 'contact') {
          setContacts(prev => prev.filter(c => c.id !== id));
          if (selectedContact?.id === id) setSelectedContact(null);
        } else {
          setUsers(prev => prev.filter(u => u.id !== id));
        }
        loadStats();
        loadTrash(); // Cập nhật ngay thùng rác sau khi xóa
      } else {
        console.error("Delete failed:", data.message);
        toast.error("Lỗi: " + data.message, { id: toastId });
      }
    } catch (e) {
      console.error("Failed to delete:", e);
      toast.error("Không thể kết nối máy chủ để xóa", { id: toastId });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleRestore = async (id: number, type: 'contact' | 'user') => {
    const toastId = toast.loading("Đang khôi phục dữ liệu...");
    try {
      const res = await fetch("/api/admin/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Đã khôi phục dữ liệu thành công!", { id: toastId });
        loadTrash();
        loadContacts();
        loadUsers();
        loadStats();
      } else {
        toast.error("Lỗi: " + data.message, { id: toastId });
      }
    } catch (e) {
      toast.error("Lỗi kết nối", { id: toastId });
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await Promise.all([loadContacts(), loadUsers(), loadStats()]);
    setIsLoading(false);
  };

  // LOGIC LỌC DỮ LIỆU THÔNG MINH
  const filteredContacts = contacts.filter(c => {
    const matchesSearch = 
      (c.full_name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (c.phone || "").includes(searchQuery) ||
      (c.email?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredUsers = users.filter(u => 
    (u.full_name?.toLowerCase() || u.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (u.email?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const filteredTrashContacts = trashData.contacts.filter(c => 
    (c.full_name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (c.phone || "").includes(searchQuery) ||
    (c.email?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const filteredTrashUsers = trashData.users.filter(u => 
    (u.full_name?.toLowerCase() || u.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (u.email?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );


  // Stats
  const contactStats = {
    total: contacts.length,
    pending: contacts.filter(c => c.status === "pending").length,
    contacted: contacts.filter(c => c.status === "contacted").length,
    completed: contacts.filter(c =>    c.status === "completed").length,
  };

  const parseServices = (json: string): string[] => {
    try { return JSON.parse(json); }
    catch { return [json]; }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const timeAgo = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return `Vừa xong`;
    if (mins < 60) return `${mins} phút trước`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} giờ trước`;
    return `${Math.floor(hours / 24)} ngày trước`;
  };

  if (!admin) return null;

  return (
    <div className="min-h-screen flex" style={{ background: "#0c1222" }}>
      {/* SIDEBAR */}
      <aside className="w-[260px] bg-[#0f1729] border-r border-white/[0.06] flex flex-col fixed h-full z-30">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-[15px] font-black text-white tracking-tight">SOF Admin</h1>
              <p className="text-[11px] text-blue-300/40 font-medium">Bảng điều khiển</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "overview"
                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                : "text-blue-200/40 hover:text-blue-200/70 hover:bg-white/[0.03]"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Tổng quan
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "contacts"
                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                : "text-blue-200/40 hover:text-blue-200/70 hover:bg-white/[0.03]"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Yêu cầu tư vấn
            {contactStats.pending > 0 && (
              <span className="ml-auto bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center">
                {contactStats.pending}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "users"
                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                : "text-blue-200/40 hover:text-blue-200/70 hover:bg-white/[0.03]"
            }`}
          >
            <Users className="w-5 h-5" />
            Quản lý Users
          </button>
          <button
            onClick={() => setActiveTab("trash")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "trash"
                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                : "text-blue-200/40 hover:text-red-200/70 hover:bg-white/[0.03]"
            }`}
          >
            <Trash2 className="w-5 h-5" />
            Thùng rác
          </button>
        </nav>

        {/* Admin Profile */}
        <div className="px-4 pb-4">
          <div className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{admin.name}</p>
                <p className="text-[11px] text-blue-300/40 truncate">{admin.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg px-3 py-2 text-xs font-bold hover:bg-red-500/20 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              Đăng xuất
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-[260px] min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-[#0c1222]/80 backdrop-blur-xl border-b border-white/[0.06] px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-white">
                {activeTab === "overview" ? "Tổng quan Hệ thống" : activeTab === "contacts" ? "Quản lý Yêu cầu Tư vấn" : "Quản lý Người dùng"}
              </h2>
              <p className="text-sm text-blue-200/40 mt-0.5">
                {activeTab === "overview" 
                  ? "Báo cáo thống kê truy cập và quan tâm sản phẩm"
                  : activeTab === "contacts"
                    ? `${contacts.length} yêu cầu • ${contactStats.pending} chờ xử lý`
                    : `${users.length} người dùng đã đăng ký`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm font-semibold text-blue-200/60 hover:text-blue-200 hover:bg-white/[0.08] transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                Làm mới
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {/* CHIẾN DỊCH TÌM KIẾM TOÀN CẦU (HIỆN TRÊN MỌI TAB TRỪ OVERVIEW) */}
          {activeTab !== "overview" && (
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/30 group-focus-within:text-blue-400 transition-colors" />
                <input
                  placeholder={
                    activeTab === "users" ? "Tìm theo tên hoặc email người dùng..." : 
                    activeTab === "trash" ? "Tìm trong thùng rác..." :
                    "Tìm theo tên, SĐT hoặc email yêu cầu tư vấn..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm placeholder:text-blue-200/25 focus:border-blue-400/30 outline-none transition-all shadow-inner"
                />
              </div>
              
              {activeTab === "contacts" && (
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-12 pl-4 pr-10 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm appearance-none cursor-pointer focus:border-blue-400/30 outline-none min-w-[180px]"
                    style={{ colorScheme: "dark" }}
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="pending">Chờ xử lý</option>
                    <option value="contacted">Đã liên hệ</option>
                    <option value="completed">Hoàn thành</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300/40 pointer-events-none" />
                </div>
              )}
            </div>
          )}

          {/* Dashboard Overview Content */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-500">
               {/* Stats Cards Row */}
               <div className="grid grid-cols-4 gap-4">
                  <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                      <Users className="w-12 h-12 text-blue-400" />
                    </div>
                    <p className="text-xs font-bold text-blue-200/40 uppercase tracking-widest mb-1">Người dùng</p>
                    <h3 className="text-4xl font-black text-white">{statsData?.users?.total || 0}</h3>
                    <div className="mt-4 flex items-center gap-2">
                       <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">+12%</span>
                       <span className="text-[11px] text-blue-200/30">so với tháng trước</span>
                    </div>
                  </div>

                  <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                      <TrendingUp className="w-12 h-12 text-cyan-400" />
                    </div>
                    <p className="text-xs font-bold text-blue-200/40 uppercase tracking-widest mb-1">Lượt truy cập</p>
                    <h3 className="text-4xl font-black text-white">{statsData?.traffic?.total || 0}</h3>
                    <div className="mt-4 flex items-center gap-2">
                       <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">+5.4%</span>
                       <span className="text-[11px] text-blue-200/30">tăng trưởng hôm nay</span>
                    </div>
                  </div>

                  <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group border-l-4 border-l-blue-500">
                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                      <MessageSquare className="w-12 h-12 text-blue-500" />
                    </div>
                    <p className="text-xs font-bold text-blue-200/40 uppercase tracking-widest mb-1">Yêu cầu Phần mềm</p>
                    <h3 className="text-4xl font-black text-white">{statsData?.products?.software || 0}</h3>
                    <div className="mt-4 flex items-center gap-2 text-blue-200/30 text-[11px]">
                       Chiếm tỷ lệ {Math.round((statsData?.products?.software / (statsData?.products?.software + statsData?.products?.hardware || 1)) * 100)}%
                    </div>
                  </div>

                  <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group border-l-4 border-l-purple-500">
                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                      <Shield className="w-12 h-12 text-purple-500" />
                    </div>
                    <p className="text-xs font-bold text-blue-200/40 uppercase tracking-widest mb-1">Yêu cầu Phần cứng</p>
                    <h3 className="text-4xl font-black text-white">{statsData?.products?.hardware || 0}</h3>
                    <div className="mt-4 flex items-center gap-2 text-blue-200/30 text-[11px]">
                       Chiếm tỷ lệ {Math.round((statsData?.products?.hardware / (statsData?.products?.software + statsData?.products?.hardware || 1)) * 100)}%
                    </div>
                  </div>
               </div>

               {/* Charts Row */}
               <div className="grid grid-cols-12 gap-6">
                  {/* Access Chart (8 columns) */}
                  <div className="col-span-8 bg-[#0f1729] border border-white/10 rounded-3xl p-8 shadow-2xl">
                     <div className="flex items-center justify-between mb-8">
                        <div>
                           <h4 className="text-lg font-bold text-white uppercase tracking-tight">Xu hướng truy cập hệ thống</h4>
                           <p className="text-xs text-blue-200/30 mt-1">Dữ liệu 7 ngày gần nhất</p>
                        </div>
                        <div className="flex gap-4">
                           <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-blue-500" />
                              <span className="text-[11px] text-blue-200/60 font-bold uppercase">Lượt xem</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-cyan-400" />
                              <span className="text-[11px] text-blue-200/60 font-bold uppercase">Người dùng</span>
                           </div>
                        </div>
                     </div>
                     
                     <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                           <AreaChart data={statsData?.traffic?.timeline}>
                              <defs>
                                 <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                 </linearGradient>
                                 <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                                 </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                              <XAxis 
                                 dataKey="name" 
                                 axisLine={false} 
                                 tickLine={false} 
                                 tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 'bold'}} 
                                 dy={10}
                              />
                              <YAxis hide={true} domain={['auto', 'auto']} />
                              <Tooltip 
                                 contentStyle={{
                                    backgroundColor: 'rgba(15, 23, 41, 0.9)', 
                                    border: '1px solid rgba(59, 130, 246, 0.3)', 
                                    borderRadius: '16px', 
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                    color: '#fff'
                                 }}
                                 itemStyle={{fontSize: '12px', fontWeight: 'bold', padding: '2px 0'}}
                                 cursor={{stroke: 'rgba(59, 130, 246, 0.2)', strokeWidth: 2}}
                              />
                              <Area 
                                 type="monotone" 
                                 dataKey="visits" 
                                 stroke="#3b82f6" 
                                 strokeWidth={4} 
                                 fillOpacity={1} 
                                 fill="url(#colorVisits)" 
                                 activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2, fill: '#3b82f6' }}
                              />
                              <Area 
                                 type="monotone" 
                                 dataKey="users" 
                                 stroke="#00f2ff" 
                                 strokeWidth={4} 
                                 fillOpacity={1} 
                                 fill="url(#colorUsers)" 
                                 activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2, fill: '#00f2ff' }}
                              />
                           </AreaChart>
                        </ResponsiveContainer>
                     </div>
                  </div>

                  {/* Product Pie (4 columns) */}
                  <div className="col-span-4 bg-[#0f1729] border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center relative">
                     <div className="absolute top-6 left-8">
                        <h4 className="text-lg font-bold text-white uppercase tracking-tight">Tỷ lệ quan tâm</h4>
                        <p className="text-xs text-blue-200/30 mt-1">Phần mềm vs Phần cứng</p>
                     </div>
                     
                     <div className="h-[250px] w-full mt-12 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                           <PieChart>
                              <Pie
                                data={[
                                  { name: 'Phần mềm', value: statsData?.products?.software || 1 },
                                  { name: 'Phần cứng', value: statsData?.products?.hardware || 1 },
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                 <Cell fill="#3b82f6" stroke="none" />
                                 <Cell fill="#a855f7" stroke="none" />
                              </Pie>
                              <Tooltip />
                           </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute flex flex-col items-center">
                           <p className="text-[11px] font-bold text-blue-200/40 uppercase tracking-widest">Sản phẩm</p>
                           <p className="text-2xl font-black text-white">{statsData ? (statsData.products?.software + statsData.products?.hardware) : 0}</p>
                        </div>
                     </div>

                     <div className="w-full space-y-3 mt-4">
                        <div className="flex items-center justify-between p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-blue-500" />
                              <span className="text-xs font-bold text-blue-200/70">Phần mềm</span>
                           </div>
                           <span className="text-sm font-black text-white">{statsData?.products?.software || 0}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-500/5 rounded-xl border border-purple-500/10">
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-purple-500" />
                              <span className="text-xs font-bold text-blue-200/70">Phần cứng</span>
                           </div>
                           <span className="text-sm font-black text-white">{statsData?.products?.hardware || 0}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === "contacts" && (
            <>
               <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Tổng yêu cầu", value: contactStats.total, icon: MessageSquare, color: "from-blue-500/20 to-blue-600/10", textColor: "text-blue-400", borderColor: "border-blue-500/20" },
                  { label: "Chờ xử lý", value: contactStats.pending, icon: Clock, color: "from-amber-500/20 to-amber-600/10", textColor: "text-amber-400", borderColor: "border-amber-500/20" },
                  { label: "Đã liên hệ", value: contactStats.contacted, icon: Phone, color: "from-cyan-500/20 to-cyan-600/10", textColor: "text-cyan-400", borderColor: "border-cyan-500/20" },
                  { label: "Hoàn thành", value: contactStats.completed, icon: CheckCircle2, color: "from-emerald-500/20 to-emerald-600/10", textColor: "text-emerald-400", borderColor: "border-emerald-500/20" },
                ].map((stat, i) => (
                  <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-2xl border ${stat.borderColor} p-5 relative overflow-hidden`}>
                    <div className="flex items-center justify-between mb-3">
                      <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
                    </div>
                    <p className={`text-3xl font-black ${stat.textColor}`}>{stat.value}</p>
                    <p className="text-[13px] text-blue-200/40 font-medium mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>




              {/* Contact List */}
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="text-center py-20">
                  <MessageSquare className="w-12 h-12 text-blue-300/20 mx-auto mb-4" />
                  <p className="text-blue-200/40 font-medium">Không có yêu cầu tư vấn nào</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredContacts.map((contact) => {
                    const statusInfo = STATUS_CONFIG[contact.status];
                    const services = parseServices(contact.services);
                    
                    return (
                      <div
                        key={contact.id}
                        className={`bg-white/[0.03] border rounded-2xl p-5 hover:bg-white/[0.05] transition-all cursor-pointer group ${
                          selectedContact?.id === contact.id ? "border-blue-500/30 bg-blue-500/[0.05]" : "border-white/[0.06]"
                        }`}
                        onClick={() => setSelectedContact(contact)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-[15px] font-bold text-white">{contact.full_name}</h3>
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${statusInfo.color}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotColor}`} />
                                {statusInfo.label}
                              </span>
                              <span className="text-[11px] text-blue-200/25">#{contact.id}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1.5 text-blue-200/50">
                                <Phone className="w-3.5 h-3.5" />
                                {contact.phone}
                              </span>
                              {contact.email && (
                                <span className="flex items-center gap-1.5 text-blue-200/50">
                                  <Mail className="w-3.5 h-3.5" />
                                  {contact.email}
                                </span>
                              )}
                              <span className="flex items-center gap-1.5 text-blue-200/30 text-xs">
                                <Clock className="w-3 h-3" />
                                {timeAgo(contact.created_at)}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {services.map((s, i) => (
                                <span key={i} className="px-2.5 py-1 bg-blue-500/8 border border-blue-500/15 rounded-lg text-[11px] text-blue-300/60 font-medium">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div 
                            className="flex items-center gap-2 relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"
                            onClick={(e) => e.stopPropagation()} // Chặn click vào dòng khi bấm nút
                          >
                            {contact.status === "pending" && (
                              <button
                                onClick={(e) => { e.stopPropagation(); handleStatusUpdate(contact.id, "contacted"); }}
                                disabled={isUpdating === contact.id}
                                className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2 text-blue-400 text-xs font-bold hover:bg-blue-500/20 transition-all"
                              >
                                {isUpdating === contact.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Phone className="w-3.5 h-3.5" />}
                                Đã liên hệ
                              </button>
                            )}
                            {contact.status === "contacted" && (
                              <button
                                onClick={(e) => { e.stopPropagation(); handleStatusUpdate(contact.id, "completed"); }}
                                disabled={isUpdating === contact.id}
                                className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all"
                              >
                                {isUpdating === contact.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                Hoàn thành
                              </button>
                            )}
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDelete(contact.id, 'contact'); }}
                              disabled={isDeleting === contact.id}
                              className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all disabled:opacity-50"
                            >
                              {isDeleting === contact.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <>
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-20">
                  <Users className="w-12 h-12 text-blue-300/20 mx-auto mb-4" />
                  <p className="text-blue-200/40 font-medium text-lg mb-2">Chưa có người dùng nào</p>
                  <p className="text-blue-200/25 text-sm">Người dùng đăng ký trên website sẽ xuất hiện ở đây</p>
                </div>
              ) : (
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden shadow-xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/[0.02] border-b border-white/[0.06]">
                        <th className="px-6 py-4 text-[11px] font-black text-blue-200/40 uppercase tracking-widest">Người dùng</th>
                        <th className="px-6 py-4 text-[11px] font-black text-blue-200/40 uppercase tracking-widest">Email</th>
                        <th className="px-6 py-4 text-[11px] font-black text-blue-200/40 uppercase tracking-widest">Nguồn</th>
                        <th className="px-6 py-4 text-[11px] font-black text-blue-200/40 uppercase tracking-widest">Quyền</th>
                        <th className="px-6 py-4 text-[11px] font-black text-blue-200/40 uppercase tracking-widest">Trạng thái</th>
                        <th className="px-6 py-4 text-[11px] font-black text-blue-200/40 uppercase tracking-widest">Đăng nhập cuối</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {filteredUsers.map((user: any, i: number) => {
                        const providerColors = {
                          google: "bg-red-500/10 text-red-400 border-red-500/20",
                          facebook: "bg-blue-600/10 text-blue-400 border-blue-600/20",
                          credentials: "bg-gray-500/10 text-gray-400 border-gray-500/20",
                          apple: "bg-white/10 text-white border-white/20"
                        };
                        
                        return (
                          <tr key={user.id || i} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                {user.avatar ? (
                                  <img 
                                    src={user.avatar} 
                                    alt={user.name} 
                                    className="w-10 h-10 rounded-xl object-cover border border-white/10 ring-2 ring-transparent group-hover:ring-blue-500/30 transition-all"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-white/10 flex items-center justify-center text-white font-bold text-sm">
                                    {(user.name || "U").charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <div>
                                  <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{user.name || "N/A"}</p>
                                  <p className="text-[11px] text-blue-200/30 font-medium">#{user.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-blue-100/70 font-medium">{user.email}</span>
                                {user.role === 'admin' && (
                                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${providerColors[user.provider as keyof typeof providerColors] || providerColors.credentials}`}>
                                {user.provider === 'google' && <Search className="w-3 h-3" />}
                                {user.provider === 'facebook' && <span className="w-3 h-3 flex items-center justify-center font-black">f</span>}
                                {user.provider}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`text-[12px] font-bold ${user.role === 'admin' ? "text-blue-400" : "text-blue-200/40"}`}>
                                {user.role === 'admin' ? "Quản trị viên" : "Thành viên"}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-bold ${
                                user.status === 1
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                  : "bg-red-500/10 text-red-400 border-red-500/20"
                              }`}>
                                <span className={`w-1 h-1 rounded-full ${user.status === 1 ? "bg-emerald-400" : "bg-red-400"}`} />
                                {user.status === 1 ? "Hoạt động" : "Bị chặn"}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col">
                                <span className="text-sm text-blue-200/40">{formatDate(user.last_login)}</span>
                                <span className="text-[11px] text-blue-200/20">{timeAgo(user.last_login)}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              {user.role !== 'admin' && (
                                <button
                                  onClick={() => handleDelete(user.id, 'user')}
                                  disabled={isDeleting === user.id}
                                  className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20 disabled:opacity-50"
                                >
                                  {isDeleting === user.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* Trash Tab */}
          {activeTab === "trash" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Deleted Contacts section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Yêu cầu tư vấn đã xóa</h3>
                </div>
                {trashData.contacts.length === 0 ? (
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-10 text-center">
                    <p className="text-blue-200/20 text-sm italic">Không có yêu cầu tư vấn nào trong thùng rác</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {filteredTrashContacts.map((contact) => (
                      <div key={contact.id} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 flex items-center justify-between group hover:bg-white/[0.05] transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 font-bold">
                            {contact.full_name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-white">{contact.full_name}</p>
                            <p className="text-xs text-blue-200/40">SĐT: {contact.phone} • Xóa lúc: {formatDate(contact.deleted_at)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRestore(contact.id, 'contact')}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all opacity-0 group-hover:opacity-100 duration-300 translate-x-2 group-hover:translate-x-0"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Khôi phục
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Deleted Users section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <Users className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Người dùng đã xóa</h3>
                </div>
                {trashData.users.length === 0 ? (
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-10 text-center">
                    <p className="text-blue-200/20 text-sm italic">Không có người dùng nào trong thùng rác</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {filteredTrashUsers.map((user) => (
                      <div key={user.id} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 flex items-center justify-between group hover:bg-white/[0.05] transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 font-bold">
                            {user.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="font-bold text-white">{user.name}</p>
                            <p className="text-xs text-blue-200/40">Email: {user.email} • Xóa lúc: {formatDate(user.deleted_at)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRestore(user.id, 'user')}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all opacity-0 group-hover:opacity-100 duration-300 translate-x-2 group-hover:translate-x-0"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Khôi phục
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* CONTACT DETAIL MODAL */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedContact(null)} />
          <div className="relative w-[500px] h-full bg-[#0f1729] border-l border-white/[0.08] shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="sticky top-0 bg-[#0f1729]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 py-5 flex items-center justify-between z-10">
              <div>
                <h3 className="text-lg font-bold text-white">Chi tiết yêu cầu</h3>
                <p className="text-xs text-blue-200/30 mt-0.5">#{selectedContact.id} • {formatDate(selectedContact.created_at)}</p>
              </div>
              <button onClick={() => setSelectedContact(null)} className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-blue-200/50" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div>
                <label className="text-xs font-bold text-blue-200/40 uppercase tracking-wider mb-3 block">Trạng thái</label>
                <div className="flex gap-2 flex-wrap">
                  {(Object.entries(STATUS_CONFIG) as [string, typeof STATUS_CONFIG.pending][]).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => handleStatusUpdate(selectedContact.id, key)}
                      disabled={isUpdating === selectedContact.id}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedContact.status === key
                          ? `${config.color} ring-2 ring-offset-1 ring-offset-[#0f1729]`
                          : "bg-white/[0.03] border-white/[0.08] text-blue-200/40 hover:bg-white/[0.06]"
                      }`}
                    >
                      <config.icon className="w-3.5 h-3.5" />
                      {config.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <label className="text-xs font-bold text-blue-200/40 uppercase tracking-wider mb-3 block">Thông tin khách hàng</label>
                <div className="space-y-3">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-white font-bold text-lg">
                      {selectedContact.full_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-white">{selectedContact.full_name}</p>
                      <p className="text-xs text-blue-200/40">Khách hàng</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-blue-400" />
                        <div>
                          <p className="text-xs text-blue-200/40 mb-0.5">Số điện thoại</p>
                          <a href={`tel:${selectedContact.phone}`} className="text-sm font-bold text-white hover:text-blue-400 transition-colors">
                            {selectedContact.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                    {selectedContact.email && (
                      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-emerald-400" />
                          <div>
                            <p className="text-xs text-blue-200/40 mb-0.5">Email</p>
                            <a href={`mailto:${selectedContact.email}`} className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">
                              {selectedContact.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <label className="text-xs font-bold text-blue-200/40 uppercase tracking-wider mb-3 block">Dịch vụ quan tâm</label>
                <div className="space-y-2">
                  {parseServices(selectedContact.services).map((s, i) => (
                    <div key={i} className="bg-blue-500/[0.06] border border-blue-500/15 rounded-xl px-4 py-3 text-sm text-blue-300 font-medium flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center text-[11px] font-bold text-blue-400">{i + 1}</span>
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Message */}
              {selectedContact.message && (
                <div>
                  <label className="text-xs font-bold text-blue-200/40 uppercase tracking-wider mb-3 block">Nội dung tin nhắn</label>
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 border-l-4 border-l-blue-500/40">
                    <p className="text-sm text-blue-100/70 leading-relaxed whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>
              )}

              {/* Email status */}
              <div>
                <label className="text-xs font-bold text-blue-200/40 uppercase tracking-wider mb-3 block">Email xác nhận</label>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                  selectedContact.email_sent
                    ? "bg-emerald-500/[0.06] border-emerald-500/20"
                    : "bg-white/[0.03] border-white/[0.06]"
                }`}>
                  {selectedContact.email_sent ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-emerald-400 font-medium">Đã gửi email xác nhận</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-blue-200/30" />
                      <span className="text-sm text-blue-200/30 font-medium">Chưa gửi email</span>
                    </>
                  )}
                </div>
              </div>

              {/* Timestamps */}
              <div className="border-t border-white/[0.06] pt-4">
                <div className="flex items-center gap-2 text-xs text-blue-200/25">
                  <Calendar className="w-3.5 h-3.5" />
                  Tạo lúc: {formatDate(selectedContact.created_at)}
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-200/25 mt-1">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Cập nhật: {formatDate(selectedContact.updated_at)}
                </div>
              </div>

              {/* Delete */}
              <button
                onClick={() => handleDelete(selectedContact.id, 'contact')}
                className="w-full flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm font-bold hover:bg-red-500/20 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Xóa yêu cầu này
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM DELETE CONFIRM MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-[#0f1729] border border-white/[0.1] rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 mx-auto">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">Xác nhận đưa vào thùng rác?</h3>
            <p className="text-blue-200/40 text-center text-sm mb-8 leading-relaxed">
              Bạn có chắc chắn muốn di chuyển bản ghi này vào thùng rác không? Bạn có thể khôi phục lại bất cứ lúc nào.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-xl text-white font-bold text-sm transition-all"
              >
                Hủy bỏ
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-xl text-white font-bold text-sm shadow-lg shadow-red-500/20 transition-all active:scale-95"
              >
                Đồng ý xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

