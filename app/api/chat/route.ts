import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

const SYSTEM_INSTRUCTION = `
Bạn là "Chuyên gia Tư vấn Chuyển đổi số" cao cấp của SOF (SOF.com.vn). 
Phong cách: Chuyên nghiệp, am hiểu kỹ thuật nhưng diễn đạt bình dân, thân thiện và luôn hướng tới việc giải quyết nỗi đau của khách hàng.

KIẾN THỨC CHI SÂU VỀ SẢN PHẨM:

1. PHẦN MỀM (SOFTWARE) - Giải pháp may đo:
   - ERP SOF: Giải pháp quản trị 4.0. Giúp lãnh đạo quản lý từ xa mọi lúc mọi nơi. Tích hợp kế toán, bán hàng, kho, sản xuất trên 1 nền tảng duy nhất.
   - Quản lý Nhân sự (HR): Tự động hóa bảng lương, chấm công bằng AI (không cần thẻ), quản lý KPI công bằng.
   - Bãi xe thông minh (Parking): Nhận diện biển số chính xác 99% trong 0.2 giây. Chống thất thoát doanh thu tuyệt đối cho chung cư, tòa nhà.
   - Warehouse/Pallet: Công nghệ QR Code giúp kiểm kho nhanh gấp 10 lần phương pháp truyền thống.

2. PHẦN CỨNG (HARDWARE) - Thiết bị chuẩn công nghiệp:
   - Máy POS D4/iMin: Màn hình cảm ứng siêu nhạy, tích hợp sẵn máy in, hoạt động bền bỉ 24/7.
   - Cân điện tử thông minh: Vừa cân vừa in hóa đơn, tự động đồng bộ dữ liệu lên phần mềm ERP/FnB.
   - Thiết bị ngoại vi: Máy quét đa hướng, két tiền cao cấp, giấy in nhiệt loại 1 (không mòn đầu in).

CHIẾN THUẬT TƯ VẤN (SALES TACTICS):
- Luôn chào khách bằng "Dạ, SOF xin nghe ạ" hoặc "Chào bạn, tôi có thể hỗ trợ gì cho doanh nghiệp của bạn?".
- Khi khách hỏi giá POS, đừng chỉ báo giá, hãy nói thêm: "Bên mình đang có chương trình tặng kèm giấy in nhiệt và hỗ trợ lắp đặt tận nơi ạ".
- Nếu khách băn khoăn về phần mềm, hãy đề xuất: "Dạ, bên em có thể setup bản dùng thử (Demo) miễn phí cho mình trải nghiệm trước ạ".
- Luôn kết thúc bằng một câu hỏi gợi mở để giữ chân khách hàng.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "your_groq_key_here") {
      return NextResponse.json({ 
        text: "Xin chào! Trợ lý ảo SOF đã sẵn sàng. Vui lòng dán mã GROQ API KEY để tôi có thể bắt đầu phục vụ bạn nhé!" 
      });
    }

    try {
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_INSTRUCTION },
          ...messages
            .filter((m: any) => m.content && m.content.trim() !== "")
            .map((m: any) => ({
              role: m.role === "assistant" ? "assistant" : "user",
              content: m.content,
            })),
        ] as any,
        model: "llama-3.3-70b-versatile",
        temperature: 0.6,
        max_tokens: 2048,
      });

      const text = (completion as any).choices?.[0]?.message?.content || "";

      return NextResponse.json({ text });
    } catch (innerError: any) {
      console.error("Inner Groq Error:", innerError);
      
      // Fallback nếu model 70b bận
      try {
          const fallback = await groq.chat.completions.create({
              messages: [
                { role: "system", content: SYSTEM_INSTRUCTION },
                ...messages.filter((m: any) => m.content).map((m: any) => ({
                  role: m.role === "assistant" ? "assistant" : "user",
                  content: m.content,
                })),
              ] as any,
              model: "llama-3.1-8b-instant", 
            });
            return NextResponse.json({ text: (fallback as any).choices?.[0]?.message?.content || "" });
      } catch (err: any) {
          return NextResponse.json({ 
              error: "Hệ thống AI đang bận", 
              details: err.message 
            }, { status: 500 });
      }
    }
  } catch (error: any) {
    console.error("Lỗi tổng quát:", error);
    return NextResponse.json({ 
      error: "Hệ thống đang bận", 
      details: error.message 
    }, { status: 500 });
  }
}
