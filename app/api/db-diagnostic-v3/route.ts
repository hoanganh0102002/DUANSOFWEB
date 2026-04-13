import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const tables: any = await query({ query: "SHOW TABLES" });
    const tableCounts = [];
    
    for (const t of tables) {
      const tableName = Object.values(t)[0] as string;
      if (tableName.startsWith('wb_lv0')) {
        try {
          const count: any = await query({ query: `SELECT COUNT(*) as c FROM ${tableName}` });
          if (count[0].c >= 1) {
            const sample: any = await query({ query: `SELECT * FROM ${tableName} LIMIT 1` });
            tableCounts.push({ name: tableName, count: count[0].c, sample: sample[0] });
          }
        } catch (e) {}
      }
    }
    
    return NextResponse.json({
      success: true,
      tables: tableCounts
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}
