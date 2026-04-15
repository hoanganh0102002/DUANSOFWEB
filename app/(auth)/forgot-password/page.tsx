'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Mail, 
    ArrowLeft,
    Sparkles,
    Shield,
    CheckCircle2,
    Send
} from 'lucide-react';  
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/authService";

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await authService.forgotPassword(email);

            if (response.success) {
                setIsSuccess(true);
                toast.success("Yêu cầu đã được gửi!");
            } else {
                toast.error(response.message || "Lỗi hệ thống!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-full flex bg-[#f5f9fc] overflow-hidden font-sans">
            {/* LEFT SIDE: BRANDING (50%) - Giống login page */}
            <div className="hidden lg:flex w-[50%] bg-gradient-to-br from-[#144773] to-[#3087fe] relative overflow-hidden flex-col p-12 text-white shadow-2xl z-10 transition-all">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

                <div className="relative z-10 mb-16 flex items-center gap-3 bg-white/10 w-fit px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20">
                    <img 
                      src="/hinhanh/favicon-96x96.png" 
                      alt="SOF Logo" 
                      className="w-8 h-8 object-contain bg-white rounded-md p-1"
                    />
                    <span className="text-xl font-black tracking-tight text-white">SOF.COM.VN</span>
                </div>

                <div className="relative z-10 flex-grow">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">Yêu cầu cấp lại <br/> mật khẩu</h1>
                    <p className="text-blue-50 text-[16px] mb-10 leading-relaxed font-medium">
                        Đừng lo lắng, chúng tôi sẽ hỗ trợ bạn khôi phục quyền truy cập tài khoản nhanh nhất có thể.
                    </p>

                    <div className="space-y-4">
                        {[
                            { text: "Bảo mật thông tin tối đa", icon: Shield },
                            { text: "Phục hồi qua Email chính thức", icon: Mail },
                            { text: "Hỗ trợ kỹ thuật 24/7", icon: CheckCircle2 }
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

                <div className="relative z-10 flex gap-16 pt-8 border-t border-white/20">
                    <div>
                        <p className="text-3xl font-black text-white">1 Phút</p>
                        <p className="text-[13px] font-medium text-blue-100">Xử lý yêu cầu</p>
                    </div>
                    <div>
                        <p className="text-3xl font-black text-white">24/7</p>
                        <p className="text-[13px] font-medium text-blue-100">Bảo mật</p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: FORGOT PASS CARD (50%) */}
            <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 bg-[#ebf4fa] relative overflow-hidden">
                <div className="w-full max-w-[420px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-8 relative z-20 my-auto">
                    
                    {!isSuccess ? (
                        <>
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="w-14 h-14 bg-[#ebf5ff] rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Sparkles className="w-7 h-7 text-[#3087fe]" />
                                </div>
                                <h2 className="text-[22px] font-black text-[#0f426c] mb-1.5 tracking-tight">Quên mật khẩu?</h2>
                                <p className="text-[#507588] font-medium text-[13px]">Nhập email liên kết với tài khoản để nhận mật khẩu mới.</p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-1.5">
                                    <Label className="text-[12px] font-bold text-[#0f426c] ml-1">Địa chỉ Email</Label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#507588] group-focus-within:text-[#3087fe] transition-colors">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <Input 
                                            type="email" 
                                            placeholder="your-email@gmail.com" 
                                            required 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-11 bg-[#f8fbff] border-blue-200 focus:border-[#3087fe] focus:ring-1 focus:ring-[#3087fe] transition-all h-12 rounded-xl text-[14px] font-medium text-[#0f426c]"
                                        />
                                    </div>
                                </div>

                                <Button 
                                    disabled={isLoading}
                                    className="w-full h-12 rounded-xl bg-[#0f426c] hover:bg-[#144773] text-white font-bold text-[14px] group flex items-center justify-center gap-2 transition-all mt-2 shadow-lg shadow-blue-900/10"
                                >
                                    {isLoading ? "Đang gửi..." : "Gửi yêu cầu khôi phục"} 
                                    {!isLoading && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                </Button>
                            </form>

                            <div className="text-center mt-8">
                                <Link href="/login" className="inline-flex items-center gap-2 text-[13px] font-bold text-[#3087fe] hover:gap-3 transition-all">
                                    <ArrowLeft className="w-4 h-4" />
                                    Quay lại trang Đăng nhập
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h2 className="text-[22px] font-black text-[#0f426c] mb-3 tracking-tight">Thành công!</h2>
                            <p className="text-[#507588] font-medium text-[14px] leading-relaxed mb-8 px-2">
                                Mật khẩu mới đã được gửi tới email <strong>{email}</strong>. Bạn vui lòng kiểm tra hộp thư và đăng nhập lại.
                            </p>
                            <Link href="/login">
                                <Button className="w-full h-12 rounded-xl bg-[#0f426c] hover:bg-[#144773] text-white font-bold shadow-lg shadow-blue-900/10">
                                    Đăng nhập ngay
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
