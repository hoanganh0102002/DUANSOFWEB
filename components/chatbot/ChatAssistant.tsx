"use client";

import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, Send, X, MessageCircle, User, Loader2, Mic, MicOff, Copy, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

const QUICK_QUESTIONS = [
  "Tư vấn giải pháp ERP",
  "Máy POS iMin D4 giá bao nhiêu?",
  "Chấm công bằng FaceID AI",
  "Liên hệ hỗ trợ kỹ thuật"
];

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Khởi tạo Speech Recognition
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
      alert("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).speechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  // Load tin nhắn từ localStorage khi khởi chạy
  useEffect(() => {
    const savedMessages = localStorage.getItem('sof_chat_history');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([
        { 
          role: 'assistant', 
          content: 'Dạ, SOF xin nghe ạ! 👋 Tôi là trợ lý AI chuyên về tư vấn chuyển đổi số. Bạn cần tôi tư vấn về sản phẩm nào của SOF hôm nay không?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, []);

  // Lưu tin nhắn vào localStorage mỗi khi có thay đổi
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('sof_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Hiển thị tooltip sau 3 giây để mời gọi khách hàng
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: Message = { role: 'user', content, timestamp: time };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);
    setShowTooltip(false);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();
      const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      if (data.text) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text, timestamp: aiTime }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Hệ thống đang bận một chút, mời bạn thử lại nhé!", timestamp: aiTime }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Kết nối bị gián đoạn. Bạn kiểm tra lại internet nhé!" }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end font-sans group/global">
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(25px, -40px) scale(1.1); }
          66% { transform: translate(-15px, 15px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite alternate; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .glass-border-glow {
          box-shadow: 0 0 15px rgba(0, 102, 204, 0.15), inset 0 0 15px rgba(255, 255, 255, 0.5);
        }
        .shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .markdown-content p { margin-bottom: 0.5rem; }
        .markdown-content p:last-child { margin-bottom: 0; }
        .markdown-content ul, .markdown-content ol { padding-left: 1.25rem; margin-top: 0.5rem; }
        .markdown-content li { margin-bottom: 0.25rem; }
      `}</style>

      {/* Tooltip chào mời - nhỏ gọn */}
      {showTooltip && !isOpen && (
        <div className="mb-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-blue-100/50 text-[13px] text-[#003366] font-bold animate-bounce relative z-20 cursor-pointer" onClick={() => setIsOpen(true)}>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
             SOF có thể hỗ trợ gì ạ?
          </span>
          <div className="absolute -bottom-1 right-6 w-2 h-2 bg-white/95 border-r border-b border-blue-100/50 rotate-45" />
        </div>
      )}

      {/* Cửa sổ Chat */}
      {isOpen && (
        <div className="mb-4 w-[360px] h-[600px] bg-white/85 backdrop-blur-3xl border border-white/50 rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,30,60,0.15)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-500 glass-border-glow relative">
          
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0 text-blue-400">
            <div className="absolute top-[-5%] left-[-5%] w-40 h-40 bg-current rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
            <div className="absolute top-[15%] right-[-5%] w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          </div>

          {/* Header */}
          <div className="p-5 bg-gradient-to-br from-[#001e3c] via-[#004080] to-[#0066cc] text-white flex items-center justify-between relative overflow-hidden z-10 shadow-md">
            <div className="absolute inset-0 shimmer opacity-10" />
            
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="relative">
                <div className="absolute -inset-1 bg-blue-400/30 rounded-xl blur animate-pulse" />
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 rotate-2 relative shadow-lg">
                  <Bot className="w-6 h-6 text-blue-50" />
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#001e3c]" />
                </div>
              </div>
              <div>
                <h3 className="font-black text-sm tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-50 uppercase leading-none">
                  SOF AI CONSULTANT
                </h3>
                <span className="block text-[9px] text-blue-100/60 font-bold uppercase tracking-widest mt-1">
                  AI đang trực tuyến
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 relative z-10">
              <button 
                onClick={() => {
                  if(confirm("Xóa lịch sử trò chuyện này?")) {
                    localStorage.removeItem('sof_chat_history');
                    setMessages([{ role: 'assistant', content: 'Dạ, SOF đã sẵn sàng hỗ trợ lại từ đầu ạ!', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
                  }
                }}
                className="p-2 hover:bg-white/20 rounded-xl transition-all active:scale-75 text-white/70 hover:text-white"
                title="Xóa lịch sử"
              >
                <div className="w-4 h-4"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/></svg></div>
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-xl transition-all active:scale-75"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-blue-100/30 scrollbar-track-transparent relative z-10"
          >
            {messages.map((msg, idx) => (
              <div 
                key={idx}
                className={clsx(
                  "flex gap-3 max-w-[95%] animate-in fade-in slide-in-from-bottom-2 duration-300 relative group/msg",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={clsx(
                  "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover/msg:scale-110",
                  msg.role === 'assistant' 
                    ? "bg-white text-[#003366] border border-blue-50" 
                    : "bg-gradient-to-br from-blue-700 to-indigo-800 text-white"
                )}>
                  {msg.role === 'user' ? <User className="w-4.5 h-4.5" /> : <Bot className="w-4.5 h-4.5" />}
                </div>
                <div className="flex flex-col gap-1">
                  <div className={clsx(
                    "p-3.5 rounded-2xl text-[13px] shadow-sm leading-relaxed relative",
                    msg.role === 'assistant' 
                      ? "bg-white/90 backdrop-blur-sm border border-blue-50 text-slate-700 rounded-tl-none pr-10" 
                      : "bg-gradient-to-br from-[#003366] via-[#004d99] to-[#0060c0] text-white rounded-tr-none"
                  )}>
                    <div className="markdown-content">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                    {msg.role === 'assistant' && (
                      <button 
                        onClick={() => copyToClipboard(msg.content, idx)}
                        className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-blue-600 transition-colors opacity-0 group-hover/msg:opacity-100"
                        title="Sao chép"
                      >
                        {copiedIndex === idx ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                  {msg.timestamp && (
                    <span className={clsx(
                      "text-[10px] text-slate-400 font-medium",
                      msg.role === 'user' ? "text-right" : "text-left"
                    )}>
                      {msg.timestamp}
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-xl bg-white border border-blue-50 flex items-center justify-center shrink-0 shadow-sm">
                  <Bot className="w-4.5 h-4.5 text-[#003366]" />
                </div>
                <div className="px-4 py-3 bg-white/90 rounded-2xl rounded-tl-none shadow-sm flex items-center">
                  <div className="flex gap-1.5 focus:outline-none">
                    <span className="w-1 h-1.5 bg-[#003366]/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-1.5 bg-[#003366]/30 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                    <span className="w-1 h-1.5 bg-[#003366]/30 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-5 py-3 bg-white/30 border-t border-white/20 relative z-10 overflow-x-auto no-scrollbar">
              <div className="flex gap-2.5 pb-0.5">
                {QUICK_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="whitespace-nowrap px-4 py-2 text-[11px] bg-white border border-blue-100/50 rounded-full text-[#003366] font-bold hover:bg-[#003366] hover:text-white transition-all shadow-sm active:scale-95"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-5 bg-white backdrop-blur-md border-t border-slate-100 relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
              className="relative flex items-center gap-2"
            >
              <div className="relative flex-1 group">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Hỏi SOF về POS, ERP..."
                  className="w-full pl-4 pr-10 py-3.5 bg-slate-50 border-none rounded-2xl text-[13px] font-medium focus:outline-none focus:ring-1 focus:ring-blue-600/10 transition-all shadow-inner placeholder:text-slate-400 group-hover:bg-slate-100"
                />
                <button 
                  type="button"
                  onClick={startListening}
                  className={clsx(
                    "absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all",
                    isListening ? "text-red-500 animate-pulse bg-red-50" : "text-slate-400 hover:text-[#003366]"
                  )}
                  title="Gửi bằng giọng nói"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-3.5 bg-gradient-to-br from-[#003366] to-[#0066cc] disabled:from-slate-200 disabled:to-slate-300 text-white rounded-2xl shadow-lg active:scale-90 transition-all hover:shadow-blue-900/10 group/send"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 transition-transform group-hover/send:translate-x-0.5 group-hover/send:-translate-y-0.5" />}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setShowTooltip(false); }}
        className={clsx(
          "w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-[0_15px_45px_rgba(0,51,102,0.4)] transition-all duration-700 hover:scale-110 active:scale-90 group relative z-50",
          isOpen ? "bg-white text-[#001e3c] rotate-180" : "bg-gradient-to-tr from-[#001e3c] via-[#004080] to-[#0066cc] text-white"
        )}
      >
        {isOpen ? <X className="w-8 h-8" /> : (
          <div className="relative">
            <MessageCircle className="w-9 h-9" />
            <div className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
