import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = 'force-dynamic';

// GET: Lấy tin nhắn của một session
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get("session_id");

    if (!session_id) {
      return NextResponse.json({ success: false, error: "Missing session_id" }, { status: 400 });
    }

    const messages = await query({
      query: "SELECT * FROM chat_messages WHERE session_id = ? ORDER BY created_at ASC",
      values: [session_id]
    });

    return NextResponse.json({ success: true, data: messages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Gửi tin nhắn mới
export async function POST(req: Request) {
  try {
    const { session_id, sender_type, message } = await req.json();

    if (!session_id || !sender_type || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Lưu tin nhắn
    await query({
      query: "INSERT INTO chat_messages (session_id, sender_type, message) VALUES (?, ?, ?)",
      values: [session_id, sender_type, message]
    });

    // Cập nhật thời gian tin nhắn cuối cùng trong session
    await query({
      query: "UPDATE chat_sessions SET last_message_at = CURRENT_TIMESTAMP WHERE id = ?",
      values: [session_id]
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: Xóa toàn bộ tin nhắn của một session
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get("session_id");

    if (!session_id) {
       return NextResponse.json({ success: false, error: "Missing session_id" }, { status: 400 });
    }

    await query({
      query: "DELETE FROM chat_messages WHERE session_id = ?",
      values: [session_id]
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
