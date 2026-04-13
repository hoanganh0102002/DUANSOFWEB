import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // Xóa dữ liệu cũ để đồng bộ mới hoàn toàn
    await query({ query: "DELETE FROM product_descriptions" });
    await query({ query: "DELETE FROM product_specs" });
    await query({ query: "DELETE FROM product_images" });
    await query({ query: "DELETE FROM site_products" });

    // --- DỮ LIỆU SẢN PHẨM PHẦN CỨNG CHI TIẾT ---
    const hardwareProducts = [
      {
        slug: "can-dien-tu",
        name: "Cân Điện Tử Tính Tiền Thông Minh ONEPLUSONE C-L1",
        code: "PHANCUNG.CDT.BS",
        category: "HARDWARE",
        price: 19990000,
        unit: "Cái",
        desc_brief: "Giải pháp bán hàng chuyên nghiệp – Nhanh – Chính xác cho siêu thị, cửa hàng.",
        img: "/hinhanh/hw_pos_scale.png",
        badges: ["Bảo hành chính hãng", "Giao hàng toàn quốc", "Đổi trả trong 7 ngày", "Hỗ trợ 24/7"],
        specs: [
          { label: "Mức cân", value: "6 / 15 kg" },
          { label: "Độ chính xác", value: "2 – 5 g" },
          { label: "Màn hình hiển thị", value: "LCD 48 × 112 hoặc 64 × 384" },
          { label: "Bộ nhớ", value: "20.000 PLU" },
          { label: "In nhiệt", value: "Bill / Decal" }
        ],
        desc_details: [
          { heading: "Bán hàng nhanh hơn – Quản lý dễ hơn", color: "#3087fe", content: "Mức cân 6/15kg, độ chính xác 2–5g, cho kết quả chuẩn xác. Màn hình LCD lớn hiển thị rõ ràng." },
          { heading: "In tem – In hóa đơn nhanh", color: "#3087fe", content: "Tích hợp máy in nhiệt, tốc độ tối đa 125 mm/s, đáp ứng tốt giờ cao điểm." }
        ]
      },
      {
        slug: "may-in-hoa-don",
        name: "Máy in hóa đơn HPRT TP80NC-H",
        code: "PHANCUNG.MIB.BS",
        category: "HARDWARE",
        price: 1790000,
        unit: "Cái",
        desc_brief: "Máy in nhiệt công nghiệp tốc độ siêu nhạy, tự động cắt giấy.",
        img: "/hinhanh/hw_printer.png",
        badges: ["Bảo hành 12 tháng", "Tự động cắt giấy"],
        specs: [
          { label: "Tốc độ in", value: "200 mm/giây" },
          { label: "Khổ giấy", value: "80 mm" },
          { label: "Kết nối", value: "USB + LAN" }
        ],
        desc_details: [
          { heading: "Hiệu suất mạnh mẽ", color: "#3087fe", content: "Độ phân giải 203 dpi, chữ in rõ ràng, dao cắt tự động bền bỉ 1 triệu lần cắt." }
        ]
      }
      // ... Thêm tiếp các sản phẩm khác nếu cần ...
    ];

    for (const p of hardwareProducts) {
      await query({ 
        query: "INSERT INTO site_products (name, slug, code, category, description_brief, image_url, price, unit, badges) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        values: [p.name, p.slug, p.code, p.category, p.desc_brief, p.img, p.price, p.unit, JSON.stringify(p.badges)]
      });

      for (const spec of p.specs) {
        await query({ 
          query: "INSERT INTO product_specs (product_slug, label, value) VALUES (?, ?, ?)",
          values: [p.slug, spec.label, spec.value]
        });
      }

      for (const desc of p.desc_details) {
        await query({ 
          query: "INSERT INTO product_descriptions (product_slug, heading, heading_color, content) VALUES (?, ?, ?, ?)",
          values: [p.slug, desc.heading, desc.color, desc.content]
        });
      }
    }

    // --- DỮ LIỆU PHẦN MỀM (SOFTWARE) ---
    const softwareProducts = [
      { name: 'Phần mềm Quản lý Bán hàng', slug: 'ban-hang', category: 'SOFTWARE', description: 'Giải pháp toàn diện giúp tự động hóa quy trình bán hàng, kiểm soát tồn kho.', image_url: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094757.png' },
      { name: 'Phần mềm Quản lý Quán Cafe', slug: 'quan-cafe', category: 'SOFTWARE', description: 'Giải pháp order nhanh chóng, quản lý nguyên vật liệu mã vạch.', image_url: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094652.png' }
    ];

    for (const s of softwareProducts) {
        await query({ 
            query: "INSERT INTO site_products (name, slug, category, description_brief, image_url) VALUES (?, ?, ?, ?, ?)",
            values: [s.name, s.slug, s.category, s.description, s.image_url]
        });
    }

    return NextResponse.json({ success: true, message: "Toàn bộ dữ liệu thật đã được đổ vào Database hoàn hảo!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
