const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');

const productDatabase = {
  // --- HỆ THỐNG PHẦN MỀM (B2B SOLUTIONS) ---
  "Phần mềm Quản lý Bán hàng": {
    type: "software",
    name: "Phần mềm Quản lý Bán hàng đa kênh SOF v2025",
    use: "Tối ưu hóa toàn diện quy trình vận hành từ khâu nhập hàng, kiểm soát tồn kho đến chăm sóc khách hàng tự động.",
    features: [
      "Quét mã vạch bán hàng siêu tốc, hỗ trợ in hóa đơn đa khổ giấy.",
      "Quản lý công nợ khách hàng và nhà cung cấp chính xác 100%.",
      "Hệ thống báo cáo biểu đồ doanh thu, lợi nhuận Real-time trên Mobile.",
      "Tích hợp các cổng thanh toán điện tử (Momo, VNPay, Chuyển khoản QR)."
    ],
    segments: "Phù hợp cho cửa hàng lẻ, siêu thị mini và chuỗi cửa hàng phân phối."
  },
  "Phần mềm Quản lý Cafe": {
    type: "software",
    name: "Giải pháp Quản lý F&B chuyên sâu cho Quán Cafe & Trà sữa",
    use: "Giải quyết bài toán order chậm, nhầm món và thất thoát nguyên vật liệu tại các mô hình kinh doanh ăn uống.",
    features: [
      "Order tại bàn bằng Tablet/Smartphone, in bếp tự động không cần chạy bàn.",
      "Định lượng nguyên vật liệu chi tiết (ví dụ: 1 ly cafe trừ bao nhiêu gram hạt, đường).",
      "Quản lý sơ đồ bàn trực quan theo trạng thái: Có khách, Trống, Đang dọn.",
      "Tích hợp hệ thống gọi món qua QR Code tại bàn cực kỳ hiện đại."
    ],
    segments: "Phù hợp cho quán cafe đơn lẻ, chuỗi trà sữa và các mô hình Cafe sân vườn, văn phòng."
  },
  "Phần mềm Quản lý Bãi xe": {
    type: "software",
    name: "Hệ thống Quản lý Bãi xe Thông minh (Smart Parking System)",
    use: "Thay thế vé giấy thủ công bằng công nghệ nhận diện biển số AI, đảm bảo an ninh tuyệt đối và chống thất thoát 100%.",
    features: [
      "Nhận diện biển số chuẩn xác 99.9% chỉ trong 0.5 giây.",
      "Giám sát xe vào/ra qua hình ảnh và video HD, lưu trữ lịch sử 30 ngày.",
      "Quản lý đa dạng các loại vé: Vé lượt, vé tháng, vé cán bộ, vé ưu tiên.",
      "Báo cáo doanh thu chi tiết qua App Mobile, không cần có mặt tại bãi xe."
    ],
    segments: "Phù hợp cho chung cư, tòa nhà văn phòng, nhà máy và bãi xe công cộng quy mô lớn."
  },
  "Phần mềm Quản lý Khách sạn": {
    type: "software",
    name: "Giải pháp Quản lý Khách sạn & Resort chuyên nghiệp SOF",
    use: "Quản lý tập trung từ sơ đồ phòng, booking, tài chính đến dịch vụ buồng phòng trên một nền tảng duy nhất.",
    features: [
      "Sơ đồ phòng (Room Plan) trực quan theo màu sắc, quản lý check-in/check-out nhanh.",
      "Tính tiền tự động theo giờ, qua đêm, ngày đêm và các khung giờ đặc biệt.",
      "Tích hợp quản lý Minibar, Laundry và các dịch vụ đi kèm ngay trên bill phòng.",
      "Kết nối trực tiếp hệ thống khóa thẻ từ khách sạn hàng đầu thế giới."
    ],
    segments: "Phù hợp cho khách sạn từ 1-5 sao, Resort, Homestay và nhà nghỉ cao cấp."
  },
  "Phần mềm Quản lý Kho": {
    type: "software",
    name: "Hệ thống Quản lý Kho & Logistics Thông minh SOF",
    use: "Kiểm soát dòng tiền thông qua dòng hàng bẳng công nghệ mã vạch, tối ưu hóa diện tích kho và luồng di chuyển.",
    features: [
        "Quản lý hàng hóa theo Lô/Hạn sử dụng, Serial/IMEI cực kỳ chặt chẽ.",
        "Quy trình Nhập - Xuất - Kiểm kê được tự động hóa qua thiết bị cầm tay PDA.",
        "Cảnh báo hàng sắp hết hạn, hàng tồn kho dưới mức tối thiểu ngay lập tức.",
        "Tích hợp quản lý ô Pallet và vị trí kệ để tìm hàng nhanh chóng."
    ],
    segments: "Phù hợp cho kho thành phẩm, kho logistics, đại lý phân phối và nhà máy sản xuất."
  },
  "Phần mềm Quản lý Nhân sự": {
    type: "software",
    name: "Nền tảng Quản trị Nhân sự & Chấm công (HRM Solution)",
    use: "Số hóa quy trình quản trị con người, từ tuyển dụng, chấm công đến tính lương, giúp giảm 80% công việc thủ công.",
    features: [
        "Kết nối trực tiếp mọi loại máy chấm công vân tay, khuôn mặt (AI Face ID).",
        "Tự động tính bảng lương, bảo hiểm, thuế TNCN theo công thức linh hoạt.",
        "Quản lý hồ sơ nhân sự, lịch sử đào tạo, khen thưởng và kỷ luật.",
        "Cổng thông tin nhân viên (Portal) cho phép xin nghỉ phép, xem bảng lương trên Mobile."
    ],
    segments: "Phù hợp cho doanh nghiệp có từ 50 nhân viên trở lên và các nhà máy sản xuất."
  },

  // --- HỆ THỐNG PHẦN CỨNG (PREMIUM HARDWARE) ---
  "Cân Điện Tử": {
    type: "hardware",
    name: "Cân Điện Tử Tính Tiền In Tem Thông Minh ONEPLUSONE",
    use: "Kết hợp giữa cân đo chính xác và in tem nhãn/hóa đơn bán hàng đỉnh cao cho thực phẩm.",
    features: [
        "Khả năng lưu trữ 20.000 mặt hàng (PLU), thao tác bán hàng cực nhanh.",
        "Màn hình LCD kép sắc nét cho nhân viên và khách hàng cùng theo dõi.",
        "Tích hợp máy in nhiệt tốc độ cao, thay giấy chỉ trong 5 giây.",
        "Kết nối Wifi/LAN để đồng bộ dữ liệu giá từ máy tính hoặc trung tâm."
    ],
    price: "Liên hệ Hotline"
  },
  "Máy POS": {
    type: "hardware",
    name: "Hệ thống Máy POS Cảm ứng iMin Thế hệ mới",
    use: "Trái tim của quầy thu ngân với cấu hình mạnh mẽ, hoạt động bền bỉ trong môi trường kinh doanh khắc nghiệt.",
    features: [
        "Màn hình cảm ứng đa điểm 15.6 inch siêu nhạy, chống nước bề mặt.",
        "Hệ điều hành Android tối ưu cho phần mềm thu ngân, khởi động cực nhanh.",
        "Thiết kế tinh tế với vỏ hợp kim, giúp quầy thu ngân sang trọng hơn.",
        "Tích hợp sẵn máy in hóa đơn khổ 80mm Seiko cao cấp nhất của Nhật Bản."
    ],
    price: "Liên hệ Hotline"
  },
  "default": {
    type: "software",
    name: "Hệ Sinh Thái Giải Pháp Công Nghệ SOF",
    use: "Nâng tầm quản trị doanh nghiệp bằng những giải pháp công nghệ hàng đầu, giúp tự động hóa và tăng trưởng doanh thu.",
    features: [
        "Công nghệ bảo mật dữ liệu hàng đầu, Backup tự động hàng giờ.",
        "Giao diện tối giản, nhân viên chỉ mất 15 phút là có thể sử dụng thành thạo.",
        "Đội ngũ kỹ thuật hỗ trợ tận nơi 24/7, cam kết xử lý sự cố trong 2 giờ.",
        "Nâng cấp tính năng liên tục theo nhu cầu thực tế của từng doanh nghiệp."
    ],
    segments: "Dành cho mọi doanh nghiệp đang khát khao chuyển đổi số toàn diện."
  }
};

async function startWorker() {
  console.log('🚀 SOF V7 - PROFESSIONAL SOLUTION PROFILE WORKER started...');
  
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
        
        await transporter.sendMail({
          from: `"Phòng Chuyên Gia Giải Pháp SOF" <trannguyenhoanganh2005@gmail.com>`,
          to: req.email,
          subject: `[HỒ SƠ GIẢI PHÁP] Tư vấn chuyên sâu: ${prod.name}`,
          html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 24px; overflow: hidden; background: #ffffff; box-shadow: 0 10px 40px rgba(0,0,0,0.05);">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #0f426c 0%, #1e3a8a 100%); padding: 50px 40px; text-align: center;">
                <p style="color: #60a5fa; text-transform: uppercase; font-weight: 900; letter-spacing: 3px; font-size: 11px; margin-bottom: 15px;">HỒ SƠ TƯ VẤN CÔNG NGHỆ</p>
                <h1 style="color: white; margin: 0; font-size: 28px; line-height: 1.3; font-weight: 800;">${prod.name}</h1>
              </div>

              <!-- Content -->
              <div style="padding: 45px; line-height: 1.7; color: #1e293b;">
                <p style="font-size: 16px; font-weight: 500;">Kính gửi Quý khách hàng,</p>
                <p>Lời đầu tiên, đội ngũ Chuyên gia Công nghệ SOF xin chân thành cảm ơn Quý khách đã tin tưởng và quan tâm đến giải pháp của chúng tôi. Dưới đây là tóm tắt <b>Hồ sơ giải pháp chi tiết</b> dựa trên nhu cầu mà Quý khách đã đăng ký:</p>
                
                <div style="margin: 35px 0; padding: 30px; background: #f1f5f9; border-left: 5px solid #3b82f6; border-radius: 12px;">
                   <h3 style="color: #0f426c; margin-top: 0; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">Mục tiêu & Công dụng:</h3>
                   <p style="margin: 0; font-size: 15px; color: #334155; font-style: italic;">"${prod.use}"</p>
                </div>

                <h3 style="color: #1d4ed8; font-size: 18px; border-bottom: 2px solid #eff6ff; padding-bottom: 12px; margin-bottom: 20px;">💎 Những giá trị cốt lõi & Tính năng nổi bật:</h3>
                <ul style="padding-left: 20px; list-style: none;">
                   ${prod.features.map(f => `<li style="margin-bottom:15px; position: relative;"><span style="color: #3b82f6; font-weight: bold; margin-right: 10px;">✓</span> ${f}</li>`).join('')}
                </ul>

                ${prod.segments ? `
                <div style="margin-top: 30px; padding: 20px; background: #fffbeb; border-radius: 12px; border: 1px solid #fecaca;">
                   <p style="margin: 0; color: #92400e; font-size: 14px;">🎯 <b>Phân khúc khách hàng:</b> ${prod.segments}</p>
                </div>
                ` : ''}

                <div style="margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 30px; text-align: center;">
                   <p style="font-weight: 700; color: #0f426c; margin-bottom: 20px;">CHUYÊN VIÊN TƯ VẤN ĐANG ĐỢI HỖ TRỢ BẠN:</p>
                   <a href="tel:0932518569" style="display: inline-block; background: #3087fe; color: white; text-decoration: none; padding: 18px 40px; border-radius: 20px; font-weight: 900; font-size: 24px; box-shadow: 0 10px 25px rgba(48,135,254,0.3);">📞 0932 518 569</a>
                   <p style="color: #64748b; font-size: 13px; margin-top: 20px;">(Vui lòng gọi hotline để nhận Bảng giá ưu đãi và Lịch hẹn demo trực tiếp)</p>
                </div>
              </div>

              <!-- Footer -->
              <div style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #f1f5f9;">
                 <p style="margin: 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">© 2025 SOF SOLUTION OF FUTURE - NÂNG TẦM QUẢN TRỊ</p>
              </div>
            </div>
          `
        });
        
        await connection.execute('UPDATE contact_requests SET status = "completed" WHERE id = ?', [req.id]);
        console.log(`✅ Professional Solution Profile sent for #${req.id} (${foundKey})`);
      }
    } catch (err) { console.error('❌ Worker error:', err.message); }
  }
  await processRecords();
  setInterval(processRecords, 30000);
}

startWorker();
