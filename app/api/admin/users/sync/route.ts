import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[Sync User] Received data:", body);

    const { email, name, avatar, provider, provider_id } = body;

    if (!email) {
      console.error("[Sync User] Missing email");
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    // 1. Kiểm tra nhanh xem user bị khóa không
    const userRes = await query({
      query: `SELECT id, deleted_at FROM users WHERE email = ? LIMIT 1`,
      values: [email]
    }) as any[];

    if (userRes.length > 0 && userRes[0].deleted_at) {
      return NextResponse.json({ 
        success: false, 
        message: "Tài khoản của bạn đã bị khóa. Mọi thắc mắc vui lòng liên hệ email: info@sof.vn để được hỗ trợ giải quyết." 
      }, { status: 403 });
    }

    // 2. Chạy INSERT/UPDATE song song với logic return (Fire and forget)
    query({
      query: `INSERT INTO users (email, name, avatar, provider, provider_id, role, status, last_login) 
              VALUES (?, ?, ?, ?, ?, 'user', 1, CURRENT_TIMESTAMP)
              ON DUPLICATE KEY UPDATE 
                name = VALUES(name),
                avatar = VALUES(avatar),
                provider = VALUES(provider),
                provider_id = VALUES(provider_id),
                last_login = CURRENT_TIMESTAMP`,
      values: [email, name || 'User', avatar || null, provider || 'google', provider_id || null]
    }).catch(e => console.error("Update last_login failed:", e));

    return NextResponse.json({ success: true, message: "User synced successfully" });
  } catch (error: any) {
    console.error("[Sync User API] Critical Error:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
