import { redirect } from "next/navigation";

export default async function CurrentMeetings() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + ((7 - dayOfWeek) % 7)); // Calculate next Sunday

  redirect(`/meetings?date=${nextSunday.toISOString().split("T")[0]}`);
}
