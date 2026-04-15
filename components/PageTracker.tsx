"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Chỉ track các trang của user thường, bỏ qua admin
    if (pathname && !pathname.startsWith('/admin')) {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: pathname })
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
