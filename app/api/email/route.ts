import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const MAIL_API_URL = process.env.NEXT_PUBLIC_MAIL_API_URL || 'http://192.168.1.20/erpdung-hao/services/erpv1/services.sof.vn/index.php';
        const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

        console.log(`[Mail API] Proxying request to: ${MAIL_API_URL}`);
        console.log(`[Mail API] Request body:`, JSON.stringify(body));

        const response = await fetch(MAIL_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(API_TOKEN ? { "X-SOF-USER-TOKEN": API_TOKEN } : {}),
            },
            body: JSON.stringify(body),
        });

        const text = await response.text();
        console.log(`[Mail API] Response status: ${response.status}`);
        console.log(`[Mail API] Raw response: ${text.substring(0, 500)}`);

        // Handle sendMail response - API returns text like "Thành công gửi! Email:xxx"
        if (body.func === 'sendMail') {
            const isSuccess = text.includes('Thành công') || text.toLowerCase().includes('success');
            return NextResponse.json({
                success: isSuccess,
                message: isSuccess ? 'Email sent successfully' : 'Email sending failed',
                raw: text.substring(0, 500)
            });
        }

        // Handle log insert response - try to parse as JSON first
        try {
            const data = JSON.parse(text);
            return NextResponse.json(data);
        } catch (e) {
            // If not JSON, return parsed response
            return NextResponse.json({
                success: response.ok,
                message: "Mail API response parsed as text",
                raw: text.substring(0, 500)
            });
        }
    } catch (error: any) {
        console.error("[Mail API] Proxy Error:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
