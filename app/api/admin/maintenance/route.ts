import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { enable, message } = await request.json();

    const mode = enable ? '1' : '0';
    
    await query({
      query: "UPDATE settings SET value = ? WHERE key_name = 'maintenance_mode'",
      values: [mode]
    });

    if (message) {
      await query({
        query: "UPDATE settings SET value = ? WHERE key_name = 'maintenance_message'",
        values: [message]
      });
    }

    // Nếu BẬT bảo trì, tiến hành gửi email
    if (enable && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const users = await query({
        query: "SELECT email, name FROM users WHERE deleted_at IS NULL AND status = 1"
      }) as any[];

      if (users.length > 0) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        // Tối ưu gửi email hàng loạt để không chờ quá lâu
        const emailPromises = users.map(user => {
          const emailHtml = `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 30px;">
              <h2 style="color: #d93025;">Thông báo Bảo trì Hệ thống</h2>
              <p>Chào ${user.name},</p>
              <p>Hệ thống SOF hiện đang bước vào đợt <strong>Bảo trì và Nâng cấp tính năng mới</strong>.</p>
              <p>Tất cả các phiên đăng nhập sẽ tạm thời bị ngắt. Quá trình bảo trì dự kiến sẽ hoàn thành trong vòng ${message || '15-30 phút'}.</p>
              <p>Cảm ơn bạn đã đồng hành và xin lỗi vì sự bất tiện này!</p>
              <br/>
              <p><strong>Ban Quản Trị SOF.VN</strong></p>
            </div>
          `;
          return transporter.sendMail({
            from: `"Thoát Tạm Thời - SOF" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: "⚠️ Thông báo Bảo trì Nâng cấp Hệ thống",
            html: emailHtml,
          }).catch(e => console.error(e));
        });

        // Không await Promise.all để request phản hồi ngay lập tức cho Admin
        Promise.all(emailPromises).catch(e => console.error("Email send batch error:", e));
      }
    }

    return NextResponse.json({ success: true, message: enable ? "Đã BẬT bảo trì và đang gửi email hàng loạt" : "Đã TẮT bảo trì" });
  } catch(e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "Lỗi cấu hình" }, { status: 500 });
  }
}
