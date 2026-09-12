import { getMeetings } from "@/lib/meetings-db";
import { redirect } from "next/navigation";

export default async function CurrentMeetings() {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const dateString = sunday.toISOString().split("T")[0];
  // const dateString = [
  //   sunday.getFullYear(),
  //   String(sunday.getMonth() + 1).padStart(2, "0"),
  //   String(sunday.getDate()).padStart(2, "0"),
  // ].join("-");

  const meetings = getMeetings(dateString);

  if (meetings.length > 0) {
    redirect(`/meetings/${meetings[0].id}`);
  }

  redirect(`/meetings?date=${dateString}`);
}
