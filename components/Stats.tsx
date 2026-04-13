import React from 'react';

export default function Stats() {
  return (
    // Dùng w-full và flex justify-center để ép thẻ nằm chính giữa màn hình tuyệt đối
    <section className="w-full flex justify-center px-4 lg:px-8 relative z-20 -mt-12 mb-20">
      <div className="w-full max-w-6xl bg-white rounded-[20px] shadow-[0_15px_50px_rgba(0,0,0,0.08)] py-10 px-4 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
        
        <div className="text-center flex flex-col items-center justify-center">
          <div className="text-[40px] font-extrabold text-[#1e619d] mb-2 leading-none">15+</div>
          <div className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">Five years of experience</div>
        </div>

        <div className="text-center flex flex-col items-center justify-center">
          <div className="text-[40px] font-extrabold text-[#1e619d] mb-2 leading-none">500+</div>
          <div className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">Project implementation</div>
        </div>

        <div className="text-center flex flex-col items-center justify-center">
          <div className="text-[40px] font-extrabold text-[#1e619d] mb-2 leading-none">300+</div>
          <div className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">Businesses</div>
        </div>

        <div className="text-center flex flex-col items-center justify-center">
          <div className="text-[40px] font-extrabold text-[#1e619d] mb-2 leading-none">24/7</div>
          <div className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">Technical support</div>
        </div>

      </div>
    </section>
  );
}