// Nội dung gói Phần mềm quản lý Kho Pallet (Pallet Warehouse)
// Gồm 3 gói: Basic, Full, Pro

export const palletCardData = {
  basic: {
    highlights: [
      "Hệ sinh thái Web/App linh hoạt.",
      "Số hóa không gian kho 100%.",
      "Quyết định dựa trên dữ liệu chuẩn.",
      "Triển khai siêu tốc (Plug & Play).",
      "Dịch vụ hỗ trợ tận tâm 24/7.",
      "Dung lượng lưu trữ miễn phí 30MB."
    ],
    systemFeatures: [
      "1. Phân hệ Thiết lập & Dữ liệu ban đầu",
      "2. Phân hệ Số hóa Sơ đồ Kho (Layout)",
      "3. Phân hệ Quản lý Định danh & Pallet"
    ]
  },
  full: {
    highlights: [
      "Giao tiếp IoT (Internet of Things) ngoại vi.",
      "Zero-Error (Không sai số) qua QC tự động.",
      "Tối ưu chi phí vận hành, giảm nhân sự.",
      "Đồng bộ Data không độ trễ Mobile-Web.",
      "Triển khai siêu tốc (Plug & Play).",
      "Dịch vụ hỗ trợ tận tâm 24/7.",
      "Dung lượng lưu trữ miễn phí 60MB."
    ],
    systemFeatures: [
      "1. Bao gồm tất cả tính năng của gói PRO.",
      "2. Phân hệ Tích hợp Thiết bị Ngoại vi",
      "3. Phân hệ In ấn & Mã hóa Phức hợp",
      "4. Phân hệ Quản lý Gom nhóm Kiện hàng",
      "5. Phân hệ Tự động Liên kết Pallet",
      "6. Phân hệ Kiểm soát Chất lượng (QC) tự động",
      "7. Phân hệ Đồng bộ Dữ liệu xuyên suốt"
    ]
  },
  pro: {
    highlights: [
      "Kiểm soát chuỗi cung ứng Đa điểm.",
      "Vận hành không giấy tờ (Paperless).",
      "Truy vết vạn vật (Traceability).",
      "Tối ưu chi phí vận hành triệt để.",
      "Triển khai siêu tốc (Plug & Play).",
      "Dịch vụ hỗ trợ tận tâm 24/7.",
      "Dung lượng lưu trữ miễn phí 60MB."
    ],
    systemFeatures: [
      "1. Bao gồm tất cả tính năng gói BASIC.",
      "2. Phân hệ Quản trị Mạng lưới Đa kho",
      "3. Phân hệ Quản trị Vị trí Nâng cao",
      "4. Phân hệ Tự động hóa Nhập kho",
      "5. Thuật toán Xuất kho Thông minh",
      "6. Phân hệ Truy xuất Nguồn gốc",
      "7. Quản lý Vòng đời & Rủi ro"
    ]
  }
};

export const palletModalData = {
  basic: {
    highlights: [
      "Hệ sinh thái Web/App linh hoạt: Quản lý mọi lúc mọi nơi. App Mobile biến điện thoại thành máy quét QR chuyên dụng, thay thế hoàn toàn sổ sách thủ công.",
      "Số hóa không gian 100%: Trực quan hóa toàn bộ nhà kho bằng giao diện bản đồ phẳng, nhìn vào biết ngay kệ nào trống, kệ nào đầy.",
      "Quyết định dựa trên dữ liệu (Data-driven): Báo cáo chuẩn kế toán và hệ thống cảnh báo Real-time giúp chủ doanh nghiệp ra quyết định nhanh, minh bạch.",
      "Triển khai siêu tốc (Plug & Play): Đồng bộ sơ đồ bãi và hàng ngàn mã sản phẩm chỉ trong 1 nốt nhạc nhờ tính năng tự động trích xuất dữ liệu từ Excel/XML.",
      "Dịch vụ tận tâm: Được cam kết đồng hành và chăm sóc khách hàng sát sao ngay sau khi ký hợp đồng, xóa bỏ nỗi lo 'mua xong đem con bỏ chợ'.",
      "Được sử dụng miễn phí dung lượng 30MB."
    ],
    systemFeatures: [
      { 
        id: 1, 
        title: "1. Phân hệ Thiết lập & Dữ liệu ban đầu:", 
        desc: "Hỗ trợ tạo nhanh danh mục sản phẩm từ việc nhập liệu file Excel/XML. Thiết lập sơ đồ kho hàng loạt thông qua file Excel, rút ngắn thời gian triển khai." 
      },
      { 
        id: 2, 
        title: "2. Phân hệ Số hóa Sơ đồ Kho (Layout):", 
        desc: "Bố trí kho trực quan theo cấu trúc phân tầng: Line (Dãy) – Tầng – Ô chứa. Giao diện hiển thị rõ trạng thái của từng vị trí mặt kệ, trực quan cho người sử dụng kiểm tra tại chỗ." 
      },
      { 
        id: 3, 
        title: "3. Phân hệ Quản lý Định danh & Pallet:", 
        desc: "Tạo mã pallet tự động với mã vạch/QR duy nhất để định danh riêng biệt. Theo dõi chi tiết thông số: mã sản phẩm, trọng lượng, số lượng, kích thước và trạng thái pallet." 
      },
      { 
        id: 4, 
        title: "4. Phân hệ Vận hành bãi & Tìm kiếm:", 
        desc: "Bộ lọc tìm kiếm vị trí linh hoạt theo tên, mã line hoặc trạng thái hiện tại (trống/đầy). Cập nhật số lượng tồn kho theo thời gian thực mỗi khi có thao tác xuất/nhập/kiểm kê." 
      },
      { 
        id: 5, 
        title: "5. Phân hệ Báo cáo Quản trị:", 
        desc: "Trích xuất báo cáo nhập – xuất – tồn kho chuẩn kế toán. Cung cấp số liệu hỗ trợ đối soát minh bạch, xuất file nhanh chóng." 
      },
      { 
        id: 6, 
        title: "6. Phân hệ Cảnh báo tự động:", 
        desc: "Tự động phát tín hiệu cảnh báo trên hệ thống khi tồn kho xuống mức thấp. Báo động ngay lập tức khi phát hiện có sai lệch số liệu thực tế so với phần mềm." 
      }
    ]
  },
  full: {
    highlights: [
      "Giao tiếp IoT (Internet of Things): Phần mềm kết nối trực tiếp với thiết bị ngoại vi (cân điện tử, máy in), tự động hóa khâu đầu vào từ băng chuyền.",
      "Zero-Error (Không sai số): Cơ chế tự động đối soát trọng lượng giúp hệ thống tự động từ chối các kiện hàng không đạt chuẩn QC (Kiểm soát chất lượng).",
      "Tối ưu chi phí vận hành: Giải quyết triệt để bài toán quy trình thủ công, cắt giảm tối đa nhân sự kiểm đếm và triệt tiêu rủi ro thất thoát.",
      "Đồng bộ Data không độ trễ: Dữ liệu chảy xuyên suốt từ App Mobile của nhân viên đóng gói đến màn hình Web của bộ phận kế toán và quản lý vận hành kho.",
      "Triển khai siêu tốc (Plug & Play): Đồng bộ sơ đồ bãi và hàng ngàn mã sản phẩm chỉ trong 1 nốt nhạc nhờ tính năng tự động trích xuất dữ liệu từ Excel/XML.",
      "Dịch vụ tận tâm: Được cam kết đồng hành và chăm sóc khách hàng sát sao ngay sau khi ký hợp đồng, xóa bỏ nỗi lo 'mua xong đem con bỏ chợ'.",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      { id: 1, title: "1. Bao gồm tất cả tính năng của gói PRO.", desc: "Sở hữu toàn diện các module quản lý kho nâng cao của phiên bản Professional." },
      { id: 2, title: "2. Phân hệ Tích hợp Thiết bị Ngoại vi:", desc: "Kết nối cân điện tử: Tự động truyền tải trọng lượng thực tế của kiện hàng lên phần mềm theo thời gian thực, chống sai số nhập tay." },
      { id: 3, title: "3. Phân hệ In ấn & Mã hóa Phức hợp:", desc: "Tự động tạo mã QR chứa dữ liệu phức hợp (mã SP, số lô, hạn dùng...). Gửi lệnh in trực tiếp xuống máy in tại băng chuyền." },
      { id: 4, title: "4. Phân hệ Quản lý Gom nhóm Kiện hàng:", desc: "Cho phép gán linh hoạt nhiều kiện hàng lẻ vào chung một pallet lớn. Phân loại thông minh theo lô sản xuất hoặc đơn hàng." },
      { id: 5, title: "5. Phân hệ Tự động Liên kết Pallet:", desc: "Tự động nhận diện và gán mã QR kiện hàng vào pallet phù hợp nhất, tối ưu quy trình luân chuyển nội bộ." },
      { id: 6, title: "6. Phân hệ Kiểm soát Chất lượng (QC) Tự động:", desc: "Tự động phát hiện chênh lệch trọng lượng so với định mức chuẩn và cảnh báo chặn lưu kho kiện hàng lỗi ngay lập tức." },
      { id: 7, title: "7. Phân hệ Đồng bộ Dữ liệu Xuyên suốt:", desc: "Đồng bộ dữ liệu tức thời vào hệ thống kho tổng, phục vụ module Nhập-Xuất và Kiểm kê mà không có bất kỳ độ trễ nào." }
    ]
  },
  pro: {
    highlights: [
      "Kiểm soát chuỗi cung ứng Đa điểm: Nền tảng Web mạnh mẽ cho phép quản trị chéo hàng loạt kho bãi chi nhánh mà không lo nghẽn dữ liệu.",
      "Vận hành không giấy tờ (Paperless): Thuật toán thông minh tự động hóa luồng chỉ định xe nâng cất/lấy hàng, triệt tiêu sai sót do con người.",
      "Truy vết vạn vật (Traceability): Quét mã trên App Mobile để lật lại toàn bộ 'bản lý lịch' của một pallet từ thuở lọt lòng đến khi xuất xưởng.",
      "Tối ưu chi phí vận hành: Giải quyết triệt để bài toán quy trình thủ công, cắt giảm tối đa nhân sự kiểm đếm và triệt tiêu rủi ro thất thoát.",
      "Triển khai siêu tốc (Plug & Play): Đồng bộ sơ đồ bãi và hàng ngàn mã sản phẩm chỉ trong 1 nốt nhạc nhờ tính năng tự động trích xuất dữ liệu từ Excel/XML.",
      "Dịch vụ tận tâm: Được cam kết đồng hành và chăm sóc khách hàng sát sao ngay sau khi ký hợp đồng, xóa bỏ nỗi lo 'mua xong đem con bỏ chợ'.",
      "Được sử dụng miễn phí dung lượng 60MB."
    ],
    systemFeatures: [
      { id: 1, title: "1. Bao gồm tất cả tính năng gói BASIC.", desc: "Được tích hợp sẵn toàn bộ nền tảng quản trị kho cơ bản và layout kho trực quan." },
      { id: 2, title: "2. Phân hệ Quản trị Mạng lưới Đa kho:", desc: "Quản lý đồng thời nhiều kho hàng không giới hạn, dữ liệu phân tách độc lập theo từng chi nhánh và khu vực lưu trữ chi tiết." },
      { id: 3, title: "3. Phân hệ Quản trị Vị trí Nâng cao:", desc: "Thao tác linh hoạt với các vị trí ô/kệ (thêm mới, bảo trì, vô hiệu hóa). Liên kết chặt chẽ vị trí với thông tin pallet thực tế." },
      { id: 4, title: "4. Phân hệ Tự động hóa Nhập kho:", desc: "Tự sinh phiếu nhập hệ thống ngay khi quét mã pallet và đưa lên kệ thành công, loại bỏ nhập liệu thủ công cho thủ kho." },
      { id: 5, title: "5. Phân hệ Thuật toán Xuất kho Thông minh:", desc: "Hỗ trợ chuẩn FIFO, LIFO hoặc Bình quân. Tự động đề xuất vị trí lấy hàng tối ưu nhất để tiết kiệm quãng đường xe nâng." },
      { id: 6, title: "6. Phân hệ Truy xuất Nguồn gốc:", desc: "Truy xuất lập tức lý lịch pallet: lô sản xuất, ngày đóng gói và các thông số lưu trữ lịch sử liên quan chỉ bằng một lần quét." },
      { id: 7, title: "7. Phân hệ Quản lý Vòng đời & Rủi ro:", desc: "Lưu lịch sử luân chuyển khép kín và quản lý tải trọng tối đa của pallet để ngăn chặn rủi ro quá tải, mất an toàn kho bãi." }
    ]
  }
};
