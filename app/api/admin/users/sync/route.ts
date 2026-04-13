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

    // Kiểm tra user đã tồn tại chưa (bao gồm cả user đã xóa)
    const existingUserRes = await query({
      query: `SELECT id, deleted_at FROM users WHERE email = ?`,
      values: [email]
    }) as any[];

    if (existingUserRes.length > 0) {
      const user = existingUserRes[0];
      
      // NẾU USER ĐÃ BỊ XÓA -> KHÓA NGAY
      if (user.deleted_at) {
        return NextResponse.json({ 
          success: false, 
          message: "Tài khoản của bạn đã bị khóa. Mọi thắc mắc vui lòng liên hệ email: info@sof.vn để được hỗ trợ giải quyết." 
        }, { status: 403 });
      }

      console.log(`[Sync User] Updating existing user: ${email}`);
      await query({
        query: `UPDATE users SET 
                  name = ?, 
                  avatar = ?, 
                  last_login = CURRENT_TIMESTAMP,
                  provider = ?,
                  provider_id = ?
                WHERE email = ?`,
        values: [name || 'User', avatar || null, provider || 'google', provider_id || null, email]
      });
    } else {
      console.log(`[Sync User] Creating new user: ${email}`);
      await query({
        query: `INSERT INTO users (email, name, avatar, provider, provider_id, role, status) 
                VALUES (?, ?, ?, ?, ?, 'user', 1)`,
        values: [email, name || 'User', avatar || null, provider || 'google', provider_id || null]
      });
    }

    return NextResponse.json({ success: true, message: "User synced successfully" });
  } catch (error: any) {
    console.error("[Sync User API] Critical Error:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
