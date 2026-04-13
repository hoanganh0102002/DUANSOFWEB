// Nội dung gói Phần mềm quản lý Quán ăn (Restaurant Management)
// Gồm 3 gói: Basic, Full, Pro

export const restaurantCardData = {
  basic: {
    highlights: [
      "Số lượng bàn tối đa: 10 bàn.",
      "Hỗ trợ thanh toán: VNPAY, MONO, ZALO PAY.",
      "Có App theo dõi doanh số bán hàng miễn phí có quảng cáo.",
      "Số lượng người dùng: 1 người dùng admin."
    ],
    systemFeatures: [
      "1. Gói BASIC (Phù hợp Quán ăn bình dân, vỉa hè)",
      "2. Giao diện bán hàng nhanh, tối ưu cảm ứng",
      "3. Quản lý sơ đồ bàn, trạng thái bàn trực quan"
    ]
  },
  full: {
    highlights: [
      "Số lượng bàn tối đa: thỏa thuận.",
      "Hỗ trợ thanh toán: VNPAY, MONO, ZALO PAY.",
      "Có App theo dõi doanh số bán hàng miễn phí có quảng cáo.",
      "Số lượng người dùng: 1 admin, 1 NV bán hàng, 1 thu ngân, 1 bếp, 1 bar.",
      "Số lượng chi nhánh: báo giá theo yêu cầu."
    ],
    systemFeatures: [
      "1. Gói FULL (Quản lý chuỗi và Nhượng quyền)",
      "2. Bao gồm tất cả tính năng của gói PRO.",
      "3. Quản lý tập trung đa chi nhánh từ xa",
      "4. Quản lý kho tổng & điều phối từ trung tâm",
      "5. QR Order - Tự gọi món tại bàn",
      "6. Đồng bộ đơn hàng Grab, ShopeeFood",
      "7. Báo cáo chuyên sâu Menu Engineering",
      "8. Quản lý công nợ NCC & CP vận hành"
    ]
  },
  pro: {
    highlights: [
      "Số lượng bàn tối đa: 10 bàn.",
      "Hỗ trợ thanh toán: VNPAY, MONO, ZALO PAY.",
      "Có App theo dõi doanh số bán hàng miễn phí có quảng cáo.",
      "Số lượng người dùng: 1 admin, 1 NV bán hàng, 1 thu ngân, 1 bếp, 1 bar."
    ],
    systemFeatures: [
      "1. Gói PRO (Phù hợp Quán nhậu, Quán lớn, Buffet)",
      "2. Bao gồm tất cả tính năng của gói BASIC.",
      "3. Quản lý 'Món theo cân', Hải sản, đồ tươi sống",
      "4. Quản lý kho nguyên liệu theo đơn vị nhỏ",
      "5. Thiết lập định lượng món ăn chi tiết",
      "6. Hệ thống quản lý khách hàng (CRM)",
      "7. Chương trình khuyến mãi linh hoạt",
      "8. In tách/gộp phiếu theo khu vực bếp/bar"
    ]
  }
};

export const restaurantModalData = {
  basic: {
    highlights: [
      "Số lượng bàn tối đa: 10 bàn.",
      "Hỗ trợ thanh toán: VNPAY, MONO, ZALO PAY.",
      "Có App theo dõi doanh số bán hàng miễn phí có quảng cáo.",
      "Số lượng người dùng: 1 người dùng admin."
    ],
    systemFeatures: [
      { 
        id: 1, 
        title: "1. Gói BASIC (Đơn giản – Phù hợp Quán ăn bình dân, Quán vỉa hè)", 
        desc: "Giải pháp tối ưu cho mô hình kinh doanh nhỏ, tập trung vào tốc độ bán hàng tại quầy." 
      },
      { 
        id: 2, 
        title: "2. Giao diện bán hàng nhanh, tối ưu cho thao tác chạm trên điện thoại/máy tính bảng.", 
        desc: "Thao tác mượt mà trên mọi thiết bị di động, giúp nhân viên order nhanh ngay tại bàn." 
      },
      { 
        id: 3, 
        title: "3. Quản lý sơ đồ bàn, tình trạng bàn trống/đang có khách trực quan.", 
        desc: "Theo dõi toàn bộ không gian quán trên một màn hình, dễ dàng sắp xếp chỗ ngồi cho khách." 
      },
      { 
        id: 4, 
        title: "4. Tính năng gọi món và in phiếu báo chế biến xuống bếp ngay lập tức.", 
        desc: "Đơn hàng được chuyển thẳng đến bếp ngay khi hoàn tất order, giảm thời gian chờ đợi của khách." 
      },
      { 
        id: 5, 
        title: "5. Hỗ trợ thay đổi giá món linh hoạt theo thời giá hoặc theo thời điểm (Sáng/Tối).", 
        desc: "Tiết kiệm thời gian cập nhật thực đơn khi giá nguyên liệu biến động." 
      },
      { 
        id: 6, 
        title: "6. Quản lý mang về (Take-away) và giao hàng đơn giản.", 
        desc: "Xử lý nhanh các đơn hàng khách mua mang về hoặc gọi giao tận nơi." 
      },
      { 
        id: 7, 
        title: "7. Báo cáo tổng kết tiền mặt, tiền chuyển khoản cuối mỗi ca làm việc.", 
        desc: "Đối soát doanh thu nhanh chóng, chính xác đến từng xu cuối ngày." 
      },
      { 
        id: 8, 
        title: "8. Thống kê các món ăn bán chạy nhất trong ngày để chuẩn bị thực phẩm.", 
        desc: "Giúp chủ quán dự đoán lượng khách và chuẩn bị nguyên liệu hiệu quả, tránh lãng phí." 
      }
    ]
  },
  full: {
    highlights: [
      "Số lượng bàn tối đa: thỏa thuận.",
      "Hỗ trợ thanh toán: VNPAY, MONO, ZALO PAY.",
      "Có App theo dõi doanh số bán hàng miễn phí có quảng cáo.",
      "Số lượng người dùng: 1 admin, 1 nhân viên bán hàng, 1 thu ngân, 1 người dùng bếp, 1 người dùng bar.",
      "Số lượng chi nhánh: báo giá theo yêu cầu."
    ],
    systemFeatures: [
      { id: 1, title: "1. Gói FULL (Mở rộng – Phù hợp Chuỗi quán ăn, Hệ thống nhượng quyền)", desc: "Nâng cấp toàn diện cho các doanh nghiệp F&B quy mô lớn muốn quản trị chuyên nghiệp." },
      { id: 2, title: "2. Bao gồm tất cả tính năng của gói PRO.", desc: "Thừa hưởng mọi module nghiệp vụ của phiên bản Professional." },
      { id: 3, title: "3. Quản lý tập trung nhiều chi nhánh: Kiểm soát doanh thu toàn hệ thống từ xa.", desc: "Giám sát hiệu quả kinh doanh đa điểm real-time trên cùng một nền tảng duy nhất." },
      { id: 4, title: "4. Quản lý kho tổng: Điều phối nguyên vật liệu từ kho trung tâm đến các cơ sở.", desc: "Quy trình luân chuyển hàng hóa khép kín giúp tối ưu lượng tồn kho toàn chuỗi và giảm thất thoát." },
      { id: 5, title: "5. Tính năng tự gọi món tại bàn (QR Order): Khách quét mã để gọi món, giảm bớt nhân viên phục vụ.", desc: "Tối ưu hóa quy trình phục vụ, tăng trải nghiệm khách hàng và cắt giảm chi phí nhân sự." },
      { id: 6, title: "6. Kết nối và đồng bộ đơn hàng tự động từ các app giao hàng (Grab, ShopeeFood).", desc: "Tự động nhận đơn từ các đối tác giao hàng, tránh sai sót dữ liệu và rút ngắn thời gian chuẩn bị." },
      { id: 7, title: "7. Hệ thống báo cáo chuyên sâu: Phân tích tỷ lệ lợi nhuận trên từng món ăn (Menu Engineering).", desc: "Giúp chủ quán xác định được những món chủ lực mang lại lợi nhuận cao nhất để tối ưu menu." },
      { id: 8, title: "8. Quản lý công nợ nhà cung cấp thực phẩm và chi phí vận hành (Điện, nước, mặt bằng).", desc: "Theo dõi sát sao dòng tiền, công nợ và các chi phí cố định để tính toán lợi nhuận ròng chính xác." }
    ]
  },
  pro: {
    highlights: [
      "Số lượng bàn tối đa: 10 bàn.",
      "Hỗ trợ thanh toán: VNPAY, MONO, ZALO PAY.",
      "Có App theo dõi doanh số bán hàng miễn phí có quảng cáo.",
      "Số lượng người dùng: 1 admin, 1 nhân viên bán hàng, 1 thu ngân, 1 người dùng bếp, 1 người dùng bar."
    ],
    systemFeatures: [
      { id: 1, title: "1. Gói PRO (Chuyên nghiệp – Phù hợp Quán nhậu, Quán ăn lớn, Buffet)", desc: "Giải pháp nâng cao dành cho các nhà hàng có quy mô lớn, yêu cầu quản trị kho và dịch vụ chuyên sâu." },
      { id: 2, title: "2. Bao gồm tất cả tính năng của gói BASIC.", desc: "Thừa hưởng nền tảng bán hàng ổn định và nhanh chóng của phiên bản Basic." },
      { id: 3, title: "3. Tính năng quản lý 'Món theo cân' (Hải sản, đồ tươi sống) và tính tiền tự động theo trọng lượng.", desc: "Tự động hóa quy trình cân và tính giá trực tiếp, tránh sai sót thủ công và minh bạch với khách hàng." },
      { id: 4, title: "4. Quản lý kho nguyên liệu theo đơn vị nhỏ (Kg, lít, chai) để kiểm soát thất thoát.", desc: "Theo dõi sát sao từng đơn vị nguyên liệu nhập xuất, giúp chủ quán nắm bắt chính xác lượng tồn kho thực tế." },
      { id: 5, title: "5. Thiết lập định lượng món ăn (Ví dụ: 1 đĩa cơm cần bao nhiêu gram thịt, gạo).", desc: "Tự động trừ kho nguyên liệu dựa trên thực đơn bán ra, kiểm soát cost (giá vốn) món ăn chính xác." },
      { id: 6, title: "6. Hệ thống quản lý khách hàng (CRM): Lưu số điện thoại, nhắc lịch khách đặt bàn.", desc: "Xây dựng tệp khách hàng thân thiết, hỗ trợ chăm sóc khách trước và sau khi sử dụng dịch vụ." },
      { id: 7, title: "7. Tạo chương trình khuyến mãi: Giờ vàng, mua X tặng Y, giảm giá theo % hóa đơn.", desc: "Linh hoạt triển khai các chiến dịch marketing để thu hút khách hàng vào các khung giờ thấp điểm." },
      { id: 8, title: "8. Hỗ trợ in gộp phiếu chế biến hoặc in tách theo từng khu vực bếp (Bếp chính, Bếp nướng, Bar).", desc: "Quy trình bếp chuyên nghiệp, giúp đầu bếp nhận order chính xác và không bị nhầm lẫn giữa các phòng/bàn." }
    ]
  }
};
