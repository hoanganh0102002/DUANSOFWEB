import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { id, type } = await request.json(); // id: number, type: 'contact' | 'user'

    if (!id || !type) {
      return NextResponse.json({ success: false, message: "Thiếu thông tin khôi phục" }, { status: 400 });
    }

    if (type === "contact") {
      await query({
        query: `UPDATE contact_requests SET deleted_at = NULL WHERE id = ?`,
        values: [id],
      });
    } else if (type === "user") {
      await query({
        query: `UPDATE users SET deleted_at = NULL WHERE id = ?`,
        values: [id],
      });
    }

    return NextResponse.json({ success: true, message: "Khôi phục thành công" });
  } catch (error: any) {
    console.error("[Admin Restore] Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
