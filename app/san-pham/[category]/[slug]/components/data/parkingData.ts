// Nội dung gói Phần mềm quản lý Bãi giữ xe (Thường - không phải Mobile)
// Gồm 3 gói: Basic, Full, Pro

export const parkingCardData = {
  basic: {
    highlights: [] as string[], 
    systemFeatures: [
      "Gói BASIC (Đơn giản - Phù hợp bãi giữ xe nhỏ, ghi vé thủ công)",
      "Giao diện ghi nhận xe vào/ra bằng máy tính hoặc thiết bị cầm tay.",
      "Quản lý danh sách thẻ từ, thẻ chip (loại thẻ trắng).",
      "Tự động tính tiền dựa trên thời gian gửi (theo lượt, theo giờ, theo ngày/đêm).",
      "In hóa đơn/phiếu thu tiền phí giữ xe cho khách hàng.",
      "Báo cáo doanh thu tiền mặt chi tiết theo từng ca trực của nhân viên.",
      "Thống kê số lượng xe đang còn trong bãi tại thời điểm hiện tại.",
      "Cảnh báo thẻ xe chưa trả hoặc các trường hợp thẻ bị mất."
    ]
  },
  full: {
    highlights: [] as string[],
    systemFeatures: [
      "Gói FULL (Mở rộng – Quản lý chuỗi bãi xe và bãi xe thông minh)",
      "Bao gồm tất cả tính năng của gói PRO.",
      "Quản lý tập trung nhiều bãi giữ xe ở các địa điểm khác nhau trên cùng một hệ thống.",
      "Tích hợp thanh toán không tiền mặt qua ví điện tử, thẻ ngân hàng, VETC/ePass.",
      "Báo cáo tổng hợp doanh thu toàn hệ thống và biểu đồ công suất sử dụng bãi xe.",
      "Hệ thống hướng dẫn đỗ xe thông minh (Parking Guidance): Báo vị trí còn trống.",
      "Cổng thông tin cho khách hàng tháng: Tự gia hạn thẻ qua App hoặc Website.",
      "API kết nối với hệ thống quản lý tòa nhà (BMS) hoặc quản lý khu đô thị."
    ]
  },
  pro: {
    highlights: [] as string[],
    systemFeatures: [
      "Gói PRO (Chuyên nghiệp – Phù hợp bãi xe tòa nhà, chung cư, siêu thị)",
      "Bao gồm tất cả tính năng của gói BASIC.",
      "Tích hợp Camera nhận dạng biển số tự động (OCR) với độ chính xác cao.",
      "Chụp ảnh người lái và biển số xe tại thời điểm vào và ra để đối soát.",
      "Quản lý khách gửi xe tháng: Đăng ký thông tin chủ xe, loại xe, biển số.",
      "Hệ thống cảnh báo biển số đen (xe bị mất cắp) hoặc biển số không khớp khi ra.",
      "Quản lý doanh thu đa dạng: Tiền mặt, chuyển khoản qua mã QR tĩnh/động.",
      "Tính năng đóng/mở Barrier tự động sau khi xác nhận xe hợp lệ."
    ]
  }
};

// Nội dung modal chi tiết
export const parkingModalData = {
  basic: {
    highlights: [] as string[], // Không hiển thị section Đặc điểm nổi bật
    systemFeatures: [
      { id: 1, title: "Gói BASIC (Đơn giản - Phù hợp bãi giữ xe nhỏ, ghi vé thủ công)", desc: "Giải pháp tinh gọn, tiết kiệm chi phí tối đa cho các bãi xe quy mô vừa và nhỏ." },
      { id: 2, title: "Giao diện ghi nhận xe vào/ra bằng máy tính hoặc thiết bị cầm tay.", desc: "Thao tác nhập liệu nhanh chóng thông qua mã vạch hoặc thẻ từ." },
      { id: 3, title: "Quản lý danh sách thẻ từ, thẻ chip (loại thẻ trắng).", desc: "Hệ thống quản lý mã thẻ an toàn, tránh việc trùng lặp hoặc mạo danh thẻ." },
      { id: 4, title: "Tự động tính tiền dựa trên thời gian gửi (theo lượt, theo giờ, theo ngày/đêm).", desc: "Công thức tính phí linh hoạt, tự động áp dụng khi quẹt thẻ ra." },
      { id: 5, title: "In hóa đơn/phiếu thu tiền phí giữ xe cho khách hàng.", desc: "Tích hợp máy in nhiệt, in phiếu thu ngay khi khách thanh toán xong." },
      { id: 6, title: "Báo cáo doanh thu tiền mặt chi tiết theo từng ca trực của nhân viên.", desc: "Kiểm soát dòng tiền mặt chặt chẽ, dễ dàng đối soát cuối ca." },
      { id: 7, title: "Thống kê số lượng xe đang còn trong bãi tại thời điểm hiện tại.", desc: "Giám sát công suất bãi xe thời gian thực để có phương án điều phối." },
      { id: 8, title: "Cảnh báo thẻ xe chưa trả hoặc các trường hợp thẻ bị mất.", desc: "Hệ thống nhắc nhở khi có bất thường về lịch sử thẻ hoặc thẻ đen (Blacklist)." }
    ]
  },
  full: {
    highlights: [] as string[], // Không hiển thị section Đặc điểm nổi bật
    systemFeatures: [
      { id: 1, title: "Gói FULL (Mở rộng – Quản lý chuỗi bãi xe và bãi xe thông minh)", desc: "Hệ thống quản trị tập trung mạnh mẽ cho các nhà quản lý chuyên nghiệp." },
      { id: 2, title: "Bao gồm tất cả tính năng của gói PRO.", desc: "Sở hữu toàn bộ các module từ cơ bản đến nâng cao (ANPR, Facial AI...)." },
      { id: 3, title: "Quản lý tập trung nhiều bãi giữ xe ở các địa điểm khác nhau trên cùng một hệ thống.", desc: "Giám sát đa điểm thời gian thực, quản lý từ xa mọi lúc mọi nơi." },
      { id: 4, title: "Tích hợp thanh toán không tiền mặt qua ví điện tử, thẻ ngân hàng, VETC/ePass.", desc: "Đa dạng hóa phương thức thanh toán, giảm thiểu tiền mặt tại quầy." },
      { id: 5, title: "Báo cáo tổng hợp doanh thu toàn hệ thống và biểu đồ công suất sử dụng bãi xe.", desc: "Phân tích dữ liệu kinh doanh trực quan để đưa ra quyết định chính xác." },
      { id: 6, title: "Hệ thống hướng dẫn đỗ xe thông minh (Parking Guidance): Báo vị trí còn trống.", desc: "Kết nối cảm biến và bảng LED chỉ dẫn vị trí đậu xe thủ công/tự động." },
      { id: 7, title: "Cổng thông tin cho khách hàng tháng: Tự gia hạn thẻ qua App hoặc Website.", desc: "Tối ưu hóa quy trình gia hạn thẻ, khách hàng tự thao tác không cần qua quầy." },
      { id: 8, title: "API kết nối với hệ thống quản lý tòa nhà (BMS) hoặc quản lý khu đô thị.", desc: "Khả năng mở rộng không giới hạn, tích hợp sâu vào hệ sinh thái Smart City." }
    ]
  },
  pro: {
    highlights: [] as string[], // Không hiển thị section Đặc điểm nổi bật
    systemFeatures: [
      { id: 1, title: "Gói PRO (Chuyên nghiệp – Phù hợp bãi xe tòa nhà, chung cư, siêu thị)", desc: "Nâng cấp an ninh và tự động hóa quy trình vận hành bãi xe chuyên sâu." },
      { id: 2, title: "Bao gồm tất cả tính năng của gói BASIC.", desc: "Thừa hưởng nền tảng quản lý bãi xe cơ bản với độ ổn định cao." },
      { id: 3, title: "Tích hợp Camera nhận dạng biển số tự động (OCR) với độ chính xác cao.", desc: "Tự động quét và ghi nhận biển số vào/ra, giảm thiểu sai sót do con người." },
      { id: 4, title: "Chụp ảnh người lái và biển số xe tại thời điểm vào và ra để đối soát.", desc: "Lưu trữ bằng chứng hình ảnh 2 lớp (người + xe) để tăng cường bảo mật." },
      { id: 5, title: "Quản lý khách gửi xe tháng: Đăng ký thông tin chủ xe, loại xe, biển số.", desc: "Module quản lý thẻ tháng chuyên nghiệp, hỗ trợ tìm kiếm và quản lý nhanh." },
      { id: 6, title: "Hệ thống cảnh báo biển số đen (xe bị mất cắp) hoặc biển số không khớp khi ra.", desc: "Cảnh báo tức thì cho nhân viên khi phát hiện rủi ro về an ninh." },
      { id: 7, title: "Quản lý doanh thu đa dạng: Tiền mặt, chuyển khoản qua mã QR tĩnh/động.", desc: "Hỗ trợ thanh toán hiện đại, đối soát doanh thu tự động và minh bạch." },
      { id: 8, title: "Tính năng đóng/mở Barrier tự động sau khi xác nhận xe hợp lệ.", desc: "Tích hợp điều khiển phần cứng Barrier, giải phóng sức lao động của bảo vệ." }
    ]
  }
};
