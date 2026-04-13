import { NextResponse } from 'next/server';

// Hàm GET này sẽ xử lý khi có ai đó truy cập vào đường link /api/dich-vu
export async function GET() {
  // Dữ liệu giả lập (sau này bạn có thể kết nối với SQL/Database ở ngay trong hàm này)
  const dichVuSOF = [
    { id: 1, ten: "Thiết kế Website", moTa: "Xây dựng website chuẩn SEO, giao diện hiện đại và tối ưu." },
    { id: 2, ten: "Phát triển Phần mềm", moTa: "Lập trình ứng dụng theo yêu cầu, đáp ứng quy trình riêng." },
    { id: 3, ten: "Chuyển đổi số", moTa: "Tư vấn và triển khai hệ thống tự động hóa cho doanh nghiệp." }
  ];

  // Trả về dữ liệu dưới dạng JSON
  return NextResponse.json(dichVuSOF);
}