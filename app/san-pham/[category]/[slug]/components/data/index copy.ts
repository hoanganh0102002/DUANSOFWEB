// Helper: Chọn đúng bộ data dựa trên tên sản phẩm
import { parkingCardData, parkingModalData } from "./parkingData";
import { cafeCardData, cafeModalData } from "./cafeData";
import { defaultCardData, defaultModalData } from "./defaultData";
import { hotelCardData, hotelModalData } from "./hotelData";

export type TierKey = "basic" | "full" | "pro";

export interface SystemFeature {
  id: number;
  title: string;
  desc: string;
}

// Xác định loại sản phẩm
export function detectProductType(name: string): "parking" | "cafe" | "hotel" | "default" {
  const n = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
  if (n.includes("bai xe") || n.includes("giu xe")) return "parking";
  if (n.includes("cafe")) return "cafe";
  if (n.includes("khach san")) return "hotel";
  return "default";
}

// Xác định tier từ package name
export function detectTier(packageName: string): TierKey {
  const lower = packageName.toLowerCase();
  if (lower.includes("full")) return "full";
  if (lower.includes("pro")) return "pro";
  return "basic";
}

// Lấy data cho Pricing Card (hiển thị trên trang)
export function getCardData(productName: string, tier: TierKey) {
  const type = detectProductType(productName);
  switch (type) {
    case "parking": return parkingCardData[tier];
    case "cafe": return cafeCardData[tier];
    case "hotel": return hotelCardData[tier];
    default: return defaultCardData[tier];
  }
}

// Lấy data cho Modal chi tiết
export function getModalData(packageName: string) {
  // Detect type từ packageName (vd: "Phần mềm quản lý Bãi xe Basic")
  const lower = packageName.toLowerCase();
  const isParking = lower.includes("bãi giữ xe") || lower.includes("giữ xe") || lower.includes("bãi xe") || lower.includes("parking");
  const isCafe = lower.includes("cafe");
  const isHotel = lower.includes("khách sạn");
  const tier = detectTier(packageName);

  if (isParking) return parkingModalData[tier];
  if (isCafe) return cafeModalData[tier];
  if (isHotel) return hotelModalData[tier];
  return defaultModalData[tier];
}
