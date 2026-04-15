"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  MessageSquare, 
  User, 
  Send, 
  CheckCheck, 
  Clock, 
  Circle,
  MoreVertical,
  X,
  Loader2
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

export default function AdminChatPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
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
  }, [activeSession, messages.length]);

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
    s.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-100px)] bg-gray-50/50 rounded-3xl overflow-hidden border border-gray-100">
      {/* Sidebar: Session List */}
      <div className="w-[350px] bg-white border-r border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-black text-[#0c3151] mb-4">Chat Center</h2>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-2xl text-[13px] focus:ring-1 focus:ring-blue-500 transition-all font-medium"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredSessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
               <MessageSquare className="w-10 h-10 mb-2 opacity-20" />
               <p className="text-xs font-bold text-gray-300">No active chats</p>
            </div>
          ) : (
            filteredSessions.map(session => (
              <button
                key={session.id}
                onClick={() => setActiveSession(session)}
                className={`w-full p-4 flex items-start gap-4 transition-all hover:bg-blue-50/50 border-b border-gray-50 ${activeSession?.id === session.id ? 'bg-blue-50' : ''}`}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold border border-blue-200 shadow-sm">
                    {session.name?.[0]?.toUpperCase() || 'K'}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 text-left overflow-hidden">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-[13px] text-[#0c3151] truncate">{session.name || 'Anonymous Guest'}</h4>
                    <span className="text-[10px] text-gray-400">
                      {new Date(session.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate font-medium">Click to view conversation</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main: Chat View */}
      <div className="flex-1 flex flex-col bg-white">
        {activeSession ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                   {activeSession.name?.[0]?.toUpperCase() || 'K'}
                </div>
                <div>
                   <h3 className="font-bold text-[14px] text-[#0c3151]">{activeSession.name || 'Anonymous Guest'}</h3>
                   <div className="flex items-center gap-1.5">
                      <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{activeSession.visitor_id}</span>
                   </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><MoreVertical className="w-5 h-5 text-gray-400" /></button>
                 <button onClick={() => setActiveSession(null)} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 overflow-x-hidden space-y-6 bg-gray-50/30">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.sender_type === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] space-y-1 ${m.sender_type === 'admin' ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className={`p-4 rounded-3xl text-[13px] leading-relaxed shadow-sm ${
                      m.sender_type === 'admin' 
                        ? 'bg-[#0c3151] text-white rounded-tr-none' 
                        : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none'
                    }`}>
                      {m.message}
                    </div>
                    <div className="flex items-center gap-2 px-1">
                       <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                          {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </span>
                       {m.sender_type === 'admin' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-gray-100">
               <form onSubmit={handleSend} className="relative group">
                  <textarea 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Type your response..."
                    rows={1}
                    className="w-full pl-6 pr-24 py-4 bg-gray-50 border-none rounded-2xl text-[13px] font-medium focus:ring-1 focus:ring-blue-500 transition-all resize-none overflow-hidden"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                     <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition-colors"><Clock className="w-5 h-5" /></button>
                     <button 
                       type="submit"
                       disabled={isLoading || !inputValue.trim()}
                       className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20"
                     >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 translate-x-0.5 -translate-y-0.5" />}
                     </button>
                  </div>
               </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
             <div className="w-20 h-20 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-6">
                <MessageSquare className="w-10 h-10 opacity-20" />
             </div>
             <h3 className="text-xl font-black text-gray-200">Select a conversation</h3>
             <p className="text-[11px] font-bold uppercase tracking-[0.2em] mt-2">Ready to assist your customers</p>
          </div>
        )}
      </div>
    </div>
  );
}
