import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import ChatAssistantWrapper from "@/components/chatbot/ChatAssistantWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SOF.VN - Giải pháp phần mềm",
  description: "SOF chuyên cung cấp giải pháp phần mềm (ERP, HRM, CRM) & phần cứng tích hợp AI, kiến tạo hạ tầng vững chắc cho bước tiến nhảy vọt của doanh nghiệp.",
  icons: {
    icon: "/hinhanh/Screenshot 2026-04-06 112651.png",
    shortcut: "/hinhanh/Screenshot 2026-04-06 112651.png",
    apple: "/hinhanh/Screenshot 2026-04-06 112651.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <Providers>
          {children}
          <ChatAssistantWrapper />
        </Providers>
      </body>
    </html>
  );
}
