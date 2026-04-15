"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Loader2, 
  Minus,
  Maximize2
} from "lucide-react";

interface Message {
  id: number;
  session_id: number;
  sender_type: "user" | "admin";
  message: string;
  created_at: string;
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visitorId, setVisitorId] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize visitor ID and session
  useEffect(() => {
    let vid = localStorage.getItem("sof_chat_visitor_id");
    if (!vid) {
      vid = "v_" + Math.random().toString(36).substring(2, 11);
      localStorage.setItem("sof_chat_visitor_id", vid);
    }
    setVisitorId(vid);

    const initSession = async () => {
      try {
        const res = await fetch("/api/chat/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitor_id: vid })
        });
        const data = await res.json();
        if (data.success) {
          setSession(data.data);
        }
      } catch (e) {
        console.error("Chat init error:", e);
      }
    };

    initSession();
  }, []);

  // Polling for messages
  useEffect(() => {
    if (!session || !isOpen || isMinimized) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat/messages?session_id=${session.id}`);
        const data = await res.json();
        if (data.success) {
          // Chỉ update nếu có sự thay đổi về số lượng tin nhắn
          if (data.data.length !== messages.length) {
            setMessages(data.data);
          }
        }
      } catch (e) {
        console.error("Fetch messages error:", e);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [session, isOpen, isMinimized, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || !session || isLoading) return;

    const msg = inputValue.trim();
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: session.id,
          sender_type: "user",
          message: msg
        })
      });
      const data = await res.json();
      if (data.success) {
        // Refresh messages immediately
        const resMsg = await fetch(`/api/chat/messages?session_id=${session.id}`);
        const dataMsg = await resMsg.json();
        if (dataMsg.success) setMessages(dataMsg.data);
      }
    } catch (e) {
      console.error("Send message error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all z-50 animate-bounce cursor-pointer group"
      >
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">1</span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-[350px] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col z-50 overflow-hidden border border-gray-100 transition-all ${isMinimized ? 'h-16' : 'h-[500px]'}`}>
      {/* Header */}
      <div className="bg-[#0c3151] p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center">
             <User className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold">Hỗ trợ trực tuyến</h4>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] text-blue-200">Đang trực tuyến</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 space-y-4">
            <div className="text-center py-2">
               <span className="text-[10px] bg-gray-200 text-gray-500 px-3 py-1 rounded-full uppercase font-bold tracking-widest">Hôm nay</span>
            </div>
            
            <div className="flex items-start gap-2 max-w-[80%]">
               <div className="w-6 h-6 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center text-blue-600">
                  <User className="w-3.5 h-3.5" />
               </div>
               <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <p className="text-xs text-gray-700 leading-relaxed">Chào mừng bạn đến với SOF! Bạn cần tư vấn về giải pháp ERP hay thiết bị POS ạ?</p>
               </div>
            </div>

            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender_type === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm text-xs leading-relaxed ${
                  m.sender_type === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none'
                }`}>
                  {m.message}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100">
            <div className="relative group">
               <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-[13px] focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-1.5 top-1.5 w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[9px] text-center text-gray-400 mt-3 font-medium uppercase tracking-[0.1em]">Đội ngũ SOF sẵn sàng hỗ trợ bạn</p>
          </form>
        </>
      )}
    </div>
  );
};
