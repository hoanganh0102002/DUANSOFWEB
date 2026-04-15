'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { 
    Eye, 
    EyeOff, 
    Mail, 
    Lock, 
    CheckCircle2, 
    ArrowRight,
    Search,
    Sparkles,
    Shield
} from 'lucide-react';  
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { authService } from "@/services/authService";
import { useAuth } from "@/components/providers/AuthProvider";

export default function LoginPage() {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <LoginContent />
    </GoogleOAuthProvider>
  );
}

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    const redirectUrl = searchParams.get('redirect') || '/';

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    // Tải trước trang Admin để chuyển hướng trong tích tắc
    useEffect(() => {
        router.prefetch("/admin");
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response: any = await authService.login(formData.email, formData.password);

            if (response.success) {
                const userData = {
                    username: response.data?.username || 'admin',
                    name: response.data?.name || 'Administrator',
                    email: response.data?.email || formData.email,
                    phone: response.data?.phone || "",
                    address: response.data?.address || "",
                };

                // Chuyển hướng SIÊU TỐC: Đẩy đi ngay lập tức
                if (userData.email === "admin@sof.com.vn" || userData.email === "admin@sof.vn" || userData.email === "trannguyenhoanganh2005@gmail.com") {
                    localStorage.setItem("sof_admin", JSON.stringify({
                        ...userData,
                        role: "admin",
                        token: "admin_sync_token_" + Date.now()
                    }));
                    // Set user state và đẩy đi luôn
                    login(userData);
                    router.push("/admin");
                } else {
                    login(userData);
                    router.push(redirectUrl);
                }
            } else {
                toast.error(response.message || "Sai thông tin đăng nhập!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setIsLoading(false);
        }
    };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                setIsLoading(true);
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const userInfo = await res.json();
                
                const response: any = await authService.loginWithGoogle(userInfo);
                
                if (response.success) {
                    toast.success("Đăng nhập Google thành công!");
                    login({
                        username: response.data?.username || userInfo.email,
                        name: response.data?.name || userInfo.name,
                        email: userInfo.email,
                    });
                    router.push(redirectUrl);
                } else {
                    toast.error(response.message || "Lỗi lưu thông tin Database!");
                }
            } catch (error) {
                console.error(error);
                toast.error("Lỗi xác thực Google!");
            } finally {
                setIsLoading(false);
            }
        },
        onError: () => toast.error('Đăng nhập Google thất bại!'),
    });

    return (
        <div className="h-screen w-full flex bg-[#f5f9fc] overflow-hidden font-sans">
            {/* LEFT SIDE: BRANDING & INFO (50%) */}
            <div className="hidden lg:flex w-[50%] bg-gradient-to-br from-[#144773] to-[#3087fe] relative overflow-hidden flex-col p-12 text-white shadow-2xl z-10 transition-all">
                {/* Background lighting effects from Image 2 */}
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

                {/* Logo Area */}
                <div className="relative z-10 mb-16 flex items-center gap-3 bg-white/10 w-fit px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20">
                    <img 
                      src="/hinhanh/favicon-96x96.png" 
                      alt="SOF Logo" 
                      className="w-8 h-8 object-contain bg-white rounded-md p-1"
                    />
                    <span className="text-xl font-black tracking-tight text-white">SOF.COM.VN</span>
                </div>

                {/* Main Branding Content */}
                <div className="relative z-10 flex-grow">
                    {/* Replaced 'Chào mừng <br/> trở lại!' with 'Chào mừng đến với' on one line */}
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight flex flex-row">Chào mừng đến với!</h1>
                    <p className="text-blue-50 text-[16px] mb-10 leading-relaxed font-medium">
                        Đăng nhập để tiếp tục quản lý doanh nghiệp của bạn với SOF ERP
                    </p>

                    <div className="space-y-4">
                        {[
                            { text: "Quản lý doanh nghiệp thông minh", icon: CheckCircle2 },
                            { text: "Tích hợp đa nền tảng", icon: CheckCircle2 },
                            { text: "Bảo mật tiên tiến", icon: CheckCircle2 },
                            { text: "Hỗ trợ 24/7", icon: CheckCircle2 }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="rounded-full bg-white/10 flex items-center justify-center p-0.5 border border-white/20">
                                    <item.icon className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-[15px] font-medium text-blue-50">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Large Background Decorative Shield */}
                <div className="absolute bottom-0 right-10 opacity-10 pointer-events-none mix-blend-overlay">
                   <Shield className="w-[300px] h-[300px]" strokeWidth={1} />
                </div>

                {/* Stats Section at Bottom */}
                <div className="relative z-10 flex gap-16 pt-8 border-t border-white/20">
                    <div className="space-y-1">
                        <p className="text-3xl font-black text-white">50.000+</p>
                        <p className="text-[13px] font-medium text-blue-100 whitespace-nowrap">Người dùng</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-black text-white">99.9%</p>
                        <p className="text-[13px] font-medium text-blue-100 tracking-wide">Uptime</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-black text-white">24/7</p>
                        <p className="text-[13px] font-medium text-blue-100 tracking-wide">Hỗ trợ</p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: LOGIN CARD (50%) */}
            <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 bg-[#ebf4fa] relative overflow-hidden">
                <div className="w-full max-w-[420px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-8 relative z-20 my-auto">
                    
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="w-14 h-14 bg-[#ebf5ff] rounded-full flex items-center justify-center mx-auto mb-3">
                            <Sparkles className="w-7 h-7 text-[#3087fe]" />
                        </div>
                        <h2 className="text-[22px] font-black text-[#0f426c] mb-1.5 tracking-tight">Đăng nhập</h2>
                        <p className="text-[#507588] font-medium text-[13px]">Nhập thông tin để truy cập tài khoản</p>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="space-y-2 mb-4">
                        <button type="button" onClick={() => loginWithGoogle()} className="w-full h-11 rounded-xl border border-blue-100 bg-[#f8fbff] hover:bg-blue-50 flex items-center justify-center gap-3 transition-all group">
                            <Search className="w-4 h-4 text-blue-500" />
                            <span className="text-[13px] font-bold text-[#0f426c]">Tiếp tục với Google</span>
                        </button>
                        <button type="button" className="w-full h-11 rounded-xl border border-blue-100 bg-[#f8fbff] hover:bg-blue-50 flex items-center justify-center gap-3 transition-all">
                            <span className="text-lg font-black text-blue-600">f</span>
                            <span className="text-[13px] font-bold text-[#0f426c]">Tiếp tục với Facebook</span>
                        </button>
                        <button type="button" className="w-full h-11 rounded-xl border border-blue-100 bg-[#f8fbff] hover:bg-blue-50 flex items-center justify-center gap-3 transition-all">
                            <span className="text-lg text-[#144773]"></span>
                            <span className="text-[13px] font-bold text-[#0f426c]">Tiếp tục với Apple</span>
                        </button>
                    </div>

                    <div className="relative mb-4 text-center">
                        <div className="absolute inset-x-0 top-1/2 h-px bg-blue-100"></div>
                        <span className="relative z-10 px-4 bg-white text-[12px] font-bold text-[#507588]">hoặc đăng nhập bằng email</span>
                    </div>

                    {/* Form Fields */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="space-y-1">
                            <Label className="text-[12px] font-bold text-[#0f426c] ml-1">Email</Label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#507588] group-focus-within:text-[#3087fe] transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <Input 
                                    name="email"
                                    type="email" 
                                    placeholder="admin@luxevoyage.com" 
                                    required 
                                    value={formData.email}
                                    onChange={(e) => setFormData(p => ({...p, email: e.target.value}))}
                                    className="pl-11 bg-[#f8fbff] border-blue-200 focus:border-[#3087fe] focus:ring-1 focus:ring-[#3087fe] transition-all h-11 rounded-xl text-[14px] font-medium text-[#0f426c]"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label className="text-[12px] font-bold text-[#0f426c] ml-1">Mật khẩu</Label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#507588] group-focus-within:text-[#3087fe] transition-colors">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <Input 
                                    name="password"
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    required 
                                    value={formData.password}
                                    onChange={(e) => setFormData(p => ({...p, password: e.target.value}))}
                                    className="pl-11 pr-11 bg-[#f8fbff] border-blue-200 focus:border-[#3087fe] focus:ring-1 focus:ring-[#3087fe] transition-all h-11 rounded-xl text-[14px] font-bold text-[#0f426c]"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#507588] hover:text-[#3087fe] transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 pb-1">
                            <div className="flex items-center gap-2">
                                <Checkbox 
                                    id="remember" 
                                    checked={formData.rememberMe}
                                    onChange={(e: any) => setFormData(p => ({...p, rememberMe: e.target.checked}))}
                                    className="w-4 h-4 border-blue-200 text-[#3087fe] data-[state=checked]:bg-[#3087fe]" 
                                />
                                <Label htmlFor="remember" className="text-[13px] font-medium text-[#507588] cursor-pointer">Ghi nhớ đăng nhập</Label>
                            </div>
                            <Link href="/forgot-password" title="Quên mật khẩu" className="text-[13px] font-medium text-[#3087fe] hover:underline">Quên mật khẩu?</Link>
                        </div>

                        <Button 
                            disabled={isLoading}
                            className="w-full h-11 rounded-xl bg-[#0f426c] hover:bg-[#144773] text-white font-bold text-[14px] group flex items-center justify-center gap-2 transition-all mt-1 shadow-lg shadow-blue-900/10"
                        >
                            {isLoading ? "Đang xử lý..." : "Đăng nhập"} 
                            {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </Button>
                    </form>

                    <p className="text-center mt-5 text-[13px] font-medium text-[#507588]">
                        Chưa có tài khoản? <Link href="/register" className="text-[#3087fe] font-bold hover:underline">Đăng ký ngay</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
