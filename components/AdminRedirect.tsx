"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    const adminData = localStorage.getItem("sof_admin");
    const userData = localStorage.getItem("sof_user");

    // Nếu đang giữ session Admin thì tự động bắt quay lại trang Admin Dashboard khi vào trang chủ
    if (adminData) {
      router.replace("/admin");
    } else if (userData) {
      // Đề phòng trường hợp userData có role admin nhưng bị sót
      try {
        const u = JSON.parse(userData);
        if (u && (u.role === "admin" || u.username === "admin" || u.name?.toLowerCase().includes("admin"))) {
          router.replace("/admin");
        }
      } catch (e) {
        // Lỗi parse json thì thôi
      }
    }
  }, [router]);

  return null;
}
