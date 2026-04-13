// Nội dung gói Phần mềm quản lý Khách sạn (Hotel Management)
// Gồm 3 gói: Basic, Full, Pro

export const hotelCardData = {
  basic: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp với tất cả phần mềm khác SOF đã xuất bản.",
      "Có App cài đặt trên máy pos và thiết bị di động android.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 30MB."
    ],
    systemFeatures: [
      "1. Quản lý sơ đồ phòng (Room Map)",
      "2. Quản lý Check-in/Check-out",
      "3. Quản lý giá phòng linh hoạt",
      "4. Quản lý hóa đơn và danh sách khách lưu trú",
      "5. Báo cáo doanh thu & công suất phòng",
      "6. Quản lý dọn phòng (Housekeeping)",
      "7. Lưu trữ lịch sử đặt phòng"
    ]
  },
  full: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO.",
      "Có App theo dõi doanh số bán hàng miễn phí có quảng cáo.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp với tất cả phần mềm khác SOF đã xuất bản.",
      "Có App cài đặt trên máy pos và thiết bị di động android.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 60MB.",
      "Số lượng chi nhánh: báo giá"
    ],
    systemFeatures: [
      "Gói FULL (Quản lý chuỗi và Đồng bộ đa nền tảng)",
      "Bao gồm tất cả tính năng của gói PRO.",
      "Quản lý chuỗi khách sạn trên một màn hình",
      "Đồng bộ hóa kênh phân phối (Channel Manager)",
      "Hệ thống Booking Engine trên Website/Fanpage",
      "Quản lý công nợ đối tác du lịch (OTA)",
      "Báo cáo tổng hợp so sánh hiệu quả chi nhánh",
      "Marketing tự động (Email/SMS chăm sóc khách)"
    ]
  },
  pro: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO.",
      "Có App theo dõi doanh số bán hàng miễn phí có quảng cáo.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp chuyên sâu với hệ thống bãi xe...",
      "Có App cài đặt trên máy pos và thiết bị di động android.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      "1. Bao gồm toàn bộ GÓI BASIC + mở rộng",
      "2. Quản lý thu chi ngoại cảnh (Điện, nước, lương...)",
      "3. Quản lý dịch vụ đi kèm (Spa, Giặt ủi, Tour...)",
      "4. Quản lý kho xuất - nhập - tồn chuyên sâu",
      "5. Kết nối phần cứng (Khóa từ & Điện thông minh)",
      "6. Hệ thống quản lý khách hàng (CRM)",
      "7. Báo cáo phân tích hiệu suất (RevPAR, ADR)"
    ]
  }
};

export const hotelModalData = {
  basic: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp với tất cả phần mềm khác SOF đã xuất bản.",
      "Có App cài đặt trên máy pos và thiết bị di động android.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 30MB."
    ],
    systemFeatures: [
      { 
        id: 1, 
        title: "1. Quản lý sơ đồ phòng (Room Map)", 
        desc: "Hiển thị sơ đồ lưới trực quan theo khu vực/tầng. Phân biệt trạng thái phòng bằng màu sắc (Trống, Khách ở, Đang dọn, Bảo trì). Thao tác nhanh trên phòng (Click để nhận phòng, chuyển phòng, đổi trạng thái)." 
      },
      { 
        id: 2, 
        title: "2. Quản lý Check-in/Check-out", 
        desc: "Tạo booking, gán phòng và ghi nhận tiền cọc (Deposit). Xử lý nhận/trả phòng độc lập cho khách lẻ hoặc gộp chung cho khách đoàn. Tự động chốt thời gian lưu trú để tính tiền khi trả phòng." 
      },
      { 
        id: 3, 
        title: "3. Quản lý giá phòng linh hoạt", 
        desc: "Thiết lập block giá tiêu chuẩn (Giờ đầu, các giờ tiếp theo, qua đêm, nguyên ngày). Cấu hình quy tắc phụ thu tự động (Check-in sớm, check-out trễ, thêm người, ngày Lễ/Tết)." 
      },
      { 
        id: 4, 
        title: "4. Quản lý hóa đơn và danh sách khách lưu trú", 
        desc: "Lưu thông tin khách để hỗ trợ xuất file khai báo tạm trú. Ghi nhận dịch vụ phát sinh vào phòng (Minibar, giặt ủi, đền bù hư hỏng). Chốt công nợ và in hóa đơn thanh toán tổng hợp (Tiền phòng + Dịch vụ)." 
      },
      { 
        id: 5, 
        title: "5. Báo cáo doanh thu & công suất phòng", 
        desc: "Báo cáo doanh thu chi tiết (Tiền phòng, tiền dịch vụ, phụ thu). Báo cáo chốt ca làm việc theo phương thức thanh toán (Tiền mặt, thẻ, chuyển khoản). Thống kê công suất phòng (Tỷ lệ lấp đầy) theo ngày/tháng." 
      },
      { 
        id: 6, 
        title: "6. Quản lý dọn phòng (Housekeeping)", 
        desc: "Cập nhật trạng thái phòng (Từ 'Cần dọn' sang 'Sẵn sàng đón khách'). Ghi nhận số lượng đồ dùng/minibar đã sử dụng trong lúc dọn để báo lễ tân thu tiền." 
      },
      { 
        id: 7, 
        title: "7. Lưu trữ lịch sử đặt phòng", 
        desc: "Quản lý hồ sơ khách hàng (Tên, SĐT, CCCD,...). Tra cứu nhanh lịch sử thuê, sở thích hoặc danh sách khách 'Blacklist'." 
      }
    ]
  },
  full: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO.",
      "Có App theo dõi doanh số bán hàng miễn phí có quảng cáo.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp với tất cả phần mềm khác SOF đã xuất bản.",
      "Có App cài đặt trên máy pos và thiết bị di động android.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 60MB.",
      "Số lượng chi nhánh: báo giá"
    ],
    systemFeatures: [
      { id: 1, title: "Gói FULL (Mở rộng – Quản lý chuỗi và Đồng bộ đa nền tảng)", desc: "Giải pháp toàn diện tối ưu cho việc vận hành chuỗi hệ thống lưu trú quy mô lớn." },
      { id: 2, title: "Bao gồm tất cả tính năng của gói PRO.", desc: "Sở hữu toàn bộ các module quản trị chuyên sâu của phiên bản Professional." },
      { id: 3, title: "Quản lý chuỗi nhiều khách sạn/chi nhánh trên một màn hình quản trị duy nhất.", desc: "Giám sát tình hình kinh doanh của toàn hệ thống thời gian thực chỉ với một tài khoản." },
      { id: 4, title: "Đồng bộ hóa kênh phân phối (Channel Manager): Tự động cập nhật phòng lên Agoda, Booking, Airbnb...", desc: "Tránh tình trạng Overbook bằng cách đồng bộ trạng thái phòng trống lên tất cả các sàn thương mại điện tử." },
      { id: 5, title: "Hệ thống Booking Engine: Đặt phòng trực tiếp trên Website/Fanpage để giảm phí hoa hồng.", desc: "Tăng tỷ lệ khách đặt phòng trực tiếp, giảm chi phí trung gian cho các nền tảng OTA." },
      { id: 6, title: "Quản lý công nợ đối tác: Đại lý du lịch (OTA) và các công ty lữ hành.", desc: "Theo dõi doanh thu, chiết khấu and lịch trình thanh toán với các đối tác lữ hành chặt chẽ." },
      { id: 7, title: "Hệ thống báo cáo tổng hợp hệ thống: So sánh hiệu quả kinh doanh giữa các chi nhánh.", desc: "Phân tích dữ liệu trực quan giúp chủ doanh nghiệp ra quyết định điều phối nguồn lực tối ưu." },
      { id: 8, title: "Tính năng Marketing tự động: Gửi Email/SMS chăm sóc khách sau khi trả phòng.", desc: "Tự động gửi lời cảm ơn hoặc voucher khuyến mãi để tăng tỷ lệ khách quay lại." }
    ]
  },
  pro: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO.",
      "Có App theo dõi doanh số bán hàng miễn phí có quảng cáo.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp với tất cả phần mềm khác SOF đã xuất bản.",
      "Có App cài đặt trên máy pos và thiết bị di động android.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      { id: 1, title: "1. Bao gồm toàn bộ GÓI BASIC + mở rộng", desc: "Nâng cấp tính năng quản trị tài chính và vận hành cho khách sạn quy mô vừa và lớn." },
      { id: 2, title: "2. Quản lý thu chi ngoại cảnh (Điện, nước, sửa chữa, lương)", desc: "Lập phiếu chi tự động hoặc thủ công cho các hạng mục vận hành và lương. Phân loại nhóm thu/chi để dễ dàng đối soát dòng tiền. Quản lý tồn quỹ tổng hợp (Tiền mặt, ngân hàng)." },
      { id: 3, title: "3. Quản lý dịch vụ đi kèm", desc: "Thiết lập danh mục và bảng giá dịch vụ (Giặt ủi, Spa, Thuê xe, F&B). Ghi nhận và gắn trực tiếp phí dịch vụ phát sinh vào hóa đơn tổng của phòng." },
      { id: 4, title: "4. Quản lý kho xuất - nhập - tồn (Nguyên vật liệu, đồ dùng)", desc: "Tạo phiếu nhập/xuất kho cho đồ tiêu hao (Amenities) và hàng hóa (Minibar). Tự động trừ tồn kho khi lễ tân chốt dịch vụ/minibar vào hóa đơn phòng." },
      { id: 5, title: "5. Kết nối phần cứng (Khóa từ & Điện)", desc: "Tích hợp ghi/hủy thẻ từ trực tiếp trên phần mềm đồng bộ với lúc Check-in/Check-out. Kết nối hệ thống điện thông minh: Quét thẻ mở điện, rút thẻ ngắt điện tự động." },
      { id: 6, title: "6. Hệ thống quản lý khách hàng (CRM)", desc: "Thiết lập chính sách hạng thành viên và quy tắc tự động tích/đổi điểm. Lưu trữ hồ sơ cá nhân, thói quen lưu trú và các yêu cầu đặc biệt (Ghi chú khách hàng)." },
      { id: 7, title: "7. Báo cáo phân tích chuyên sâu", desc: "Báo cáo thống kê tỷ lệ lấp đầy phòng (Occupancy Rate) theo ngày/tuần/tháng. Phân tích các chỉ số hiệu suất: Doanh thu trung bình trên mỗi phòng (RevPAR) và Giá phòng bình quân (ADR). Biểu đồ trực quan so sánh doanh thu - chi phí để tính toán lợi nhuận." }
    ]
  }
};
