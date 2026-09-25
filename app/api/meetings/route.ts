import { NextRequest, NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";

// GET /api/meetings
// GET /api/meetings?date=YYYY-MM-DD
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") ?? "";
  const page = Number(searchParams.get("page") ?? "1");

  const meetings = await getMeetings(query, page);
  return NextResponse.json(meetings, { status: 200 });
}
