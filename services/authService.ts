import { apiRequest } from "./apiClient";

export const authService = {
  login: async (email: string, pass: string): Promise<any> => {
    try {
      // Gọi trực tiếp đến API admin thật để kiểm tra mật khẩu THU@1982
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass })
      });
      
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e);
      return { success: false, message: "Lỗi kết nối máy chủ" };
    }
  },
  loginWithGoogle: async (userInfo: any): Promise<any> => {
    try {
      // 1. Chạy SONG SONG các tác vụ để tăng tốc độ tối đa
      const [syncRes, apiRes] = await Promise.all([
        fetch("/api/admin/users/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userInfo.email,
            name: userInfo.name,
            avatar: userInfo.picture,
            provider: "google",
            provider_id: userInfo.sub
          })
        }),
        // Vẫn gọi backend cũ nếu cần (nhưng chạy song song luôn)
        apiRequest("users", "google_login", {
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
          google_id: userInfo.sub
        }).catch(e => console.warn("Legacy backend login failed, continuing anyway...", e))
      ]);

      const syncData = await syncRes.json();
      
      // Nếu sync chặn tài khoản (bị khóa) thì mới dừng lại
      if (!syncData.success) {
        return { success: false, message: syncData.message || "Tài khoản của bạn tạm thời không khả dụng." };
      }

      return { 
        success: true, 
        data: { 
          username: userInfo.email, 
          name: userInfo.name, 
          role: "user", 
          email: userInfo.email 
        } 
      };
    } catch (e) {
      console.error(e);
      return { success: false, message: "Lỗi đồng bộ tài khoản Google" };
    }
  },
  loginWithFacebook: async (token: string): Promise<any> => {
    return { 
      success: true, 
      message: "Đăng nhập thành công",
      data: { username: "fb_user", name: "Facebook User", token: "mock_token", role: "user", email: "facebook@gmail.com" } 
    };
  },
  register: async (data: any): Promise<any> => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return result;
    } catch (e) {
      console.error(e);
      return { success: false, message: "Lỗi kết nối máy chủ" };
    }
  },
  forgotPassword: async (email: string): Promise<any> => {
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      return result;
    } catch (e) {
      console.error(e);
      return { success: false, message: "Lỗi kết nối máy chủ" };
    }
  }
};
