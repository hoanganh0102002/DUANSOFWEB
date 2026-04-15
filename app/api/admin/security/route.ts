import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // 1. Get latest alerts
    const alerts = await query({ 
      query: "SELECT * FROM security_alerts ORDER BY created_at DESC LIMIT 20" 
    });

    // 2. Get stats
    const statsResult = await query({
      query: "SELECT (SELECT COUNT(*) FROM blocked_ips WHERE expires_at > NOW() OR expires_at IS NULL) as blocked_ips_count, (SELECT COUNT(*) FROM security_alerts WHERE type = 'BRUTE_FORCE' AND created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)) as failed_logins_24h"
    }) as any[];

    return NextResponse.json({
      success: true,
      data: {
        alerts: alerts,
        stats: (statsResult && statsResult.length > 0) ? statsResult[0] : { blocked_ips_count: 0, failed_logins_24h: 0 }
      }
    });

  } catch (error) {
    console.error("[Security API] Error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
