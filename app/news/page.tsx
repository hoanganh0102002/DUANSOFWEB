"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/services/apiClient";
import { Newspaper, Calendar, ChevronRight, Search, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getMediaUrl } from "@/services/productService";

// Import các thành phần của bạn
import Header from "@/components/Header";
import Footer from "@/components/FooterNextjs";
import BackgroundDecor from "@/components/BackgroundDecor";

interface NewsItem {
    maTinTuc: string;
    maLoai: string;
    chuDe: string;
    hinhAnh: string;
    ngayTao: string;
    thuTu: string;
    tinMoi: string;
    moTaNgan: string;
}

const featuredNews = [
    {
        maTinTuc: "news-01",
        chuDe: "Tìm hiểu Laptop AI – So sánh Laptop AI với Laptop thường",
        moTaNgan: "Các chuyên gia dinh dưỡng đã chỉ ra rằng: Hàu biển là loại động vật giàu kẽm nhất, mỗi 100g hàu tươi có chứa đến 25mg kẽm (trong 100g thịt chỉ là 5,2mg và 0,8mg...",
        hinhAnh: "/hinhanh/news-generative-ai.svg",
        ngayTao: "2011-03-01",
        tinMoi: "1"
    },
    {
        maTinTuc: "news-02",
        chuDe: "Tác Động của AI Đến Ngành Bán Lẻ và Ngân Hàng tại Việt Nam",
        moTaNgan: "Trí tuệ nhân tạo (AI) đang ngày càng trở thành yếu tố quan trọng trong việc chuyển mình của nhiều ngành công nghiệp, đặc biệt là bán lẻ và ngân hàng.",
        hinhAnh: "/hinhanh/news-banking.svg",
        ngayTao: "2011-03-01",
        tinMoi: "0"
    },
    {
        maTinTuc: "news-03",
        chuDe: "Martech là gì? Tại sao học ngành marketing nên biết?",
        moTaNgan: "Trong kỷ nguyên số hóa, marketer không chỉ cần giỏi sáng tạo mà còn phải am hiểu công nghệ. Đây chính là lý do Martech (Marketing Technology) trở thành một...",
        hinhAnh: "/hinhanh/news-martech.svg",
        ngayTao: "2011-03-01",
        tinMoi: "0"
    },
    {
        maTinTuc: "news-04",
        chuDe: "Gamma AI là gì? Cách tạo slide chuyên nghiệp chỉ trong vài phút",
        moTaNgan: "Bạn đã bao giờ mất hàng giờ đồng hồ để thiết kế một bài thuyết trình, chỉ để nhận ra layout trông lộn xộn? Gamma AI sẽ giúp tự động hóa quá trình sáng tạo slide.",
        hinhAnh: "/hinhanh/news-gamma.svg",
        ngayTao: "2011-03-02",
        tinMoi: "0"
    },
    {
        maTinTuc: "news-05",
        chuDe: "VoiceGPT là gì? Giới thiệu tính năng và cách cài đặt sử dụng Voice GPT",
        moTaNgan: "Trong thời đại công nghệ phát triển vượt bậc, việc tương tác bằng giọng nói ngày càng phổ biến. VoiceGPT mang lại trải nghiệm giao tiếp với AI tự nhiên nhất.",
        hinhAnh: "/hinhanh/news-voicegpt.svg",
        ngayTao: "2011-03-02",
        tinMoi: "0"
    },
    {
        maTinTuc: "news-06",
        chuDe: "Middlewares – Sự tùy biến trong ứng dụng phần mềm",
        moTaNgan: "Đối với mô hình client – server nói chung và một mô hình kiến trúc phần mềm, middlewares đóng vai trò nhưng một lớp cầu nối định tuyến giao tiếp trung gian.",
        hinhAnh: "/hinhanh/news-middleware.svg",
        ngayTao: "2011-03-02",
        tinMoi: "0"
    }
];

export default function NewsPage() {
    const [newsList, setNewsList] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        const fetchNews = async () => {
            try {
                const response = await apiRequest<NewsItem[]>("wb_lv0012", "data");
                if (mounted) {
                    // Nếu API trả về thành công thì dùng dữ liệu thực, không thì dùng dữ liệu mẫu
                    if (response.success && response.data && response.data.length > 0) {
                        setNewsList(response.data);
                    } else {
                        console.warn("API không trả về dữ liệu, đang sử dụng News mẫu.");
                        setNewsList(featuredNews as any);
                    }
                }
            } catch (error) {
                console.error("Lỗi tải tin tức từ API, hiển thị dữ liệu mẫu:", error);
                if (mounted) setNewsList(featuredNews as any);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };
        fetchNews();
        return () => { mounted = false; };
    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* 1. Header Component */}
            <Header />

            <div className="relative flex-grow">
                {/* Background trang trí */}
                <BackgroundDecor />

                <main className="relative z-10 pt-16 pb-20">
                    <div className="container mx-auto px-4 lg:px-8">
                        
                        {/* News Header Section */}
                        <header className="mb-16 text-center max-w-3xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
                                <Tag className="w-4 h-4 text-blue-600" />
                                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">News Center</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f426c] mb-6 leading-tight">
                                News & <span className="text-blue-500">Events</span>
                            </h1>
                            <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
                                Cập nhật những xu hướng chuyển đổi số và giải pháp quản trị doanh nghiệp mới nhất từ SOF.
                            </p>
                        </header>

                        {/* News Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {isLoading ? (
                                [1, 2, 3].map((i) => (
                                    <div key={i} className="bg-white rounded-3xl h-[450px] animate-pulse border border-gray-100 shadow-sm"></div>
                                ))
                            ) : (
                                (() => {
                                    // Gộp và loại bỏ trùng lặp theo maTinTuc
                                    const merged = [...featuredNews, ...(newsList || [])];
                                    const seen = new Set<string>();
                                    const unique = merged.filter(item => {
                                        if (seen.has(item.maTinTuc)) return false;
                                        seen.add(item.maTinTuc);
                                        return true;
                                    });
                                    return unique;
                                })().map((item, index) => (
                                    <Link
                                        href={`/news/${item.maTinTuc}`}
                                        key={`${item.maTinTuc}-${index}`}
                                        className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                                    >
                                        <div className="relative h-64 overflow-hidden">
                                            <Image
                                                src={item.hinhAnh.startsWith('/') ? item.hinhAnh : getMediaUrl(item.hinhAnh)}
                                                alt={item.chuDe}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>

                                        <div className="p-8 flex-grow flex flex-col">
                                            <div className="flex items-center gap-4 text-gray-400 text-xs font-bold mb-4">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-4 h-4 text-blue-500" />
                                                    <span>{item.ngayTao.split(' ')[0]}</span>
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-extrabold text-[#0f426c] mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {item.chuDe}
                                            </h3>
                                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                                                {item.moTaNgan}
                                            </p>
                                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-blue-600 font-bold text-sm">
                                                Read More <ChevronRight className="w-4 h-4 ml-1" />
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {/* 3. Footer Component */}
            <Footer />
        </div>
    );
}