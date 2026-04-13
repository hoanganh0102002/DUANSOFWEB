import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const tables = await query({ query: "SHOW TABLES" }) as any[];
    const result: any = {};

    for (const tableObj of tables) {
      const tableName = Object.values(tableObj)[0] as string;
      const columns = await query({ query: `DESCRIBE ${tableName}` });
      result[tableName] = columns;
    }

    return NextResponse.json({ success: true, tables: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
