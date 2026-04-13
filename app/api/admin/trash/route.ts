import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Lấy đồng thời cả contact và user bị xóa
    const deletedContacts = await query({
      query: `SELECT *, 'contact' as type FROM contact_requests WHERE deleted_at IS NULL = false ORDER BY deleted_at DESC`,
    });

    const deletedUsers = await query({
      query: `SELECT *, 'user' as type FROM users WHERE deleted_at IS NULL = false ORDER BY deleted_at DESC`,
    });

    return NextResponse.json({ 
      success: true, 
      data: {
        contacts: deletedContacts,
        users: deletedUsers
      } 
    });
  } catch (error: any) {
    console.error("[Admin Trash] Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
