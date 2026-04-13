// Nội dung gói Phần mềm quản lý Vận tải (Transport Management)
// Gồm 3 gói: Basic, Full, Pro

export const transportCardData = {
  basic: {
    highlights: [
      "Quản trị Đội xe Toàn diện (Xe cont, xe tải, moóc).",
      "Số hóa Lịch trình trực quan, nắm bắt chính xác tiến độ.",
      "Báo giá & Hợp đồng Thông minh, tự nạp biểu mẫu đa ngôn ngữ.",
      "Quản trị Đám mây (Web-based) điều phối xe mọi lúc mọi nơi.",
      "Thân thiện với Word, Excel, kết xuất báo cáo đa định dạng.",
      "Bảo mật Phân quyền chi tiết đến từng chức năng nhỏ.",
      "Được sử dụng miễn phí dung lượng 30MB."
    ],
    systemFeatures: [
      "1. Quản lý Danh mục Nhân sự & Phương tiện.",
      "2. Quản lý Khách hàng & Chào giá chuyên nghiệp.",
      "3. Quản lý Đơn hàng & Hợp đồng tự động tính giá.",
      "4. Quản lý Lịch xe & Phân công tài xế linh hoạt.",
      "5. Quản lý Lộ trình & Giám sát KM thực tế.",
      "6. Hệ thống Báo cáo Doanh thu cơ bản theo tiêu chí."
    ]
  },
  full: {
    highlights: [
      "Quản trị Đa chi nhánh tập trung cho quy mô logistics lớn.",
      "Tích hợp Khai báo Hải quan (Customs), Forwarder chuyên nghiệp.",
      "Phân tích Giá thành (Costing) biến phí dầu, cầu đường, lương.",
      "Giao tiếp Đa ngôn ngữ (Bilingual) Tiếng Anh - Tiếng Việt.",
      "Kết nối IoT Dữ liệu nguồn: Trạm cân, định vị, máy quét.",
      "Bảo chứng giải pháp cho tập đoàn lớn (Bình Điền, Hasan...).",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      "1. Bao gồm tất cả tính năng của gói PRO và mở rộng nâng cao.",
      "2. Quản lý Điều khiển Khai báo Hải quan chuyên nghiệp.",
      "3. Quản lý Tiến độ Thủ tục Xuất Nhập khẩu thời gian thực.",
      "4. Phân tích Giá thành (Costing) thực tế và biên lợi nhuận.",
      "5. Quản lý Điều phối Đa nền tảng (DHL, TNT, Hàng không).",
      "6. Quản trị Hệ thống Đa chi nhánh xuyên suốt, băng thông lớn.",
      "7. Quản trị Server & Mở rộng Tích hợp Nhân sự, Kế toán."
    ]
  },
  pro: {
    highlights: [
      "Tự động hóa Kế hoạch Vận tải theo luồng khép kín.",
      "Kiểm soát Chi phí Khép kín (phí dầu, nhớt, cầu đường).",
      "Hệ thống Cảnh báo (Alarm) đăng kiểm, bảo hiểm, hợp đồng.",
      "Điều phối Linh hoạt (Multi-dispatch) tối ưu công suất đội xe.",
      "Quản trị Lương & Phụ cấp tài xế tự động theo lần vận tải.",
      "Gửi Email Hóa đơn Tự động trực tiếp cho khách hàng.",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      "1. Bao gồm tất cả tính năng của gói BASIC và mở rộng chuyên sâu.",
      "2. Quản lý Kế hoạch Vận tải Nâng cao (tháng/tuần/ngày).",
      "3. Hệ thống Cảnh báo (Alarm) xe và hợp đồng kinh tế.",
      "4. Quản lý Điều khiển Vận chuyển đa phương thức chuyên nghiệp.",
      "5. Quản lý Ứng tiền & Tạm ứng Tài xế chặt chẽ.",
      "6. Quản lý Kế toán & Quyết toán bám sát chi phí kế hoạch.",
      "7. Quản lý Chi phí & Báo cáo Lương tài xế, phụ xế chi tiết."
    ]
  }
};

export const transportModalData = {
  basic: {
    highlights: [
      "Quản trị Đội xe Toàn diện: Số hóa thông tin và quản lý mọi loại phương tiện đặc thù ngành logistics (Xe cont, xe tải, sơ mi rơ moóc).",
      "Số hóa Lịch trình: Thay thế bảng tính thủ công bằng 'Bảng lịch xe' trực quan, nắm bắt chính xác tiến độ xe đang đi đến đâu, do ai phụ trách.",
      "Báo giá & Hợp đồng Thông minh: Tự động tính toán giá vận tải dựa trên thiết lập, tự nạp biểu mẫu hợp đồng đa ngôn ngữ (Hợp đồng nguyên tắc, phụ lục).",
      "Quản trị Dữ liệu Đám mây (Web-based): Sử dụng công nghệ web cao cấp, truy cập và điều phối xe từ mọi thiết bị (PC, iPhone, iPad) ở bất cứ nơi nào có Internet.",
      "Thân thiện với Word, Excel: Hỗ trợ nạp dữ liệu đầu vào từ Excel và kết xuất báo cáo đa định dạng (PDF, Word, Excel), giúp nhân viên làm quen hệ thống nhanh chóng.",
      "Cam kết Bảo mật Phân quyền: Bảo mật nghiêm ngặt đến từng chức năng nhỏ (ví dụ: phân quyền ai được quản lý hợp đồng nào), đảm bảo an toàn thông tin cước phí.",
      "Được sử dụng miễn phí dung lượng 30MB."
    ],
    systemFeatures: [
      { 
        id: 1, 
        title: "1. Quản lý Danh mục & Nhập liệu:", 
        desc: "Quản lý danh sách nhân sự vận hành: Tài xế, phụ xế. Quản lý thông tin phương tiện: Xe cont, xe tải, mooc. Nhập liệu và lưu trữ thông tin đối tác, khách hàng, các địa điểm vận chuyển (Từ - Đến)." 
      },
      { 
        id: 2, 
        title: "2. Quản lý Khách hàng & Chào giá:", 
        desc: "Lưu trữ thông tin khách hàng chi tiết và các yêu cầu về giao nhận hàng. Tạo báo giá, chào giá theo các form mẫu có sẵn trên hệ thống. Hỗ trợ in mẫu chào giá gửi cho khách hàng một cách chuyên nghiệp." 
      },
      { 
        id: 3, 
        title: "3. Quản lý Đơn hàng & Hợp đồng:", 
        desc: "Cho phép quản lý hợp đồng theo hợp đồng nguyên tắc và phụ lục hợp đồng. Tự nạp biểu mẫu hợp đồng, cho phép chọn nhiều loại hợp đồng theo ngôn ngữ khác nhau. Hệ thống tự động tính giá vận tải dựa trên bảng giá đã thiết lập." 
      },
      { 
        id: 4, 
        title: "4. Quản lý Lịch xe & Phân công:", 
        desc: "Đặt xe, phân công tài xế theo ngày giờ cụ thể đi đến nơi nào, ở đâu. Hiển thị thông báo theo ngày: xe đi đâu, người liên hệ và vận chuyển gì. Quản lý bảng lịch xe hiển thị theo tháng để nhân viên, tài xế dễ dàng nhận biết lịch trình." 
      },
      { 
        id: 5, 
        title: "5. Quản lý Lộ trình & Giám sát:", 
        desc: "Theo dõi tiến độ xe trên hệ thống (đang đi đến đâu và công việc là gì). Quản lý chi tiết các tuyến đường vận tải và thống kê số KM vận tải thực tế." 
      },
      { 
        id: 6, 
        title: "6. Quản lý Báo cáo Doanh thu cơ bản:", 
        desc: "Cung cấp báo cáo doanh thu theo nhiều tiêu chí đa dạng để quản trị. Trích xuất doanh thu theo khoảng ngày, theo khách hàng, mặt hàng, nhân viên và đơn hàng." 
      }
    ]
  },
  full: {
    highlights: [
      "Quản trị Đa chi nhánh tập trung: Khả năng triển khai mạnh mẽ cho các doanh nghiệp logistics quy mô lớn, nhiều chi nhánh, quản trị xuyên suốt trên một nền tảng.",
      "Tích hợp Khai báo Hải quan (Customs Clearance): Không chỉ chạy xe, hệ thống còn quản lý tiến độ mở tờ khai, booking xuất nhập khẩu, đáp ứng trọn vẹn nghiệp vụ Forwarder.",
      "Phân tích Giá thành Vận tải (Costing): Hệ thống tự động tập hợp các biến phí (dầu, cầu đường, lương) và định phí để phân tích giá thành thực tế cho từng chuyến xe.",
      "Giao tiếp Đa ngôn ngữ (Bilingual): Hỗ trợ giao diện song ngữ Tiếng Anh và Tiếng Việt, người dùng dễ dàng chuyển đổi, phù hợp cho các doanh nghiệp có yếu tố nước ngoài.",
      "Kết nối IoT Dữ liệu nguồn: Khả năng mở rộng tích hợp với máy móc phần cứng (máy quét mã vạch, máy in, trạm cân, thiết bị định vị) để xử lý công việc tự động.",
      "Bảo chứng Giải pháp Doanh nghiệp lớn: Khả năng đáp ứng và chịu tải dữ liệu tốt, đã triển khai thành công cho các tập đoàn lớn (Công ty Phân bón Bình Điền, Dược phẩm Hasan...).",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      { 
        id: 1, 
        title: "1. Bao gồm các tính năng của gói Pro", 
        desc: "Sở hữu toàn bộ nền tảng quản trị vận tải chuyên nghiệp của gói Pro và mở rộng các phân hệ xuất nhập khẩu, đa chi nhánh." 
      },
      { 
        id: 2, 
        title: "2. Quản lý Điều khiển Khai báo Hải quan:", 
        desc: "Quản lý cơ chế điều khiển khai báo hải quan chuyên nghiệp cho hàng hóa xuất/nhập. Quản lý nhập chi tiết tờ khai nhập khẩu, xuất khẩu và quản lý booking hàng hóa." 
      },
      { 
        id: 3, 
        title: "3. Quản lý Tiến độ Thủ tục Xuất Nhập khẩu:", 
        desc: "Theo dõi sát sao tiến độ hồ sơ hải quan đang xử lý tại cảng/cửa khẩu. Chuyển trạng thái sang hoàn thành khai báo hải quan, hỗ trợ trích xuất báo cáo tờ khai." 
      },
      { 
        id: 4, 
        title: "4. Quản lý Phân tích Giá thành (Costing):", 
        desc: "Tập hợp toàn bộ chi phí thực tế (ứng tiền, phí dầu, nhớt, cầu đường, lương tài xế). Phân tích và quản lý giá thành vận tải thực tế so với báo giá ban đầu để tính biên lợi nhuận." 
      },
      { 
        id: 5, 
        title: "5. Quản lý Điều phối Đa nền tảng:", 
        desc: "Điều phối luồng xe kết hợp vận chuyển hàng nội bộ, hàng không và các đối tác chuyển phát quốc tế (DHL, TNT). Tích hợp dữ liệu từ các phòng ban (Nhân sự, Kế toán, Kho bãi) để tối ưu hóa nguồn lực." 
      },
      { 
        id: 6, 
        title: "6. Quản trị Hệ thống Đa chi nhánh:", 
        desc: "Phân tách và tổng hợp dữ liệu kế hoạch vận tải độc lập theo từng chi nhánh. Quản lý xuyên suốt mà không lo nghẽn dữ liệu, đảm bảo tốc độ phản hồi hệ thống (Băng thông lớn)." 
      },
      { 
        id: 7, 
        title: "7. Quản trị Server & Mở rộng Tích hợp:", 
        desc: "Cài đặt phần mềm miễn phí bản quyền (Server Linux, MySQL 5.x, Client), tối ưu chi phí hạ tầng. Tích hợp đồng bộ với phần mềm nhân sự, chấm công tính lương và hệ thống kế toán doanh nghiệp." 
      }
    ]
  },
  pro: {
    highlights: [
      "Tự động hóa Kế hoạch Vận tải: Quản lý vòng đời chuyến đi theo luồng khép kín (Lên kế hoạch -> Đang xử lý -> Hoàn thành), cập nhật trạng thái toàn hệ thống.",
      "Kiểm soát Chi phí Khép kín: Quản lý chặt chẽ dòng tiền lưu động cho tài xế (phí dầu, nhớt, cầu đường), triệt tiêu rủi ro thất thoát trong quá trình vận hành.",
      "Hệ thống Cảnh báo (Alarm) Chuyên sâu: Nhắc nhở tự động các mốc quan trọng như hợp đồng kinh tế hết hạn (trước 30 ngày), hạn bảo hiểm, đăng kiểm xe cont/tải/mooc.",
      "Điều phối Linh hoạt (Multi-dispatch): Khả năng điều xe và tài xế nhiều lần cho một đơn hàng vận tải phức tạp, tối ưu hóa công suất đội xe.",
      "Quản trị Lương & Phụ cấp: Tự động bóc tách và thống kê lương tài xế, phụ xế theo từng lần vận tải hoặc theo tháng, minh bạch thu nhập.",
      "Gửi Email Hóa đơn Tự động: Chấp nhận xuất hóa đơn và tự động gửi email thông báo chi phí/hóa đơn dịch vụ vận tải trực tiếp cho khách hàng.",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      { 
        id: 1, 
        title: "1. Bao gồm tất cả tính năng của gói Basic", 
        desc: "Kế thừa toàn bộ tính năng cốt lõi và nâng cấp các công cụ quản lý chi phí, cảnh báo tự động chuyên sâu." 
      },
      { 
        id: 2, 
        title: "2. Quản lý Kế hoạch Vận tải Nâng cao:", 
        desc: "Đa dạng cách lên kế hoạch: Nhập kế hoạch tổng 1 lần/tháng, 1 lần/tuần hoặc lên kế hoạch theo từng ngày. Quản lý điều tài xế, phụ xế; điều xe và tài xế nhiều lần cho một lần vận tải. Hỗ trợ ghi nhận trạng thái vận tải nhanh chóng (Mới, Đang xử lý, Hoàn thành)." 
      },
      { 
        id: 3, 
        title: "3. Quản lý Hệ thống Cảnh báo (Alarm):", 
        desc: "Alarm xe cont, xe tải, mooc (cảnh báo hạn đăng kiểm, bảo dưỡng, bảo hiểm). Alarm hợp đồng kinh tế với khách hàng/đối tác sắp hết hạn (cảnh báo trước 30 ngày). Alarm hợp đồng lao động của tài xế, nhân viên hết hạn." 
      },
      { 
        id: 4, 
        title: "4. Quản lý Điều khiển Vận chuyển:", 
        desc: "Nhập thông tin chi tiết: phương thức vận chuyển, số bill, trọng lượng, thời gian, nơi giao hàng. Cơ chế chuyển trạng thái: Đưa vào 'Đang xử lý' và chuyển sang 'Hoàn thành' khi giao xong. Quản lý vận tải đa phương thức: Xe cont, xe tải (hàng nội bộ/hàng không) và dịch vụ khác (DHL, TNT)." 
      },
      { 
        id: 5, 
        title: "5. Quản lý Ứng tiền & Tạm ứng Tài xế:", 
        desc: "Nhập chi tiết dòng kế hoạch ứng tiền chuyến đi (Gồm phí dầu, phí nhớt, cầu đường, bến bãi). Quản lý kế hoạch ứng tiền nhân viên theo hợp đồng, cho phép quản lý duyệt tiền ứng. Kiểm soát toàn bộ quá trình ứng, in phiếu ứng và danh sách vận tải đang ứng tiền." 
      },
      { 
        id: 6, 
        title: "6. Quản lý Kế toán & Quyết toán:", 
        desc: "Hỗ trợ xử lý chi tiền và quyết toán bám sát theo chi phí kế hoạch đã đề ra ban đầu. Xử lý tiền xong đưa vào chấp nhận xuất hóa đơn, chuyển về trạng thái kế toán hoàn thành. Tự mở rộng và quản lý các loại phí phải thu khách hàng ngoài cước vận tải chính." 
      },
      { 
        id: 7, 
        title: "7. Quản lý Chi phí & Báo cáo Lương:", 
        desc: "Quản lý phí dịch vụ vận tải, xuất hóa đơn và gửi mail cho khách hàng. Báo cáo chi tiết lương tài xế, phụ xế, phụ cấp cho từng lần vận tải. In báo cáo tổng hợp theo tài xế, báo cáo nhóm tài xế, báo cáo theo xe và tổng hợp xe cont/xe tải." 
      }
    ]
  }
};
