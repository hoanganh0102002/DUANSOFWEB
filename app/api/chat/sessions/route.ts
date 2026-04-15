import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = 'force-dynamic';

// GET: Lấy danh sách sessions (cho admin)
export async function GET() {
  try {
    const sessions = await query({
      query: `SELECT * FROM chat_sessions ORDER BY last_message_at DESC`,
    });
    return NextResponse.json({ success: true, data: sessions });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Tạo session mới (cho visitor)
export async function POST(req: Request) {
  try {
    const { visitor_id, name, email } = await req.json();
    
    // Kiểm tra xem visitor này đã có session active chưa
    const existing = await query({
      query: "SELECT * FROM chat_sessions WHERE visitor_id = ? AND status = 'active' LIMIT 1",
      values: [visitor_id]
    }) as any[];

    if (existing.length > 0) {
      return NextResponse.json({ success: true, data: existing[0] });
    }

    const result = await query({
      query: "INSERT INTO chat_sessions (visitor_id, name, email) VALUES (?, ?, ?)",
      values: [visitor_id, name || 'Khách', email || null]
    }) as any;

    const newSession = {
      id: result.insertId,
      visitor_id,
      name: name || 'Khách',
      email: email || null,
      status: 'active'
    };

    return NextResponse.json({ success: true, data: newSession });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
