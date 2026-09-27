import { NextRequest, NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

// GET /api/meetings/:id
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: meetingId } = await params;
  const id = Number(meetingId);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid meeting ID" }, { status: 400 });
  }
  const meeting = await getMeetingById(id);
  if (!meeting) {
    return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
  }
  return NextResponse.json(meeting, { status: 200 });
}
