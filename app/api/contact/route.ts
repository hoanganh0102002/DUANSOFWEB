import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import nodemailer from "nodemailer";

// Email transporter configuration
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// Generate beautiful HTML email template for customer
function generateCustomerEmail(data: {
  fullName: string;
  phone: string;
  email?: string;
  services: string[];
  message?: string;
}) {
  const servicesList = data.services
    .map(
      (s) =>
        `<li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; color: #334155; font-size: 14px;">
          <span style="color: #2563eb; margin-right: 8px;">✦</span>${s}
        </li>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f426c 0%, #1a5b8e 50%, #2563eb 100%); padding: 40px 40px 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 8px 0; font-weight: 700;">SOF Solutions</h1>
              <p style="color: rgba(255,255,255,0.85); font-size: 14px; margin: 0;">Giải pháp công nghệ toàn diện cho doanh nghiệp</p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 40px 40px 20px 40px;">
              <h2 style="color: #0f426c; font-size: 20px; margin: 0 0 12px 0;">Xin chào ${data.fullName}! 👋</h2>
              <p style="color: #64748b; font-size: 14px; line-height: 1.7; margin: 0;">
                Cảm ơn bạn đã gửi yêu cầu tư vấn đến <strong style="color: #0f426c;">SOF Solutions</strong>. 
                Chúng tôi đã nhận được thông tin của bạn và sẽ liên hệ lại trong thời gian sớm nhất.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <hr style="border: none; border-top: 2px solid #e2e8f0; margin: 0;" />
            </td>
          </tr>

          <!-- Request Details -->
          <tr>
            <td style="padding: 30px 40px 10px 40px;">
              <h3 style="color: #0f426c; font-size: 16px; margin: 0 0 20px 0;">📋 Chi tiết yêu cầu tư vấn</h3>
              
              <!-- Info Grid -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 12px 16px; background-color: #f8fafc; border-radius: 8px 8px 0 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Họ và tên</span><br>
                    <span style="color: #1e293b; font-size: 15px; font-weight: 600;">${data.fullName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Số điện thoại</span><br>
                    <span style="color: #1e293b; font-size: 15px; font-weight: 600;">${data.phone}</span>
                  </td>
                </tr>
                ${
                  data.email
                    ? `<tr>
                  <td style="padding: 12px 16px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; border-radius: 0 0 8px 8px;">
                    <span style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</span><br>
                    <span style="color: #1e293b; font-size: 15px; font-weight: 600;">${data.email}</span>
                  </td>
                </tr>`
                    : ""
                }
              </table>

              <!-- Services -->
              <div style="margin-bottom: 20px;">
                <p style="color: #0f426c; font-size: 14px; font-weight: 600; margin: 0 0 12px 0;">🔧 Dịch vụ quan tâm:</p>
                <ul style="margin: 0; padding: 0; list-style: none; background-color: #f8fafc; border-radius: 8px; padding: 4px 16px;">
                  ${servicesList}
                </ul>
              </div>

              ${
                data.message
                  ? `
              <!-- Message -->
              <div style="margin-bottom: 10px;">
                <p style="color: #0f426c; font-size: 14px; font-weight: 600; margin: 0 0 12px 0;">💬 Nội dung tin nhắn:</p>
                <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; border-left: 4px solid #2563eb;">
                  <p style="color: #334155; font-size: 14px; line-height: 1.7; margin: 0;">${data.message}</p>
                </div>
              </div>
              `
                  : ""
              }
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 20px 40px 30px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="color: #1e40af; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">⏰ Thời gian phản hồi dự kiến</p>
                    <p style="color: #1e293b; font-size: 20px; font-weight: 700; margin: 0 0 8px 0;">Chỉ từ 5 - 10 phút</p>
                    <p style="color: #64748b; font-size: 13px; margin: 0;">Hoặc gọi ngay hotline: <a href="tel:0932518569" style="color: #2563eb; font-weight: 600; text-decoration: none;">0932 518 569</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 13px; margin: 0 0 4px 0; font-weight: 600;">SOF Solutions - Software Of Future</p>
              <p style="color: #94a3b8; font-size: 12px; margin: 0 0 4px 0;">69/9 Đường D9, Phường Tây Thạnh, TP. Hồ Chí Minh</p>
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">Email: cskh@sof.vn | Hotline: 0932 518 569</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Generate notification email for admin/staff
function generateAdminNotificationEmail(data: {
  fullName: string;
  phone: string;
  email?: string;
  services: string[];
  message?: string;
  requestId: number;
}) {
  const servicesList = data.services.map(s => `• ${s}`).join('\n');
  
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 20px; background-color: #f1f5f9; font-family: Arial, sans-serif;">
  <table width="600" cellpadding="0" cellspacing="0" style="margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
    <tr>
      <td style="background: #dc2626; padding: 20px 30px; color: white;">
        <h2 style="margin: 0;">🔔 Yêu cầu tư vấn mới #${data.requestId}</h2>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="color: #64748b; font-weight: 600; width: 140px;">Họ tên:</td>
            <td style="color: #1e293b; font-weight: 700;">${data.fullName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="color: #64748b; font-weight: 600;">Số điện thoại:</td>
            <td style="color: #2563eb; font-weight: 700;">${data.phone}</td>
          </tr>
          ${data.email ? `<tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="color: #64748b; font-weight: 600;">Email:</td>
            <td style="color: #1e293b;">${data.email}</td>
          </tr>` : ''}
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="color: #64748b; font-weight: 600; vertical-align: top;">Dịch vụ:</td>
            <td style="color: #1e293b; white-space: pre-line;">${servicesList}</td>
          </tr>
          ${data.message ? `<tr>
            <td style="color: #64748b; font-weight: 600; vertical-align: top;">Tin nhắn:</td>
            <td style="color: #1e293b;">${data.message}</td>
          </tr>` : ''}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, services, message } = body;

    // ===== BACKEND VALIDATION =====
    const errors: Record<string, string> = {};

    // Validate fullName
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      errors.fullName = "Vui lòng nhập họ và tên (tối thiểu 2 ký tự)";
    } else if (fullName.trim().length > 100) {
      errors.fullName = "Họ và tên không được vượt quá 100 ký tự";
    }

    // Validate phone
    const phoneRegex = /^(0[1-9][0-9]{8,9})$/;
    if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
      errors.phone = "Vui lòng nhập số điện thoại";
    } else if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      errors.phone = "Số điện thoại không hợp lệ (VD: 0933549469)";
    }

    // Validate email (optional but must be valid if provided)
    if (email && typeof email === "string" && email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.email = "Email không hợp lệ";
      }
    }

    // Validate services
    if (!services || !Array.isArray(services) || services.length === 0) {
      errors.services = "Vui lòng chọn ít nhất 1 dịch vụ quan tâm";
    } else if (services.length > 5) {
      errors.services = "Chỉ được chọn tối đa 5 dịch vụ";
    }

    // Return validation errors
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Vui lòng kiểm tra lại thông tin",
          errors,
        },
        { status: 400 }
      );
    }

    // ===== SAVE TO DATABASE =====
    const sanitizedName = fullName.trim();
    const sanitizedPhone = phone.replace(/\s/g, "").trim();
    const sanitizedEmail = email ? email.trim() : null;
    const sanitizedMessage = message ? message.trim() : null;
    const servicesJson = JSON.stringify(services);

    const result: any = await query({
      query: `INSERT INTO contact_requests (full_name, phone, email, services, message) VALUES (?, ?, ?, ?, ?)`,
      values: [sanitizedName, sanitizedPhone, sanitizedEmail, servicesJson, sanitizedMessage],
    });

    const requestId = result.insertId;
    console.log(`[Contact] New request saved with ID: ${requestId}`);

    // ===== SEND EMAIL & UPDATE STATUS =====
    let emailSent = false;
    let autoContacted = false;

    // Only send email if customer provided email AND SMTP is configured
    if (sanitizedEmail && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = createTransporter();
        
        // 1. Tìm tài liệu phù hợp (lấy từ cái đầu tiên trong danh sách services)
        const requestedService = services[0]; // Có thể là "Phần mềm quản lý Bãi xe Full"
        const { productDocs } = require("@/lib/emailTemplates");
        
        // Tìm kiếm thông minh: xem requestedService có chứa từ khóa trong productDocs không
        let baseDocKey = "default";
        for (const key in productDocs) {
          if (key !== "default" && requestedService.includes(key)) {
            baseDocKey = key;
            break;
          }
        }
        
        const baseDoc = productDocs[baseDocKey];
        
        // Cá nhân hóa tiêu đề và nội dung cho khớp với gói (Basic, Full, Pro)
        const customSubject = baseDocKey !== "default" 
          ? `Chào mừng bạn đến với ${requestedService} SOF`
          : baseDoc.subject;
          
        const customContent = `Chào bạn, cảm ơn bạn đã quan tâm đến **${requestedService}** của SOF. \n\n${baseDoc.content}`;

        // 2. Gửi tài liệu tự động cho khách
        await transporter.sendMail({
          from: `"SOF Solutions" <${process.env.SMTP_USER}>`,
          to: sanitizedEmail,
          subject: customSubject,
          html: generateCustomerEmail({
            fullName: sanitizedName,
            phone: sanitizedPhone,
            email: sanitizedEmail,
            services,
            message: `${customContent}\n\n--- Tin nhắn của bạn ---\n${sanitizedMessage || "(Trống)"}`,
          }),
        });

        emailSent = true;
        autoContacted = true; // Đánh dấu đã tự động gửi tài liệu
        console.log(`[Contact] Auto-docs sent to: ${sanitizedEmail} for ${primaryService}`);

        // 3. Thông báo cho Admin
        const adminEmail = process.env.ADMIN_EMAIL || "cskh@sof.vn";
        await transporter.sendMail({
          from: `"SOF Website" <${process.env.SMTP_USER}>`,
          to: adminEmail,
          subject: `🔔 MỚI: Yêu cầu tư vấn ${requestedService} #${requestId}`,
          html: generateAdminNotificationEmail({
             fullName: sanitizedName,
             phone: sanitizedPhone,
             email: sanitizedEmail,
             services,
             message: sanitizedMessage || undefined,
             requestId,
          })
        });

      } catch (emailError: any) {
        console.error("[Contact] Auto-process failed:", emailError.message);
      }

      // ===== Cập nhật DB: email_sent VÀ chuyển trạng thái sang 'contacted' (Đã liên hệ) =====
      if (emailSent) {
        await query({
          query: `UPDATE contact_requests SET email_sent = 1, status = 'contacted' WHERE id = ?`,
          values: [requestId],
        });

        // ===== LỚP PHẢN HỒI 2: TỰ ĐỘNG GỬI GIẢI PHÁP CHI TIẾT SAU 5 PHÚT =====
        // Chạy ngầm không đợi để không làm lag request của khách
        setTimeout(async () => {
          try {
            const { detailedProductSolutions } = require("@/lib/detailedSolutions");
            const solution = detailedProductSolutions[requestedService] || detailedProductSolutions[baseDocKey] || detailedProductSolutions["default"];
            const secondTransporter = createTransporter();
            
            await secondTransporter.sendMail({
              from: `"SOF Solutions" <${process.env.SMTP_USER}>`,
              to: sanitizedEmail,
              subject: solution.subject,
              html: `
                <div style="font-family: sans-serif; padding: 40px; border: 1px solid #e2e8f0; border-radius: 20px; max-width: 600px; margin: 20px auto; color: #0f172a;">
                   <h2 style="color: #3b82f6;">${solution.subject}</h2>
                   <p style="white-space: pre-line; line-height: 1.6;">${solution.content}</p>
                   <hr style="margin: 30px 0; border: none; border-top: 1px solid #f1f5f9;">
                   <p style="font-size: 12px; color: #94a3b8;">Đây là email tư vấn kỹ thuật tự động từ SOF.</p>
                </div>
              `
            });
            
            // ===== CẬP NHẬT TRẠNG THÁI SANG 'COMPLETED' (HOÀN THÀNH) SAU KHI GỬI EMAIL 2 =====
            await query({
              query: `UPDATE contact_requests SET status = 'completed' WHERE id = ?`,
              values: [requestId],
            });

            console.log(`[Contact] AUTO-COMPLETED: Request #${requestId} updated to 'completed' after 2nd email.`);
          } catch (e: any) {
            console.error("[Contact] Delayed email error:", e.message);
          }
        }, 5 * 60 * 1000); // 5 phút (300,000 ms)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Yêu cầu đã được gửi. Tài liệu tư vấn đang được gửi đến email của bạn!",
      requestId,
      emailSent,
      status: autoContacted ? 'contacted' : 'pending'
    });
  } catch (error: any) {
    console.error("[Contact API] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
