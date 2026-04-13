"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { faqService, FAQ } from "@/services/faqService";

const INITIAL_VISIBLE_COUNT = 4;

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [faqs, setFaqs] = useState<Array<{ question: string; answer: string }>>([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        async function loadFAQ() {
            try {
                console.log('FAQSection: Loading homepage FAQ...');
                const data = await faqService.getFAQByProduct(0);
                console.log('FAQSection: Received FAQ data:', data);
                if (data && data.length > 0) {
                    setFaqs(data);
                    console.log('FAQSection: FAQ state updated with', data.length, 'items');
                }
            } catch (error) {
                console.error('FAQSection: Error loading homepage FAQ:', error);
            } finally {
                setLoading(false);
            }
        }
        loadFAQ();
    }, []);

    // Số lượng FAQ hiển thị dựa trên showAll
    const displayedFaqs = showAll ? faqs : faqs.slice(0, INITIAL_VISIBLE_COUNT);
    const remainingCount = faqs.length - INITIAL_VISIBLE_COUNT;
    const hasMore = faqs.length > INITIAL_VISIBLE_COUNT;

    return (
        <section className="py-6 sm:py-8 lg:py-10 relative bg-[var(--sof-card-bg)]">
            <div className="container mx-auto px-3 sm:px-4 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-12" data-aos="fade-up">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[var(--sof-primary)]">
                            Hỏi đáp cùng <span className="text-[var(--sof-accent)]">SOF</span>
                        </h2>
                        <p className="text-sm sm:text-base text-[var(--sof-text-muted)] px-3">
                            Chúng tôi đã tổng hợp những câu hỏi thường gặp nhất từ khách hàng.{" "}
                            <a href="#" className="text-[var(--sof-primary)] hover:underline font-medium">
                                Liên hệ ngay
                            </a>{" "}
                            nếu vẫn còn câu hỏi.
                        </p>
                    </div>

                    {/* FAQ List */}
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-[var(--sof-primary)]" />
                            <span className="ml-3 text-[var(--sof-text-muted)]">Đang tải câu hỏi...</span>
                        </div>
                    ) : faqs.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-[var(--sof-text-muted)]">Chưa có câu hỏi nào được cập nhật.</p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-3 sm:space-y-4">
                                {displayedFaqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        data-aos="fade-up"
                                        data-aos-delay={index * 40}
                                        className="bg-[#edf5fc] rounded-full overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <button
                                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                            className="w-full flex items-center justify-between p-5 sm:p-7 text-left hover:bg-[var(--sof-secondary)]/50 transition-colors"
                                        >
                                            <span className="font-medium text-[var(--sof-primary)] pr-4 sm:pr-6 text-base sm:text-lg">
                                                {faq.question}
                                            </span>
                                            <ChevronDown
                                                className={`w-4 h-4 sm:w-5 sm:h-5 text-[var(--sof-text-muted)] flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {/* Answer Content - Animated */}
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                                }`}
                                        >
                                            <div className="px-5 pb-5 sm:px-7 sm:pb-7">
                                                <p className="text-[var(--sof-text-muted)] leading-relaxed text-sm sm:text-base">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Show More / Show Less Button */}
                            {hasMore && (
                                <div className="text-center mt-6 sm:mt-8" data-aos="fade-up">
                                    <button
                                        onClick={() => setShowAll(!showAll)}
                                        className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[var(--sof-primary)]/10 hover:bg-[var(--sof-primary)]/20 text-[var(--sof-primary)] font-medium rounded-full transition-all duration-300 text-sm sm:text-base"
                                    >
                                        {showAll ? (
                                            <>
                                                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                                                Thu gọn
                                            </>
                                        ) : (
                                            <>
                                                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                                                Xem thêm {remainingCount} câu hỏi
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};
