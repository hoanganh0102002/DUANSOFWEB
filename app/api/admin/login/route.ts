import { NextResponse } from "next/server";

// Admin credentials - in production, store hashed in DB
const ADMIN_EMAIL = "admin@sof.com.vn";
const ADMIN_PASSWORD = "THU@1982";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Vui lòng nhập email và mật khẩu" },
        { status: 400 }
      );
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Generate a simple admin token (in production, use JWT)
      const adminToken = Buffer.from(`${ADMIN_EMAIL}:${Date.now()}`).toString("base64");

      return NextResponse.json({
        success: true,
        message: "Đăng nhập Admin thành công!",
        data: {
          username: "admin",
          name: "SOF Administrator",
          email: ADMIN_EMAIL,
          role: "admin",
          token: adminToken,
        },
      });
    }

    return NextResponse.json(
      { success: false, message: "Email hoặc mật khẩu không đúng!" },
      { status: 401 }
    );
  } catch (error: any) {
    console.error("[Admin Login] Error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi hệ thống" },
      { status: 500 }
    );
  }
}
