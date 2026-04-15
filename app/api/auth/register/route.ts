import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Tạo mật khẩu ngẫu nhiên 6 ký tự (có hoa, thường, số)
function generatePassword(): string {
  const upper = "ABCDEFGHJKMNPQRSTUVWXYZ";
  const lower = "abcdefghjkmnpqrstuvwxyz";
  const nums = "23456789";
  const all = upper + lower + nums;
  
  let password = "";
  // Đảm bảo ít nhất 1 ký tự mỗi loại
  password += upper.charAt(Math.floor(Math.random() * upper.length));
  password += lower.charAt(Math.floor(Math.random() * lower.length));
  password += nums.charAt(Math.floor(Math.random() * nums.length));
  
  // 3 ký tự còn lại
  for (let i = 0; i < 3; i++) {
    password += all.charAt(Math.floor(Math.random() * all.length));
  }
  
  // Trộn chuỗi (shuffle)
  return password.split('').sort(() => 0.5 - Math.random()).join('');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, fullName, phone, companyName } = body;

    // Validate required fields
    if (!email || !fullName || !phone) {
      return NextResponse.json(
        { success: false, message: "Vui lòng điền đầy đủ thông tin bắt buộc (Họ tên, Email, SĐT)" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Email không hợp lệ" },
        { status: 400 }
      );
    }

    // Validate phone format (Vietnamese phone)
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      return NextResponse.json(
        { success: false, message: "Số điện thoại không hợp lệ" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await query({
      query: "SELECT id, deleted_at FROM users WHERE email = ? LIMIT 1",
      values: [email],
    }) as any[];

    if (existingUser.length > 0) {
      if (existingUser[0].deleted_at) {
        return NextResponse.json(
          { success: false, message: "Email này đã bị khóa. Vui lòng liên hệ info@sof.vn để được hỗ trợ." },
          { status: 403 }
        );
      }
      return NextResponse.json(
        { success: false, message: "Email này đã được đăng ký. Vui lòng đăng nhập hoặc sử dụng email khác." },
        { status: 409 }
      );
    }

    // Check if phone already exists
    const existingPhone = await query({
      query: "SELECT id FROM users WHERE phone = ? LIMIT 1",
      values: [phone.replace(/\s/g, "")],
    }) as any[];

    if (existingPhone.length > 0) {
      return NextResponse.json(
        { success: false, message: "Số điện thoại này đã được đăng ký. Vui lòng sử dụng số khác." },
        { status: 409 }
      );
    }

    // Generate random password
    const password = generatePassword();

    // Ensure phone and company_name columns exist (auto-add if missing)
    try {
      // Check which columns exist
      const checkResult = await query({
        query: `
          SELECT COLUMN_NAME 
          FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE TABLE_NAME = 'users' AND TABLE_SCHEMA = DATABASE() 
          AND COLUMN_NAME IN ('phone', 'company_name', 'password')
        `
      }) as any[];
      
      const existingColumns = checkResult.map(row => row.COLUMN_NAME);
      
      if (!existingColumns.includes('phone')) {
        await query({ query: "ALTER TABLE users ADD COLUMN phone VARCHAR(20) DEFAULT NULL" });
      }
      if (!existingColumns.includes('company_name')) {
        await query({ query: "ALTER TABLE users ADD COLUMN company_name VARCHAR(255) DEFAULT NULL" });
      }
      if (!existingColumns.includes('password')) {
        await query({ query: "ALTER TABLE users ADD COLUMN password VARCHAR(255) DEFAULT NULL" });
      }
    } catch (alterError) {
      console.error("[Register] Error checking/adding columns:", alterError);
    }

    // Insert new user
    await query({
      query: `INSERT INTO users (email, name, phone, company_name, password, provider, role, status, created_at) 
              VALUES (?, ?, ?, ?, ?, 'local', 'user', 1, CURRENT_TIMESTAMP)`,
      values: [
        email,
        fullName,
        phone.replace(/\s/g, ""),
        companyName || null,
        password, // In production, should hash this password
      ],
    });

    // Log activity
    try {
      await query({
        query: `INSERT INTO user_activities (action, description, ip_address, created_at) VALUES (?, ?, ?, NOW())`,
        values: [
          "USER_REGISTER",
          `Người dùng mới đăng ký: ${fullName} (${email})`,
          request.headers.get("x-forwarded-for") || "127.0.0.1",
        ],
      });
    } catch (logError) {
      console.log("[Register] Activity log failed:", (logError as any).message);
    }

    // Gửi email mật khẩu
    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: false, // true for 465, false for other ports
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
              <h2>Chào ${fullName},</h2>
              <p>Cảm ơn bạn đã đăng ký tài khoản trải nghiệm tại hệ thống của SOF!</p>
              <p>Dưới đây là thông tin đăng nhập của bạn:</p>
              <div style="background-color: #f5f9fc; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 5px 0;"><strong>Mật khẩu:</strong> <span style="font-size: 18px; color: #3087fe; font-weight: bold; letter-spacing: 2px;">${password}</span></p>
              </div>
              <p style="color: #666; font-size: 14px;"><em>Vui lòng bảo mật mật khẩu này và thay đổi ngay sau khi đăng nhập lần đầu tiên.</em></p>
              <br/>
              <p>Trân trọng,<br/><strong>Đội ngũ SOF Solutions</strong></p>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"SOF Solutions" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "🔐 Thông tin tài khoản đăng nhập SOF",
          html: emailHtml,
        });
        
        console.log(`[Register] Email sent successfully to ${email}`);
      } else {
        console.warn("[Register] SMTP không được cấu hình. Không thể gửi email mật khẩu.");
      }
    } catch (mailError) {
      console.error("[Register] Gửi email thất bại:", mailError);
    }

    console.log(`[Register] New user registered: ${email}, password: ${password}`);

    return NextResponse.json({
      success: true,
      message: "Đăng ký thành công! Mật khẩu đã được gửi qua email.",
    });
  } catch (error: any) {
    console.error("[Register] Error:", error);
    return NextResponse.json(
      { success: false, message: `Lỗi hệ thống: ${error.message}` },
      { status: 500 }
    );
  }
}
