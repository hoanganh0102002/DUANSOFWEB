const API_BASE = "/api/proxy";

async function apiFetch(body: Record<string, unknown>) {
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (err) {
    console.error("menuService apiFetch error", err);
    return { success: false, data: [] };
  }
}

export function getInfoUrl(action: string, slug: string, lang: string = "vi"): string {
  const s = slug || action || "";
  if (!s) return "#";
  return `/thong-tin/${s}`;
}

export const menuService = {
  /** Lấy danh sách dịch vụ */
  async getServices(): Promise<any[]> {
    const json = await apiFetch({ table: "wb_lv0501", func: "getServices" });
    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }
    return [];
  },

  /** Lấy thông tin action cụ thể (VD: tuyen-dung) */
  async getActionInfo(action: string): Promise<any | null> {
    const json = await apiFetch({ table: "wb_lv0501", func: "getActionInfo", action });
    if (json.success && json.data) {
      return json.data;
    }
    return null;
  },

  /** Lấy menu footer (parents + children) */
  async getFooterMenu(): Promise<any[]> {
    const json = await apiFetch({ table: "wb_lv0501", func: "getFooterMenu" });
    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }
    return [];
  },
};
