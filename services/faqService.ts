const API_BASE = "/api/proxy";

export interface FAQ {
  question: string;
  answer: string;
}

async function apiFetch(body: Record<string, unknown>) {
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (err) {
    console.error("faqService apiFetch error", err);
    return { success: false, data: [] };
  }
}

export const faqService = {
  /**
   * Lấy danh sách FAQ theo sản phẩm.
   * productId = 0 → FAQ trang chủ (chung)
   */
  async getFAQByProduct(productId: number): Promise<FAQ[]> {
    const json = await apiFetch({
      table: "wb_lv0501",
      func: "getFAQ",
      productId,
    });

    if (json.success && Array.isArray(json.data)) {
      return json.data.map((d: any) => ({
        question: d.cauHoi ?? d.question ?? "",
        answer: d.traLoi ?? d.answer ?? "",
      }));
    }

    // Fallback: FAQ mặc định nếu API chưa sẵn sàng
    return [
      {
        question: "SOF là gì?",
        answer:
          "SOF là hệ sinh thái phần mềm quản lý doanh nghiệp toàn diện, bao gồm phần mềm bán hàng, quản lý kho, quản lý nhân sự, và nhiều giải pháp khác.",
      },
      {
        question: "Chi phí sử dụng phần mềm SOF như thế nào?",
        answer:
          "SOF cung cấp nhiều gói dịch vụ linh hoạt phù hợp với quy mô doanh nghiệp. Bạn có thể xem bảng giá chi tiết tại trang sản phẩm hoặc liên hệ tư vấn.",
      },
      {
        question: "Tôi có thể dùng thử trước khi mua không?",
        answer:
          "Có, SOF cung cấp bản dùng thử miễn phí để bạn trải nghiệm đầy đủ tính năng trước khi quyết định.",
      },
      {
        question: "SOF hỗ trợ trên những nền tảng nào?",
        answer:
          "SOF hỗ trợ đa nền tảng bao gồm Web, Windows, iOS và Android, giúp bạn quản lý mọi lúc mọi nơi.",
      },
      {
        question: "Dữ liệu của tôi có được bảo mật không?",
        answer:
          "Tuyệt đối. SOF sử dụng mã hóa 2 lớp và lưu trữ trên hệ thống cloud an toàn, đảm bảo dữ liệu luôn được bảo vệ.",
      },
    ];
  },
};
