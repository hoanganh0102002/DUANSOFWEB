import React from 'react';
import { query } from '@/lib/db';

export default async function Stats() {
  // Lấy dữ liệu trực tiếp từ database (Mạnh mẽ & Nhanh hơn)
  let statsData = [];
  try {
    const results = await query({ 
       query: "SELECT label, value FROM site_stats ORDER BY sort_order ASC LIMIT 4" 
    }) as any[];
    statsData = results || [];
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    // Dữ liệu dự phòng nếu DB chưa kịp Migrate
    statsData = [
      { value: '15+', label: 'Fifteen years of experience' },
      { value: '500+', label: 'Project implementation' },
      { value: '300+', label: 'Businesses' },
      { value: '24/7', label: 'Technical support' }
    ];
  }

  if (!statsData || statsData.length === 0) {
      statsData = [
          { value: '15+', label: 'Fifteen years of experience' },
          { value: '500+', label: 'Project implementation' },
          { value: '300+', label: 'Businesses' },
          { value: '24/7', label: 'Technical support' }
      ];
  }

  return (
    <section className="w-full flex justify-center px-4 lg:px-8 relative z-20 mb-20">
      <div className="w-full max-w-6xl bg-white rounded-[20px] shadow-[0_15px_50px_rgba(0,0,0,0.08)] py-10 px-4 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
        
        {statsData.map((item: any, index: number) => (
          <div key={index} className="text-center flex flex-col items-center justify-center px-2">
            <div className="text-[40px] font-extrabold text-[#1e619d] mb-2 leading-none">
              {item.value || '0'}
            </div>
            <div className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">
              {item.label}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}