"use client";

import { useState } from "react";
import { MessageSquare, Settings, Users, HeadphonesIcon } from "lucide-react";
import Link from "next/link";

export const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0); // Default to first step

  const steps = [
    {
      id: 0,
      title: "Tư vấn & Khảo sát",
      icon: MessageSquare,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-500",
      shadowColor: "shadow-blue-500/20",
      step: 1,
      desc: "Tiếp nhận yêu cầu, khảo sát thực tế quy trình hoạt động của doanh nghiệp và tư vấn giải pháp công nghệ phù hợp nhất.",
    },
    {
      id: 1,
      title: "Triển khai hệ thống",
      icon: Settings,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-500",
      shadowColor: "shadow-purple-500/20",
      step: 2,
      desc: "Thiết lập môi trường, cài đặt phần mềm và cấu hình hệ thống theo đúng yêu cầu và quy trình đã thống nhất.",
    },
    {
      id: 2,
      title: "Đào tạo & chuyển giao",
      icon: Users,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-500",
      shadowColor: "shadow-orange-500/20",
      step: 3,
      desc: "Hướng dẫn sử dụng chi tiết cho từng bộ phận, bàn giao tài liệu và đảm bảo nhân sự vận hành thành thạo hệ thống.",
    },
    {
      id: 3,
      title: "Vận hành & hỗ trợ",
      icon: HeadphonesIcon,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-500",
      shadowColor: "shadow-emerald-500/20",
      step: 4,
      desc: "Hỗ trợ kỹ thuật, xử lý sự cố, bảo trì hệ thống và tư vấn nâng cấp tính năng theo nhu cầu phát sinh trong quá trình vận hành của doanh nghiệp.",
    }
  ];

  const currentStep = steps[activeStep];
  const CurrentIcon = currentStep.icon;

  return (
    <section className="py-20 relative overflow-hidden bg-transparent flex flex-col items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold mb-6 text-[#0f426c] inline-block relative">
            Quy trình triển khai <br />
            từ tư vấn đến vận hành
            {/* Lively decorative elements */}
            <div className="absolute -top-4 -right-8 w-6 h-6 bg-blue-400 rounded-full blur-[8px] animate-pulse opacity-50"></div>
            <div className="absolute -bottom-2 -left-4 w-4 h-4 bg-teal-400 rounded-full blur-[4px] animate-bounce opacity-60 delay-150"></div>
          </h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
          
          {/* Left Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {steps.map((step) => {
              const isActive = activeStep === step.id;
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center w-full text-left p-4 rounded-xl transition-all duration-500 border-2 relative overflow-hidden group ${
                    isActive 
                      ? 'bg-white border-[#0f426c] shadow-[0_8px_30px_rgb(0,0,0,0.08)] scale-[1.02] z-10' 
                      : 'bg-white/60 backdrop-blur-sm border-[#e0effa] hover:bg-white hover:border-[#bae0fb]'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 ${isActive ? 'opacity-20' : 'group-hover:opacity-50'} transition-opacity duration-500 pointer-events-none`}></div>
                  <div className={`w-10 h-10 rounded-lg flex flex-shrink-0 items-center justify-center shrink-0 ${step.color} text-white font-bold text-sm shadow-md transition-transform duration-500 ${isActive ? 'scale-110 shadow-lg placeholder:animate-pulse' : 'group-hover:scale-105'}`}>
                    {step.step}
                  </div>
                  <div className="ml-4 flex items-center gap-2 text-gray-700 font-medium text-sm">
                    <Icon className={`w-4 h-4 transition-all duration-300 ${isActive ? 'text-[#0f426c] scale-110' : 'text-gray-400 group-hover:text-blue-400'}`} />
                    <span className={isActive ? 'text-[#0f426c] font-bold' : ''}>
                      {step.title}
                    </span>
                  </div>
                  {isActive && (
                    <div className="ml-auto text-xs text-gray-400">
                      Đang xem
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Content Box */}
          <div className="lg:col-span-7">
            <div className={`bg-white/80 backdrop-blur-xl rounded-3xl border border-white p-10 sm:p-14 text-center flex flex-col items-center justify-center h-full min-h-[400px] shadow-[0_30px_60px_-15px_rgba(30,97,157,0.15)] transition-all duration-700 relative overflow-hidden group hover:shadow-[0_40px_80px_-20px_rgba(30,97,157,0.25)] hover:-translate-y-1`}>
              
              {/* Background Glow */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 ${currentStep.color} opacity-[0.05] rounded-full blur-[80px] transition-all duration-1000 group-hover:opacity-[0.08] animate-pulse`}></div>
              
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-[2rem] flex items-center justify-center mb-8 ${currentStep.color} text-white shadow-2xl ${currentStep.shadowColor} transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-3`}>
                  <CurrentIcon className="w-10 h-10 sm:w-12 sm:h-12 animate-[bounce_3s_infinite]" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black text-[#0f426c] mb-2 uppercase tracking-wide transition-all duration-500 transform group-hover:translate-y-[-2px]">
                  Bước {currentStep.step}
                </h3>
                
                <h4 className={`text-lg sm:text-lg font-bold mb-6 ${currentStep.textColor} transition-all duration-500 transform group-hover:translate-y-[-2px]`}>
                  {currentStep.title}
                </h4>
                
                <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed transition-all duration-500 transform group-hover:translate-y-[-2px]">
                  {currentStep.desc}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
