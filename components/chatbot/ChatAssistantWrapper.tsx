"use client";

import { usePathname } from "next/navigation";
import dynamic from 'next/dynamic';

const ChatAssistant = dynamic(() => import("./ChatAssistant"), { 
  ssr: false,
  loading: () => null 
});

export default function ChatAssistantWrapper() {
  const pathname = usePathname();
  
  // Danh sách các trang KHÔNG hiển thị chatbot
  const hiddenRoutes = [
    '/admin',
    '/login',
    '/register',
    '/forgot-password'
  ];

  const isHidden = hiddenRoutes.some(route => pathname?.startsWith(route));

  if (isHidden) return null;
  
  return <ChatAssistant />;
}
