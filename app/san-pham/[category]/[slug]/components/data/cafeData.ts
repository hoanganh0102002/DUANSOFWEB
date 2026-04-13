// Nội dung gói Phần mềm quản lý Cafe
// Gồm 3 gói: Basic, Full, Pro

export const cafeCardData = {
  basic: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp với tất cả cả phần mềm khác SOF đã xuất bản.",
      "Có App cài đặt trên máy pos và thiết bị di động android.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 30MB."
    ],
    systemFeatures: [
      "Tính năng quản lý sản phẩm và giá bán",
      "Tính năng quản lý chương trình bán hàng",
      "Tính năng bán hàng offline & online",
      "Quản lý khách hàng và tích điểm",
      "Tích hợp phương thức vận chuyển",
      "Cấu hình thanh toán đa nền tảng",
      "Cấu hình xuất hoá đơn điện tử",
      "Thống kê và báo cáo bán hàng",
      "Hỗ trợ App gọi món tại bàn QR"
    ]
  },
  full: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO, VNPay.",
      "Có App theo dõi doanh số bán hàng miễn phí có quảng cáo.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp với tất cả cả phần mềm khác SOF đã xuất bản.",
      "Có App cài đặt trên máy pos và thiết bị di động android.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 60MB.",
      "Số lượng chi nhánh: báo giá"
    ],
    systemFeatures: [
      "Gói FULL (Quản lý chuỗi nhiều chi nhánh)",
      "Bao gồm tất cả tính năng của gói PRO.",
      "Quản lý tập trung trên một tài khoản",
      "Luân chuyển hàng hóa giữa các kho",
      "Báo cáo tổng hợp và so sánh hiệu quả",
      "Phân quyền quản lý vùng/cửa hàng",
      "Quản lý công nợ với nhà cung cấp",
      "Đồng bộ dữ liệu thời gian thực chuỗi"
    ]
  },
  pro: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO, VNPay.",
      "Có App theo dõi doanh số bán hàng miễn phí có quảng cáo.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp với tất cả cả phần mềm khác SOF đã xuất bản.",
      "Có App cài đặt trên máy pos và thiết bị di động android.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      "Bao gồm toàn bộ GÓI BASIC + mở rộng",
      "Quản lý Kho (Warehouse Management)",
      "Quản lý Thu - Chi (Cash Flow)",
      "Nhập kho & tính Giá vốn bình quân",
      "Kiểm kê & Cân bằng kho tự động",
      "Cảnh báo hàng sắp hết & tồn lâu",
      "Quản lý Sổ quỹ tiền mặt & ngân hàng",
      "Đối soát tiền về thực tế từ Shipper"
    ]
  }
};

// Nội dung modal chi tiết
export const cafeModalData = {
  basic: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp với tất cả cả phần mềm khác SOF đã xuất bản.",
      "Có App cài đặt trên máy pos và thiết bị di động android.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 30MB."
    ],
    systemFeatures: [
      { id: 1, title: "1. Tính năng quản lý sản phẩm và giá bán", desc: "Quản lý danh mục, sản phẩm, biến thể (số lượng, loại, SKU...). Thiết lập và cập nhật giá bán, giá khuyến mãi. Quản lý tồn kho theo thời gian thực." },
      { id: 2, title: "2. Tính năng quản lý chương trình bán hàng", desc: "Thiết lập khuyến mãi, giảm giá, combo, voucher. Áp dụng linh hoạt theo sản phẩm, đơn hàng hoặc khách hàng. Hỗ trợ chiến dịch marketing và kích cầu." },
      { id: 3, title: "3. Tính năng bán hàng", desc: "Tạo và xử lý đơn hàng nhanh chóng (online/offline). Tích hợp giỏ hàng, áp dụng khuyến mãi tự động. Hỗ trợ đa kênh: tại quầy, website, mobile." },
      { id: 4, title: "4. Tính năng quản lý khách hàng và điểm", desc: "Lưu trữ thông tin khách hàng. Quản lý lịch sử mua hàng. Tích điểm, phân hạng khách hàng (VIP, thân thiết...). Hỗ trợ chăm sóc và giữ chân khách hàng." },
      { id: 5, title: "5. Tính năng tích hợp phương thức vận chuyển", desc: "Kết nối đơn vị vận chuyển (GHN, GHTK, Viettel Post...). Tự động tính phí ship. Theo dõi trạng thái giao hàng." },
      { id: 6, title: "6. Tính năng cấu hình thanh toán", desc: "Tích hợp đa phương thức thanh toán: ZaloPay, MoMo, , SePay. Hỗ trợ thanh toán online và đối soát giao dịch." },
      { id: 7, title: "7. Tính năng cấu hình xuất hoá đơn điện tử", desc: "Tích hợp nhà cung cấp hoá đơn điện tử. Tự động phát hành hoá đơn sau thanh toán. Quản lý và tra cứu hoá đơn." },
      { id: 8, title: "8. Tính năng thống kê và báo cáo bán hàng", desc: "Báo cáo doanh thu, lợi nhuận. Phân tích sản phẩm bán chạy. Thống kê theo thời gian, kênh bán, khách hàng." },
      { id: 9, title: "9. Hỗ trợ App tại bàn:", desc: "Quét mã QR gọi món/chọn món. Thanh toán tại chỗ và gọi nhân viên." }
    ]
  },
  full: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO, VNPay.",
      "Có App theo dõi doanh số ban hàng miễn phí có quảng cáo.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp với tất cả cả phần mềm khác SOF đã xuất bản.",
      "Có App cài đặt trên máy pos và thiết bị di động android.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 60MB.",
      "Số lượng chi nhánh: báo giá"
    ],
    systemFeatures: [
      { id: 1, title: "1. Gói FULL (Mở rộng - Quản lý chuỗi nhiều chi nhánh)", desc: "Giám sát hiệu quả kinh doanh đa điểm trên cùng một nền tảng quản trị tập trung." },
      { id: 2, title: "2. Bao gồm tất cả tính năng của gói PRO.", desc: "Sở hữu toàn bộ các module: Quản lý Kho, Thu Chi, Công nợ và Báo cáo nâng cao." },
      { id: 3, title: "3. Quản lý tập trung nhiều chi nhánh trên một tài khoản duy nhất.", desc: "Vận hành hệ thống đồng nhất, tiết kiệm thời gian giám sát cho chủ doanh nghiệp." },
      { id: 4, title: "4. Luân chuyển hàng hóa và nguyên vật liệu giữa các kho chi nhánh.", desc: "Quy trình điều phối linh hoạt đảm bảo tính cân đối về nguồn hàng toàn chuỗi." },
      { id: 5, title: "5. Báo cáo tổng hợp doanh thu toàn hệ thống và so sánh hiệu quả giữa các quán.", desc: "Phân tích dữ liệu trực quan giúp nhận diện đơn vị kinh doanh tốt nhất." },
      { id: 6, title: "6. Phân quyền quản lý chuyên sâu (Quản lý vùng, quản lý cửa hàng).", desc: "Tối ưu hóa bộ máy quản trị cấp cao với sự an toàn và bảo mật dữ liệu tuyệt đối." },
      { id: 7, title: "7. Quản lý công nợ và đơn đặt hàng với nhà cung cấp.", desc: "Chốt đơn lẻ/sỉ, theo dõi hạn mức nợ và lịch trình thanh toán cho đối tác." },
      { id: 8, title: "8. Đồng bộ dữ liệu thời gian thực giữa các điểm bán và văn phòng trung tâm.", desc: "Báo cáo doanh số và tồn kho được cập nhật tức thì giúp xử lý nghiệp vụ nhanh chóng." }
    ]
  },
  pro: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO, VNPay.",
      "Có App theo dõi doanh số ban hàng miễn phí có quảng cáo.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp với tất cả cả phần mềm khác SOF đã xuất bản.",
      "Có App cài đặt trên máy pos và thiết bị di động android.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      { id: 1, title: "1. Bao gồm toàn bộ GÓI BASIC + mở rộng:", desc: "Nâng cấp bảo mật và các module nghiệp vụ chuyên sâu hơn cho quán Cafe." },
      { 
        id: 2, 
        title: "2. Quản lý Kho (Warehouse Management)", 
        desc: "Nhập kho & Giá vốn: Tự động tính Giá vốn bình quân ngay khi nhập hàng để báo cáo lợi nhuận chuẩn. Kiểm kê & Cân bằng: Quét mã vạch đối soát; tự động tạo phiếu Xuất hủy nếu lệch tồn thực tế. Luân chuyển: Điều chuyển hàng giữa các chi nhánh/kho tổng (có bước xác nhận nhận hàng để tránh thất thoát). Cảnh báo tồn: Tự động nhắc khi hàng Sắp hết (để nhập) hoặc Tồn lâu (để xả hàng ở mục 2)." 
      },
      { 
        id: 3, 
        title: "3. Quản lý Thu - Chi (Cash Flow)", 
        desc: "Phiếu Thu/Chi ngoài: Quản lý tiền điện, nước, lương, mặt bằng... để tính Lợi nhuận ròng. Quản lý Sổ quỹ: Tách biệt số dư tiền mặt, ngân hàng và ví điện tử (Momo/ZaloPay). Đối soát tự động: Khớp lệnh giữa \"Đơn đã giao\" và \"Tiền đã về\" để kiểm soát shipper/ngân hàng. Quản lý Công nợ: Theo dõi nợ gối đầu nhà cung cấp và hạn mức nợ của khách sỉ." 
      }
    ]
  }
};
