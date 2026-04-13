'use client';
import React from 'react';

export default function BackgroundDecor() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Enhanced Mesh Gradient Blobs - More saturated and visible */}
      <div className="absolute top-[5%] right-[-10%] w-[75%] h-[75%] bg-gradient-to-br from-blue-200/50 via-indigo-100/40 to-transparent rounded-full blur-[120px] animate-blob"></div>
      <div className="absolute top-[35%] right-[-5%] w-[55%] h-[85%] bg-blue-100/50 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-5%] left-[15%] w-[65%] h-[65%] bg-blue-200/30 rounded-full blur-[130px] animate-blob animation-delay-4000"></div>
      
      {/* Stronger highlight for the "Loan" feel */}
      <div className="absolute top-[15%] left-[5%] w-[35%] h-[45%] bg-cyan-100/30 rounded-full blur-[90px]"></div>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 2500"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Visible Gradient Path Separation */}
        <path 
           d="M 1440 0 L 1440 2500 L 100 2500 Q 700 1200 1440 700 Z" 
           fill="url(#gradient-vivid-blue)" 
           opacity="0.6"
        />

        {/* Top Left Circular Element - More defined */}
        <circle cx="0" cy="0" r="280" stroke="#d6eaff" strokeWidth="65" fill="none" opacity="0.5" />
        <circle cx="0" cy="0" r="180" stroke="#e1f0ff" strokeWidth="35" fill="none" opacity="0.4" />

        {/* Wavy Pastel Lines - More visible */}
        <path
          d="M -100 400 Q 300 350 500 550 T 1100 450"
          stroke="#b2f0f0"
          strokeWidth="3"
          fill="none"
          opacity="0.5"
          className="animate-dash"
        />

        <path
          d="M -50 800 Q 250 1000 500 850 T 900 1200"
          stroke="#eadeff"
          strokeWidth="3.5"
          fill="none"
          opacity="0.6"
        />

        <defs>
          <linearGradient id="gradient-vivid-blue" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cce3ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Particles */}
      {isMounted && (
        <div className="absolute inset-0 opacity-15">
           {[...Array(15)].map((_, i) => (
             <div 
               key={i}
               className="absolute bg-blue-400 rounded-full animate-float-particle"
               style={{
                 width: Math.random() * 3 + 2 + 'px',
                 height: Math.random() * 3 + 2 + 'px',
                 top: Math.random() * 100 + '%',
                 left: Math.random() * 100 + '%',
                 animationDuration: Math.random() * 15 + 15 + 's',
                 animationDelay: Math.random() * 10 + 's',
                 opacity: Math.random() * 0.4 + 0.1
               }}
             ></div>
           ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.15); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
        }
        @keyframes float-particle {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-400px) rotate(360deg); opacity: 0; }
        }
        .animate-blob {
          animation: blob 18s infinite alternate ease-in-out;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
