import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Tạo mật khẩu ngẫu nhiên 8 ký tự
function generatePassword(): string {
  const upper = "ABCDEFGHJKMNPQRSTUVWXYZ";
  const lower = "abcdefghjkmnpqrstuvwxyz";
  const nums = "23456789";
  const all = upper + lower + nums;
  
  let password = "";
  password += upper.charAt(Math.floor(Math.random() * upper.length));
  password += lower.charAt(Math.floor(Math.random() * lower.length));
  password += nums.charAt(Math.floor(Math.random() * nums.length));
  
  for (let i = 0; i < 5; i++) {
    password += all.charAt(Math.floor(Math.random() * all.length));
  }
  
  return password.split('').sort(() => 0.5 - Math.random()).join('');
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Vui lòng nhập địa chỉ email" },
        { status: 400 }
      );
    }

    // Kiểm tra user có tồn tại
    const users = await query({
      query: "SELECT id, name, provider FROM users WHERE email = ? AND deleted_at IS NULL LIMIT 1",
      values: [email],
    }) as any[];

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: "Email này không tồn tại trong hệ thống." },
        { status: 404 }
      );
    }

    if (users[0].provider === "google" || users[0].provider === "facebook") {
        const providerName = users[0].provider === "google" ? "Google" : "Facebook";
        return NextResponse.json(
            { success: false, message: `Tài khoản này đăng nhập bằng Google/Facebook. Vui lòng đăng nhập qua phương thức đó.` },
            { status: 400 }
        );
    }

    // Sinh mã OTP 6 số
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60000); // 15 phút

    // Lưu OTP
    await query({
      query: "INSERT INTO password_resets (email, otp, expires_at) VALUES (?, ?, ?)",
      values: [email, otp, expiresAt],
    });

    // Gửi email OTP
    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0f426c; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">SOF.COM.VN</h1>
            </div>
            <div style="padding: 30px;">
              <h2>Chào ${users[0].name},</h2>
              <p>Bạn vừa yêu cầu cấp lại mật khẩu cho tài khoản.</p>
              <p>Dưới đây là mã xác thực (OTP) của bạn. Mã này có hiệu lực trong 15 phút:</p>
              <div style="background-color: #f5f9fc; padding: 15px; border-radius: 6px; margin: 20px 0; text-align: center;">
                <div style="font-size: 32px; color: #3087fe; font-weight: bold; letter-spacing: 5px; margin: 10px 0;">${otp}</div>
              </div>
              <p style="color: #666; font-size: 14px;"><em>Không chia sẻ mã này cho bất kỳ ai.</em></p>
              <br/>
              <p>Trân trọng,<br/><strong>Đội ngũ SOF</strong></p>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"SOF Solutions" <${process.env.SMTP_USER}>`,
          to: email,
          subject: `🔑 Mã xác thực của bạn: ${otp}`,
          html: emailHtml,
        });
      }
    } catch (mailError) {
      console.error("[Forgot Password] Email failed:", mailError);
    }

    return NextResponse.json({
      success: true,
      message: "Mã OTP đã được gửi vào email của bạn.",
    });
  } catch (error: any) {
    console.error("[Forgot Password] Error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi hệ thống, vui lòng thử lại sau" },
      { status: 500 }
    );
  }
}
