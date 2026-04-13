import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    // 1. Lấy thông tin cơ bản của sản phẩm
    const productResults = await query({ 
      query: "SELECT * FROM site_products WHERE slug = ? AND is_active = 1",
      values: [slug]
    }) as any[];

    if (productResults.length === 0) {
      return NextResponse.json({ success: false, message: "Product not found" });
    }

    const product = productResults[0];

    // 2. Lấy thông số kỹ thuật (Specs)
    const specs = await query({ 
      query: "SELECT label, value, is_bold FROM product_specs WHERE product_slug = ? ORDER BY sort_order ASC",
      values: [slug]
    }) as any[];

    // 3. Lấy mô tả chi tiết (Description Sections)
    const descriptions = await query({ 
      query: "SELECT heading, content as text, is_bold, heading_color as headingColor FROM product_descriptions WHERE product_slug = ? ORDER BY sort_order ASC",
      values: [slug]
    }) as any[];

    // Gom nhóm description theo heading (Nếu cần cấu trúc lồng nhau của Frontend)
    const formattedDesc = descriptions.map(d => ({
        heading: d.heading,
        headingColor: d.headingColor,
        lines: [{ text: d.text, bold: d.is_bold === 1 }]
    }));

    // 4. Lấy album ảnh (Images)
    const images = await query({ 
      query: "SELECT image_url FROM product_images WHERE product_slug = ? ORDER BY sort_order ASC",
      values: [slug]
    }) as any[];

    const finalProduct = {
      ...product,
      images: images.length > 0 ? images.map(img => img.image_url) : [product.image_url],
      specs: specs.map(s => ({ ...s, bold: s.is_bold === 1 })),
      description: formattedDesc,
      badges: JSON.parse(product.badges || "[]")
    };

    return NextResponse.json({ success: true, data: finalProduct });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
