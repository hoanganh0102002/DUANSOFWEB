// Nội dung gói Phần mềm quản lý Nhân sự (HR Management)
// Gồm 3 gói: Basic, Full, Pro

export const hrCardData = {
  basic: {
    highlights: [
      "Quản lý không giới hạn hồ sơ nhân sự.",
      "Nhân viên có thể sử dụng app android cho việc xin phép.",
      "Có hỗ trợ mua gói chấm công bằng camera theo thời gian thực.",
      "Chỉ hỗ trợ tính lương cơ bản theo tháng.",
      "Nạp dữ liệu đầu vào từ Excel và kết xuất báo cáo đa định dạng.",
      "Được sử dụng miễn phí dung lượng 90MB."
    ],
    systemFeatures: [
      "1. Tính năng quản lý nhân sự: Lưu hồ sơ, thông báo biến động...",
      "2. Tính năng quản lý hợp đồng: Thử việc, chính thức, in mẫu...",
      "3. Tính năng quản lý chấm công: Linh hoạt, tự động nhận ca...",
      "4. Tính năng quản lý tính lương: Tích hợp hệ thống, thuế TNCN...",
      "5. Quản lý bảo hiểm và báo cáo bảo hiểm chuyên sâu...",
      "7. Hệ thống báo cáo toàn diện, trực quan theo tuần/tháng...",
      "8. Quản lý phép qua App Mobile, xin phép mọi lúc mọi nơi."
    ]
  },
  full: {
    highlights: [
      "Quản lý không giới hạn hồ sơ nhân sự.",
      "Sử dụng app android xin phép, đăng ký cơm, chấm công từ xa.",
      "Tích hợp sẵn chấm công bằng camera thời gian thực.",
      "Hỗ trợ tính lương theo tháng, tuần, ngày, giờ linh hoạt.",
      "Nạp dữ liệu từ Excel và kết xuất báo cáo đa định dạng.",
      "Được sử dụng miễn phí dung lượng 199MB."
    ],
    systemFeatures: [
      "1. Bao gồm tất cả tính năng của gói PRO và mở rộng nâng cao.",
      "2. Quản trị Nhân sự & Số hóa (Smart HR): OCR, sơ đồ động...",
      "3. Hợp đồng & Chữ ký số (E-Signing) đầy đủ pháp lý.",
      "4. Chấm công FaceID Thế hệ mới tích hợp AI nhận diện.",
      "5. Đánh giá & Xếp loại Năng lực, sàng lọc nhân tài.",
      "6. Lương, Thuế & Bảo hiểm (Payroll & Tax) tự động hóa.",
      "7. Phúc lợi & Dự báo Tài chính, quản lý quỹ bảo hiểm sức khỏe.",
      "8. Báo cáo Thông minh (BI Dashboard), cảnh báo rủi ro quỹ lương.",
      "9. App Mobile & Trải nghiệm Nhân viên: Payslip, thông báo...",
      "10. Hạ tầng & Bảo mật mã hóa dữ liệu, xác thực 2 lớp (2FA)."
    ]
  },
  pro: {
    highlights: [
      "Quản lý không giới hạn hồ sơ nhân sự.",
      "Sử dụng app android xin phép, đăng ký cơm, chấm công từ xa.",
      "Tích hợp sẵn chấm công bằng camera thời gian thực.",
      "Hỗ trợ tính lương theo tháng, tuần, ngày, giờ linh hoạt.",
      "Nạp dữ liệu từ Excel và kết xuất báo cáo đa định dạng.",
      "Được sử dụng miễn phí dung lượng 199MB."
    ],
    systemFeatures: [
      "1. Bao gồm tất cả tính năng gói BASIC và mở rộng chuyên sâu.",
      "2. Quản lý Nhân sự & Hồ sơ Số hóa (Smart HR) linh hoạt.",
      "3. Quản lý Hợp đồng & Chữ ký số (E-Signing) chuyên nghiệp.",
      "4. Quản lý Chấm công & FaceID Thế hệ mới (Liveness detection).",
      "5. Quản lý Tiền lương & Thuế (Payroll & Tax) đa phương thức.",
      "6. Quản lý Bảo hiểm & Phúc lợi, kết nối BHXH điện tử.",
      "7. Hệ thống Báo cáo Thông minh (Business Intelligence) real-time.",
      "8. App Mobile & Trải nghiệm Nhân viên (Online Payslip).",
      "9. Hạ tầng Lưu trữ & Bảo mật đa tầng (Mã hóa, 2FA, Backup)."
    ]
  }
};

export const hrModalData = {
  basic: {
    highlights: [
      "Quản lý không giới hạn hồ sơ nhân sự.",
      "Nhân viên có thể sử dụng app android cho việc xin phép.",
      "Có hỗ trợ mua gói chấm công bằng camera theo thời gian thực.",
      "Chỉ hỗ trợ tính lương cơ bản theo tháng.",
      "Nạp dữ liệu đầu vào từ Excel và kết xuất báo cáo đa định dạng.",
      "Được sử dụng miễn phí dung lượng 90MB."
    ],
    systemFeatures: [
      { 
        id: 1, 
        title: "1. Tính năng quản lý nhân sự.", 
        desc: "Mọi thông tin nhân viên được lưu đầy đủ. Tự động thông báo mọi biến động nhân sự ngay trên màn hình chính." 
      },
      { 
        id: 2, 
        title: "2. Tính năng quản lý hợp đồng.", 
        desc: "Quản lý nhiều loại hợp đồng theo trình tự từ thử việc, một năm đến hợp đồng lao động vô thời hạn. Có hỗ trợ nhiều khoản lương phù hợp đồng thời nhiều công ty áp dụng. Có thể tích hợp hợp đồng lao động điện tử với bên thứ 3. Chi phí tích hợp thoả thuận. In hợp đồng theo mẫu tự động từ thông tin nhân sự và mức lương hợp đồng." 
      },
      { 
        id: 3, 
        title: "3. Tính năng quản lý chấm công.", 
        desc: "Tính năng chấm công linh hoạt. Hệ thống có thể tự động nhận ca và chấm chính xác. Hoặc cố định ca để sắp ca làm việc trước cho nhân viên đi đúng lịch. Tính năng chấm công áp dụng cho nhiều công ty sản xuất tạo ưu điểm nổi bật cho hệ thống. Có hỗ trợ xử lý ngoại lệ từ nhập thêm giờ vào ra, đến điều chỉnh ca, tự động ca theo chuẩn quốc tế làm việc." 
      },
      { 
        id: 4, 
        title: "4. Tính năng quản lý tính lương.", 
        desc: "Tính lương 1 lần và in phiếu lương ngay lập tức. Tính lương có hỗ trợ tích hợp hệ thống bán hàng nhân viên từ hệ thống trực tiếp SOF.COM.VN để có thể tính lương kinh doanh. Tính lương có hỗ trợ theo các chuẩn mực tính thuế TNCN và phụ thuộc mới nhất theo luật Việt Nam." 
      },
      { 
        id: 5, 
        title: "5. Tính năng quản lý bảo hiểm và báo cáo bảo hiểm.", 
        desc: "Cho phép dự đoán đóng bảo hiểm cho việc tăng giảm bảo hiểm. Cho phép in báo cáo đóng bảo hiểm kết thúc kỳ tính lương." 
      },
      { 
        id: 7, 
        title: "7. Các tính năng báo cáo toàn bộ hệ thống.", 
        desc: "Báo cáo công theo từng cột của ngày 1 tháng biểu diễn tiến trình theo tuần giúp bảng công 1 người là 1 dòng và dễ nhìn. Đáp ứng báo cáo số lượng lớn công nhân viên. Có cảnh báo bất thường báo cáo công." 
      },
      { 
        id: 8, 
        title: "8. Tính năng quản lý phép và có App mobile kết nối quản lý xin phép.", 
        desc: "Cho phép nhân viên xin phép bất cứ đâu, bất cứ thời gian nào." 
      }
    ]
  },
  full: {
    highlights: [
      "Quản lý không giới hạn hồ sơ nhân sự.",
      "Nhân viên có thể sử dụng app android cho việc xin phép, đăng ký cơm và chấm công từ xa.",
      "Tích hợp sẵn chấm công bằng camera theo thời gian thực.",
      "Hỗ trợ tính lương theo tháng, theo tuần, theo ngày, theo giờ.",
      "Nạp dữ liệu đầu vào từ Excel và kết xuất báo cáo đa định dạng.",
      "Được sử dụng miễn phí dung lượng 199MB."
    ],
    systemFeatures: [
      { 
        id: 1, 
        title: "1. Bao gồm tất cả tính năng của gói Pro.", 
        desc: "Thừa hưởng toàn bộ nền tảng quản trị của gói Pro và mở rộng các giải pháp chuyển đổi số toàn diện." 
      },
      { 
        id: 2, 
        title: "2. Quản trị Nhân sự & Số hóa (Smart HR).", 
        desc: "Số hóa OCR: Tự động nhận diện hồ sơ (CCCD, Bằng cấp). Lộ trình thăng tiến: Ghi nhận lịch sử khen thưởng, kỷ luật. Sơ đồ tổ chức động và Dashboard biến động nhân sự thời gian thực." 
      },
      { 
        id: 3, 
        title: "3. Hợp đồng & Chữ ký số (E-Signing).", 
        desc: "Ký số Mobile: Ký hợp đồng lao động trực tuyến đầy đủ pháp lý. Phê duyệt tự động và lưu trữ Versioning để truy xuất lịch sử thay đổi lương, phụ lục." 
      },
      { 
        id: 4, 
        title: "4. Chấm công FaceID Thế hệ mới.", 
        desc: "FaceID AI: Nhận diện người thật (Liveness). Xử lý công phức tạp: Tự động tách giờ đêm, tăng ca (OT). Tối ưu cho nhà máy quy mô lớn, nhiều ca kíp." 
      },
      { 
        id: 5, 
        title: "5. Đánh giá & Xếp loại Năng lực.", 
        desc: "Đánh giá định kỳ hiệu quả và tiến bộ. Sàng lọc nhân tài để quy hoạch nguồn lực. Cơ sở dữ liệu thực tế để xét lương, thưởng minh bạch." 
      },
      { 
        id: 6, 
        title: "6. Lương, Thuế & Bảo hiểm (Payroll & Tax).", 
        desc: "Lương đa phương thức: Lương 3P, lương sản phẩm. Kết nối doanh thu thực tế tính hoa hồng tự động. Tự động quyết toán thuế TNCN và đồng bộ trạng thái đóng BHXH." 
      },
      { 
        id: 7, 
        title: "7. Phúc lợi & Dự báo Tài chính.", 
        desc: "Quản lý quỹ bảo hiểm sức khỏe (PVI/Bảo Việt), sinh nhật, du lịch. Dự báo dòng tiền: Báo cáo so sánh và dự chi quỹ bảo hiểm, phúc lợi kỳ tới." 
      },
      { 
        id: 8, 
        title: "8. Báo cáo Thông minh (BI).", 
        desc: "BI Dashboard: Biểu đồ động về quỹ lương và biến động nhân sự real-time. Cảnh báo rủi ro chi phí vượt ngân sách và báo cáo Pivot tự kéo thả thông tin." 
      },
      { 
        id: 9, 
        title: "9. App Mobile & Trải nghiệm Nhân viên.", 
        desc: "Số hóa nghỉ phép: Xin và duyệt phép đa cấp. Cổng giao tiếp thông báo, tin tức và khảo sát nội bộ. Xem phiếu lương chi tiết và phản hồi ngay trên App." 
      },
      { 
        id: 10, 
        title: "10. Hạ tầng & Bảo mật.", 
        desc: "Lưu trữ 199MB mặc định. Bảo mật mã hóa dữ liệu chuẩn, xác thực 2 lớp (2FA) và Backup tự động hàng ngày." 
      }
    ]
  },
  pro: {
    highlights: [
      "Quản lý không giới hạn hồ sơ nhân sự.",
      "Nhân viên có thể sử dụng app android cho việc xin phép, đăng ký cơm và chấm công từ xa.",
      "Tích hợp sẵn chấm công bằng camera theo thời gian thực.",
      "Hỗ trợ tính lương theo tháng, theo tuần, theo ngày, theo giờ.",
      "Nạp dữ liệu đầu vào từ Excel và kết xuất báo cáo đa định dạng.",
      "Được sử dụng miễn phí dung lượng 199MB."
    ],
    systemFeatures: [
      { 
        id: 1, 
        title: "1. Bao gồm tất cả tính năng gói basic.", 
        desc: "Thừa hưởng toàn bộ nền tảng quản trị của gói Basic và nâng cấp các module chuyên sâu cho doanh nghiệp." 
      },
      { 
        id: 2, 
        title: "2. Quản lý Nhân sự & Hồ sơ Số hóa (Smart HR).", 
        desc: "Số hóa hồ sơ OCR: Tự động nhận diện thông tin từ CCCD, bằng cấp. Quản lý lộ trình thăng tiến: Theo dõi lịch sử vị trí, khen thưởng, kỷ luật. Sơ đồ tổ chức động (Org Chart) tự động cập nhật." 
      },
      { 
        id: 3, 
        title: "3. Quản lý Hợp đồng & Chữ ký số (E-Signing).", 
        desc: "Tích hợp Chữ ký số: Ký hợp đồng lao động trực tuyến trên App Mobile. Luồng phê duyệt tự động. Lưu trữ phiên bản (Versioning) theo dõi lịch sử thay đổi mức lương." 
      },
      { 
        id: 4, 
        title: "4. Quản lý Chấm công & FaceID Thế hệ mới.", 
        desc: "FaceID chống gian lận: Nhận diện thực thể sống (Liveness detection). Xử lý bảng công phức tạp: Tự động tách giờ làm đêm, tăng ca (OT) theo hệ số chuẩn quốc tế." 
      },
      { 
        id: 5, 
        title: "5. Quản lý Tiền lương & Thuế (Payroll & Tax).", 
        desc: "Tính lương đa phương thức: Lương 3P, lương sản phẩm (Piece-rate pay). Đồng bộ doanh thu (API): Kết nối SOF.COM.VN tính hoa hồng. Quyết toán Thuế TNCN tự động." 
      },
      { 
        id: 6, 
        title: "6. Quản lý Bảo hiểm & Phúc lợi.", 
        desc: "Kết nối cổng BHXH điện tử: Đồng bộ trạng thái đóng bảo hiểm. Quản lý quỹ phúc lợi: Theo dõi bảo hiểm sức khỏe (PVI, Bảo Việt), sinh nhật, du lịch. Phân tích & Dự báo tài chính kỳ tới." 
      },
      { 
        id: 7, 
        title: "7. Hệ thống Báo cáo Thông minh (Business Intelligence).", 
        desc: "Dashboard Real-time: Biểu đồ động biến động nhân sự, chi phí lương. Cảnh báo rủi ro: Tự động cảnh báo khi lương vượt ngân sách hoặc số giờ OT vượt ngưỡng. Báo cáo tùy biến (Pivot Table)." 
      },
      { 
        id: 8, 
        title: "8. App Mobile & Trải nghiệm Nhân viên.", 
        desc: "Số hóa quy trình nghỉ phép đa cấp. Cổng giao tiếp nội bộ: Gửi thông báo, tin tức và khảo sát. Tra cứu lương (Online Payslip) và phản hồi thắc mắc ngay trên ứng dụng." 
      },
      { 
        id: 9, 
        title: "9. Hạ tầng Lưu trữ & Bảo mật.", 
        desc: "Dung lượng 199MB mặc định. Bảo mật đa tầng: Mã hóa chuẩn, xác thực 2 lớp (2FA). Hệ thống tự động Sao lưu (Backup) hàng ngày." 
      }
    ]
  }
};
