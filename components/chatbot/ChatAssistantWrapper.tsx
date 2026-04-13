"use client";

import { usePathname } from "next/navigation";
import ChatAssistant from "./ChatAssistant";

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
