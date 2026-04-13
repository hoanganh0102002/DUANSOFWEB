import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; // Đường dẫn có thể thay đổi tùy cấu trúc thư mục của bạn

export async function GET(request: Request) {
  try {
    // Truy vấn bảng wb_lv0501 để lấy tất cả sản phẩm
    // Bạn có thể SELECT * hoặc chỉ định các cột cần thiết để tối ưu payload
    const categories = [
      { table: 'wb_lv0101', label: 'PHANMEM' },
      { table: 'wb_lv0005', label: 'PHANMEM' },
      { table: 'wb_lv0017', label: 'PHANMEM' }, // Software versions
      { table: 'wb_lv0301', label: 'DICHVU' },  // Services
      { table: 'wb_lv0401', label: 'PHANCUNG' },
      { table: 'wb_lv0002', label: 'PHANMEM' }
    ];

    let allProducts: any[] = [];
    
    for (const cat of categories) {
      try {
        const rows: any = await query({ 
          query: `SELECT * FROM ${cat.table} LIMIT 100` 
        });
        
        const mapped = rows.map((r: any) => {
          // Robust mapping: detect which columns have strings (names) vs numbers (prices)
          const nameCandidate = String(r.lv003 || r.lv002 || "");
          const descCandidate = String(r.lv004 || "");
          let priceRaw = Number(r.lv007 || r.lv005 || 0);
          
          // If price is too large (like a timestamp), reset it
          if (priceRaw > 10000000) priceRaw = 199; 

          let label = cat.label;
          const lowerName = nameCandidate.toLowerCase();
          
          // Heuristic refinement
          if (lowerName.includes('máy') || lowerName.includes('đầu') || lowerName.includes('pos') || lowerName.includes('in')) label = 'PHANCUNG';
          else if (lowerName.includes('dịch vụ') || lowerName.includes('bảo trì') || lowerName.includes('miễn phí')) label = 'DICHVU';
          else if (cat.table === 'wb_lv0301') label = 'DICHVU';
          else if (cat.table === 'wb_lv0401') label = 'PHANCUNG';

          return {
            maSanPham: `${cat.table}_${r.lv001}`,
            maHang: `${cat.table}_${r.lv001}`,
            maLoai: label,
            maCha: label,
            tenSanPham: nameCandidate,
            noiDungShort: descCandidate,
            hinhAnh: r.lv006,
            hinhAnhLon: r.lv006,
            giaBan: priceRaw * 1000,
            giaBasic: priceRaw * 1000
          };
        });
        
        allProducts = [...allProducts, ...mapped];
      } catch (err) {
        console.error(`Error fetching from ${cat.table}:`, err);
      }
    }

    // Lọc trùng và loại bỏ rác
    const filteredProducts = allProducts.filter(p => {
      const name = String(p.tenSanPham || "").toLowerCase();
      const isIntro = name.includes('hướng dẫn') || name.includes('giới thiệu') || name.includes('chào mừng') || name.length < 3;
      // Tránh các tên sản phẩm là số thuần túy (rác dữ liệu)
      const isNumericName = /^\d+(\.\d+)?$/.test(p.tenSanPham);
      return !isIntro && !isNumericName;
    });
    
    const uniqueProducts = Array.from(new Map(filteredProducts.map(p => [p.maSanPham, p])).values())
      .slice(0, 40);

    return NextResponse.json({
      success: true,
      data: uniqueProducts
    });

  } catch (error) {
    console.error('API Products Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Lỗi khi lấy dữ liệu từ Local Database',
      data: []
    }, { status: 500 });
  }
}