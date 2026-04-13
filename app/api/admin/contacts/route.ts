import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = 'force-dynamic';

// GET: Fetch all contact requests
export async function GET() {
  try {
    const contacts = await query({
      query: `SELECT * FROM contact_requests WHERE deleted_at IS NULL ORDER BY created_at DESC`,
    });

    return NextResponse.json({ success: true, data: contacts });
  } catch (error: any) {
    console.error("[Admin Contacts] Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update contact request status
export async function PUT(request: Request) {
  try {
    const { id, status, note } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Thiếu thông tin cập nhật" },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "contacted", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Trạng thái không hợp lệ" },
        { status: 400 }
      );
    }

    await query({
      query: `UPDATE contact_requests SET status = ? WHERE id = ?`,
      values: [status, id],
    });

    return NextResponse.json({
      success: true,
      message: "Cập nhật trạng thái thành công!",
    });
  } catch (error: any) {
    console.error("[Admin Contacts Update] Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete a contact request
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Thiếu ID" },
        { status: 400 }
      );
    }

    await query({
      query: `DELETE FROM contact_requests WHERE id = ?`,
      values: [parseInt(id)],
    });

    return NextResponse.json({
      success: true,
      message: "Đã xóa yêu cầu tư vấn!",
    });
  } catch (error: any) {
    console.error("[Admin Contacts Delete] Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
