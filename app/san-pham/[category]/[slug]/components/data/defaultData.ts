// Nội dung mặc định cho các gói phần mềm khác (Bán hàng, Nhà hàng, Khách sạn, v.v.)
// Gồm 3 gói: Basic, Full, Pro

export const defaultCardData = {
  basic: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp cân điện tử. Từ đó bán hàng cho tất cả cả mô hình.",
      "Tích hợp với tất cả cả phần mềm khác SOF đã xuất bản."
    ],
    systemFeatures: [
      "1. Tính năng quản lý sản phẩm và giá bán",
      "2. Tính năng quản lý chương trình bán hàng",
      "3. Tính năng bán hàng"
    ]
  },
  full: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO, VNPay.",
      "Có App theo dõi doanh số bán hàng miễn phí có quảng cáo.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp cân điện tử. Từ đó bán hàng cho tất cả cả mô hình."
    ],
    systemFeatures: [
      "1. Bao gồm toàn bộ GÓI BASIC + mở rộng:",
      "2. Quản lý Kho (Warehouse Management)",
      "3. Quản lý Thu - Chi (Cash Flow)"
    ]
  },
  pro: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO, VNPay.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp cân điện tử. Từ đó bán hàng cho tất cả cả mô hình.",
      "Tích hợp với tất cả cả phần mềm khác SOF đã xuất bản."
    ],
    systemFeatures: [
      "1. Bao gồm toàn bộ GÓI BASIC + mở rộng:",
      "2. Quản lý Kho (Warehouse Management)",
      "3. Quản lý Thu - Chi (Cash Flow)"
    ]
  }
};

// Nội dung modal chi tiết
export const defaultModalData = {
  basic: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp cân điện tử. Từ đó bán hàng cho tất cả cả mô hình.",
      "Tích hợp với tất cả cả phần mềm khác SOF đã xuất bản.",
      "Có App cài đặt trên máy pos và thiết bị di động android.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 30MB."
    ],
    systemFeatures: [
      { id: 1, title: "Tính năng quản lý sản phẩm và giá bán", desc: "Quản lý danh mục, sản phẩm, biến thể (size, màu, SKU...). Thiết lập và cập nhật giá bán, giá khuyến mãi. Quản lý tồn kho theo thời gian thực." },
      { id: 2, title: "Tính năng quản lý chương trình bán hàng", desc: "Thiết lập khuyến mãi, giảm giá, combo, voucher. Áp dụng linh hoạt theo sản phẩm, đơn hàng hoặc khách hàng. Hỗ trợ chiến dịch marketing và kích cầu." },
      { id: 3, title: "Tính năng bán hàng", desc: "Tạo và xử lý đơn hàng nhanh chóng (online/offline). Tích hợp giỏ hàng, áp dụng khuyến mãi tự động. Hỗ trợ đa kênh: tại quầy, website, mobile." },
      { id: 4, title: "Tính năng quản lý khách hàng và điểm", desc: "Lưu trữ thông tin khách hàng. Quản lý lịch sử mua hàng. Tích điểm, phân hạng khách hàng (VIP, thân thiết...). Hỗ trợ chăm sóc và giữ chân khách hàng." },
      { id: 5, title: "Tính năng tích hợp phương thức vận chuyển", desc: "Kết nối đơn vị vận chuyển (GHN, GHTK, Viettel Post...). Tự động tính phí ship. Theo dõi trạng thái giao hàng." },
      { id: 6, title: "Tính năng cấu hình thanh toán", desc: "Tích hợp đa phương thức thanh toán: ZaloPay, MoMo, , SePay. Hỗ trợ thanh toán online và đối soát giao dịch." },
      { id: 7, title: "Tính năng cấu hình xuất hoá đơn điện tử", desc: "Tích hợp nhà cung cấp hoá đơn điện tử. Tự động phát hành hoá đơn sau thanh toán. Quản lý và tra cứu hoá đơn." },
      { id: 8, title: "Tính năng thống kê và báo cáo bán hàng", desc: "Báo cáo doanh thu, lợi nhuận. Phân tích sản phẩm bán chạy. Thống kê theo thời gian, kênh bán, khách hàng. Hỗ trợ ra quyết định kinh doanh." }
    ]
  },
  full: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO, VNPay.",
      "Có App theo dõi doanh số bán hàng miễn phí có quảng cáo.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp cân điện tử. Từ đó bán hàng cho tất cả cả mô hình.",
      "Tích hợp với tất cả cả phần mềm khác SOF đã xuất bản.",
      "Có App cài đặt trên máy pos và thiết bị di động android.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 60MB.",
      "Số lượng chi nhánh: báo giá theo yêu cầu.",
      "Có thể tích hợp chung với hệ sinh thái phần cứng của SOF."
    ],
    systemFeatures: [
      { id: 1, title: "Bao gồm toàn bộ GÓI PRO + đầy đủ tính năng cao cấp:", desc: "Thừa hưởng toàn bộ nền tảng của các gói thấp hơn với sự tối ưu vượt trội." },
      { id: 2, title: "Quản lý kho nâng cao", desc: "Nhiều kho / nhiều chi nhánh. Điều chuyển hàng giữa các kho linh hoạt." },
      { id: 3, title: "Quản lý chi phí – lợi nhuận", desc: "Theo dõi chi phí nhập hàng, chi phí vận hành. Báo cáo lợi nhuận theo sản phẩm / cửa hàng." },
      { id: 4, title: "Quản lý khách hàng thân thiết", desc: "Tích điểm, hạng thành viên, Voucher - mã giảm giá tự động." },
      { id: 5, title: "Quản lý chuỗi cửa hàng", desc: "Xem báo cáo từng chi nhánh. So sánh hiệu quả kinh doanh đa điểm." },
      { id: 6, title: "Kết nối thiết bị mở rộng", desc: "Máy in hóa đơn, máy quét mã vạch, cân điện tử và các thiết bị phần cứng khác." },
      { id: 7, title: "Báo cáo nâng cao – xuất file", desc: "Xuất đa định dạng Excel / PDF. Tổng hợp theo thời gian tùy chọn." },
      { id: 8, title: "Sao lưu & bảo mật dữ liệu", desc: "Dữ liệu được bảo mật tuyệt đối và sao lưu định kỳ. Phân quyền chuyên sâu." },
      { id: 9, title: "Mục tiêu quản trị", desc: "Quản trị chuyên nghiệp – mở rộng dễ dàng – phát triển lâu dài cùng SOF." }
    ]
  },
  pro: {
    highlights: [
      "Tích hợp xuất hoá đơn điện tử.",
      "Hỗ trợ thanh toán: ZALO PAY, MONO, VNPay.",
      "Quản lý khách hàng và tích điểm.",
      "Tích hợp cân điện tử. Từ đó bán hàng cho tất cả cả mô hình.",
      "Tích hợp với tất cả cả phần mềm khác SOF đã xuất bản.",
      "Có App cài đặt trên máy pos và thiết bị di động android.",
      "Có App theo dõi doanh số bán hàng miễn phí có quảng cáo.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      { id: 1, title: "Bao gồm toàn bộ GÓI BASIC + mở rộng:", desc: "Nâng cấp bảo mật và các module nghiệp vụ chuyên sâu hơn." },
      { 
        id: 2, 
        title: "Quản lý Kho (Warehouse Management)", 
        desc: "Nhập kho & Giá vốn: Tự động tính Giá vốn bình quân ngay khi nhập hàng để báo cáo lợi nhuận chuẩn. Kiểm kê & Cân bằng: Quét mã vạch đối soát; tự động tạo phiếu Xuất hủy nếu lệch tồn thực tế. Luân chuyển: Điều chuyển hàng giữa các chi nhánh/kho tổng. Cảnh báo tồn: Tự động nhắc khi hàng chạm ngưỡng tối thiểu." 
      },
      { 
        id: 3, 
        title: "Quản lý Thu - Chi (Cash Flow)", 
        desc: "Phiếu Thu/Chi ngoài: Quản lý tiền điện, nước, lương, mặt bằng... để tính Lợi nhuận ròng. Quản lý Sổ quỹ: Tách biệt tiền mặt, ngân hàng và ví điện tử. Đối soát tự động: Khớp lệnh đơn hàng và tiền về thực tế. Quản lý Công nợ: Theo dõi nợ nhà cung cấp và khách sỉ." 
      }
    ]
  }
};
