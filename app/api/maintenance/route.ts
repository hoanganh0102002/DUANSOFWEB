import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const settings = await query({
      query: "SELECT key_name, value FROM settings WHERE key_name IN ('maintenance_mode', 'maintenance_message')"
    }) as any[];

    let mode = false;
    let message = "Chúng tôi đang bảo trì hệ thống. Vui lòng quay lại sau.";
    
    for (const row of settings) {
      if (row.key_name === 'maintenance_mode' && row.value === '1') {
        mode = true;
      }
      if (row.key_name === 'maintenance_message' && row.value) {
        message = row.value;
      }
    }

    return NextResponse.json({ maintenance: mode, message });
  } catch(e) {
    return NextResponse.json({ maintenance: false, message: "" });
  }
}
