"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/FooterNextjs";
import BackgroundDecor from "@/components/BackgroundDecor";
import Link from "next/link";
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  LogOut, 
  History,
  ChevronRight,
  Package,
  Heart,
  MapPin,
  Save,
  Edit3,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("info");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmToast, setShowConfirmToast] = useState(false);
  
  // State cho Modal xác nhận
  const [modalConfig, setModalConfig] = useState<{
     show: boolean,
     title: string,
     message: string,
     type: 'save' | 'cancel'
  }>({
     show: false,
     title: "",
     message: "",
     type: 'save'
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const { user: authUser, isLoading: authLoading, login: updateAuth } = useAuth();

  useEffect(() => {
    if (authUser?.email) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || authUser.name || authUser.username || "",
        email: authUser.email
      }));
    }

    const fetchProfile = async () => {
      if (authLoading || !authUser?.email) return;

      try {
        const res = await fetch("/api/user/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: authUser.email })
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.data);
          setFormData({
            name: data.data.name || authUser?.name || authUser?.username || "",
            email: data.data.email || authUser?.email || "",
            phone: data.data.phone || "",
            address: data.data.address || ""
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [authUser?.email, authLoading]);

  // Hàm xử lý khi nhấn Lưu
  const handleSaveClick = () => {
    setModalConfig({
       show: true,
       title: "Xác nhận lưu thay đổi",
       message: "Bạn có chắc chắn muốn cập nhật toàn bộ thông tin hồ sơ mới này không?",
       type: 'save'
    });
  };

  // Hàm xử lý khi nhấn Hủy
  const handleCancelClick = () => {
    setModalConfig({
       show: true,
       title: "Hủy bỏ chỉnh sửa",
       message: "Các thông tin bạn vừa nhập sẽ không được lưu. Bạn có chắc chắn muốn hủy không?",
       type: 'cancel'
    });
  };

  const processConfirm = async () => {
    if (modalConfig.type === 'cancel') {
        setFormData({
           name: user?.name || authUser?.name || authUser?.username || "",
           email: user?.email || authUser?.email || "",
           phone: user?.phone || "",
           address: user?.address || ""
        });
        setIsEditing(false);
        setModalConfig(prev => ({ ...prev, show: false }));
        return;
    }

    // Xử lý LƯU THẬT
    setModalConfig(prev => ({ ...prev, show: false }));
    setIsUpdating(true);
    try {
      const res = await fetch("/api/user/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          address: formData.address
        })
      });
      const data = await res.json();
      if (data.success) {
        setUser({ ...user, ...formData });
        
        // ĐỒNG BỘ LÊN HEADER
        updateAuth({
           ...authUser,
           name: formData.name,
           username: formData.name
        } as any);

        setIsEditing(false);
        setShowConfirmToast(true);
        setTimeout(() => setShowConfirmToast(false), 3000);
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Có lỗi xảy ra khi lưu!");
    } finally {
      setIsUpdating(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-[#f8fbff] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fbff] selection:bg-blue-500 selection:text-white font-sans overflow-x-hidden">
      <BackgroundDecor />
      <Header />
      <div className="h-[96px]"></div>

      {/* Custom Confirmation Modal */}
      {modalConfig.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-[#0c3151]/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setModalConfig(prev => ({ ...prev, show: false }))}></div>
           <div className="relative bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300 border border-white/50">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${modalConfig.type === 'save' ? 'bg-blue-50 text-blue-500' : 'bg-red-50 text-red-500'}`}>
                 {modalConfig.type === 'save' ? <Save className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
              </div>
              <h3 className="text-2xl font-black text-[#0c3151] mb-3">{modalConfig.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-10">{modalConfig.message}</p>
              <div className="flex gap-4">
                 <button 
                  onClick={() => setModalConfig(prev => ({ ...prev, show: false }))}
                  className="flex-1 py-4 bg-gray-50 text-gray-500 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all focus:outline-none"
                 >
                   Quay lại
                 </button>
                 <button 
                  onClick={processConfirm}
                  className={`flex-1 py-4 text-white rounded-2xl font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all focus:outline-none ${modalConfig.type === 'save' ? 'bg-[#3087fe] shadow-blue-500/20' : 'bg-red-500 shadow-red-500/20'}`}
                 >
                   Xác nhận
                 </button>
              </div>
              <button 
                onClick={() => setModalConfig(prev => ({ ...prev, show: false }))}
                className="absolute top-8 right-8 text-gray-300 hover:text-gray-500 transition-colors"
              >
                 <X className="w-6 h-6" />
              </button>
           </div>
        </div>
      )}

      {/* Loading Overlay khi đang lưu */}
      {isUpdating && (
        <div className="fixed inset-0 z-[110] bg-white/60 backdrop-blur-md flex flex-col items-center justify-center gap-4 animate-in fade-in duration-300">
           <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
           <p className="text-[#0c3151] font-black text-sm uppercase tracking-widest">Đang lưu hồ sơ...</p>
        </div>
      )}

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[2.5rem] p-8 shadow-2xl shadow-blue-100/30 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10 group-hover:opacity-20 transition-opacity"></div>
              
              <div className="relative mb-6 inline-block">
                <div className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-gray-50 flex items-center justify-center relative">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-blue-500" />
                  )}
                </div>
                <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-gray-100 text-blue-500 hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-xl font-black text-[#0c3151] mb-1">{user?.name || authUser?.name || "Khách hàng SOF"}</h2>
              <div className="flex items-center justify-center gap-2 mb-6">
                 <img src="https://www.google.com/favicon.ico" className="w-3 h-3 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
                 <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Tài khoản Google</p>
              </div>

              <div className="space-y-2 text-left">
                <button 
                  onClick={() => setActiveTab("info")}
                  className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${activeTab === 'info' ? 'bg-[#0c3151] text-white shadow-xl' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <User className="w-4 h-4" />
                  Thông tin cá nhân
                </button>
                <button 
                  onClick={() => setActiveTab("history")}
                  className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${activeTab === 'history' ? 'bg-[#0c3151] text-white shadow-xl' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <History className="w-4 h-4" />
                  Lịch sử tư vấn
                </button>
                <div className="pt-4 border-t border-gray-100 mt-4">
                   <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-red-500 font-bold text-sm hover:bg-red-50 transition-colors">
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                   </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[3rem] p-10 lg:p-14 shadow-2xl shadow-blue-100/20 min-h-[600px] relative overflow-hidden">
               <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50/50 rounded-full blur-[100px] pointer-events-none"></div>
               
               {activeTab === 'info' && (
                 <div className="relative animate-in fade-in slide-in-from-right-4 duration-500">
                    
                    {/* Thông báo cập nhật thành công */}
                    {showConfirmToast && (
                      <div className="absolute top-0 right-0 animate-in slide-in-from-top-4 duration-500 z-20">
                         <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 font-bold text-sm">
                            <CheckCircle2 className="w-5 h-5" />
                            Đã cập nhật hồ sơ thành công!
                         </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center mb-10">
                       <h1 className="text-3xl font-black text-[#0c3151]">Thông tin cá nhân</h1>
                       {!isEditing ? (
                         <button 
                           onClick={() => setIsEditing(true)}
                           className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                         >
                            <Edit3 className="w-4 h-4" />
                            Chỉnh sửa hồ sơ
                         </button>
                       ) : (
                         <div className="flex gap-3">
                            <button 
                              onClick={handleCancelClick}
                              className="px-6 py-3 bg-gray-50 text-gray-500 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all"
                            >
                               Hủy
                            </button>
                            <button 
                              onClick={handleSaveClick}
                              className="flex items-center gap-2 px-6 py-3 bg-[#0c3151] text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg"
                            >
                               <Save className="w-4 h-4" />
                               Lưu thay đổi
                            </button>
                         </div>
                       )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">Họ và tên</label>
                          <div className="relative group">
                             <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                             <input 
                               disabled={!isEditing}
                               value={formData.name} 
                               onChange={(e) => setFormData({...formData, name: e.target.value})}
                               className={`w-full pl-14 pr-6 py-4 rounded-2xl text-[#0c3151] font-bold outline-none transition-all ${isEditing ? 'bg-white border-2 border-blue-200 shadow-xl shadow-blue-500/5' : 'bg-gray-50/50 border border-gray-100 cursor-not-allowed'}`}
                             />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <div className="flex justify-between items-center px-4">
                             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email liên hệ</label>
                             <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 uppercase tracking-widest">Xác thực Google</span>
                          </div>
                          <div className="relative group">
                             <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                             <input 
                               readOnly 
                               value={formData.email} 
                               className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-[#0c3151] font-bold outline-none cursor-not-allowed opacity-70 font-mono text-[13px]"
                             />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">Số điện thoại</label>
                          <div className="relative group">
                             <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                             <input 
                               disabled={!isEditing}
                               value={formData.phone} 
                               onChange={(e) => setFormData({...formData, phone: e.target.value})}
                               placeholder="Chưa cập nhật" 
                               className={`w-full pl-14 pr-6 py-4 rounded-2xl text-[#0c3151] font-bold outline-none transition-all ${isEditing ? 'bg-white border-2 border-blue-200 shadow-xl shadow-blue-500/5' : 'bg-gray-50/50 border border-gray-100 cursor-not-allowed'}`}
                             />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">Địa chỉ</label>
                          <div className="relative group">
                             <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                             <input 
                               disabled={!isEditing}
                               value={formData.address} 
                               onChange={(e) => setFormData({...formData, address: e.target.value})}
                               placeholder="Nhập địa chỉ của bạn" 
                               className={`w-full pl-14 pr-6 py-4 rounded-2xl text-[#0c3151] font-bold outline-none transition-all ${isEditing ? 'bg-white border-2 border-blue-200 shadow-xl shadow-blue-500/5' : 'bg-gray-50/50 border border-gray-100 cursor-not-allowed'}`}
                             />
                          </div>
                       </div>
                    </div>
                 </div>
               )}

               {activeTab === 'history' && (
                 <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h1 className="text-3xl font-black text-[#0c3151] mb-8">Lịch sử tư vấn</h1>
                    
                    <div className="space-y-4">
                       {user?.activities?.map((activity: any) => (
                         <div key={activity.id} className="group flex items-center justify-between p-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 cursor-pointer">
                            <div className="flex items-center gap-6">
                               <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform shadow-sm">
                                  <Package className="w-7 h-7" />
                               </div>
                               <div>
                                  <h3 className="text-lg font-black text-[#0c3151] truncate max-w-[400px]">
                                     {activity.services || "Yêu cầu tư vấn hệ thống"}
                                  </h3>
                                  <div className="flex items-center gap-4 mt-1">
                                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mã: #SOF-10{activity.id}</span>
                                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                     <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                                        {new Date(activity.created_at).toLocaleDateString('vi-VN')}
                                     </span>
                                  </div>
                               </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-2 transition-all" />
                         </div>
                       ))}

                       {(!user?.activities || user?.activities.length === 0) && (
                         <div className="bg-gray-50/30 border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300">
                               <Heart className="w-8 h-8" />
                            </div>
                            <p className="text-gray-400 font-bold">Bạn chưa có yêu cầu tư vấn nào.</p>
                            <Link href="/san-pham" className="inline-block mt-4 text-blue-500 font-bold text-sm hover:underline">Khám phá hệ sinh thái ngay</Link>
                         </div>
                       )}
                    </div>
                 </div>
               )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
