const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');

const productDatabase = {
  // --- PHẦN MỀM (CAM KẾT: KHÔNG HIỆN GIÁ - CHỈ HIỆN HOTLINE) ---
  "Phần mềm Quản lý Bãi xe": {
    type: "software",
    name: "Phần mềm Quản lý Bãi xe Thông minh SOF",
    use: "Giải pháp an ninh toàn diện, kiểm soát xe ra vào và tự động hóa quy trình bãi đỗ xe.",
    features: [
      "Nhận diện biển số AI chuẩn xác 99.9%",
      "Kiểm soát doanh thu, chống thất thoát 100%",
      "Quản lý cư dân, thẻ tháng, xe vãng lai",
      "Tích hợp Barrier và App báo cáo trên điện thoại"
    ],
    tiers: { basic: "Dưới 100 xe/ngày", full: "2-4 làn xe + Cloud", pro: "Chuỗi bãi xe quy mô lớn" }
  },
  "Phần mềm Quản lý Quán Cafe": {
    type: "software",
    name: "Phần mềm Quản lý Cafe & Nhà hàng SOF",
    use: "Tối ưu hóa quy trình gọi món, pha chế và quản lý kho định lượng nguyên vật liệu.",
    features: [
      "Order tại bàn bằng Tablet/Smartphone",
      "In bếp tự động, giảm thời gian phục vụ",
      "Tự động trừ tồn kho theo công thức pha chế",
      "Xem báo cáo lãi lỗ Real-time mọi lúc mọi nơi"
    ],
    tiers: { basic: "Bán hàng tại quầy", full: "Quản lý kho & Định lượng", pro: "Chuỗi nhà hàng + QR Order" }
  },
  "Phần mềm Quản lý Bán hàng": {
    type: "software",
    name: "Phần mềm Quản lý Bán hàng đa kênh SOF",
    use: "Quản lý tập trung từ khâu nhập hàng, tồn kho đến xuất hóa đơn và chăm sóc khách hàng.",
    features: [
      "Quét mã vạch bán hàng siêu tốc < 1 giây",
      "Tự động quản lý công nợ khách hàng & nhà cung cấp",
      "Kiểm kê kho dễ dàng bằng đầu đọc cầm tay",
      "Báo cáo biểu đồ doanh thu chi tiết từng mặt hàng"
    ],
    tiers: { basic: "1 cửa hàng nhỏ lẻ", full: "Quản lý kho & Doanh nghiệp", pro: "Hệ thống chuỗi & Ecommerce" }
  },
  "Phần mềm Quản lý Khách sạn": {
    type: "software",
    name: "Phần mềm Quản lý Khách sạn & Resort SOF",
    use: "Quản lý phòng, dịch vụ buồng phòng và doanh thu hiệu quả cho cơ sở lưu trú.",
    features: [
      "Quản lý sơ đồ phòng trực quan (Trống/Đang dùng/Dọn dẹp)",
      "Tính tiền theo giờ, theo ngày hoặc qua đêm tự động",
      "Tích hợp quản lý Mini bar và dịch vụ đi kèm",
      "Gửi báo cáo công suất phòng hàng ngày qua Email/Zalo"
    ],
    tiers: { basic: "Nhà nghỉ/Dưới 20 phòng", full: "Khách sạn lớn + Kho dịch vụ", pro: "Resort + Hệ thống Booking Online" }
  },

  // --- PHẦN CỨNG (CAM KẾT: CÓ HIỂN THỊ GIÁ NIÊM YẾT) ---
  "Máy POS Thu Ngân 2 Màn Hình iMin": {
    type: "hardware",
    name: "Máy POS Thu Ngân iMin D2 (2 Màn Hình)",
    use: "Thiết bị thu ngân chuyên nghiệp, màn hình cảm ứng mượt mà cho nhân viên và khách hàng.",
    specs: "Màn chính 15.6 inch, Màn khách 10.1 inch, Android 11, Wifi/LAN.",
    price: "10.500.000 VNĐ",
    warranty: "12 tháng"
  },
  "Máy in hóa đơn HPRT TP80NC-H": {
    type: "hardware",
    name: "Máy in hóa đơn HPRT TP80NC-H",
    use: "Máy in nhiệt khổ 80mm, tốc độ in cao, bền bỉ, tích hợp kết nối Wifi/LAN/USB.",
    specs: "Khổ giấy 80mm, Tốc độ in 250mm/s, Có dao cắt tự động.",
    price: "2.250.000 VNĐ",
    warranty: "12 tháng"
  },
  "Máy Quét Mã Vạch ICW 92108HS": {
    type: "hardware",
    name: "Máy Quét Mã Vạch 2D ICW 92108HS",
    use: "Đọc nhanh các loại mã vạch 1D, mã QR 2D từ sản phẩm hoặc điện thoại.",
    specs: "Giao tiếp USB, Cảm biến ảnh CMOS tốc độ cao.",
    price: "1.450.000 VNĐ",
    warranty: "12 tháng"
  },
  "default": {
    type: "software",
    name: "Giải pháp Công nghệ SOF",
    use: "Nâng tầm quản trị doanh nghiệp bằng công nghệ 4.0 hiện đại nhất.",
    features: ["Tính ổn định cao", "Dễ sử dụng", "Hỗ trợ 24/7", "Báo cáo Cloud"],
    tiers: { basic: "Mức cơ bản", full: "Mức nâng cao", pro: "Mức toàn diện" }
  }
};

async function startWorker() {
  console.log('🚀 SOF V6 - STRICT PRICING WORKER started...');
  
  const connection = await mysql.createConnection({
    host: 'localhost', user: 'root', password: '', database: 'sof.vn_db'
  });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', port: 587,
    auth: { user: 'trannguyenhoanganh2005@gmail.com', pass: 'aznjvosfiakekopv' }
  });

  async function processRecords() {
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM contact_requests WHERE status = "contacted" AND updated_at <= NOW() - INTERVAL 5 MINUTE`
      );

      for (const req of rows) {
        let foundKey = "default";
        try {
           const services = JSON.parse(req.services);
           foundKey = Object.keys(productDatabase).find(key => 
             services.some(s => s.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(s.toLowerCase()))
           ) || "default";
        } catch(e) {}
        
        const prod = productDatabase[foundKey];
        const isHardware = prod.type === "hardware";
        
        let contentHtml = "";
        if (isHardware) {
          contentHtml = `
            <h2 style="color: #0f426c;">SẢN PHẨM: ${prod.name}</h2>
            <p><b>✨ Công dụng:</b> ${prod.use}</p>
            <p><b>⚙️ Thông số:</b> ${prod.specs}</p>
            <p><b>🛡️ Bảo hành:</b> ${prod.warranty}</p>
            <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; border: 2px solid #22c55e; margin: 20px 0; text-align: center;">
              <p style="margin:0; font-size: 20px; color: #15803d; font-weight: bold;">💰 GIÁ BÁN NIÊM YẾT: ${prod.price}</p>
            </div>
          `;
        } else {
          contentHtml = `
            <h2 style="color: #0f426c;">GIẢI PHÁP: ${prod.name}</h2>
            <p><b>✨ Công dụng:</b> ${prod.use}</p>
            <hr>
            <h3 style="color: #2563eb;">🔑 Các tính năng nổi bật:</h3>
            <ul>
              ${prod.features.map(f => `<li style="margin-bottom:8px;">${f}</li>`).join('')}
            </ul>
            <hr>
            <h3 style="color: #2563eb;">📦 Phân khúc giải pháp:</h3>
            <p>• <b>Gói Basic:</b> ${prod.tiers.basic}</p>
            <p>• <b>Gói Full (Đề xuất):</b> ${prod.tiers.full}</p>
            <p>• <b>Gói Pro:</b> ${prod.tiers.pro}</p>
            <div style="background: #fff1f2; padding: 25px; border-radius: 12px; border: 2px solid #ef4444; margin: 25px 0;">
              <p style="margin: 0; color: #b91c1c; font-weight: 800; font-size: 16px; text-transform: uppercase;">💰 BÁO GIÁ PHẦN MỀM:</p>
              <p style="margin: 10px 0 0 0; color: #1f2937; line-height: 1.5;"><b>Để nhận được mức giá ưu đãi nhất phù hợp với quy mô thực tế, quý khách vui lòng liên hệ trực tiếp đến số điện thoại tư vấn bên dưới.</b> Chuyên viên của chúng tôi sẽ gửi bảng giá chi tiết sau cuộc gọi tư vấn.</p>
            </div>
          `;
        }

        if (req.email) {
          await transporter.sendMail({
            from: `"Phòng Chuyên Gia SOF" <trannguyenhoanganh2005@gmail.com>`,
            to: req.email,
            subject: `[HỒ SƠ CHI TIẾT] ${prod.name} - Giải pháp hàng đầu từ SOF`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; background: #ffffff;">
                <div style="background: #0f426c; padding: 40px; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 24px; text-transform: uppercase;">Hồ Sơ Tư Vấn Công Nghệ</h1>
                </div>
                <div style="padding: 40px; line-height: 1.6; color: #334155;">
                  ${contentHtml}
                  <div style="margin-top: 40px; padding: 25px; background: #f8fafc; border-radius: 12px; text-align: center; border: 1px dashed #cbd5e1;">
                    <p style="margin-bottom: 10px; font-weight: bold; color: #0f426c;">Mọi thắc mắc và yêu cầu báo giá, vui lòng liên hệ hotline:</p>
                    <p style="margin: 0; color: #3087fe; font-weight: 900; font-size: 26px;">0932 518 569</p>
                    <p style="margin: 20px 0 0 0; color: #64748b; font-style: italic;">Trân trọng, Đội ngũ SOF xin chân thành cảm ơn bạn!</p>
                  </div>
                </div>
              </div>
            `
          });
        }
        await connection.execute('UPDATE contact_requests SET status = "completed" WHERE id = ?', [req.id]);
        console.log(`✅ Mail V6 sent for #${req.id} (${isHardware ? 'HARDWARE - WITH PRICE' : 'SOFTWARE - CALL HOTLINE'})`);
      }
    } catch (err) { console.error('❌ Worker error:', err.message); }
  }
  await processRecords();
  setInterval(processRecords, 30000);
}

startWorker();
