"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/FooterNextjs";
import BackgroundDecor from "@/components/BackgroundDecor";
import { 
  Phone, Mail, MapPin, Send, MessageSquare, 
  CheckCircle2, ChevronRight, Globe, ShieldCheck ,ChevronDown, 
  Check, Clock, MessageCircle, HelpCircle, Video, FileText,
  AlertCircle, Loader2, X, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


// Danh sách dữ liệu mẫu để hiển thị

export default function ContactPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  // Submission state
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Ref for dropdown click outside
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: "PHAN_MEM",
      name: "Phần Mềm",
      products: [
        "Phần mềm Quản lý Bán hàng", "Phần mềm Quản lý Bảo hành", "Phần mềm Quản lý Quán Cafe",
        "Phần mềm Quản lý Bãi xe", "Phần mềm Quản lý Bãi xe Mobile", "Phần mềm Quản lý Khách sạn",
        "Phần mềm Quản lý Kho Pallet", "Phần mềm Quản lý Quán ăn", "Phần mềm Quản lý Kho",
        "Phần mềm Quản lý Vận tải", "Phần mềm Quản lý Nhà hàng", "Phần mềm Quản lý Nhân sự",
        "Phần mềm Quản trị ERP", "Phần mềm Quản lý Trả thưởng Hệ Mặt trời"
      ]
    },
    {
      id: "PHAN_CUNG",
      name: "Phần Cứng",
      products: [
        "Cân Điện Tử Tính Tiền ONEPLUSONE C-L1", "Máy in hóa đơn HPRT TP80NC-H", "Giấy in nhiệt K80x45mm",
        "Máy POS Cầm Tay Thông Minh", "Máy POS Thu Ngân 2 Màn Hình iMin", "Máy Quét Mã Vạch ICW 92108HS",
        "Két tiền Mini MAKEN VK4102", "Máy in hóa đơn EPSON TM-T82III", "Máy quét mã vạch ICW97201"
      ]
    }
  ]; 

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Client-side validation
  const validateField = (field: string, value: string | string[]) => {
    const newErrors = { ...errors };

    switch (field) {
      case "fullName":
        if (!value || (typeof value === "string" && value.trim().length < 2)) {
          newErrors.fullName = "Vui lòng nhập họ và tên (tối thiểu 2 ký tự)";
        } else if (typeof value === "string" && value.trim().length > 100) {
          newErrors.fullName = "Họ và tên không được vượt quá 100 ký tự";
        } else {
          delete newErrors.fullName;
        }
        break;
      case "phone":
        const phoneVal = typeof value === "string" ? value.replace(/\s/g, "") : "";
        const phoneRegex = /^(0[1-9][0-9]{8,9})$/;
        if (!phoneVal) {
          newErrors.phone = "Vui lòng nhập số điện thoại";
        } else if (!phoneRegex.test(phoneVal)) {
          newErrors.phone = "Số điện thoại không hợp lệ (VD: 0933549469)";
        } else {
          delete newErrors.phone;
        }
        break;
      case "email":
        if (typeof value === "string" && value.trim().length > 0) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value.trim())) {
            newErrors.email = "Email không hợp lệ";
          } else {
            delete newErrors.email;
          }
        } else {
          delete newErrors.email;
        }
        break;
      case "services":
        if (Array.isArray(value) && value.length === 0) {
          newErrors.services = "Vui lòng chọn ít nhất 1 dịch vụ quan tâm";
        } else {
          delete newErrors.services;
        }
        break;
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const value = field === "fullName" ? fullName : field === "phone" ? phone : field === "email" ? email : selectedServices;
    validateField(field, value);
  };

  const validateAll = () => {
    const allTouched = { fullName: true, phone: true, services: true, email: true };
    setTouched(allTouched);

    let newErrors: Record<string, string> = {};

    // Validate fullName
    if (!fullName || fullName.trim().length < 2) {
      newErrors.fullName = "Vui lòng nhập họ và tên (tối thiểu 2 ký tự)";
    }

    // Validate phone
    const phoneVal = phone.replace(/\s/g, "");
    const phoneRegex = /^(0[1-9][0-9]{8,9})$/;
    if (!phoneVal) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!phoneRegex.test(phoneVal)) {
      newErrors.phone = "Số điện thoại không hợp lệ (VD: 0933549469)";
    }

    // Validate email (optional but must be valid if provided)
    if (email && email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = "Email không hợp lệ";
      }
    }

    // Validate services
    if (selectedServices.length === 0) {
      newErrors.services = "Vui lòng chọn ít nhất 1 dịch vụ quan tâm";
    }

    // Validate agreement
    if (!agreed) {
      newErrors.agreement = "Vui lòng đồng ý với chính sách của chúng tôi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    if (!validateAll()) {
      // Scroll to first error
      const firstErrorField = document.querySelector('[data-error="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.replace(/\s/g, "").trim(),
          email: email.trim() || undefined,
          services: selectedServices,
          message: message.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        // Handle backend validation errors
        if (data.errors) {
          setErrors(data.errors);
          setTouched({ fullName: true, phone: true, services: true, email: true });
        }
        setSubmitStatus("error");
        setSubmitMessage(data.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
        return;
      }

      // Success!
      setSubmitStatus("success");
      setSubmitMessage(data.message);
      setEmailSent(data.emailSent || false);

      // Reset form
      setFullName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setSelectedServices([]);
      setAgreed(false);
      setErrors({});
      setTouched({});

    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus("error");
      setSubmitMessage("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-hide success message after 10 seconds
  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => setSubmitStatus("idle"), 10000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);
    
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 1. HEADER */}
      <Header />

      <div className="relative flex-grow">
        {/* BACKGROUND DECOR */}
        <BackgroundDecor />
        
        <main className="relative z-10">
          {/* HERO SECTION */}
          <section className="pt-20 pb-16 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Contact Us</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-[#0f426c] mb-6 leading-tight">
                Hãy cùng SOF kiến tạo <br />
                <span className="text-blue-500">Giải pháp tương lai</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng lắng nghe và tư vấn giải pháp tối ưu nhất cho doanh nghiệp của bạn.
              </p>
            </div>
          </section>

          {/* CONTACT CONTENT */}
          <section className="pb-24 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* CỘT TRÁI: THÔNG TIN (4 Cột) */}
              <div className="lg:col-span-5">
                <div className="bg-transparent space-y-6">
                  {/* Title Section */}
                  <div>
                    <h3 className="text-[28px] font-bold text-[#0f426c] mb-3">Thông tin liên hệ</h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ qua bất kỳ kênh nào phù hợp với bạn.
                    </p>
                  </div>
                  
                  {/* 4 Cards */}
                  <div className="space-y-4">
                    {/* Hotline */}
                    <div className="flex items-center gap-4 bg-blue-50/30 border border-blue-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0f426c] text-base">Hotline (24/7)</p>
                        <p className="text-[18px] font-bold text-blue-600 leading-snug">0933 549 469</p>
                        <p className="text-sm text-gray-500">Miễn phí cuộc gọi</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-4 bg-green-50/30 border border-green-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-green-500 text-white flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0f426c] text-base">Email</p>
                        <a href="mailto:cskh@sof.vn" className="text-blue-500 text-[15px] font-medium leading-snug hover:underline block">cskh@sof.vn</a>
                        <p className="text-sm text-gray-500">Phản hồi trong 24 giờ</p>
                      </div>
                    </div>

                    {/* Office */}
                    <div className="flex items-center gap-4 bg-purple-50/30 border border-purple-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0f426c] text-base">Văn phòng</p>
                        <p className="text-gray-600 text-[15px] leading-snug mt-1">69/9 Đường D9, Phường Tây Thạnh, TP. Hồ Chí Minh</p>
                      </div>
                    </div>

                    {/* Work Hours */}
                    <div className="flex items-center gap-4 bg-orange-50/30 border border-orange-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0f426c] text-base">Giờ làm việc</p>
                        <p className="text-gray-600 text-[15px] leading-snug mt-1">Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                        <p className="text-gray-600 text-[15px] leading-snug">Thứ 7: 8:00 - 16:00</p>
                      </div>
                    </div>
                  </div>

                  {/* Connect with us */}
                  <div className="pt-4">
                    <p className="font-bold text-[#0f426c] text-lg mb-4">Kết nối với chúng tôi</p>
                    <div className="flex gap-3">
                      <a href="#" className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                      </a>
                      <a 
                        href="https://zalo.me/763475936290889196" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-2xl bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                      >
                        <MessageCircle className="w-5 h-5 fill-current" />
                      </a>
                      <a 
                        href="https://www.youtube.com/@congtytnhhsof6439" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-2xl bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* CỘT PHẢI: FORM (7 Cột) */}
              <div className="lg:col-span-7">
                <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-gray-50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16" />
                  
                  {/* Success Message */}
                  {submitStatus === "success" && (
                    <div className="mb-8 relative animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/50 rounded-full -mr-8 -mt-8" />
                        <button 
                          onClick={() => setSubmitStatus("idle")}
                          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors z-10"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                        <div className="flex items-start gap-4 relative z-10">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-emerald-800 text-lg mb-1">Gửi yêu cầu thành công! 🎉</h4>
                            <p className="text-emerald-700 text-sm leading-relaxed">
                              {submitMessage}
                            </p>
                            {emailSent && (
                              <p className="text-emerald-600 text-sm mt-2 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email xác nhận đã được gửi đến hộp thư của bạn.
                              </p>
                            )}
                            <p className="text-emerald-600/80 text-xs mt-3">
                              Đội ngũ SOF sẽ liên hệ lại trong vòng 2 giờ làm việc.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitStatus === "error" && (
                    <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0">
                          <AlertCircle className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-red-800 mb-1">Gửi yêu cầu thất bại</h4>
                          <p className="text-red-600 text-sm">{submitMessage}</p>
                        </div>
                        <button 
                          onClick={() => setSubmitStatus("idle")}
                          className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors shrink-0"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  )}

                  <h3 className="text-2xl font-black text-[#0f426c] mb-8">Gửi yêu cầu tư vấn</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Họ và Tên */}
                      <div className="space-y-2" data-error={touched.fullName && !!errors.fullName}>
                        <label htmlFor="fullName" className="text-sm font-bold text-[#0f426c]">
                          Họ và Tên <span className="text-red-500">*</span>
                        </label>
                        <input 
                          id="fullName"
                          type="text" 
                          placeholder="Nguyễn Văn A" 
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (touched.fullName) validateField("fullName", e.target.value);
                          }}
                          onBlur={() => handleBlur("fullName")}
                          className={`w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 outline-none transition-all ${
                            touched.fullName && errors.fullName
                              ? "border-red-300 bg-red-50/50 focus:ring-2 focus:ring-red-200 focus:border-red-400"
                              : touched.fullName && !errors.fullName && fullName 
                                ? "border-emerald-300 bg-emerald-50/30 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                                : "border-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
                          }`}
                        />
                        {touched.fullName && errors.fullName && (
                          <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Số điện thoại */}
                      <div className="space-y-2" data-error={touched.phone && !!errors.phone}>
                        <label htmlFor="phone" className="text-sm font-bold text-[#0f426c]">
                          Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input 
                          id="phone"
                          type="tel" 
                          placeholder="09xx xxx xxx" 
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (touched.phone) validateField("phone", e.target.value);
                          }}
                          onBlur={() => handleBlur("phone")}
                          className={`w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 outline-none transition-all ${
                            touched.phone && errors.phone
                              ? "border-red-300 bg-red-50/50 focus:ring-2 focus:ring-red-200 focus:border-red-400"
                              : touched.phone && !errors.phone && phone 
                                ? "border-emerald-300 bg-emerald-50/30 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                                : "border-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
                          }`}
                        />
                        {touched.phone && errors.phone && (
                          <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email (optional - for receiving confirmation) */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-bold text-[#0f426c]">
                        Email <span className="text-gray-400 font-normal text-xs">(để nhận email xác nhận)</span>
                      </label>
                      <input 
                        id="email"
                        type="email" 
                        placeholder="email@example.com" 
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (touched.email) validateField("email", e.target.value);
                        }}
                        onBlur={() => handleBlur("email")}
                        className={`w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 outline-none transition-all ${
                          touched.email && errors.email
                            ? "border-red-300 bg-red-50/50 focus:ring-2 focus:ring-red-200 focus:border-red-400"
                            : touched.email && !errors.email && email 
                              ? "border-emerald-300 bg-emerald-50/30 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                              : "border-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
                        }`}
                      />
                      {touched.email && errors.email && (
                        <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Dịch vụ quan tâm */}
                    <div className="space-y-2 relative" ref={dropdownRef} data-error={touched.services && !!errors.services}>
                      <label className="text-sm font-bold text-[#0f426c]">
                        Dịch vụ quan tâm <span className="text-red-500">*</span>
                      </label>
                      
                      {/* Selected services tags */}
                      {selectedServices.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {selectedServices.map((service) => (
                            <span 
                              key={service}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-xs font-semibold border border-blue-100 group hover:bg-blue-100 transition-colors"
                            >
                              {service}
                              <button
                                type="button"
                                onClick={() => {
                                  const newServices = selectedServices.filter(s => s !== service);
                                  setSelectedServices(newServices);
                                  if (touched.services) validateField("services", newServices);
                                }}
                                className="w-4 h-4 rounded-full bg-blue-200 flex items-center justify-center hover:bg-red-400 hover:text-white transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Dropdown Toggle Button */}
                      <div 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 cursor-pointer flex justify-between items-center hover:bg-gray-100 transition-all ${
                          touched.services && errors.services
                            ? "border-red-300 bg-red-50/50"
                            : touched.services && !errors.services && selectedServices.length > 0
                              ? "border-emerald-300 bg-emerald-50/30"
                              : "border-transparent"
                        }`}
                      >
                        <span className={selectedServices.length > 0 ? "text-[#0f426c] font-bold" : "text-gray-500"}>
                          {selectedServices.length > 0 
                            ? `${selectedServices.length} dịch vụ đã chọn` 
                            : "Chọn giải pháp bạn cần..."}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-blue-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                      </div>

                      {touched.services && errors.services && (
                        <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {errors.services}
                        </p>
                      )}

                      {/* Dropdown Content */}
                      <div className={`absolute top-full left-0 right-0 mt-2 z-50 border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ${isDropdownOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                        <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200">
                          {categories.map((cat) => {
                            const isOpen = openCategory === cat.id;
                            return (
                                <div key={cat.id} className="border-b last:border-0 border-gray-100">
                                {/* Nút bấm tiêu đề Danh mục cha */}
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenCategory(isOpen ? null : cat.id);
                                    }}
                                    className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-all ${isOpen ? "bg-gray-50 text-[#3087fe]" : "hover:bg-gray-50 text-[#0f426c]"}`}
                                >
                                    <span className="font-bold uppercase text-xs tracking-wider">{cat.name}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180 text-[#3087fe]" : "text-gray-400"}`} />
                                </div>

                                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 bg-transparent"}`}>
                                    <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                                    {cat.products.map((prod) => (
                                        <div
                                        key={prod}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedServices(prev => {
                                                let newServices: string[];
                                                if (prev.includes(prod)) {
                                                  newServices = prev.filter(s => s !== prod);
                                                } else if (prev.length >= 5) {
                                                  alert("Bạn chỉ được chọn tối đa 5 dịch vụ (bao gồm cả phần mềm và phần cứng)!");
                                                  return prev;
                                                } else {
                                                  newServices = [...prev, prod];
                                                }
                                                // Clear services error when selecting
                                                if (touched.services) {
                                                  validateField("services", newServices);
                                                }
                                                return newServices;
                                            });
                                        }}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
                                        >
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${selectedServices.includes(prod) ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}>
                                            {selectedServices.includes(prod) && <Check className="w-3 h-3 text-white stroke-[3]" />}
                                        </div>
                                        <span className={`text-sm ${selectedServices.includes(prod) ? "text-blue-700 font-bold" : "text-gray-600"}`}>
                                            {prod}
                                        </span>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                                </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-bold text-[#0f426c]">Nội dung tin nhắn</label>
                      <textarea 
                        id="message"
                        rows={4} 
                        placeholder="Hãy chia sẻ chi tiết nhu cầu của bạn..." 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-300 outline-none transition-all resize-none"
                      ></textarea>
                    </div>

                    {/* Agreement Checkbox */}
                    <div className="flex items-start gap-3 px-1 py-1" data-error={touched.fullName && !agreed && errors.agreement}>
                      <div className="relative flex items-center mt-1">
                        <input
                          type="checkbox"
                          id="agreement"
                          checked={agreed}
                          onChange={(e) => {
                            setAgreed(e.target.checked);
                            if (touched.fullName) {
                              const newErrors = { ...errors };
                              if (e.target.checked) delete newErrors.agreement;
                              else newErrors.agreement = "Vui lòng đồng ý với chính sách của chúng tôi";
                              setErrors(newErrors);
                            }
                          }}
                          className="peer appearance-none w-5 h-5 rounded-md border-2 border-gray-300 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                        />
                        <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity stroke-[4]" />
                      </div>
                      <label htmlFor="agreement" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                        Tôi đồng ý với <Link href="/thong-tin/chinh-sach-bao-mat" className="text-blue-500 hover:underline font-medium">Chính sách bảo mật</Link> và cho phép SOF liên hệ qua thông tin đã cung cấp.
                        {touched.fullName && !agreed && errors.agreement && (
                          <span className="block text-red-500 text-xs mt-1 animate-in fade-in slide-in-from-left-1 duration-200">
                             * Bạn cần tích chọn ô này để tiếp tục
                          </span>
                        )}
                      </label>
                    </div>

                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-8 rounded-2xl text-white font-bold text-lg shadow-xl shadow-blue-100 flex items-center justify-center gap-3 transition-all ${
                        isSubmitting 
                          ? "bg-gray-400 cursor-not-allowed" 
                          : "bg-[#0f426c] hover:bg-[#1a5b8e] hover:gap-5"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Đang gửi yêu cầu...
                        </>
                      ) : (
                        <>
                          Gửi yêu cầu ngay <Send className="w-5 h-5" />
                        </>
                      )}
                    </Button>

                    {/* Required fields note */}
                    <p className="text-center text-xs text-gray-400 mt-2">
                      <span className="text-red-400">*</span> Trường bắt buộc. Thông tin của bạn được bảo mật tuyệt đối.
                    </p>
                  </form>
                </div>
              </div>
                        
            </div>
          </section>

<section className="py-10 px-4 bg-transparent -mt-12 relative z-20"> 
            {/* Giải thích: py-10 giúp giảm khoảng cách trên dưới, -mt-12 kéo phần này lên sát Form */}
            
            <div className="max-w-7xl mx-auto">
              {/* Header của phần Hỗ trợ nhanh */}
              <div className="text-center mb-10"> 
                <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-[12px] font-bold mb-3">
                  Hỗ trợ nhanh
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-[#0f426c] mb-3">
                  Bạn có thể tự tìm câu trả lời
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-base">
                  Khám phá các tài nguyên hữu ích hoặc liên hệ trực tiếp với chúng tôi.
                </p>
              </div>

              {/* Grid 3 thẻ giữ nguyên Form nhưng xích lại gần nhau hơn */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
                
                {/* Câu hỏi thường gặp */}
                <div className="bg-white rounded-3xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-100 text-center flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#3b82f6] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-100">
                    <HelpCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#0f426c] mb-3">Câu hỏi thường gặp</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    Tìm câu trả lời nhanh cho các thắc mắc phổ biến.
                  </p>
                  <Link href="/thong-tin/cau-hoi-thuong-gap">
                    <Button variant="outline" className="border-[#0f426c] text-[#0f426c] hover:bg-gray-50 rounded-lg px-8 font-bold">
                      Xem FAQ
                    </Button>
                  </Link>
                </div>

                {/* Video hướng dẫn */}
                <div className="bg-white rounded-3xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-100 text-center flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#ef4444] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-100">
                    <Video className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#0f426c] mb-3">Video hướng dẫn</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    Xem video hướng dẫn sử dụng chi tiết từng tính năng.
                  </p>
                  <Link href="/thong-tin/video-huong-dan">
                    <Button variant="outline" className="border-[#0f426c] text-[#0f426c] hover:bg-gray-50 rounded-lg px-8 font-bold">
                      Xem video
                    </Button>
                  </Link>
                </div>

                {/* Tài liệu hướng dẫn */}
                <div className="bg-white rounded-3xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-100 text-center flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#22c55e] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-100">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#0f426c] mb-3">Tài liệu hướng dẫn</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    Tài liệu chi tiết về cài đặt và sử dụng phần mềm.
                  </p>
                  <Link href="/thong-tin/tai-lieu-huong-dan">
                    <Button variant="outline" className="border-[#0f426c] text-[#0f426c] hover:bg-gray-50 rounded-lg px-8 font-bold">
                      Xem tài liệu
                    </Button>
                  </Link>
                </div>

              </div>
            </div>
          </section>
        </main>
      </div>

      {/* 3. FOOTER */}
      <Footer />
    </div>
  );
}