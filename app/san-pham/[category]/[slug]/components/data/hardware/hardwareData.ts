// ===== DỮ LIỆU PHẦN CỨNG =====
// File này chứa toàn bộ nội dung sản phẩm phần cứng
// KHÔNG đụng đến data phần mềm (cafeData, parkingData, v.v.)

export interface HardwareProduct {
  id: string;
  name: string;
  code: string;
  price: number;
  priceFormatted: string;
  unit: string;
  images: string[];
  shortFeatures: string[];
  description: DescriptionSection[];
  specs: SpecItem[];
  badges: string[];
  inStock: boolean;
  stockNote?: string;
}

export interface DescriptionSection {
  heading: string;
  headingColor?: string;
  lines: DescriptionLine[];
}

export interface DescriptionLine {
  text: string;
  bold?: boolean;
}

export interface SpecItem {
  label: string;
  value: string;
  bold?: boolean;
}

// ============================================
// DỮ LIỆU SẢN PHẨM: CÂN ĐIỆN TỬ ONEPLUSONE C-L1
// ============================================
export const canDienTuCL1: HardwareProduct = {
  id: "PHANCUNG.CDT.BS",
  name: "Cân Điện Tử Tính Tiền Thông Minh ONEPLUSONE C-L1",
  code: "PHANCUNG.CDT.BS",
  price: 19990000,
  priceFormatted: "19.990.000",
  unit: "Cái",
  images: [
    "/hinhanh/hw_pos_scale.png",
    "/hinhanh/hw_scale_ninda.png",
  ],
  shortFeatures: [
    "Hạ tầng phần cứng mạnh mẽ & Tương thích tuyệt đối",
    "Không chỉ dừng lại ở phần mềm, chúng tôi cung cấp hệ thống thiết bị phần cứng chính hãng (Máy POS, máy in, thiết bị mã vạch...) được kiểm định kỹ lưỡng để đảm bảo sự đồng bộ cao nhất, giúp hệ thống vận hành bền bỉ 24/7.",
    "Tư vấn cấu hình tối ưu chi phí",
    "Lựa chọn thiết bị phù hợp nhất với mô hình kinh doanh và ngân sách, tránh lãng phí vào những cấu hình không cần thiết.",
    "Đồng bộ hóa hoàn hảo với phần mềm",
    "Đảm bảo phần cứng và phần mềm hoạt động \"ăn khớp\" 100%, loại bỏ hoàn toàn các lỗi xung đột hệ thống hay độ trễ khi in ấn, thanh toán.",
    "Lắp đặt và Setup tận nơi",
    "Thiết lập hệ thống dây mạng, kết nối thiết bị gọn gàng, thẩm mỹ và hướng dẫn vận hành thiết bị trực quan ngay tại cửa hàng.",
    "Bảo hành chính hãng & Thay thế nhanh",
    "Cam kết bảo hành theo tiêu chuẩn nhà sản xuất, hỗ trợ thiết bị thay thế tạm thời trong khi sửa chữa để kinh doanh không bị gián đoạn."
  ],
  badges: [
    "Bảo hành chính hãng",
    "Giao hàng toàn quốc",
    "Đổi trả trong 7 ngày",
    "Hỗ trợ 24/7"
  ],
  inStock: false,
  stockNote: "Hết hàng - Liên hệ để đặt hàng",

  description: [
    {
      heading: "Cân điện tử in tem – in hóa đơn ONEPLUSONE C-L1",
      lines: [
        { text: "Giải pháp bán hàng chuyên nghiệp – Nhanh – Chính xác", bold: false },
      ]
    },
    {
      heading: "",
      lines: [
        { text: "Bạn đang tìm một dòng cân điện tử vừa chính xác, vừa in tem – in hóa đơn nhanh, lại kết nối linh hoạt cho cửa hàng?" },
        { text: "ONEPLUSONE C-L1 là giải pháp tối ưu dành cho siêu thị mini, cửa hàng tạp hóa, thực phẩm tươi sống và các mô hình bán lẻ hiện đại." }
      ]
    },
    {
      heading: "Bán hàng nhanh hơn – Quản lý dễ hơn",
      headingColor: "#3087fe",
      lines: [
        { text: "Mức cân 6/15kg, độ chính xác 2–5g, cho kết quả cân chuẩn xác." },
        { text: "Màn hình LCD lớn, hiển thị rõ ràng trọng lượng, đơn giá và thành tiền." },
        { text: "Bộ nhớ 20.000 PLU, quản lý hiệu quả số lượng lớn sản phẩm.", bold: true },
        { text: "Bàn phím 10×7 phím nóng và 4×7 phím chức năng, thao tác nhanh, giảm sai sót." }
      ]
    },
    {
      heading: "In tem – In hóa đơn nhanh, không chờ đợi",
      headingColor: "#3087fe",
      lines: [
        { text: "Tích hợp máy in nhiệt, hỗ trợ in bill và in decal." },
        { text: "Tốc độ in tối đa 125 mm/s, đáp ứng tốt giờ cao điểm.", bold: true },
        { text: "Khổ giấy 60mm, hỗ trợ cuộn giấy đường kính 120mm.", bold: true }
      ]
    },
    {
      heading: "Kết nối linh hoạt – Dễ dàng mở rộng",
      headingColor: "#3087fe",
      lines: [
        { text: "Hỗ trợ các cổng: RS232, Ethernet, USB Host, RJ11.", bold: true },
        { text: "Hỗ trợ Wifi (Option), kết nối phần mềm bán hàng thuận tiện.", bold: true }
      ]
    },
    {
      heading: "Phù hợp nhiều mô hình bán lẻ",
      headingColor: "#3087fe",
      lines: [
        { text: "Siêu thị mini, cửa hàng tạp hóa" },
        { text: "Cửa hàng trái cây, thực phẩm sạch" },
        { text: "Cửa hàng thịt cá, hải sản" },
        { text: "Cửa hàng cần in tem giá, mã vạch" }
      ]
    },
    {
      heading: "Thiết kế chắc chắn – Hoạt động bền bỉ",
      headingColor: "#3087fe",
      lines: [
        { text: "Kích thước 509 × 400 × 512 mm, thiết kế chắc chắn, phù hợp quầy thu ngân. Adapter 24V – 2.5A giúp vận hành ổn định, lâu dài.", bold: true }
      ]
    },
    {
      heading: "ONEPLUSONE C-L1 – Đầu tư một lần, hiệu quả lâu dài",
      headingColor: "#3087fe",
      lines: [
        { text: "Giúp cửa hàng bán hàng nhanh hơn, quản lý chuyên nghiệp hơn và nâng cao hình ảnh thương hiệu.", bold: true },
        { text: "Liên hệ ngay để được tư vấn và nhận báo giá tốt nhất hôm nay.", bold: true }
      ]
    }
  ],

  specs: [
    { label: "THÔNG SỐ KỸ THUẬT – ONEPLUSONE C-L1", value: "", bold: true },
    { label: "Mức cân", value: "6 / 15 kg" },
    { label: "Độ chính xác", value: "2 – 5 g" },
    { label: "Màn hình hiển thị", value: "LCD 48 × 112 hoặc 64 × 384" },
    { label: "Phím nóng (Hotkey)", value: "10 × 7" },
    { label: "Phím chức năng", value: "4 × 7" },
    { label: "Bộ nhớ", value: "20.000 PLU" },
    { label: "Máy in", value: "In nhiệt bill / decal" },
    { label: "Khổ giấy in", value: "60 mm" },
    { label: "Tốc độ in tối đa", value: "125 mm/s" },
    { label: "Đường kính cuộn giấy tối đa", value: "120 mm" },
    { label: "Cổng kết nối mặc định", value: "RS232, Ethernet, USB Host, RJ11" },
    { label: "Kết nối mở rộng", value: "Wifi (Option)" },
    { label: "Nguồn adapter", value: "24V – 2.5A" },
    { label: "Kích thước", value: "509 × 400 × 512 mm" }
  ]
};

// ============================================
// DỮ LIỆU SẢN PHẨM: GIẤY IN NHIỆT K80x45mm
// ============================================
export const giayInNhiet: HardwareProduct = {
  id: "PHANCUNG.GIB.BS",
  name: "Giấy in nhiệt K80x45mm",
  code: "PHANCUNG.GIB.BS",
  price: 880000,
  priceFormatted: "880.000",
  unit: "thùng (1 thùng /100 cuộn)",
  images: [
    "/hinhanh/hw_paper.png",
  ],
  shortFeatures: [
    "Hạ tầng phần cứng mạnh mẽ & Tương thích tuyệt đối",
    "Không chỉ dừng lại ở phần mềm, chúng tôi cung cấp hệ thống thiết bị phần cứng chính hãng (Máy POS, máy in, thiết bị mã vạch...) được kiểm định kỹ lưỡng để đảm bảo sự đồng bộ cao nhất, giúp hệ thống vận hành bền bỉ 24/7.",
    "Tư vấn cấu hình tối ưu chi phí",
    "Lựa chọn thiết bị phù hợp nhất với mô hình kinh doanh và ngân sách, tránh lãng phí vào những cấu hình không cần thiết.",
    "Đồng bộ hóa hoàn hảo với phần mềm",
    "Đảm bảo phần cứng và phần mềm hoạt động \"ăn khớp\" 100%, loại bỏ hoàn toàn các lỗi xung đột hệ thống hay độ trễ khi in ấn, thanh toán.",
    "Lắp đặt và Setup tận nơi",
    "Thiết lập hệ thống dây mạng, kết nối thiết bị gọn gàng, thẩm mỹ và hướng dẫn vận hành thiết bị trực quan ngay tại cửa hàng.",
    "Bảo hành chính hãng & Thay thế nhanh",
    "Cam kết bảo hành theo tiêu chuẩn nhà sản xuất, hỗ trợ thiết bị thay thế tạm thời trong khi sửa chữa để kinh doanh không bị gián đoạn."
  ],
  badges: [
    "Bảo hành chính hãng",
    "Giao hàng toàn quốc",
    "Đổi trả trong 7 ngày",
    "Hỗ trợ 24/7"
  ],
  inStock: true,

  description: [
    {
      heading: "Giấy in nhiệt K80x45mm – In rõ nét, an toàn, bảo vệ đầu in",
      lines: []
    },
    {
      heading: "",
      lines: [
        { text: "Giấy in nhiệt K80x45mm là loại giấy chuyên dụng cho máy in hóa đơn nhiệt, được sử dụng phổ biến trong siêu thị, cửa hàng bán lẻ, quán café, nhà hàng, hệ thống POS. Giấy cho khả năng in rõ nét, đều màu, giúp hóa đơn dễ đọc và chuyên nghiệp hơn." },
        { text: "Sản phẩm được sản xuất với độ mịn cao, giúp giảm ma sát trong quá trình in, từ đó bảo vệ đầu in và kéo dài tuổi thọ máy in. Giấy cuộn được bọc giấy bạc giúp chống ẩm, chống bụi, đảm bảo chất lượng ổn định trong suốt quá trình sử dụng.", bold: true },
        { text: "Đặc biệt, giấy in nhiệt K80x45mm không chứa BPA – một hóa chất gây hại cho sức khỏe và môi trường, an toàn cho người sử dụng và thân thiện với môi trường. Đây là lựa chọn tối ưu cho các đơn vị kinh doanh chú trọng chất lượng và tiêu chuẩn an toàn.", bold: true }
      ]
    }
  ],

  specs: [
    { label: "Giấy in nhiệt K80x45mm", value: "", bold: true },
    { label: "Độ rộng giấy", value: "57 mm (±1 mm)" },
    { label: "Đường kính cuộn", value: "Ø 38 mm" },
    { label: "Định lượng giấy", value: "65 – 70 GSM" },
    { label: "Quy cách đóng gói", value: "100 cuộn / thùng" },
    { label: "Hình thức cuộn", value: "Cuộn giấy bọc giấy bạc" },
    { label: "Chất liệu", value: "Giấy in nhiệt cao cấp" },
    { label: "An toàn", value: "Không chứa BPA (hóa chất gây ung thư)" },
    { label: "Đặc tính nổi bật", value: "", bold: true },
    { label: "Độ mịn cao", value: "Giảm ma sát, bảo vệ đầu in" },
    { label: "In rõ nét, đều màu", value: "Hóa đơn chuyên nghiệp" },
    { label: "Bảo vệ đầu in", value: "Kéo dài tuổi thọ máy in nhiệt" }
  ]
};

// ============================================
// ============================================
// DỮ LIỆU SẢN PHẨM: MÁY IN HÓA ĐƠN HPRT TP80NC-H
// ============================================
export const mayInHoaDon: HardwareProduct = {
  id: "PHANCUNG.MIB.BS",
  name: "Máy in hóa đơn HPRT TP80NC-H",
  code: "PHANCUNG.MIB.BS",
  price: 1790000,
  priceFormatted: "1.790.000",
  unit: "Cái",
  images: [
    "/hinhanh/hw_printer.png",
  ],
  shortFeatures: [
    "Hạ tầng phần cứng mạnh mẽ & Tương thích tuyệt đối",
    "Không chỉ dừng lại ở phần mềm, chúng tôi cung cấp hệ thống thiết bị phần cứng chính hãng (Máy POS, máy in, thiết bị mã vạch...) được kiểm định kỹ lưỡng để đảm bảo sự đồng bộ cao nhất, giúp hệ thống vận hành bền bỉ 24/7.",
    "Tư vấn cấu hình tối ưu chi phí",
    "Lựa chọn thiết bị phù hợp nhất với mô hình kinh doanh và ngân sách, tránh lãng phí vào những cấu hình không cần thiết.",
    "Đồng bộ hóa hoàn hảo với phần mềm",
    "Đảm bảo phần cứng và phần mềm hoạt động \"ăn khớp\" 100%, loại bỏ hoàn toàn các lỗi xung đột hệ thống hay độ trễ khi in ấn, thanh toán.",
    "Lắp đặt và Setup tận nơi",
    "Thiết lập hệ thống dây mạng, kết nối thiết bị gọn gàng, thẩm mỹ và hướng dẫn vận hành thiết bị trực quan ngay tại cửa hàng.",
    "Bảo hành chính hãng & Thay thế nhanh",
    "Cam kết bảo hành theo tiêu chuẩn nhà sản xuất, hỗ trợ thiết bị thay thế tạm thời trong khi sửa chữa để kinh doanh không bị gián đoạn."
  ],
  badges: [
    "Bảo hành chính hãng",
    "Giao hàng toàn quốc",
    "Đổi trả trong 7 ngày",
    "Hỗ trợ 24/7"
  ],
  inStock: false,

  description: [
    {
      heading: "Máy in hóa đơn nhiệt HPRT TP80NC-H",
      lines: [
        { text: "In nhanh – Cắt giấy tự động – Hoạt động bền bỉ", bold: false },
      ]
    },
    {
      heading: "",
      lines: [
        { text: "HPRT TP80NC-H là dòng máy in hóa đơn nhiệt chuyên dụng cho cửa hàng bán lẻ, siêu thị mini, quán ăn, quán café và hệ thống POS hiện đại. Với tốc độ in cao, hỗ trợ khổ giấy 80mm và dao cắt tự động, sản phẩm giúp tối ưu quy trình thanh toán, giảm thời gian chờ đợi cho khách hàng.", bold: true }
      ]
    },
    {
      heading: "Hiệu suất in mạnh mẽ – Hóa đơn rõ nét",
      headingColor: "#3087fe",
      lines: [
        { text: "Công nghệ in nhiệt trực tiếp, không cần mực in.", bold: true },
        { text: "Độ phân giải 203 dpi (8 dots/mm), chữ in rõ ràng, dễ đọc." },
        { text: "Tốc độ in tối đa 200 mm/giây, đáp ứng tốt giờ cao điểm.", bold: true }
      ]
    },
    {
      heading: "Linh hoạt khổ giấy – Cắt giấy tự động",
      headingColor: "#3087fe",
      lines: [
        { text: "Hỗ trợ khổ giấy 58mm và 80mm, phù hợp nhiều mô hình kinh doanh.", bold: true },
        { text: "Dao cắt tự động tiện lợi, tăng tính chuyên nghiệp khi in hóa đơn." },
        { text: "Hỗ trợ cuộn giấy đường kính tối đa 80mm, giảm số lần thay giấy." }
      ]
    },
    {
      heading: "Kết nối ổn định – Tương thích đa nền tảng",
      headingColor: "#3087fe",
      lines: [
        { text: "Kết nối mặc định USB + LAN, dễ dàng tích hợp hệ thống POS.", bold: true },
        { text: "Hỗ trợ driver Windows, Mac, Linux, cài đặt nhanh chóng.", bold: true }
      ]
    },
    {
      heading: "Thiết kế gọn gàng – Độ bền cao",
      headingColor: "#3087fe",
      lines: [
        { text: "Máy có thiết kế nhỏ gọn, trọng lượng nhẹ, phù hợp đặt tại quầy thu ngân. Đầu in có độ bền lên đến 100 km, dao cắt chịu được 1 triệu lần cắt, đảm bảo hoạt động ổn định và lâu dài.", bold: true }
      ]
    },
    {
      heading: "HPRT TP80NC-H – Lựa chọn tối ưu cho thanh toán chuyên nghiệp",
      headingColor: "#3087fe",
      lines: [
        { text: "Giúp cửa hàng in hóa đơn nhanh hơn, vận hành ổn định hơn và nâng cao trải nghiệm khách hàng.", bold: true }
      ]
    }
  ],

  specs: [
    { label: "THÔNG SỐ KỸ THUẬT – HPRT TP80NC-H", value: "", bold: true },
    { label: "Công nghệ in", value: "In nhiệt trực tiếp" },
    { label: "Độ phân giải", value: "203 dpi (8 dots/mm)" },
    { label: "Tốc độ in tối đa", value: "200 mm/giây" },
    { label: "Khổ giấy in", value: "58 mm / 80 mm" },
    { label: "Đường kính cuộn giấy tối đa", value: "80 mm" },
    { label: "Bộ nhớ", value: "RAM 4 MB / Flash 4 MB" },
    { label: "Dao cắt giấy", value: "Tự động" },
    { label: "Cổng kết nối mặc định", value: "USB + LAN" },
    { label: "Hệ điều hành hỗ trợ", value: "Windows, Mac, Linux" },
    { label: "Nguồn điện", value: "Adapter 24V – 1.5A" },
    { label: "Kích thước", value: "145 (D) × 123 (R) × 121 (C) mm" },
    { label: "Trọng lượng", value: "0.81 kg" },
    { label: "Độ bền đầu in", value: "100 km" },
    { label: "Tuổi thọ dao cắt", value: "1.000.000 lần cắt" }
  ]
};

// ============================================
// DỮ LIỆU SẢN PHẨM: MÁY POS CẦM TAY UROVO i9100
// ============================================
export const mayPosCamTay: HardwareProduct = {
  id: "PHANCUNG.POS.BS",
  name: "Máy POS Cầm Tay Thông Minh",
  code: "PHANCUNG.POS.BS",
  price: 5900000,
  priceFormatted: "5.900.000",
  unit: "Cái",
  images: [
    "/hinhanh/hw_handheld.png",
    "/hinhanh/hw_handheld_2.png",
    "/hinhanh/hw_handheld_3.png",
    "/hinhanh/hw_handheld_4.png",
  ],
  shortFeatures: [
    "Hạ tầng phần cứng mạnh mẽ & Tương thích tuyệt đối",
    "Không chỉ dừng lại ở phần mềm, chúng tôi cung cấp hệ thống thiết bị phần cứng chính hãng (Máy POS, máy in, thiết bị mã vạch...) được kiểm định kỹ lưỡng để đảm bảo sự đồng bộ cao nhất, giúp hệ thống vận hành bền bỉ 24/7.",
    "Tư vấn cấu hình tối ưu chi phí",
    "Lựa chọn thiết bị phù hợp nhất với mô hình kinh doanh và ngân sách, tránh lãng phí vào những cấu hình không cần thiết.",
    "Đồng bộ hóa hoàn hảo với phần mềm",
    "Đảm bảo phần cứng và phần mềm hoạt động \"ăn khớp\" 100%, loại bỏ hoàn toàn các lỗi xung đột hệ thống hay độ trễ khi in ấn, thanh toán.",
    "Lắp đặt và Setup tận nơi",
    "Thiết lập hệ thống dây mạng, kết nối thiết bị gọn gàng, thẩm mỹ và hướng dẫn vận hành thiết bị trực quan ngay tại cửa hàng.",
    "Bảo hành chính hãng & Thay thế nhanh",
    "Cam kết bảo hành theo tiêu chuẩn nhà sản xuất, hỗ trợ thiết bị thay thế tạm thời trong khi sửa chữa để kinh doanh không bị gián đoạn."
  ],
  badges: [
    "Bảo hành chính hãng",
    "Giao hàng toàn quốc",
    "Đổi trả trong 7 ngày",
    "Hỗ trợ 24/7"
  ],
  inStock: false,

  description: [
    {
      heading: "Máy POS Cầm Tay Thông Minh",
      lines: [
        { text: "Máy POS cầm tay UROVO i9100 – Bán hàng linh hoạt, in hóa đơn mọi lúc mọi nơi", bold: false },
      ]
    },
    {
      heading: "",
      lines: [
        { text: "UROVO i9100 là dòng máy POS cầm tay đa năng, thiết kế nhỏ gọn nhưng tích hợp đầy đủ các tính năng cần thiết cho bán hàng hiện đại: quét – xử lý – in hóa đơn chỉ trên một thiết bị duy nhất. Sản phẩm đặc biệt phù hợp cho mô hình bán hàng di động, giao hàng, quầy lưu động.", bold: true },
        { text: "Máy vận hành trên Android 13 cùng CPU Quad-Core 2.0GHz, đảm bảo xử lý nhanh, ổn định các ứng dụng bán hàng và thanh toán. Màn hình 5.5 inch cảm ứng điện dung hiển thị rõ nét, giúp thao tác dễ dàng ngay cả khi làm việc ngoài trời." },
        { text: "UROVO i9100 được tích hợp máy in nhiệt khổ 58mm với tốc độ in nhanh, cho phép xuất hóa đơn trực tiếp ngay sau khi thanh toán. Hỗ trợ đầy đủ WiFi, Bluetooth 5.0, NFC, 3G/4G, giúp thiết bị hoạt động linh hoạt trong mọi môi trường, không phụ thuộc vị trí cố định.", bold: true },
        { text: "Với pin dung lượng lớn 5200mAh, thiết kế chắc chắn và tính di động cao, UROVO i9100 là giải pháp lý tưởng cho giao nhận, bán hàng tận nơi, cửa hàng nhỏ, quán ăn di động, giúp nâng cao trải nghiệm khách hàng và tối ưu hiệu quả kinh doanh.", bold: true }
      ]
    }
  ],

  specs: [
    { label: "Máy POS cầm tay UROVO i9100", value: "", bold: true },
    { label: "CPU", value: "Quad-Core, 2.0 GHz" },
    { label: "Hệ điều hành", value: "Android 13" },
    { label: "Bộ nhớ", value: "RAM 3GB / ROM 32GB" },
    { label: "Màn hình", value: "5.5 inch, độ phân giải 720 × 1280" },
    { label: "Cảm ứng", value: "Điện dung" },
    { label: "Camera sau", value: "5 MP" },
    { label: "Bàn phím vật lý", value: "03 phím (Nguồn, Tăng/Giảm âm lượng)" },
    { label: "Máy in tích hợp", value: "In nhiệt khổ 58 mm × 40 mm" },
    { label: "Tốc độ in", value: "70 mm/s" },
    { label: "Kết nối không dây", value: "WiFi, Bluetooth 5.0, NFC, 3G / 4G" },
    { label: "Kết nối có dây", value: "USB Type-C" },
    { label: "Pin", value: "Li-ion 5200 mAh" },
    { label: "Nguồn sạc", value: "Adapter 5V – 2A" },
    { label: "Kích thước", value: "188 × 81 × 61 mm" },
    { label: "Trọng lượng", value: "457 g" }
  ]
};

// ============================================
// DỮ LIỆU SẢN PHẨM: MÁY POS THU NGÂN 2 MÀN HÌNH iMin D4-504
// ============================================
export const mayPos2ManHinh: HardwareProduct = {
  id: "PHANCUNG.POS.PRO",
  name: "Máy POS Thu Ngân 2 Màn Hình Cảm Ứng iMin D4-504",
  code: "PHANCUNG.POS.PRO",
  price: 16990000,
  priceFormatted: "16.990.000",
  unit: "Cái",
  images: [
    "/hinhanh/hw_dual_pos.png",
    "/hinhanh/hw_dual_pos_2.png",
    "/hinhanh/hw_dual_pos_3.png",
    "/hinhanh/hw_dual_pos_4.png",
  ],
  shortFeatures: [
    "Hạ tầng phần cứng mạnh mẽ & Tương thích tuyệt đối",
    "Không chỉ dừng lại ở phần mềm, chúng tôi cung cấp hệ thống thiết bị phần cứng chính hãng (Máy POS, máy in, thiết bị mã vạch...) được kiểm định kỹ lưỡng để đảm bảo sự đồng bộ cao nhất, giúp hệ thống vận hành bền bỉ 24/7.",
    "Tư vấn cấu hình tối ưu chi phí",
    "Lựa chọn thiết bị phù hợp nhất với mô hình kinh doanh và ngân sách, tránh lãng phí vào những cấu hình không cần thiết.",
    "Đồng bộ hóa hoàn hảo với phần mềm",
    "Đảm bảo phần cứng và phần mềm hoạt động \"ăn khớp\" 100%, loại bỏ hoàn toàn các lỗi xung đột hệ thống hay độ trễ khi in ấn, thanh toán.",
    "Lắp đặt và Setup tận nơi",
    "Thiết lập hệ thống dây mạng, kết nối thiết bị gọn gàng, thẩm mỹ và hướng dẫn vận hành thiết bị trực quan ngay tại cửa hàng.",
    "Bảo hành chính hãng & Thay thế nhanh",
    "Cam kết bảo hành theo tiêu chuẩn nhà sản xuất, hỗ trợ thiết bị thay thế tạm thời trong khi sửa chữa để kinh doanh không bị gián đoạn."
  ],
  badges: [
    "Bảo hành chính hãng",
    "Giao hàng toàn quốc",
    "Đổi trả trong 7 ngày",
    "Hỗ trợ 24/7"
  ],
  inStock: false,

  description: [
    {
      heading: "Máy POS iMin D4-504 – Giải pháp bán hàng thông minh, tối ưu mọi thao tác",
      lines: []
    },
    {
      heading: "",
      lines: [
        { text: "iMin D4-504 là dòng máy POS Android hiện đại, thiết kế tinh gọn, tích hợp màn hình kép và máy in hóa đơn khổ 80mm, giúp quy trình bán hàng diễn ra nhanh chóng, chính xác và chuyên nghiệp hơn.", bold: true },
        { text: "Vận hành trên nền tảng Android 11 cùng cấu hình ổn định, iMin D4-504 đáp ứng mượt mà mọi nhu cầu bán lẻ, từ siêu thị mini, cửa hàng tạp hóa, quán café đến nhà hàng. Màn hình cảm ứng lớn, hiển thị sắc nét, thao tác nhạy, mang lại trải nghiệm sử dụng thân thiện cho cả nhân viên lẫn khách hàng." },
        { text: "Với hệ thống kết nối đa dạng và phần cứng tích hợp sẵn, iMin D4-504 chính là giải pháp POS \"tất cả trong một\", giúp cửa hàng tối ưu không gian, nâng cao hiệu suất bán hàng và gia tăng hình ảnh chuyên nghiệp trong mắt khách hàng.", bold: true }
      ]
    }
  ],

  specs: [
    { label: "Máy POS iMin D4-504", value: "", bold: true },
    { label: "Hệ điều hành", value: "Android 11" },
    { label: "Vi xử lý", value: "Quad-Core Cortex-A55, tốc độ lên đến 2.0GHz" },
    { label: "Bộ nhớ", value: "RAM 2GB + ROM 16GB" },
    { label: "Màn hình chính", value: "15.6 inch, độ phân giải 1920 × 1080 (FHD), cảm ứng" },
    { label: "Màn hình phụ", value: "10.1 inch, độ phân giải 800 × 1280" },
    { label: "Kết nối không dây", value: "WiFi, Bluetooth" },
    { label: "Phần cứng tích hợp", value: "", bold: true },
    { label: "Máy in hóa đơn", value: "Khổ 80mm" },
    { label: "Loa công suất", value: "1.5W" },
    { label: "Cổng kết nối có dây", value: "", bold: true },
    { label: "USB Type-A", value: "× 4" },
    { label: "Micro USB", value: "× 1" },
    { label: "RJ11", value: "× 1" },
    { label: "RJ12", value: "× 1" },
    { label: "RJ45", value: "× 1" },
    { label: "Jack âm thanh 3.5mm", value: "× 1" },
    { label: "Khe thẻ TF", value: "× 1" },
    { label: "Cổng nguồn DC", value: "× 1" },
    { label: "Nguồn điện", value: "Adapter 24V / 2.5A" }
  ]
};

// ============================================
// DỮ LIỆU SẢN PHẨM: MÁY QUÉT MÃ VẠCH ICW 92108HS
// ============================================
export const mayQuetMaVach: HardwareProduct = {
  id: "PHANCUNG.QMV.BS",
  name: "Máy Quét Mã Vạch ICW 92108HS",
  code: "PHANCUNG.QMV.BS",
  price: 1290000,
  priceFormatted: "1.290.000",
  unit: "Cái",
  images: [
    "/hinhanh/hw_scanner.png",
  ],
  shortFeatures: [
    "Hạ tầng phần cứng mạnh mẽ & Tương thích tuyệt đối",
    "Không chỉ dừng lại ở phần mềm, chúng tôi cung cấp hệ thống thiết bị phần cứng chính hãng (Máy POS, máy in, thiết bị mã vạch...) được kiểm định kỹ lưỡng để đảm bảo sự đồng bộ cao nhất, giúp hệ thống vận hành bền bỉ 24/7.",
    "Tư vấn cấu hình tối ưu chi phí",
    "Lựa chọn thiết bị phù hợp nhất với mô hình kinh doanh và ngân sách, tránh lãng phí vào những cấu hình không cần thiết.",
    "Đồng bộ hóa hoàn hảo với phần mềm",
    "Đảm bảo phần cứng và phần mềm hoạt động \"ăn khớp\" 100%, loại bỏ hoàn toàn các lỗi xung đột hệ thống hay độ trễ khi in ấn, thanh toán.",
    "Lắp đặt và Setup tận nơi",
    "Thiết lập hệ thống dây mạng, kết nối thiết bị gọn gàng, thẩm mỹ và hướng dẫn vận hành thiết bị trực quan ngay tại cửa hàng.",
    "Bảo hành chính hãng & Thay thế nhanh",
    "Cam kết bảo hành theo tiêu chuẩn nhà sản xuất, hỗ trợ thiết bị thay thế tạm thời trong khi sửa chữa để kinh doanh không bị gián đoạn."
  ],
  badges: [
    "Bảo hành chính hãng",
    "Giao hàng toàn quốc",
    "Đổi trả trong 7 ngày",
    "Hỗ trợ 24/7"
  ],
  inStock: false,

  description: [
    {
      heading: "Máy quét mã vạch ICW 92108HS – Quét nhanh, chính xác, bền bỉ",
      lines: []
    },
    {
      heading: "",
      lines: [
        { text: "ICW 92108HS là dòng máy quét mã vạch 1D & 2D sử dụng công nghệ quét ảnh đa hướng, cho khả năng đọc mã nhanh và chính xác ngay cả với mã mờ, mã in kém chất lượng hoặc hiển thị trên màn hình điện thoại.", bold: true },
        { text: "Thiết bị hỗ trợ hai chế độ quét: bấm nút và tự động, phù hợp cho nhiều mô hình sử dụng như siêu thị mini, cửa hàng bán lẻ, shop thời trang, nhà thuốc. Thiết kế cầm tay nhỏ gọn, dễ thao tác, giúp nhân viên làm việc liên tục mà không mỏi tay.", bold: true },
        { text: "Với độ bền cao, khả năng chịu rơi lên đến 1,5m và tiêu chuẩn lắp ráp IP42, ICW 92108HS là lựa chọn lý tưởng cho môi trường bán hàng chuyên nghiệp, ổn định và lâu dài.", bold: true }
      ]
    }
  ],

  specs: [
    { label: "Máy quét mã vạch ICW 92108HS", value: "", bold: true },
    { label: "Công nghệ quét", value: "Quét ảnh đa hướng" },
    { label: "Chuẩn mã hỗ trợ", value: "1D + 2D" },
    { label: "Độ phân giải đầu đọc", value: "640 × 480 pixels" },
    { label: "Độ phân giải mã vạch", value: "5 mils" },
    { label: "Độ mở mã vạch cho phép", value: "25%" },
    { label: "Chế độ quét", value: "Bấm nút / Tự động" },
    { label: "Kết nối", value: "USB" },
    { label: "Tiêu chuẩn lắp ráp", value: "IP42" },
    { label: "Khả năng chịu rơi", value: "1,5 m" },
    { label: "Nguồn điện", value: "5V – 300mA" },
    { label: "Kích thước", value: "172 × 83 × 70 mm" },
    { label: "Trọng lượng", value: "105 g" },
    { label: "Hình thức sử dụng", value: "Cầm tay" },
    { label: "Chân đế", value: "Chân đế tự động (Option mua thêm)" }
  ]
};

// ============================================
// MAPPING: Từ slug/tên sản phẩm → dữ liệu phần cứng
// ============================================
// ============================================
// DỮ LIỆU SẢN PHẨM: KÉT TIỀN MINI MAKEN VK4102
// ============================================
export const ketTien: HardwareProduct = {
  id: "PHANCUNG.TDT.BS",
  name: "Két tiền Mini MAKEN VK4102",
  code: "PHANCUNG.TDT.BS",
  price: 1890000,
  priceFormatted: "1.890.000",
  unit: "Cái",
  images: [
    "/hinhanh/hw_drawer.png",
  ],
  shortFeatures: [
    "Hạ tầng phần cứng mạnh mẽ & Tương thích tuyệt đối",
    "Không chỉ dừng lại ở phần mềm, chúng tôi cung cấp hệ thống thiết bị phần cứng chính hãng (Máy POS, máy in, thiết bị mã vạch...) được kiểm định kỹ lưỡng để đảm bảo sự đồng bộ cao nhất, giúp hệ thống vận hành bền bỉ 24/7.",
    "Tư vấn cấu hình tối ưu chi phí",
    "Lựa chọn thiết bị phù hợp nhất với mô hình kinh doanh và ngân sách, tránh lãng phí vào những cấu hình không cần thiết.",
    "Đồng bộ hóa hoàn hảo với phần mềm",
    "Đảm bảo phần cứng và phần mềm hoạt động \"ăn khớp\" 100%, loại bỏ hoàn toàn các lỗi xung đột hệ thống hay độ trễ khi in ấn, thanh toán.",
    "Lắp đặt và Setup tận nơi",
    "Thiết lập hệ thống dây mạng, kết nối thiết bị gọn gàng, thẩm mỹ và hướng dẫn vận hành thiết bị trực quan ngay tại cửa hàng.",
    "Bảo hành chính hãng & Thay thế nhanh",
    "Cam kết bảo hành theo tiêu chuẩn nhà sản xuất, hỗ trợ thiết bị thay thế tạm thời trong khi sửa chữa để kinh doanh không bị gián đoạn."
  ],
  badges: [
    "Bảo hành chính hãng",
    "Giao hàng toàn quốc",
    "Đổi trả trong 7 ngày",
    "Hỗ trợ 24/7"
  ],
  inStock: false,

  description: [
    {
      heading: "Ngăn kéo đựng tiền MAKEN VK4102 – An toàn, bền bỉ, tối ưu quầy thu ngân",
      lines: []
    },
    {
      heading: "",
      lines: [
        { text: "MAKEN VK4102 là ngăn kéo đựng tiền chuyên dụng cho hệ thống POS, được thiết kế chắc chắn với vỏ thép sơn tĩnh điện, đảm bảo độ an toàn cao và vận hành ổn định trong môi trường bán hàng liên tục.", bold: true },
        { text: "Ngăn kéo sở hữu 10 ngăn đựng tiền giấy bố trí khoa học, giúp phân loại tiền nhanh chóng, hạn chế nhầm lẫn trong quá trình thu ngân. Khung thép kết hợp khay nhựa bền bỉ mang lại cảm giác chắc tay, phù hợp cho siêu thị, cửa hàng tiện lợi, shop bán lẻ, nhà thuốc, quán café.", bold: true },
        { text: "Thiết bị hỗ trợ 3 chế độ khóa linh hoạt (Lock – Open – Stand by), kết hợp cảm biến micro switch giúp đóng/mở két chính xác, dễ dàng kết nối với máy POS hoặc máy in hóa đơn thông qua cổng RJ11." },
        { text: "Với thiết kế gọn gàng, độ bền cao và khả năng tương thích tốt, MAKEN VK4102 là lựa chọn đáng tin cậy để nâng cao tính chuyên nghiệp và đảm bảo an toàn tiền mặt tại quầy thu ngân.", bold: true }
      ]
    }
  ],

  specs: [
    { label: "Ngăn kéo đựng tiền MAKEN VK4102", value: "", bold: true },
    { label: "Loại két", value: "10 ngăn đựng tiền giấy" },
    { label: "Cảm biến", value: "Micro switch" },
    { label: "Chế độ khóa", value: "3 chế độ (Lock / Open / Stand by)" },
    { label: "Vỏ ngoài", value: "Thép sơn tĩnh điện" },
    { label: "Ngăn kéo", value: "Nhựa, khung thép" },
    { label: "Cổng kết nối", value: "RJ11" },
    { label: "Nguồn điện", value: "24V" },
    { label: "Kích thước (D × R × C)", value: "410 × 420 × 100 mm" },
    { label: "Trọng lượng", value: "7,04 kg" }
  ]
};

// ============================================
// MAPPING: Từ slug/tên sản phẩm → dữ liệu phần cứng
// ============================================
// ============================================
// DỮ LIỆU SẢN PHẨM: MÁY QUÉT MÃ VẠCH ĐA HƯỚNG ICW97201
// ============================================
export const mayQuetOmni: HardwareProduct = {
  id: "PHANCUNG.QMV.PR",
  name: "Máy quét mã vạch ICW97201",
  code: "PHANCUNG.QMV.PR",
  price: 1690000,
  priceFormatted: "1.690.000",
  unit: "Cái",
  images: [
    "/hinhanh/hw_omni.png",
  ],
  shortFeatures: [
    "Hạ tầng phần cứng mạnh mẽ & Tương thích tuyệt đối",
    "Không chỉ dừng lại ở phần mềm, chúng tôi cung cấp hệ thống thiết bị phần cứng chính hãng (Máy POS, máy in, thiết bị mã vạch...) được kiểm định kỹ lưỡng để đảm bảo sự đồng bộ cao nhất, giúp hệ thống vận hành bền bỉ 24/7.",
    "Tư vấn cấu hình tối ưu chi phí",
    "Lựa chọn thiết bị phù hợp nhất với mô hình kinh doanh và ngân sách, tránh lãng phí vào những cấu hình không cần thiết.",
    "Đồng bộ hóa hoàn hảo với phần mềm",
    "Đảm bảo phần cứng và phần mềm hoạt động \"ăn khớp\" 100%, loại bỏ hoàn toàn các lỗi xung đột hệ thống hay độ trễ khi in ấn, thanh toán.",
    "Lắp đặt và Setup tận nơi",
    "Thiết lập hệ thống dây mạng, kết nối thiết bị gọn gàng, thẩm mỹ và hướng dẫn vận hành thiết bị trực quan ngay tại cửa hàng.",
    "Bảo hành chính hãng & Thay thế nhanh",
    "Cam kết bảo hành theo tiêu chuẩn nhà sản xuất, hỗ trợ thiết bị thay thế tạm thời trong khi sửa chữa để kinh doanh không bị gián đoạn."
  ],
  badges: [
    "Bảo hành chính hãng",
    "Giao hàng toàn quốc",
    "Đổi trả trong 7 ngày",
    "Hỗ trợ 24/7"
  ],
  inStock: false,

  description: [
    {
      heading: "Máy quét mã vạch ICW97201 – Giải pháp quét tự động chuyên nghiệp cho quầy thu ngân",
      lines: []
    },
    {
      heading: "",
      lines: [
        { text: "ICW97201 là dòng máy quét mã vạch để bàn cao cấp, được thiết kế chuyên biệt cho môi trường bán hàng cần tốc độ – độ chính xác – sự ổn định. Nhờ công nghệ quét ảnh đa hướng, thiết bị dễ dàng đọc các loại mã 1D & 2D chỉ trong tích tắc, kể cả mã nhỏ, mã mờ hoặc mã hiển thị trên màn hình điện thoại.", bold: true },
        { text: "Khác với máy quét cầm tay truyền thống, ICW97201 hoạt động hoàn toàn tự động, nhân viên chỉ cần đưa sản phẩm qua vùng quét mà không cần thao tác bấm nút. Điều này giúp rút ngắn thời gian thanh toán, giảm thao tác lặp lại và tăng hiệu suất làm việc tại các quầy thu ngân đông khách." },
        { text: "Với thiết kế để bàn chắc chắn cùng chân đế tích hợp sẵn, máy luôn giữ vị trí ổn định trong quá trình sử dụng liên tục. Tiêu chuẩn IP42 kết hợp khả năng chịu rơi lên đến 1,5m giúp thiết bị vận hành bền bỉ trong môi trường cửa hàng, siêu thị và nhà thuốc.", bold: true },
        { text: "ICW97201 đặc biệt phù hợp cho siêu thị mini, cửa hàng tiện lợi, shop thời trang, hiệu thuốc, quầy thanh toán POS, nơi yêu cầu cao về tốc độ quét, độ chính xác và sự chuyên nghiệp. Đây là lựa chọn lý tưởng để nâng cấp quầy thu ngân và tối ưu trải nghiệm mua sắm cho khách hàng.", bold: true }
      ]
    }
  ],

  specs: [
    { label: "Máy quét mã vạch ICW97201", value: "", bold: true },
    { label: "Công nghệ quét", value: "Quét ảnh đa hướng" },
    { label: "Chuẩn mã hỗ trợ", value: "1D + 2D" },
    { label: "Độ phân giải đầu đọc", value: "640 × 480 pixels" },
    { label: "Độ phân giải mã vạch", value: "3.9 mils" },
    { label: "Độ mở mã vạch cho phép", value: "20%" },
    { label: "Chế độ quét", value: "Tự động" },
    { label: "Kết nối", value: "USB" },
    { label: "Tiêu chuẩn lắp ráp", value: "IP42" },
    { label: "Khả năng chịu rơi", value: "1,5 m" },
    { label: "Nguồn điện", value: "5V – 200mA" },
    { label: "Kích thước", value: "83 × 80 × 147 mm" },
    { label: "Trọng lượng", value: "133 g" },
    { label: "Hình thức sử dụng", value: "Để bàn" },
    { label: "Chân đế", value: "Có (tích hợp sẵn)" }
  ]
};

// ============================================
// MAPPING: Từ slug/tên sản phẩm → dữ liệu phần cứng
// ============================================
export const hardwareProductMap: Record<string, HardwareProduct> = {
  // Cân điện tử
  "can-dien-tu": canDienTuCL1,
  "can-dien-tu-tinh-tien": canDienTuCL1,
  "oneplusone-c-l1": canDienTuCL1,
  "phancung.cdt.bs": canDienTuCL1,
  // Giấy in nhiệt
  "giay-in-nhiet": giayInNhiet,
  "giay-in-bill": giayInNhiet,
  "phancung.gib.bs": giayInNhiet,
  // Máy in hóa đơn
  "may-in-hoa-don": mayInHoaDon,
  "may-in": mayInHoaDon,
  "hprt-tp80nc-h": mayInHoaDon,
  "phancung.mib.bs": mayInHoaDon,
  // Máy POS cầm tay
  "may-pos-cam-tay": mayPosCamTay,
  "urovo-i9100": mayPosCamTay,
  "phancung.pos.bs": mayPosCamTay,
  // Máy POS 2 màn hình
  "may-pos-2-man-hinh": mayPos2ManHinh,
  "may-pos-thu-ngan": mayPos2ManHinh,
  "imin-d4-504": mayPos2ManHinh,
  "phancung.pos.pro": mayPos2ManHinh,
  // Máy quét mã vạch cầm tay
  "may-quet-ma-vach": mayQuetMaVach,
  "icw-92108hs": mayQuetMaVach,
  "phancung.qmv.bs": mayQuetMaVach,
  // Máy quét mã vạch đa hướng
  "may-quet-omni": mayQuetOmni,
  "may-quet-da-huong": mayQuetOmni,
  "icw97201": mayQuetOmni,
  "phancung.qmv.pr": mayQuetOmni,
  // Két tiền
  "ket-dung-tien": ketTien,
  "ket-tien": ketTien,
  "maken-vk4102": ketTien,
  "phancung.tdt.bs": ketTien,
};

// Hàm tìm sản phẩm phần cứng từ slug
export function findHardwareProduct(slug: string): HardwareProduct | null {
  const s = slug.toLowerCase().replace(/ /g, "-");
  
  // Tìm trực tiếp
  if (hardwareProductMap[s]) return hardwareProductMap[s];
  
  // Tìm theo keyword
  for (const [key, product] of Object.entries(hardwareProductMap)) {
    if (s.includes(key) || key.includes(s)) return product;
  }
  
  // Fallback
  if (s.includes("can") || s.includes("cân")) return canDienTuCL1;
  if (s.includes("giay") || s.includes("paper")) return giayInNhiet;
  if (s.includes("may-in") || s.includes("printer")) return mayInHoaDon;
  if (s.includes("2-man") || s.includes("thu-ngan") || s.includes("d4-504")) return mayPos2ManHinh;
  if (s.includes("pos") || s.includes("cam-tay")) return mayPosCamTay;
  if (s.includes("omni") || s.includes("da-huong")) return mayQuetOmni;
  if (s.includes("quet") || s.includes("scanner")) return mayQuetMaVach;
  if (s.includes("ket") || s.includes("drawer")) return ketTien;
  
  return null;
}

