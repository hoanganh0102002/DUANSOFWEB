"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, Activity, ShieldAlert, Mail, Ticket, 
  BarChart3, AlertTriangle, CheckCircle, Search, 
  Settings, Clock, Eye, Send, ArrowRight, Tag, Globe, TrendingUp
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

// MOCK DATA để demo các chức năng mới
const MOCK_ACTIVITY = [
  { id: 1, user: "Nguyen Van A", action: "Xem sản phẩm", detail: "Phần mềm Bãi xe", time: "10 phút trước", type: "view" },
  { id: 2, user: "Tran Thi B", action: "Đăng nhập", detail: "Từ Google", time: "30 phút trước", type: "auth" },
  { id: 3, user: "Le Van C", action: "Gửi liên hệ", detail: "Cần tư vấn ERP", time: "1 giờ trước", type: "contact" },
  { id: 4, user: "Hoang D", action: "Tải báo giá", detail: "Máy POS cầm tay", time: "2 giờ trước", type: "download" },
];

const MOCK_TICKETS = [
  { id: "#TK-001", user: "Công ty ABC", title: "Lỗi không in được bill", status: "pending", priority: "high", time: "Hôm nay 09:00" },
  { id: "#TK-002", user: "Cafe Phố", title: "Cần hướng dẫn đổi ca", status: "processing", priority: "medium", time: "Hôm qua 15:30" },
  { id: "#TK-003", user: "Nhà hàng 5 Sao", title: "Nâng cấp gói Pro", status: "resolved", priority: "low", time: "12/04/2026" },
];

const MOCK_CAMPAIGNS = [
  { id: 1, name: "Khuyến mãi Tháng 5", target: "Khách hàng cũ", sent: 1250, opened: 840, clicked: 320, status: "active" },
  { id: 2, name: "Ra mắt tính năng mới", target: "Doanh nghiệp ERP", sent: 450, opened: 310, clicked: 120, status: "completed" },
];

const heatmapData = [
  { name: 'T2', "0h-6h": 10, "6h-12h": 120, "12h-18h": 250, "18h-24h": 80 },
  { name: 'T3', "0h-6h": 15, "6h-12h": 130, "12h-18h": 220, "18h-24h": 90 },
  { name: 'T4', "0h-6h": 8,  "6h-12h": 140, "12h-18h": 270, "18h-24h": 110 },
  { name: 'T5', "0h-6h": 12, "6h-12h": 110, "12h-18h": 230, "18h-24h": 85 },
  { name: 'T6', "0h-6h": 20, "6h-12h": 150, "12h-18h": 290, "18h-24h": 150 },
  { name: 'T7', "0h-6h": 30, "6h-12h": 90,  "12h-18h": 150, "18h-24h": 200 },
  { name: 'CN', "0h-6h": 25, "6h-12h": 80,  "12h-18h": 130, "18h-24h": 180 },
];

export const AnalyticsDashboard = ({ data }: { data?: any }) => {
  const currentHeatmapData = data?.heatmap || heatmapData;
  const currentVisitors = data?.visitors || 12450;
  const currentForms = data?.forms || 1058;
  const currentConversionRate = data?.conversionRate || 8.5;

  return (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 bg-[#0f1729] rounded-2xl border border-white/10 p-6 shadow-2xl">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" /> Bản đồ nhiệt truy cập (Heatmap)
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentHeatmapData} stackOffset="sign">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#0f1729', borderColor: '#1e293b', color: '#fff'}} />
              <Bar dataKey="0h-6h" stackId="a" fill="#1e293b" />
              <Bar dataKey="6h-12h" stackId="a" fill="#3b82f6" opacity={0.6} />
              <Bar dataKey="12h-18h" stackId="a" fill="#3b82f6" />
              <Bar dataKey="18h-24h" stackId="a" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-[#0f1729] rounded-2xl border border-white/10 p-6 shadow-2xl flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" /> Tỷ lệ chuyển đổi
          </h3>
          <p className="text-sm text-slate-400 mb-6">Từ khách truy cập sang Lead</p>
          
          <div className="flex items-center justify-center w-40 h-40 rounded-full border-8 border-emerald-500/20 mx-auto relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-emerald-400">{currentConversionRate}%</span>
              <span className="text-xs text-slate-400">Tháng này</span>
            </div>
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-emerald-500 hover:text-emerald-400 transition-colors" strokeDasharray="264" strokeDashoffset="241" />
            </svg>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Khách truy cập:</span>
            <span className="text-white font-bold">{currentVisitors.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Form đã gửi:</span>
            <span className="text-white font-bold">{currentForms.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export const UserActivityLog = () => {
  const [activities, setActivities] = useState<any[]>(MOCK_ACTIVITY);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/admin/activities')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setActivities(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="flex gap-4 mb-6">
      <button 
        onClick={() => setFilterType('all')}
        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${filterType === 'all' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}>
        <Tag className="w-4 h-4" /> Tất cả khách hàng
      </button>
      <button 
        onClick={() => setFilterType('contact')}
        className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${filterType === 'contact' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}>
        <Mail className="w-4 h-4" /> Đã gửi form liên hệ
      </button>
      <button 
        onClick={() => setFilterType('view')}
        className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${filterType === 'view' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}>
        <Activity className="w-4 h-4" /> Đang tìm hiểu dịch vụ
      </button>
    </div>
    <div className="bg-[#0f1729] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/5 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-indigo-400" /> Dấu chân số (Digital Footprint)
        </h3>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Tìm theo user..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500/50" 
          />
        </div>
      </div>
      <div className="p-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Người dùng</th>
              <th className="p-4 font-semibold">Hoạt động</th>
              <th className="p-4 font-semibold">Chi tiết</th>
              <th className="p-4 font-semibold text-right">Thời gian</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">Đang tải lịch sử hoạt động...</td></tr>
            ) : activities
                  .filter(act => filterType === 'all' || act.type === filterType)
                  .filter(act => act.user.toLowerCase().includes(searchTerm.toLowerCase()) || act.action.toLowerCase().includes(searchTerm.toLowerCase()) || act.detail.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(act => (
              <tr key={act.id} className="hover:bg-white/[0.02] transition-colors cursor-pointer group">
                <td className="p-4 text-sm text-white font-medium flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    act.type === 'auth' ? 'bg-amber-500/20 text-amber-400' :
                    act.type === 'contact' ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-indigo-500/20 text-indigo-400'
                  }`}>
                    {act.user.charAt(0)}
                  </div>
                  {act.user}
                </td>
                <td className="p-4 text-sm text-blue-300">{act.action}</td>
                <td className="p-4 text-sm text-slate-300 max-w-[200px] truncate" title={act.detail}>{act.detail}</td>
                <td className="p-4 text-sm text-slate-500 text-right group-hover:text-slate-300 transition-colors">{act.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)};

export const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newCamp, setNewCamp] = useState({ name: '', target: 'Tất cả khách hàng' });

  const fetchCampaigns = () => {
    fetch('/api/admin/campaigns')
      .then(res => res.json())
      .then(data => {
        if (data.success) setCampaigns(data.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCamp.name) return;
    
    const res = await fetch('/api/admin/campaigns', {
      method: 'POST',
      body: JSON.stringify({ name: newCamp.name, target_group: newCamp.target })
    });
    
    if (res.ok) {
      setIsCreating(false);
      setNewCamp({ name: '', target: 'Tất cả khách hàng' });
      fetchCampaigns();
      alert("Chiến dịch đã được khởi tạo và đang trong hàng đợi gửi mail!");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-[#0f1729] p-6 rounded-2xl border border-white/10 shadow-2xl">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="w-6 h-6 text-pink-400" /> Tự động hóa Email & CRM
          </h3>
          <p className="text-sm text-slate-400 mt-1">Gửi email marketing hàng loạt theo phân khúc khách hàng</p>
        </div>
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-pink-500/20 transition-all flex items-center gap-2">
          <Send className="w-4 h-4" /> {isCreating ? "Hủy bỏ" : "Tạo chiến dịch mới"}
        </button>
      </div>

      {isCreating && (
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-pink-500/30 shadow-2xl animate-in slide-in-from-top duration-300">
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Tên chiến dịch</label>
              <input 
                type="text" 
                placeholder="Ví dụ: Khuyến mãi Hè 2026..."
                value={newCamp.name}
                onChange={e => setNewCamp({...newCamp, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Phân khúc đối tượng</label>
              <select 
                value={newCamp.target}
                onChange={e => setNewCamp({...newCamp, target: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500"
              >
                <option value="Tất cả khách hàng">Tất cả khách hàng</option>
                <option value="Đã gửi form">Đã gửi form liên hệ</option>
                <option value="Khách xem SP">Khách xem sản phẩm</option>
              </select>
            </div>
            <div className="md:col-span-3 flex justify-end">
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition-all">
                BẮT ĐẦU GỬI MAIL NGAY
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 text-center py-12 text-slate-500">Đang tải danh sách chiến dịch...</div>
        ) : campaigns.map(camp => (
          <div key={camp.id} className="bg-[#0f1729] p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-2 h-full ${camp.status === 'active' ? 'bg-emerald-500' : 'bg-slate-500'}`}></div>
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-bold text-white">{camp.name}</h4>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${camp.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>
                {camp.status === 'active' ? 'Đang chạy' : 'Đã xong'}
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-6 flex items-center gap-2">
              <Tag className="w-4 h-4" /> Đối tượng: <span className="text-white font-medium">{camp.target}</span>
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Đã gửi</p>
                <p className="text-xl font-black text-white">{camp.sent.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Mở thư</p>
                <p className="text-xl font-black text-pink-400">{(camp.open || 0).toLocaleString()}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Click Link</p>
                <p className="text-xl font-black text-blue-400">{(camp.click || 0).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export const TicketSystem = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">Đang chờ xử lý</p>
        <p className="text-3xl font-black text-amber-400">12</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">Đang xử lý</p>
        <p className="text-3xl font-black text-blue-400">5</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">Đã giải quyết</p>
        <p className="text-3xl font-black text-emerald-400">148</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-center">
        <button className="text-blue-400 font-bold hover:text-blue-300 transition-colors flex items-center gap-2">
          Xem tất cả <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>

    <div className="bg-[#0f1729] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/5 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Ticket className="w-5 h-5 text-amber-400" /> Quản lý Support Tickets
        </h3>
      </div>
      <div className="p-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Ticket ID</th>
              <th className="p-4 font-semibold">Khách hàng</th>
              <th className="p-4 font-semibold">Vấn đề</th>
              <th className="p-4 font-semibold">Mức độ</th>
              <th className="p-4 font-semibold">Trạng thái</th>
              <th className="p-4 font-semibold text-right">Cập nhật</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_TICKETS.map(tick => (
              <tr key={tick.id} className="hover:bg-white/[0.02] transition-colors cursor-pointer">
                <td className="p-4 text-sm text-slate-300 font-mono">{tick.id}</td>
                <td className="p-4 text-sm text-white font-medium">{tick.user}</td>
                <td className="p-4 text-sm text-blue-300">{tick.title}</td>
                <td className="p-4 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    tick.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    tick.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {tick.priority.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-sm">
                  <span className={`flex items-center gap-1.5 ${
                    tick.status === 'pending' ? 'text-amber-400' :
                    tick.status === 'processing' ? 'text-blue-400' :
                    'text-emerald-400'
                  }`}>
                    {tick.status === 'pending' ? <Clock className="w-4 h-4" /> :
                     tick.status === 'processing' ? <Settings className="w-4 h-4 animate-spin-slow" /> :
                     <CheckCircle className="w-4 h-4" />}
                    {tick.status === 'pending' ? 'Chờ xử lý' :
                     tick.status === 'processing' ? 'Đang xử lý' : 'Đã xong'}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-500 text-right">{tick.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export const SecurityDashboard = () => {
  const [data, setData] = useState<{ alerts: any[], stats: any }>({ alerts: [], stats: { blocked_ips_count: 0, failed_logins_24h: 0 } });
  const [loading, setLoading] = useState(true);

  const fetchSecurityData = () => {
    fetch('/api/admin/security')
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setData(res.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchSecurityData();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchSecurityData, 30000);
    return () => clearInterval(interval);
  }, []);

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return `Vừa xong`;
    if (mins < 60) return `${mins} phút trước`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} giờ trước`;
    return `${Math.floor(hours / 24)} ngày trước`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex items-start gap-4 shadow-2xl">
        <div className="w-12 h-12 bg-red-500/20 flex items-center justify-center rounded-xl flex-shrink-0">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-400 mb-1">Cảnh báo An ninh & Bất thường</h3>
          <p className="text-sm text-red-300/70 mb-4">Hệ thống đang tự động theo dõi và khóa các luồng truy cập đáng ngờ.</p>
          <div className="flex gap-4">
            <div className="bg-white/5 border border-red-500/10 p-3 rounded-xl min-w-[200px]">
              <p className="text-xs text-red-300/50 uppercase font-bold mb-1">IP bị khóa (Hiện tại)</p>
              <p className="text-2xl font-black text-white">{loading ? "..." : data.stats?.blocked_ips_count || 0}</p>
            </div>
            <div className="bg-white/5 border border-red-500/10 p-3 rounded-xl min-w-[200px]">
              <p className="text-xs text-red-300/50 uppercase font-bold mb-1">Login thất bại (24h)</p>
              <p className="text-2xl font-black text-white">{loading ? "..." : data.stats?.failed_logins_24h || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0f1729] rounded-2xl border border-white/10 p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" /> Nhật ký cảnh báo
          </h3>
          <button 
            onClick={fetchSecurityData}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Làm mới ngay
          </button>
        </div>
        
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-10 text-slate-500">Đang kiểm tra nhật ký...</div>
          ) : data.alerts.length === 0 ? (
            <div className="text-center py-10 text-slate-500">Hệ thống an toàn. Chưa có cảnh báo nào.</div>
          ) : data.alerts.map(alert => (
            <div key={alert.id} className={`bg-white/5 rounded-xl p-4 flex justify-between items-center border-l-4 ${
              alert.severity === 'critical' ? 'border-l-red-500' : 
              alert.severity === 'high' ? 'border-l-orange-500' : 'border-l-amber-500'
            }`}>
              <div>
                <p className="text-white font-bold text-sm">{alert.type}</p>
                <p className="text-slate-400 text-xs mt-1">{alert.message} (IP: {alert.ip_address})</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">{timeAgo(alert.created_at)}</span>
                <button className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {alert.severity === 'critical' ? 'Đã chặn IP' : 'Cảnh báo'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
