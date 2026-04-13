// Nội dung gói Phần mềm quản lý Kho (Warehouse Management)
// Gồm 3 gói: Basic, Full, Pro

export const warehouseCardData = {
  basic: {
    highlights: [
      "Hệ thống có khả năng quản lý tốt.",
      "Bản tối ưu có hỗ trợ đa dạng phương thức xuất kho: FIFO (Nhập trước xuất trước), LIFO (Nhập sau xuất trước) và Xuất đích danh.",
      "Tích hợp mobile/web kho chuyên dụng.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 30MB."
    ],
    systemFeatures: [
      "1. Gói BASIC (Đơn giản – Phù hợp kho nhỏ / cửa hàng bán lẻ)",
      "2. Quản lý sơ đồ kho linh hoạt theo khu vực (kệ, ô, vị trí lưu trữ).",
      "3. Giao diện nhập – xuất kho đơn giản trên điện thoại/máy tính."
    ]
  },
  full: {
    highlights: [
      "Quản lý tồn kho theo thời gian thực, cập nhật nhanh chóng và chính xác số lượng hàng hóa.",
      "Tự động hóa quy trình nhập - xuất - kiểm kê, giúp giảm sai sót và tiết kiệm thời gian.",
      "Báo cáo, thống kê trực quan, hỗ trợ doanh nghiệp ra quyết định hiệu quả hơn.",
      "Hệ thống có khả năng quản lý tốt.",
      "Bản tối ưu có hỗ trợ đa dạng phương thức xuất kho: FIFO (Nhập trước xuất trước), LIFO (Nhập sau xuất trước) và Xuất đích danh.",
      "Tích hợp mobile/web kho chuyên dụng.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      "1. Gói FULL (Toàn diện – Phù hợp doanh nghiệp lớn / kho phức tạp)",
      "2. Thiết lập quy trình duyệt phiếu, kiểm soát tồn kho đa cấp.",
      "3. Quản lý chuỗi kho không giới hạn, đồng bộ dữ liệu thời gian thực.",
      "4. Hệ thống báo cáo chuyên sâu, tùy chỉnh theo nhu cầu quản trị.",
      "5. Tự động hóa quy trình nhập – xuất – điều chuyển – kiểm kê kho.",
      "6. Kết nối API với ERP, kế toán, bán hàng, vận chuyển...",
      "7. Quản lý chi tiết theo lô, serial, hạn dùng...",
      "8. Phân quyền chi tiết theo vai trò, bảo mật cao..."
    ]
  },
  pro: {
    highlights: [
      "Quản lý tồn kho theo thời gian thực, cập nhật nhanh chóng và chính xác số lượng hàng hóa.",
      "Tự động hóa quy trình nhập - xuất - kiểm kê, giúp giảm sai sót và tiết kiệm thời gian.",
      "Báo cáo, thống kê trực quan, hỗ trợ doanh nghiệp ra quyết định hiệu quả hơn.",
      "Hệ thống có khả năng quản lý tốt.",
      "Bản tối ưu có hỗ trợ đa dạng phương thức xuất kho: FIFO (Nhập trước xuất trước), LIFO (Nhập sau xuất trước) và Xuất đích danh.",
      "Tích hợp mobile/web kho chuyên dụng.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      "1. Gói PRO (Nâng cao – Phù hợp kho vừa / chuỗi cửa hàng)",
      "2. Quản lý nhà cung cấp, lịch sử nhập hàng và công nợ cơ bản.",
      "3. Quản lý nhiều kho, nhiều khu vực lưu trữ và vị trí hàng hóa chi tiết.",
      "4. Báo cáo phân tích tồn kho, vòng quay hàng hóa, nhập – xuất...",
      "5. Nhập – xuất kho bằng quét mã vạch/QR, kiểm kho nhanh...",
      "6. Phân quyền người dùng nâng cao, ghi nhận lịch sử thao tác (log).",
      "7. Theo dõi tồn kho theo lô, hạn sử dụng, cảnh báo hàng...",
      "8. Tích hợp với phần mềm bán hàng (POS) hoặc kế toán."
    ]
  }
};

export const warehouseModalData = {
  basic: {
    highlights: [
      "Hệ thống có khả năng quản lý tốt.",
      "Bản tối ưu có hỗ trợ đa dạng phương thức xuất kho: FIFO (Nhập trước xuất trước), LIFO (Nhập sau xuất trước) và Xuất đích danh.",
      "Tích hợp mobile/web kho chuyên dụng.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 30MB."
    ],
    systemFeatures: [
      { 
        id: 1, 
        title: "1. Gói BASIC (Đơn giản – Phù hợp kho nhỏ / cửa hàng bán lẻ)", 
        desc: "Giải pháp quản lý kho dễ sử dụng, đáp ứng các nhu cầu nhập xuất và tồn kho cơ bản." 
      },
      { 
        id: 2, 
        title: "2. Quản lý sơ đồ kho linh hoạt theo khu vực (kệ, ô, vị trí lưu trữ).", 
        desc: "Giúp người dùng dễ dàng định vị sản phẩm trong kho bằng hình thức phân chia khu vực logic." 
      },
      { 
        id: 3, 
        title: "3. Giao diện nhập – xuất kho đơn giản trên máy tính, máy tính bảng hoặc điện thoại.", 
        desc: "Tương thích đa nền tảng, tạo phiếu nhập/xuất nhanh gọn tại bất kì thiết bị nào." 
      },
      { 
        id: 4, 
        title: "4. Ghi nhận và theo dõi phiếu nhập, phiếu xuất, chuyển kho nhanh chóng.", 
        desc: "Lịch sử và chứng từ được lưu trữ đầy đủ, dễ dàng tra cứu khi cần kiểm tra." 
      },
      { 
        id: 5, 
        title: "5. Quản lý danh mục hàng hóa, nhóm sản phẩm, đơn vị tính và thuộc tính cơ bản.", 
        desc: "Hệ thống danh mục rõ ràng, dễ dàng thêm mới, phân loại và tìm kiếm sản phẩm." 
      },
      { 
        id: 6, 
        title: "6. Kiểm soát tồn kho theo thời gian thực, hạn chế thất thoát và sai lệch số liệu.", 
        desc: "Số liệu được tự động cập nhật mỗi khi có giao dịch nhập xuất, giảm thiểu sai sót." 
      },
      { 
        id: 7, 
        title: "7. Báo cáo tồn kho, nhập – xuất – tồn và tổng hợp cuối ngày.", 
        desc: "Cung cấp báo cáo thống kê trực quan, chuẩn xác để theo dõi hoạt động mỗi ngày." 
      },
      { 
        id: 8, 
        title: "8. Phân quyền người dùng cơ bản (Quản lý kho, nhân viên kho).", 
        desc: "Đảm bảo tính bảo mật và kiểm soát hành động của nhân viên thao tác trên phần mềm." 
      }
    ]
  },
  full: {
    highlights: [
      "Quản lý tồn kho theo thời gian thực, cập nhật nhanh chóng và chính xác số lượng hàng hóa.",
      "Tự động hóa quy trình nhập - xuất - kiểm kê, giúp giảm sai sót và tiết kiệm thời gian.",
      "Báo cáo, thống kê trực quan, hỗ trợ doanh nghiệp ra quyết định hiệu quả hơn.",
      "Hệ thống có khả năng quản lý tốt.",
      "Bản tối ưu có hỗ trợ đa dạng phương thức xuất kho: FIFO (Nhập trước xuất trước), LIFO (Nhập sau xuất trước) và Xuất đích danh.",
      "Tích hợp mobile/web kho chuyên dụng.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      { 
        id: 1, 
        title: "1. Gói FULL (Toàn diện – Phù hợp doanh nghiệp lớn / kho phức tạp)", 
        desc: "Cung cấp bộ công cụ quản trị kho mạnh mẽ, đáp ứng yêu cầu vận hành phức tạp và quy chuẩn cao." 
      },
      { 
        id: 2, 
        title: "2. Thiết lập quy trình duyệt phiếu, kiểm soát tồn kho đa cấp.", 
        desc: "Xây dựng luồng phê duyệt chặt chẽ, đảm bảo tính minh bạch và chính xác trong mọi giao dịch kho." 
      },
      { 
        id: 3, 
        title: "3. Quản lý chuỗi kho không giới hạn, đồng bộ dữ liệu thời gian thực.", 
        desc: "Kết nối và điều phối hàng hóa giữa nhiều kho bãi khác nhau trên một hệ thống duy nhất." 
      },
      { 
        id: 4, 
        title: "4. Hệ thống báo cáo chuyên sâu, tùy chỉnh theo nhu cầu quản trị.", 
        desc: "Cung cấp các chỉ số phân tích kho bãi quan trọng, giúp tối ưu hóa không gian và vận hành." 
      },
      { 
        id: 5, 
        title: "5. Tự động hóa quy trình nhập – xuất – điều chuyển – kiểm kê kho.", 
        desc: "Giảm thiểu thao tác thủ công, tăng tốc độ xử lý và độ chính xác cho mọi hoạt động lưu kho." 
      },
      { 
        id: 6, 
        title: "6. Kết nối API với ERP, kế toán, bán hàng, vận chuyển và các hệ thống khác.", 
        desc: "Khả năng tích hợp mở rộng linh hoạt, đồng bộ hóa dữ liệu trên toàn hệ sinh thái doanh nghiệp." 
      },
      { 
        id: 7, 
        title: "7. Quản lý chi tiết theo lô, serial, hạn dùng và truy xuất nguồn gốc hàng hóa.", 
        desc: "Kiểm soát hàng hóa theo đặc thù riêng, đảm bảo chất lượng và khả năng truy vết tuyệt đối." 
      },
      { 
        id: 8, 
        title: "8. Phân quyền chi tiết theo vai trò, bảo mật cao và sao lưu dữ liệu định kỳ.", 
        desc: "Hệ thống bảo mật đa lớp, bảo vệ dữ liệu doanh nghiệp an toàn trước mọi rủi ro mất mát." 
      }
    ]
  },
  pro: {
    highlights: [
      "Quản lý tồn kho theo thời gian thực, cập nhật nhanh chóng và chính xác số lượng hàng hóa.",
      "Tự động hóa quy trình nhập - xuất - kiểm kê, giúp giảm sai sót và tiết kiệm thời gian.",
      "Báo cáo, thống kê trực quan, hỗ trợ doanh nghiệp ra quyết định hiệu quả hơn.",
      "Hệ thống có khả năng quản lý tốt.",
      "Bản tối ưu có hỗ trợ đa dạng phương thức xuất kho: FIFO (Nhập trước xuất trước), LIFO (Nhập sau xuất trước) và Xuất đích danh.",
      "Tích hợp mobile/web kho chuyên dụng.",
      "Số lượng người dùng: có thể mua thêm ngoài mặc định 1 admin.",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      { 
        id: 1, 
        title: "1. Gói PRO (Nâng cao – Phù hợp kho vừa / chuỗi cửa hàng)", 
        desc: "Giải pháp nâng cao giúp triển khai quản lý đa chi nhánh và kiểm kê chuyên nghiệp." 
      },
      { 
        id: 2, 
        title: "2. Quản lý nhà cung cấp, lịch sử nhập hàng và công nợ cơ bản.", 
        desc: "Theo dõi chi tiết nguồn cung ứng hàng hóa và tình hình thanh toán với đối tác." 
      },
      { 
        id: 3, 
        title: "3. Quản lý nhiều kho, nhiều khu vực lưu trữ và vị trí hàng hóa chi tiết.", 
        desc: "Kiểm soát toàn diện nhiều địa điểm kho khác nhau, điều chuyển dễ dàng." 
      },
      { 
        id: 4, 
        title: "4. Báo cáo phân tích tồn kho, vòng quay hàng hóa, nhập – xuất theo thời gian.", 
        desc: "Cung cấp cái nhìn sâu sắc về hiệu quả luân chuyển hàng hóa để tối ưu hóa tồn kho." 
      },
      { 
        id: 5, 
        title: "5. Nhập – xuất kho bằng quét mã vạch/QR, hỗ trợ kiểm kho nhanh và chính xác.", 
        desc: "Tăng tốc độ xử lý đơn hàng và kiểm kê, loại bỏ rủi ro sai sót do con người." 
      },
      { 
        id: 6, 
        title: "6. Phân quyền người dùng nâng cao, ghi nhận lịch sử thao tác (log).", 
        desc: "Bảo mật hệ thống với phân quyền chi tiết và khả năng truy vết mọi hành động của người dùng." 
      },
      { 
        id: 7, 
        title: "7. Theo dõi tồn kho theo lô, hạn sử dụng, cảnh báo hàng sắp hết hoặc sắp quá hạn.", 
        desc: "Chủ động kiểm soát chất lượng hàng hóa và kế hoạch nhập hàng thông qua cảnh báo thông minh." 
      },
      { 
        id: 8, 
        title: "8. Tích hợp với phần mềm bán hàng (POS) hoặc hệ thống kế toán.", 
        desc: "Đồng bộ hóa luồng dữ liệu giữa kho bãi và các bộ phận kinh doanh, tài chính." 
      }
    ]
  }
};
