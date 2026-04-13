import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// API để xóa yêu cầu tư vấn hoặc người dùng
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type"); // 'contact' hoặc 'user'

    if (!id) {
      return NextResponse.json({ success: false, message: "Thiếu ID" }, { status: 400 });
    }

    if (type === "contact") {
      await query({
        query: `UPDATE contact_requests SET deleted_at = NOW() WHERE id = ?`,
        values: [id],
      });
    } else if (type === "user") {
      await query({
        query: `UPDATE users SET deleted_at = NOW() WHERE id = ? AND role != 'admin'`, // Không cho xóa admin
        values: [id],
      });
    }

    return NextResponse.json({ success: true, message: "Xóa thành công" });
  } catch (error: any) {
    console.error("[Admin DELETE] Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
