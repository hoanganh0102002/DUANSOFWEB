import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "Vui lòng cung cấp email và mã OTP" },
        { status: 400 }
      );
    }

    // Kiểm tra OTP hợp lệ
    const resets = await query({
      query: "SELECT id FROM password_resets WHERE email = ? AND otp = ? AND expires_at > NOW() ORDER BY id DESC LIMIT 1",
      values: [email, otp],
    }) as any[];

    if (resets.length === 0) {
      return NextResponse.json(
        { success: false, message: "Mã OTP không đúng hoặc đã hết hạn." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Mã OTP hợp lệ",
    });
  } catch (error: any) {
    console.error("[Verify OTP] Error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi hệ thống, vui lòng thử lại sau" },
      { status: 500 }
    );
  }
}
