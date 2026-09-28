import { getMeetingByDate } from "@/lib/meetings-db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CurrentMeetings() {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  // Local YYYY-MM-DD (avoid UTC shift from toISOString)
  const y = sunday.getFullYear();
  const m = String(sunday.getMonth() + 1).padStart(2, "0");
  const d = String(sunday.getDate()).padStart(2, "0");
  const dateString = `${y}-${m}-${d}`;

  const meeting = await getMeetingByDate(dateString);

  if (meeting) {
    redirect(`/meetings/${meeting.id}`);
  }

  redirect(`/meetings?date=${dateString}`);
}
