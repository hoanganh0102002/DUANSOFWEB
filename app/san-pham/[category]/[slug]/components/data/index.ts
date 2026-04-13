import { defaultCardData, defaultModalData } from "./defaultData";
import { parkingCardData, parkingModalData } from "./parkingData";
import { cafeCardData, cafeModalData } from "./cafeData";
import { hotelCardData, hotelModalData } from "./hotelData";
import { restaurantCardData, restaurantModalData } from "./restaurantData";
import { palletCardData, palletModalData } from "./palletData";
import { hrCardData, hrModalData } from "./hrData";
import { erpCardData, erpModalData } from "./erpData";
import { transportCardData, transportModalData } from "./transportData";
import { warehouseCardData, warehouseModalData } from "./warehouseData";

export type TierKey = "basic" | "full" | "pro";

export interface SystemFeature {
  id: number;
  title: string;
  desc: string;
}

// Xác định loại sản phẩm
export function detectProductType(name: string): "parking" | "cafe" | "hotel" | "restaurant" | "pallet" | "warehouse" | "hr" | "erp" | "transport" | "default" {
  const n = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
  if (n.includes("bai xe") || n.includes("giu xe")) return "parking";
  if (n.includes("cafe")) return "cafe";
  if (n.includes("khach san")) return "hotel";
  if (n.includes("quan an")) return "restaurant";
  if (n.includes("pallet") || n.includes("kho pallet")) return "pallet";
  if (n.includes("kho")) return "warehouse";
  if (n.includes("nhan su")) return "hr";
  if (n.includes("erp")) return "erp";
  if (n.includes("van tai")) return "transport";
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
    case "restaurant": return restaurantCardData[tier];
    case "pallet": return palletCardData[tier];
    case "warehouse": return warehouseCardData[tier];
    case "hr": return hrCardData[tier];
    case "erp": return erpCardData[tier];
    case "transport": return transportCardData[tier];
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
  const isRestaurant = lower.includes("quán ăn");
  const isPallet = lower.includes("pallet") || lower.includes("kho pallet");
  const isWarehouse = (lower.includes("kho") || lower.includes("quản lý kho")) && !isPallet;
  const isHR = lower.includes("nhân sự");
  const isERP = lower.includes("erp");
  const isTransport = lower.includes("vận tải");
  
  const tier = detectTier(packageName);

  if (isParking) return parkingModalData[tier];
  if (isCafe) return cafeModalData[tier];
  if (isHotel) return hotelModalData[tier];
  if (isRestaurant) return restaurantModalData[tier];
  if (isPallet) return palletModalData[tier];
  if (isWarehouse) return warehouseModalData[tier];
  if (isHR) return hrModalData[tier];
  if (isERP) return erpModalData[tier];
  if (isTransport) return transportModalData[tier];
  return defaultModalData[tier];
}
