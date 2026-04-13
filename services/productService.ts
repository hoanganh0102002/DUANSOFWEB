// ============================================================
// Product Service – cung cấp dữ liệu sản phẩm cho EcosystemSection
// ============================================================

// ---------- Types ----------
export interface Category {
  maLoai: string;
  tenLoai: string;
  maCha: string | null;
  hinhAnh: string | null;
}

export interface Product {
  maSanPham: string;
  maHang: string;
  maLoai: string;
  tenSanPham: string;
  noiDungShort: string;
  hinhAnh: string | null;
  hinhAnhLon: string | null;
  giaBan: number | string;
  giaBasic?: number | string | null;
  giaPro?: number | string | null;
  giaFull?: number | string | null;
  [key: string]: any;
}

export interface StockInfo {
  inStock: boolean;
  stockQuantity: number;
}

export interface StockResponse {
  success: boolean;
  data: StockInfo | null;
}

// ---------- Helper URL builders ----------
const MEDIA_HOST = "https://softech.vn";

export function getCategoryUrl(cat: Category): string {
  return `/san-pham/${(cat.maLoai || "").toLowerCase()}`;
}

export function getProductPricingUrl(p: Product): string {
  return `/san-pham/${(p.maLoai || "").toLowerCase()}/pricing`;
}

export function getProductDetailUrl(p: Product): string {
  return `/san-pham/${(p.maLoai || "").toLowerCase()}/${p.maHang || p.maSanPham}`;
}

export function getMediaUrl(path: string | null | undefined): string {
  if (!path || typeof path !== 'string') return "/placeholder.png";
  if (path.startsWith("http")) return path;

  return `${MEDIA_HOST}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function getProductUrl(p: Product | any): string {
  const maLoai = (p.maLoai || "").toLowerCase();
  const slug = p.slug || p.maHang || p.maSanPham || "";
  return `/san-pham/${maLoai}/${slug}`;
}

// ---------- Stock (DÙNG PROXY HOẶC STUB CHO LOCAL) ----------

export async function getProductStock(productCode: string): Promise<StockResponse> {
  // Hiện tại chưa có API stock cho local DB, dùng stub or proxy nếu cần
  // Giả định hàng phần cứng đều còn hàng nếu ko có API
  return {
    success: true,
    data: { inStock: true, stockQuantity: 999 }
  };
}

// ---------- Product Service (KẾT NỐI DATABASE LOCAL) ----------

export const productService = {
  /** Lấy danh mục (Giữ tạm để ko lỗi giao diện) */
  async getTopCategories(): Promise<Category[]> {
    return [
      { maLoai: "PHANMEM", tenLoai: "Phần mềm", maCha: null, hinhAnh: null },
      { maLoai: "PHANCUNG", tenLoai: "Phần cứng", maCha: null, hinhAnh: null },
      { maLoai: "DICHVU", tenLoai: "Dịch vụ", maCha: null, hinhAnh: null },
    ];
  },

  /** HÀM QUAN TRỌNG: Lấy sản phẩm từ database local */
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch('/api/products', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store' 
      });
      const result = await response.json();
      if (result.success && result.data) {
        // Ánh xạ lại dữ liệu để đảm bảo type-safe
        return (result.data as any[]).map(p => ({
          ...p,
          maLoai: String(p.maLoai || "DICHVU"),
          maCha: String(p.maCha || p.maLoai || "DICHVU"),
          maSanPham: String(p.maSanPham || p.maHang || ""),
          maHang: String(p.maHang || p.maSanPham || ""),
          tenSanPham: String(p.tenSanPham || "Sản phẩm không tên"),
          giaBan: Number(p.giaBan || 199000),
          giaBasic: Number(p.giaBasic || 199000)
        })) as Product[];
      }
      return [];
    } catch (error) {
      console.error('Error fetching local products:', error);
      return [];
    }
  },

  /** Lấy sản phẩm theo tab (Lọc từ kết quả getAllProducts) */
  async getProductsByTabs(maLoai: string): Promise<Product[]> {
    const all = await this.getAllProducts();
    if (!maLoai || maLoai === 'ALL' || maLoai === 'TẤT CẢ') return all; 
    return all.filter(p => p.maLoai === maLoai || p.maCha === maLoai);
  },

  /** Stub để ko lỗi UI khi gọi getSubCategories */
  async getSubCategories(maCha: string): Promise<Category[]> {
    return [];
  }
};

// Export lẻ hàm để EcosystemSection gọi trực tiếp được
export const getAllProducts = () => productService.getAllProducts();
export const getProductsByTabs = (maLoai: string) => productService.getProductsByTabs(maLoai);