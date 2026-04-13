import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "https://api.softech.vn";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(`${BACKEND_URL}/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Forward auth headers if present
        ...(req.headers.get("username") ? { username: req.headers.get("username")! } : {}),
        ...(req.headers.get("token") ? { token: req.headers.get("token")! } : {}),
        ...(req.headers.get("role") ? { role: req.headers.get("role")! } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Proxy error", data: [] },
      { status: 500 }
    );
  }
}
