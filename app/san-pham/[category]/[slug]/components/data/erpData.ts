// Nội dung gói Phần mềm quản lý ERP (Enterprise Resource Planning)
// Gồm 3 gói: Basic, Full, Pro

export const erpCardData = {
  basic: {
    highlights: [
      "Hợp nhất Dữ liệu (All-in-One) toàn bộ quy trình.",
      "Quyết định Real-time dựa trên luồng dữ liệu thời gian thực.",
      "Công nghệ Web linh hoạt (Mobility) trên mọi thiết bị.",
      "Tương thích đa nền tảng Windows và Linux.",
      "Thân thiện người dùng, hỗ trợ Word, Excel, PDF.",
      "Bảo mật cấp Doanh nghiệp, kiểm soát quyền truy cập.",
      "Được sử dụng miễn phí dung lượng 30MB."
    ],
    systemFeatures: [
      "1. Quản lý Báo giá & Giá thành tự động.",
      "2. Quản lý Đơn hàng & Hợp đồng xuyên suốt.",
      "3. Quản lý Tài chính & Công nợ minh bạch.",
      "4. Báo cáo Doanh thu & Lợi nhuận (P&L) chi tiết."
    ]
  },
  full: {
    highlights: [
      "Giải pháp May đo 100% (Tailor-made) theo đúng quy trình riêng.",
      "Đột phá với Phân tích R&D tối ưu sản phẩm và xu hướng.",
      "Tối ưu Chi phí Bản quyền (No Per-User Fee) mua trọn gói 1 lần.",
      "Hệ sinh thái Mở (Easy Integration) kết nối không giới hạn.",
      "Quản trị Tiến độ \"Báo đỏ\" (Red Alert) giám sát thông minh.",
      "Bảo chứng Uy tín 15 năm thực chiến chuyển đổi số.",
      "Đồng hành & Hỗ trợ Trọn đời, cài đặt On-premise miễn phí.",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      "1. Bao gồm tất cả tính năng của gói PRO và mở rộng nâng cao.",
      "2. Quản lý Dự án Đa lớp chuyên sâu nhiều đối tượng.",
      "3. Quản lý Nhiệm vụ & Deadline, hệ thống Red Alert khẩn cấp.",
      "4. Quản trị Nghiên cứu & Phát triển (R&D) phân tích hệ số.",
      "5. Chiến lược & Năng lực Cạnh tranh, định giá bán hợp lý.",
      "6. Triển khai & Bảo trì Độc quyền, thiết lập Server tại chỗ."
    ]
  },
  pro: {
    highlights: [
      "Tự động hóa Chuỗi cung ứng (SCM) tối ưu luồng vận hành.",
      "Kết nối IoT Phần cứng, tự động hóa thu thập dữ liệu hiện trường.",
      "Vận hành Không giấy tờ (Paperless) phê duyệt trực tuyến.",
      "Quản trị Chất lượng Tiêu chuẩn (QA/QC) nghiêm ngặt.",
      "Cảnh báo Rủi ro & Khấu hao, quản lý vòng đời tài sản.",
      "Đồng bộ Kế toán - Kho vận, tự động hạch toán không độ trễ.",
      "Quản trị Nhân lực Toàn diện (HRM) liên kết KPI thực tế.",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      "1. Bao gồm tính năng gói BASIC và mở rộng chuyên nghiệp.",
      "2. Quản lý Kho bãi & Chuỗi cung ứng (Inventory) thông minh.",
      "3. Quản lý Chất lượng Sản phẩm (QA - QC) tiêu chuẩn.",
      "4. Quản lý Hồ sơ Nhân sự & Hợp đồng tập trung.",
      "5. Quản lý Chấm công & Thiết bị (IoT) tự động.",
      "6. Quản lý Đánh giá KPI & Tiền lương minh bạch.",
      "7. Quản lý Báo cáo Thuế & Bảo hiểm chuẩn xác."
    ]
  }
};

export const erpModalData = {
  basic: {
    highlights: [
      "Hợp nhất Dữ liệu (All-in-One): Tích hợp toàn bộ quy trình từ bán hàng đến tài chính trên một nền tảng duy nhất, xóa bỏ tình trạng dữ liệu rời rạc giữa các phòng ban.",
      "Quyết định Real-time: Tăng tính minh bạch và giúp ban lãnh đạo ra quyết định nhanh chóng, chính xác dựa trên luồng dữ liệu thời gian thực.",
      "Công nghệ Web linh hoạt (Mobility): Truy cập và điều hành doanh nghiệp từ bất kỳ thiết bị nào (Máy tính, iPad, Smartphone), làm việc hiệu quả mọi lúc, mọi nơi.",
      "Tương thích Đa nền tảng: Chạy mượt mà trên cả hệ điều hành Windows và Linux, giúp doanh nghiệp tận dụng tối đa hạ tầng phần cứng sẵn có.",
      "Thân thiện với người dùng: Hỗ trợ tùy chọn xuất/nhập dữ liệu mạnh mẽ qua các định dạng quen thuộc như Word, Excel, PDF, giúp nhân viên dễ dàng thao tác.",
      "Bảo mật cấp Doanh nghiệp: Tích hợp các biện pháp bảo mật nghiêm ngặt, kiểm soát quyền truy cập chi tiết để bảo vệ an toàn tuyệt đối dữ liệu kinh doanh.",
      "Được sử dụng miễn phí dung lượng 30MB."
    ],
    systemFeatures: [
      { 
        id: 1, 
        title: "1. Quản lý Báo giá & Giá thành:", 
        desc: "Tự động tính toán mức giá bán tương ứng và phù hợp cho từng đối tượng khách hàng. Hệ thống tự động đẩy cảnh báo thông minh khi có sự chênh lệch về thông số kỹ thuật. Phân tích và so sánh trực tiếp giá của đối thủ cạnh tranh và các nhà thầu tham gia dự án." 
      },
      { 
        id: 2, 
        title: "2. Quản lý Đơn hàng & Hợp đồng:", 
        desc: "Kết nối đồng bộ xuyên suốt với phân hệ báo giá để đảm bảo nhập liệu hợp đồng chính xác. Cung cấp công cụ tùy chỉnh form mẫu hợp đồng linh hoạt theo từng đặc thù kinh doanh. Tự động đẩy thông báo nhắc nhở trên hệ thống khi đơn hàng sắp đến hạn giao cho khách." 
      },
      { 
        id: 3, 
        title: "3. Quản lý Tài chính & Công nợ:", 
        desc: "Theo dõi dòng tiền minh bạch: Quản lý chi tiết các khoản tạm ứng, thanh toán của khách hàng. Tự động cảnh báo đến phòng kế toán khi công nợ sắp đến hạn hoặc gần hết hạn thanh toán. Hệ thống tự động áp dụng công thức tính tiền phạt khi đối tác để quá hạn thanh toán." 
      },
      { 
        id: 4, 
        title: "4. Quản lý Báo cáo Doanh thu & Lợi nhuận:", 
        desc: "Xuất báo cáo doanh số chi tiết theo giá trị hợp đồng đã ký kết hoặc theo hoá đơn thực tế. Cung cấp Lược đồ báo cáo lời - lỗ (P&L) chi tiết theo chu kỳ linh hoạt: tháng, quý, năm. Thống kê và trích xuất dữ liệu doanh thu tự động, phục vụ công tác kiểm toán nội bộ." 
      }
    ]
  },
  full: {
    highlights: [
      "Giải pháp May đo 100% (Tailor-made): Vượt xa các phần mềm đóng gói, hệ thống được SOF lập trình và tùy biến hoàn toàn theo đúng quy trình của doanh nghiệp bạn.",
      "Đột phá với Phân tích R&D: Trang bị module Nghiên cứu & Phát triển chuyên sâu, cung cấp dữ liệu lõi giúp doanh nghiệp tối ưu sản phẩm và dẫn đầu xu hướng thị trường.",
      "Tối ưu Chi phí Bản quyền (No Per-User Fee): Mua trọn gói một lần, giúp doanh nghiệp tiết kiệm khoản ngân sách khổng lồ cho phí bản quyền người dùng so với các ERP quốc tế.",
      "Hệ sinh thái Mở (Easy Integration): Khả năng kết nối không giới hạn với các hệ thống hiện có (CRM, Thương mại điện tử, Kế toán chuyên dụng) tạo thành một khối dữ liệu thống nhất.",
      "Quản trị Tiến độ \"Báo đỏ\" (Red Alert): Hệ thống giám sát dự án thông minh, kích hoạt cảnh báo đỏ ngay lập tức đối với các nhiệm vụ trễ hạn, đảm bảo tiến độ xuyên suốt.",
      "Bảo chứng Uy tín 15 năm: Được phát triển bởi SOF - đơn vị sở hữu hơn 15 năm kinh nghiệm thực chiến trong việc chuyển đổi số và xây dựng ERP cho các tập đoàn lớn.",
      "Đồng hành & Hỗ trợ Trọn đời: Triển khai cài đặt miễn phí tận nơi (On-premise), kèm theo gói bảo trì 1 năm và cam kết nâng cấp định kỳ để phần mềm luôn lớn mạnh.",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      { 
        id: 1, 
        title: "1. Bao gồm tất cả tính năng của gói Pro", 
        desc: "Sở hữu toàn bộ sức mạnh quản trị của phiên bản Pro và được mở rộng thêm các năng lực phân tích chiến lược, nghiên cứu chuyên sâu." 
      },
      { 
        id: 2, 
        title: "2. Quản lý Dự án Đa lớp:", 
        desc: "Quản lý chuyên sâu và bóc tách một dự án khổng lồ với sự tham gia của nhiều đối tượng khách hàng. Theo dõi sát sao tiến độ tổng thể, chia nhỏ công việc quản lý theo từng giai đoạn (Phase) của dự án." 
      },
      { 
        id: 3, 
        title: "3. Quản lý Nhiệm vụ & Deadline:", 
        desc: "Tính năng nhắc việc tự động thông minh, giúp các phòng ban quản lý phân bổ công việc hiệu quả. Hệ thống Báo đỏ (Red Alert) khẩn cấp sẽ kích hoạt khi phát hiện có nhiệm vụ hoặc deadline chưa hoàn thành." 
      },
      { 
        id: 4, 
        title: "4. Quản trị Nghiên cứu & Phát triển (R&D):", 
        desc: "Phân tích chuyên sâu các hệ số, thông số kỹ thuật của các dòng sản phẩm hiện tại và tương lai. Đưa ra các đề xuất thiết kế, cải tiến sản phẩm tối ưu, phù hợp nhất với thị hiếu thị trường." 
      },
      { 
        id: 5, 
        title: "5. Quản lý Chiến lược & Năng lực Cạnh tranh:", 
        desc: "Phân tích, so sánh chi tiết giá thành sản xuất của công ty so với mức giá của đối thủ cạnh tranh. Cung cấp cơ sở dữ liệu để Ban Giám đốc đề xuất các chính sách kinh doanh, định giá bán hợp lý nhất." 
      },
      { 
        id: 6, 
        title: "6. Dịch vụ Triển khai & Bảo trì Độc quyền:", 
        desc: "Triển khai cài đặt trực tiếp, thiết lập máy chủ (Server) tại hạ tầng của khách hàng hoàn toàn miễn phí. Khả năng kết nối mở rộng, trao đổi dữ liệu mượt mà với các mô-đun hoặc phần mềm của bên thứ 3." 
      }
    ]
  },
  pro: {
    highlights: [
      "Tự động hóa Chuỗi cung ứng (SCM): Tối ưu hóa toàn bộ luồng vận hành từ nhập vật tư, quản lý tồn kho đến xuất xưởng, giúp giảm thiểu rủi ro gián đoạn sản xuất.",
      "Kết nối IoT Phần cứng: Tích hợp trực tiếp với các thiết bị ngoại vi tại hiện trường (máy chấm công, máy quét mã vạch) để tự động hóa thu thập dữ liệu, loại bỏ sai số nhập tay.",
      "Vận hành Không giấy tờ (Paperless): Số hóa hoàn toàn các quy trình phê duyệt, chấm công, tính lương và đánh giá KPI, triệt tiêu các thủ tục hành chính cồng kềnh.",
      "Quản trị Chất lượng Tiêu chuẩn (QA/QC): Hệ thống hóa quy trình kiểm soát chất lượng, đảm bảo mọi sản phẩm và vật tư đều đạt chuẩn trước khi lưu thông.",
      "Cảnh báo Rủi ro & Khấu hao: Hệ thống tự động đẩy thông báo khi tồn kho dưới mức an toàn, đồng thời quản lý chặt chẽ vòng đời tài sản để lên lịch bảo trì.",
      "Đồng bộ Kế toán - Kho vận: Luồng dữ liệu chạy xuyên suốt, tự động hạch toán vật tư xuất/nhập kho vào hệ thống tài chính mà không có độ trễ.",
      "Quản trị Nhân lực Toàn diện (HRM): Không chỉ tính lương đơn thuần mà hệ thống còn liên kết kết quả KPI thực tế để trả lương minh bạch, giữ chân nhân tài.",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      { 
        id: 1, 
        title: "1. Bao gồm tính năng gói Basic", 
        desc: "Thừa hưởng nền tảng quản trị của gói Basic và mở rộng thêm các năng lực quản lý chuỗi cung ứng, nhân sự chuyên sâu." 
      },
      { 
        id: 2, 
        title: "2. Quản lý Kho bãi & Chuỗi cung ứng (Inventory):", 
        desc: "Theo dõi chi tiết, cập nhật liên tục mọi hoạt động nhập kho, xuất kho hàng hóa theo thời gian thực. Hệ thống tự động tính toán và đề xuất cấp thêm vật tư khi số lượng tồn kho chạm mức tối thiểu. Đẩy cảnh báo khẩn cấp trực tiếp qua màn hình khi hệ thống phát hiện hàng tồn kho sắp cạn kiệt." 
      },
      { 
        id: 3, 
        title: "3. Quản lý Chất lượng Sản phẩm (QA - QC):", 
        desc: "Tích hợp quy trình kiểm soát chất lượng (QA - QC) nghiêm ngặt trực tiếp trên hệ thống ERP. Yêu cầu xác nhận đạt tiêu chuẩn kỹ thuật đối với mọi hàng hóa, vật tư trước khi cho phép nhập/xuất kho." 
      },
      { 
        id: 4, 
        title: "4. Quản lý Hồ sơ Nhân sự & Hợp đồng:", 
        desc: "Số hóa và lưu trữ tập trung toàn diện hồ sơ sơ yếu lý lịch, hợp đồng lao động của toàn bộ nhân viên. Hệ thống thông báo tự động các mốc thời gian quan trọng: sắp hết hạn hợp đồng, đến kỳ xét duyệt nâng lương." 
      },
      { 
        id: 5, 
        title: "5. Quản lý Chấm công & Thiết bị (IoT):", 
        desc: "Tích hợp trực tiếp với máy chấm công (vân tay, khuôn mặt) để lấy dữ liệu giờ giấc tự động, chính xác. Quản lý danh mục Công cụ dụng cụ (CCDC), thiết bị văn phòng, tự động nhắc nhở khi đến hạn bảo hành, bảo trì." 
      },
      { 
        id: 6, 
        title: "6. Quản lý Đánh giá KPI & Tiền lương:", 
        desc: "Cung cấp bộ công cụ tự động đánh giá hiệu suất công việc (KPI) của nhân viên một cách minh bạch trên hệ thống. Liên kết chặt chẽ kết quả đánh giá KPI và dữ liệu chấm công để tự động tính toán ra bảng lương cuối tháng." 
      },
      { 
        id: 7, 
        title: "7. Quản lý Báo cáo Thuế & Bảo hiểm:", 
        desc: "Trích xuất các báo cáo quỹ lương chi tiết, phân bổ ngân sách lương rõ ràng theo từng phòng ban, bộ phận. Quản lý, tính toán và xuất số liệu chi phí đóng Bảo hiểm, Thuế thu nhập cá nhân (TNCN) chuẩn xác theo luật định." 
      }
    ]
  }
};
