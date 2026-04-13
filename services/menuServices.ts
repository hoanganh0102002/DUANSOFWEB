import { apiRequest } from './apiClient';

// Menu Service - for wb_lv0008, wb_lv0001, wb_lv0002

export interface MenuItem {
  id: string;
  tenTiengViet: string;
  actionCode: string;
}

export interface ActionInfo {
  action: string;
  slug?: string;
  lv002?: string;
  lv003?: string;
  lv004?: string;
  lv005?: string;
  lv006?: string;
  lv007?: string;
  lv008?: string;
  lv009?: string;
  lv010?: string;
}

export interface DetailInfo {
  id: string;
  lv002?: string;
  lv003?: string;
  lv004?: string;
  lv005?: string;
  lv006?: string;
  lv007?: string;
  lv008?: string;
  lv009?: string;
  lv010?: string;
}

/**
 * Lấy danh sách menu items từ wb_lv0008
 */
export const getMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const res = await apiRequest<MenuItem[]>('wb_lv0008', 'getMenuItems');
    if (!res || !res.success) return [];
    const data = res.data as unknown;
    if (Array.isArray(data)) return data as MenuItem[];
    // If backend returned wrapped { success,data }
    if (data && typeof data === 'object' && 'data' in (data as any) && Array.isArray((data as any).data)) {
      return (data as any).data as MenuItem[];
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch menu items:', error);
    return [];
  }
};

export interface HeaderMenuItem {
  id: string;
  name: string;
  slug: string;
  isMega: boolean;
  subMenu: {
    id: string;
    name: string;
    link: string;
  }[];
}

/**
 * Lấy cấu trúc Header Menu từ backend (đã gộp sẵn cha-con)
 */
export const getHeaderMenu = async (): Promise<HeaderMenuItem[]> => {
  try {
    const res = await apiRequest<HeaderMenuItem[]>('wb_lv0008', 'getHeaderMenu');
    console.debug('[menuService] getHeaderMenu response:', res);

    if (res && res.success && res.data) {
      // Vì backend trả về { success: true, data: [...] } và apiRequest cũng bọc trong data
      // Chúng ta cần kiểm tra xem res.data là mảng hay là object chứa mảng
      const data = res.data as any;
      if (Array.isArray(data)) return data;
      if (data && Array.isArray(data.data)) return data.data;
    }
    return [];
  } catch (err) {
    console.error('getHeaderMenu error:', err);
    return [];
  }
};

/**
 * Build a menu tree (parents with their children) from wb_lv0008.data (Legacy)
 */
const buildMenuTree = async (lv006Flag: '0' | '1') => {
  try {
    const res = await apiRequest<any[]>('wb_lv0008', 'data');
    if (!res || !res.success) return [];
    const data = res.data as any;
    const rows: any[] = Array.isArray(data) ? data : (data && Array.isArray((data as any).data) ? (data as any).data : []);

    const items = rows.map(r => ({
      id: r.id ?? r.lv001,
      lv001: r.lv001 ?? r.id,
      lv002: r.lv002,
      lv003: r.lv003,
      lv005: r.lv005,
      lv006: (r.lv006 ?? '').toString(),
    })).filter(it => it.lv006 === lv006Flag);

    const parents = items.filter(it => !it.lv005 || it.lv005 === '0');
    return parents.map(p => {
      const children = items.filter(ch => ch.lv005 && ch.lv005.toString() === p.lv001.toString());
      return { parent: p, children };
    });
  } catch (err) {
    console.error('buildMenuTree error:', err);
    return [];
  }
};

export const getFooterMenu = async () => {
  try {
    const direct = await apiRequest<any[]>('wb_lv0008', 'getFooterMenu');
    if (direct && direct.success) {
      const data = direct.data as any;
      if (Array.isArray(data)) return data;
      if (data && Array.isArray(data.data)) return data.data;
    }
  } catch (e) { }
  return buildMenuTree('0');
};

/**
 * Lấy thông tin action từ wb_lv0001
 */
export const getActionInfo = async (action: string): Promise<ActionInfo | null> => {
  try {
    console.log('[menuService] getActionInfo -> request action:', action);
    const res = await apiRequest<ActionInfo>('wb_lv0001', 'getByAction', { action });
    console.log('[menuService] getActionInfo <- response:', res);
    if (!res || !res.success) return null;
    const data = res.data as unknown;
    if (data && typeof data === 'object' && 'action' in (data as any)) return data as ActionInfo;
    if (data && typeof data === 'object' && 'data' in (data as any) && (data as any).data) return (data as any).data as ActionInfo;
    return null;
  } catch (error) {
    console.error('Failed to fetch action info:', error);
    return null;
  }
};

/**
 * Lấy thông tin chi tiết từ wb_lv0002 - CHỈ TRẢ VỀ 1 OBJECT
 */
export const getDetailInfo = async (action?: string, lang? :string): Promise<DetailInfo | null> => {
  console.log('[menuService] getDetailInfo -> request action:', action);
  try {
    if (!action) return null;

    const res = await apiRequest<DetailInfo>('wb_lv0002', 'getDetailInfo', { action, lang });
    console.log('[menuService] getDetailInfo <- response:', res);

    // unwrap ApiResponse
    if (res && typeof res === 'object' && 'success' in res && 'data' in res) {
      const data = (res as any).data;
      // Backend trả về array, lấy phần tử đầu tiên
      if (Array.isArray(data) && data.length > 0) {
        return data[0];
      }
      return data || null;
    }
    return null;
  } catch (err) {
    console.error('getDetailInfo error:', err);
    return null;
  }
};

/**
 * Build URL for info page: /thong-tin/{actionCode}
 */
export const getInfoUrl = (actionCode: string, childAction?: string, lang?: string): string => {
  // If childAction is provided, return slug-only URL: /thong-tin/{childAction}
  const baseUrl = childAction ? `/thong-tin/${childAction}` : `/thong-tin/${actionCode}`;
  // Add lang parameter if provided
  return lang ? `${baseUrl}?lang=${lang}` : baseUrl;
};

/**
 * Lấy danh sách mục thuộc 'Chính sách' (wb_lv0001.getPolicies)
 */
export const getPolicies = async (): Promise<ActionInfo[]> => {
  try {
    const res = await apiRequest<ActionInfo[]>('wb_lv0001', 'getPolicies');
    if (!res || !res.success) return [];
    const data = res.data as unknown;
    if (Array.isArray(data)) return data as ActionInfo[];
    if (data && typeof data === 'object' && 'data' in (data as any) && Array.isArray((data as any).data)) return (data as any).data as ActionInfo[];
    return [];
  } catch (error) {
    console.error('Failed to fetch policies:', error);
    return [];
  }
};

/**
 * Lấy danh sách dịch vụ (wb_lv0001.getServices)
 */
export const getServices = async (): Promise<ActionInfo[]> => {
  try {
    const res = await apiRequest<ActionInfo[]>('wb_lv0001', 'getServices');
    if (!res || !res.success) return [];
    const data = res.data as unknown;
    if (Array.isArray(data)) return data as ActionInfo[];
    if (data && typeof data === 'object' && 'data' in (data as any) && Array.isArray((data as any).data)) return (data as any).data as ActionInfo[];
    return [];
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return [];
  }
};

export const menuService = {
  getMenuItems,
  getActionInfo,
  getDetailInfo,
  getPolicies,
  getServices,
  getInfoUrl,
  getHeaderMenu,
  getFooterMenu,
};
