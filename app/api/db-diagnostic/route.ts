import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const list: any = await query({ query: "SELECT * FROM wb_lv0501" });
    const count = list.length;
    const columns: any = await query({ query: "SHOW COLUMNS FROM wb_lv0501" });
    const tables: any = await query({ query: "SHOW TABLES" });
    
    return NextResponse.json({
      success: true,
      count,
      tables,
      columns,
      list
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}
