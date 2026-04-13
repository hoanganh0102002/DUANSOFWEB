import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const stats = await query({ 
      query: "SELECT label, value FROM site_stats ORDER BY sort_order ASC" 
    });
    return NextResponse.json({ success: true, data: stats });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
