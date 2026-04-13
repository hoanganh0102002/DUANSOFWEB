import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const products = await query({ 
      query: "SELECT id, name as title, slug, category as tab, description as desc, image_url as img FROM site_products WHERE is_active = 1 ORDER BY id DESC" 
    });
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
