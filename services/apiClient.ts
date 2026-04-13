const API_BASE = "/api/proxy";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Generic API request helper
 */
export async function apiRequest<T>(
  table: string,
  func: string,
  params: Record<string, any> = {}
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table, func, ...params }),
    });

    if (!res.ok) {
      console.warn(`[apiClient] HTTP error! status: ${res.status}`);
      return {
        success: false,
        data: null as any,
        message: `HTTP error! status: ${res.status}`
      };
    }

    return await res.json();
  } catch (error) {
    console.error(`[apiClient] apiRequest error (${table}.${func}):`, error);
    return {
      success: false,
      data: null as any,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
