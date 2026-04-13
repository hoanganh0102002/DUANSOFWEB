import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const sw = await query({ query: "SELECT * FROM wb_lv0101 LIMIT 5" });
    const hw = await query({ query: "SELECT * FROM wb_lv0201 LIMIT 5" });
    const sv = await query({ query: "SELECT * FROM wb_lv0301 LIMIT 5" });
    
    return NextResponse.json({
      success: true,
      software: sw,
      hardware: hw,
      services: sv
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}
