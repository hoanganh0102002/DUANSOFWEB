import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" });
    }

    // Lấy thông tin người dùng thật từ Database
    const results = await query({ 
      query: "SELECT * FROM users WHERE email = ? AND deleted_at IS NULL",
      values: [email]
    }) as any[];

    if (results.length === 0) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    const user = results[0];

    // Lấy thêm lịch sử yêu cầu (Contact Requests) của người dùng này
    const activities = await query({ 
      query: "SELECT * FROM contact_requests WHERE email = ? ORDER BY created_at DESC LIMIT 5",
      values: [email]
    }) as any[];

    return NextResponse.json({ 
      success: true, 
      data: {
        ...user,
        activities: activities
      } 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
