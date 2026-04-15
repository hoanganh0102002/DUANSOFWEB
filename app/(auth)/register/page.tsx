"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import { useAuth } from "@/components/providers/AuthProvider";
import { getGoogleAuthCode } from "@/lib/googleAuth";
import { getFacebookAuthToken } from "@/lib/facebookAuth";
import {
    Mail,
    Phone,
    Building2,
    ArrowRight,
    Globe,
    Layout,
    Apple,
    CheckCircle2,
    Sparkles,
    Shield,
    Zap,
    User,
    Search
} from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        agreeTerms: false,
        agreeMarketing: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                username: formData.email, // Use email as username
                email: formData.email,
                phone: formData.phone,
                fullName: formData.fullName,
                companyName: formData.companyName || "N/A"
            };

            const response = await authService.register(payload);

            if (response.success) {
                toast.success("Đăng ký thành công! Mật khẩu đã được gửi qua Email của bạn.");
                
                // Redirect to login page after 3 seconds
                setTimeout(() => router.push("/login"), 3000);
            } else {
                toast.error(response.message || "Đăng ký thất bại");
            }
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            const code = await (getGoogleAuthCode as any)();
            const response = await authService.loginWithGoogle(code);

            if (response.success) {
                toast.success(response.message || "Đăng nhập Google thành công!");

                login({
                    username: response.data.username,
                    name: response.data.name,
                    token: response.data.token,
                    role: response.data.role,
                    email: response.data.email,
                });

                router.push("/");
            } else {
                toast.error(response.message || "Đăng nhập Google thất bại");
            }
        } catch (error) {
            console.error(error);
            toast.error("Đăng nhập Google thất bại, vui lòng thử lại");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFacebookLogin = async () => {
        setIsLoading(true);
        try {
            const { accessToken } = await getFacebookAuthToken();
            const response = await authService.loginWithFacebook(accessToken);

            if (response.success) {
                toast.success(response.message || "Đăng nhập Facebook thành công!");

                login({
                    username: response.data.username,
                    name: response.data.name,
                    token: response.data.token,
                    role: response.data.role,
                    email: response.data.email,
                });

                router.push("/");
            } else {
                toast.error(response.message || "Đăng nhập Facebook thất bại");
            }
        } catch (error) {
            console.error(error);
            toast.error("Đăng nhập Facebook thất bại, vui lòng thử lại");
        } finally {
            setIsLoading(false);
        }
    };

    const benefits = [
        {
            icon: Shield,
            title: "Bảo mật tối đa",
            description: "Dữ liệu được mã hóa 256-bit"
        },
        {
            icon: Zap,
            title: "Triển khai nhanh",
            description: "Hoàn thành trong 24 giờ"
        },
        {
            icon: CheckCircle2,
            title: "Dùng thử miễn phí",
            description: "30 ngày trải nghiệm đầy đủ"
        }
    ];

    return (
        <div className="h-screen w-full flex bg-[#f5f9fc] overflow-hidden font-sans">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0f426c] via-[#1a5a8a] to-[#3087fe] relative overflow-hidden text-white shadow-2xl z-10 transition-all">
                {/* Background Pattern */}
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-10 py-6 w-full h-full">
                    {/* Logo - Matching Login scale */}
                    <div className="relative z-10 mb-8 flex items-center gap-3 bg-white/10 w-fit px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20">
                        <img 
                            src="/hinhanh/favicon-96x96.png" 
                            alt="SOF Logo" 
                            className="w-8 h-8 object-contain bg-white rounded-md p-1"
                        />
                        <span className="text-xl font-black tracking-tight text-white">SOF.COM.VN</span>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-4 flex-grow">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight leading-tight">
                                Bắt đầu hành trình chuyển đổi số
                            </h1>
                            <p className="text-blue-50 text-[15px] leading-relaxed font-medium">
                                Tạo tài khoản miễn phí và trải nghiệm giải pháp quản trị doanh nghiệp hàng đầu Việt Nam
                            </p>
                        </div>

                        {/* Benefits */}
                        <div className="space-y-3 mt-6">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-3"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                                        <benefit.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[15px] leading-tight">{benefit.title}</h3>
                                        <p className="text-[13px] text-white/70 leading-snug">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trust Badge */}
                    <div className="mt-6 pt-4 border-t border-white/20">
                        <p className="text-blue-100 text-[13px] font-medium mb-3">Được tin dùng bởi hơn 50.000+ người dùng</p>
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-blue-400 border-2 border-[#1a5a8a] flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                                    >
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <span className="text-[13px] font-medium text-white/90">+4995 khác</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 bg-[#ebf4fa] relative overflow-hidden">
                <div className="w-full max-w-[420px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-8 relative z-20 my-auto">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="w-14 h-14 bg-[#ebf5ff] rounded-full flex items-center justify-center mx-auto mb-3">
                            <Sparkles className="w-7 h-7 text-[#3087fe]" />
                        </div>
                        <h2 className="text-[22px] font-black text-[#0f426c] mb-1 tracking-tight">Tạo tài khoản</h2>
                        <p className="text-[#507588] font-medium text-[13px]">
                            Trải nghiệm miễn phí 30 ngày
                        </p>
                    </div>

                    {/* Form Fields */}
                    <form onSubmit={handleSubmit} className="space-y-3.5">
                        <div className="grid grid-cols-2 gap-3">
                            {/* Full Name */}
                            <div className="space-y-1">
                                <Label htmlFor="fullName" className="text-[12px] font-bold text-[#0f426c]">
                                    Họ tên <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#507588] group-focus-within:text-[#3087fe] transition-colors">
                                        <User className="w-3.5 h-3.5" />
                                    </div>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        placeholder="Nguyễn Văn A"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="pl-9 h-10 border-blue-200 focus:border-[#3087fe] focus:ring-1 focus:ring-[#3087fe] text-[13px] font-medium bg-[#f8fbff] rounded-xl transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="space-y-1">
                                <Label htmlFor="phone" className="text-[12px] font-bold text-[#0f426c]">
                                    SĐT <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#507588] group-focus-within:text-[#3087fe] transition-colors">
                                        <Phone className="w-3.5 h-3.5" />
                                    </div>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="09xx xxx xxx"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="pl-9 h-10 border-blue-200 focus:border-[#3087fe] focus:ring-1 focus:ring-[#3087fe] text-[13px] font-medium bg-[#f8fbff] rounded-xl transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <Label htmlFor="email" className="text-[12px] font-bold text-[#0f426c]">
                                Email <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#507588] group-focus-within:text-[#3087fe] transition-colors">
                                    <Mail className="w-3.5 h-3.5" />
                                </div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="email@company.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="pl-9 h-10 border-blue-200 focus:border-[#3087fe] focus:ring-1 focus:ring-[#3087fe] text-[13px] font-medium bg-[#f8fbff] rounded-xl transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Company Name */}
                        <div className="space-y-1">
                            <Label htmlFor="companyName" className="text-[12px] font-bold text-[#0f426c]">
                                Tên công ty
                            </Label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#507588] group-focus-within:text-[#3087fe] transition-colors">
                                    <Building2 className="w-3.5 h-3.5" />
                                </div>
                                <Input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    placeholder="Công ty TNHH ABC"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    className="pl-9 h-10 border-blue-200 focus:border-[#3087fe] focus:ring-1 focus:ring-[#3087fe] text-[13px] font-medium bg-[#f8fbff] rounded-xl transition-all"
                                />
                            </div>
                        </div>

                        {/* Info Message */}
                        <div className="bg-blue-50/50 border border-blue-100/50 rounded-xl p-2.5 mt-1 !mb-2 flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full bg-[#3087fe] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-blue-500/20">
                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-[11px] text-[#507588] leading-tight font-medium">
                                Hệ thống sẽ tạo mật khẩu và <strong className="text-[#0f426c]">gửi qua Email</strong> đã điền ở trên.
                            </p>
                        </div>

                        {/* Terms Agreement */}
                        <div className="space-y-1.5 pt-1 pb-1">
                            <div className="flex items-start space-x-2">
                                <Checkbox
                                    id="agreeTerms"
                                    checked={formData.agreeTerms}
                                    onChange={(e: any) =>
                                        setFormData((prev) => ({ ...prev, agreeTerms: e.target.checked }))
                                    }
                                    className="mt-0.5 w-3.5 h-3.5 border-blue-200 text-[#3087fe] data-[state=checked]:bg-[#3087fe]"
                                />
                                <Label htmlFor="agreeTerms" className="text-[11px] text-[#507588] cursor-pointer font-medium leading-snug">
                                    Đồng ý với <Link href="/payment-terms" className="text-[#3087fe] hover:underline font-bold">Điều khoản</Link> và <Link href="/warranty-policy" className="text-[#3087fe] hover:underline font-bold">Bảo mật</Link> <span className="text-red-500">*</span>
                                </Label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-11 rounded-xl bg-[#0f426c] hover:bg-[#144773] text-white font-bold text-[13px] group flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#0f426c]/20"
                            disabled={isLoading || !formData.agreeTerms}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Đang xử lý...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    Tạo tài khoản ngay
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="relative my-4 text-center">
                        <div className="absolute inset-x-0 top-1/2 h-px bg-blue-100/50"></div>
                        <span className="relative z-10 px-3 bg-white text-[11px] font-medium text-[#507588]">Đăng ký bằng Google/Facebook</span>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <button type="button" onClick={handleGoogleLogin} disabled={isLoading} className="h-10 rounded-xl border border-blue-100 bg-[#f8fbff] hover:bg-blue-50 flex items-center justify-center gap-2 transition-all shadow-sm">
                            <Search className="w-3.5 h-3.5 text-blue-500" />
                            <span className="text-[12px] font-bold text-[#0f426c]">Google</span>
                        </button>
                        <button type="button" onClick={handleFacebookLogin} disabled={isLoading} className="h-10 rounded-xl border border-blue-100 bg-[#f8fbff] hover:bg-blue-50 flex items-center justify-center gap-2 transition-all shadow-sm">
                            <span className="text-sm font-black text-blue-600">f</span>
                            <span className="text-[12px] font-bold text-[#0f426c]">Facebook</span>
                        </button>
                    </div>

                    <p className="text-center mt-5 text-[12px] font-medium text-[#507588]">
                        Đã có tài khoản?{" "}
                        <Link href="/login" className="text-[#3087fe] font-bold hover:underline transition-colors">
                            Đăng nhập
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
