'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Monitor, Cpu, Server, Globe2, ArrowRight, Zap, Sparkles } from 'lucide-react';

const services = [
  {
    id: 'AboutSection',
    icon: <Monitor className="w-8 h-8" />,
    color: 'blue',
    title: 'Giải pháp Phần mềm',
    description: 'ERP, HRM, CRM, POS thông minh tích hợp AI cho đa ngành nghề.',
    link: '/AboutSection'
  },
  {
    id: 'HardwareSection',
    icon: <Cpu className="w-8 h-8" />,
    color: 'teal',
    title: 'Thiết bị Phần cứng',
    description: 'Máy bán hàng POS, hệ thống in ấn và kiểm soát an ninh toàn diện.',
    link: '/HardwareSection'
  },
  {
    id: 'InfrastructureSection',
    icon: <Server className="w-8 h-8" />,
    color: 'orange',
    title: 'Hạ tầng & AI',
    description: 'Server phân tán mạnh mẽ, Chatbot AI và tự động hóa quy trình IoT.',
    link: '/InfrastructureSection'
  },
  {
    id: 'MarketingSection',
    icon: <Globe2 className="w-8 h-8" />,
    color: 'red',
    title: 'Marketing & Website',
    description: 'Thiết kế nhận diện số, Website Premium và chiến lược SEO đột phá.',
    link: '/MarketingSection'
  },
];

export default function CoreServices() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const colors: Record<string, string> = {
    blue: 'from-blue-500/20 to-blue-600/5 text-blue-600 shadow-blue-500/20',
    teal: 'from-teal-500/20 to-teal-600/5 text-teal-600 shadow-teal-500/20',
    orange: 'from-orange-500/20 to-orange-600/5 text-orange-500 shadow-orange-500/20',
    red: 'from-red-500/20 to-red-600/5 text-red-500 shadow-red-500/20',
  };

  return (
    <section className="w-full py-24 px-4 lg:px-8 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-400/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-red-400/5 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100 shadow-sm animate-pulse">
             <Zap className="w-3 h-3" /> Our Core Pillars
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1e619d] leading-tight">
            Nền Tảng <span className="text-red-500">Tăng Trưởng</span> Bền Vững
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            Hệ sinh thái tích hợp giúp doanh nghiệp vận hành liền mạch từ quản trị đến tiếp cận khách hàng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <Link
              href={service.link}
              key={service.id}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className={`
                relative p-10 rounded-[3rem] transition-all duration-700 cursor-pointer group flex flex-col justify-between
                bg-white/40 backdrop-blur-md border border-white/80 shadow-2xl
                hover:shadow-[0_40px_80px_rgba(30,97,157,0.15)] hover:-translate-y-4
              `}
            >
              {/* Animated Glow Backgroup */}
              <div className={`
                absolute inset-0 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${colors[service.color]}
              `}></div>

              <div className="relative z-10 flex-grow">
                {/* Icon wrapper */}
                <div className={`
                  w-20 h-20 rounded-[1.8rem] flex items-center justify-center mb-8 transition-all duration-500
                  bg-white shadow-xl group-hover:scale-110 group-hover:rotate-3
                  ${hoveredId === service.id ? colors[service.color].split(' ')[2] : 'text-gray-400'}
                `}>
                  {service.icon}
                </div>

                <h3 className="text-2xl font-black text-[#1e619d] mb-4 group-hover:text-black transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-500 font-medium leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                  {service.description}
                </p>
              </div>

              <div className="relative z-10 mt-auto">
                <div
                  className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[2px] text-gray-400 group-hover:text-red-500 transition-all pointer-events-none"
                >
                  Khám phá <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}