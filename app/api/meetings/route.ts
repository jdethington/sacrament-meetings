import { NextRequest, NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";

// GET /api/meetings
// GET /api/meetings?date=YYYY-MM-DD
export async function GET(request: NextRequest) {
  const date = new URL(request.url).searchParams.get("date"); // for example, "2026-09-13" or null
  const meetings = getMeetings(date);
  return NextResponse.json(meetings);
}

//     const { searchParams } = new URL(request.url);
//     const date = searchParams.get("date");
//     const meetings = getMeetings(date);
//     return NextResponse.json(meetings);
// }
