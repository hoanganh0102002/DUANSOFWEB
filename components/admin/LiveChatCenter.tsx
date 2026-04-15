"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  MessageSquare, 
  User, 
  Send, 
  CheckCheck, 
  Circle,
  MoreVertical,
  X,
  Loader2,
  Trash2
} from "lucide-react";

interface Session {
  id: number;
  visitor_id: string;
  name: string;
  email: string;
  status: 'active' | 'ended';
  last_message_at: string;
}

interface Message {
  id: number;
  session_id: number;
  sender_type: "user" | "admin";
  message: string;
  created_at: string;
}

export const LiveChatCenter = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load sessions
  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/chat/sessions");
      const data = await res.json();
      if (data.success) {
        setSessions(data.data);
      }
    } catch (e) {
      console.error("Fetch sessions error:", e);
    }
  };

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 5000);
    return () => clearInterval(interval);
  }, []);

  // Load messages for active session
  useEffect(() => {
    if (!activeSession) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat/messages?session_id=${activeSession.id}`);
        const data = await res.json();
        if (data.success) {
          setMessages(data.data);
          setIsInitialLoad(false);
        }
      } catch (e) {
        console.error("Fetch messages error:", e);
        setIsInitialLoad(false);
      }
    };

    setIsInitialLoad(true);
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [activeSession]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || !activeSession || isLoading) return;

    const msg = inputValue.trim();
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: activeSession.id,
          sender_type: "admin",
          message: msg
        })
      });
      const data = await res.json();
      if (data.success) {
        const resMsg = await fetch(`/api/chat/messages?session_id=${activeSession.id}`);
        const dataMsg = await resMsg.json();
        if (dataMsg.success) setMessages(dataMsg.data);
      }
    } catch (e) {
      console.error("Send message error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSessions = sessions.filter(s => 
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.visitor_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex bg-[#0f1729] rounded-[2.5rem] overflow-hidden border border-white/10 h-[700px] animate-in fade-in duration-500">
      {/* Sidebar: Session List */}
      <div className="w-[320px] border-r border-white/5 flex flex-col pt-4">
        <div className="px-6 mb-6">
          <div className="relative group/search">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300/20 group-focus-within/search:text-blue-500 transition-colors" />
            <input 
              placeholder="Tìm hội thoại..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/5 rounded-2xl text-[12px] text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium placeholder:text-blue-200/20 shadow-inner"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {filteredSessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-blue-200/20">
               <MessageSquare className="w-12 h-12 mb-3 opacity-20" />
               <p className="text-[10px] font-black uppercase tracking-widest text-center px-8">Chưa có hội thoại nào</p>
            </div>
          ) : (
            filteredSessions.map(session => (
              <button
                key={session.id}
                onClick={() => setActiveSession(session)}
                className={`w-full p-4 flex items-start gap-4 transition-all rounded-[2rem] group/session ${activeSession?.id === session.id ? 'bg-blue-600/20 border border-blue-500/30' : 'hover:bg-white/[0.03] border border-transparent'}`}
              >
                <div className="relative">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm border-2 transform-gpu transition-all group-hover/session:rotate-3 ${activeSession?.id === session.id ? 'bg-blue-600 border-white/20 text-white' : 'bg-[#1a2333] border-white/5 text-blue-200/40'}`}>
                    {session.name?.[0]?.toUpperCase() || 'K'}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0f1729] rounded-full animate-pulse shadow-lg shadow-emerald-500/20"></div>
                </div>
                <div className="flex-1 text-left overflow-hidden pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-black text-[13px] truncate tracking-tight transition-colors ${activeSession?.id === session.id ? 'text-white' : 'text-blue-100/60'}`}>
                       {session.name || 'Khách truy cập'}
                    </h4>
                    <span className="text-[9px] font-bold text-blue-200/20 uppercase tracking-tighter">
                      {new Date(session.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[10px] text-blue-200/30 truncate font-bold uppercase tracking-widest">
                     {session.visitor_id.substring(0, 10)}...
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white/[0.01]">
        {activeSession ? (
          <>
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-xl shadow-blue-900/40 rotate-2">
                   {activeSession.name?.[0]?.toUpperCase() || 'K'}
                </div>
                <div>
                   <h3 className="font-black text-base text-white tracking-tight leading-none mb-1.5">{activeSession.name || 'Khách truy cập'}</h3>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500/50"></div>
                      <span className="text-[10px] text-blue-200/30 font-black uppercase tracking-[0.2em]">{activeSession.visitor_id}</span>
                   </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <button className="p-2.5 bg-white/[0.03] hover:bg-white/[0.1] text-blue-200/40 hover:text-white rounded-xl transition-all"><MoreVertical className="w-5 h-5" /></button>
                 <button className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all"><Trash2 className="w-5 h-5" /></button>
                 <button onClick={() => setActiveSession(null)} className="p-2.5 bg-white/[0.03] hover:bg-red-500 text-blue-200/40 hover:text-white rounded-xl transition-all"><X className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
              {isInitialLoad && (
                 <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-40">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Đang tải cuộc hội thoại...</p>
                 </div>
              )}

              {!isInitialLoad && messages.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-20">
                   <div className="w-16 h-16 bg-white/[0.05] rounded-full flex items-center justify-center mb-2">
                     <MessageSquare className="w-8 h-8 text-blue-400" />
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Chưa có nội dung hội thoại</p>
                </div>
              )}

              {messages.map(m => (
                <div key={m.id} className={`flex ${m.sender_type === 'admin' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}>
                  <div className={`max-w-[70%] group/msg flex flex-col ${m.sender_type === 'admin' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-6 py-4 rounded-[2rem] text-[13px] font-medium leading-relaxed shadow-2xl ${
                      m.sender_type === 'admin' 
                        ? 'bg-gradient-to-br from-blue-700 to-indigo-800 text-white rounded-tr-none' 
                        : 'bg-white/[0.04] border border-white/5 text-blue-50 rounded-tl-none shadow-black/20'
                    }`}>
                      {m.message}
                    </div>
                    <div className="flex items-center gap-2 mt-2 px-2 opacity-0 group-hover/msg:opacity-100 transition-opacity">
                       <span className="text-[9px] text-blue-200/20 font-black uppercase tracking-widest">
                          {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </span>
                       {m.sender_type === 'admin' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-8 bg-white/[0.02] border-t border-white/5">
                <form onSubmit={handleSend} className="relative group/input">
                    <div className="absolute inset-0 bg-blue-500/5 blur-xl group-focus-within/input:opacity-100 opacity-0 transition-opacity"></div>
                    <textarea 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
                        }}
                        placeholder="Nhập nội dung tư vấn..."
                        rows={1}
                        className="w-full pl-8 pr-24 py-5 bg-white/[0.03] border border-white/5 rounded-[2rem] text-sm text-white font-medium focus:outline-none focus:border-blue-500/50 transition-all resize-none shadow-2xl placeholder:text-blue-200/20 relative z-10"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
                        <button 
                            type="submit"
                            disabled={isLoading || !inputValue.trim()}
                            className="w-14 h-11 bg-blue-600 hover:bg-blue-500 text-white rounded-[1.2rem] flex items-center justify-center disabled:opacity-30 disabled:grayscale transition-all shadow-xl shadow-blue-900/40 group/send"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 group-hover/send:translate-x-0.5 group-hover/send:-translate-y-0.5 transition-transform" />}
                        </button>
                    </div>
                </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-white p-20 text-center animate-in fade-in duration-1000">
             <div className="w-32 h-32 bg-white/[0.02] border border-white/5 rounded-[3.5rem] flex items-center justify-center mb-10 shadow-2xl transform-gpu hover:rotate-6 hover:scale-110 transition-all duration-700">
                <MessageSquare className="w-14 h-14 text-blue-500/30" />
             </div>
             <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Trung tâm Phàn hồi Khách hàng</h3>
             <p className="text-sm text-blue-200/30 font-bold uppercase tracking-[0.3em] max-w-sm leading-relaxed">Chọn một hội thoại để bắt đầu hỗ trợ tư vấn trực tuyến</p>
          </div>
        )}
      </div>
    </div>
  );
};
