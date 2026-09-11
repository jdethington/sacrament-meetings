import MeetingCard from "@/components/MeetingCard";
import { SacramentMeeting } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function MeetingsPage() {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/meetings`;
  console.log("API URL:", apiUrl); // Log the API URL for debugging
  const response = await fetch(apiUrl);
  const responseText = await response.text();
  console.log("API Response:", responseText.substring(0, 500)); // Log the response body for debugging
  console.log("API Status:", response.status); // Log the response status for debugging
  console.log("API content-type:", response.headers.get("content-type")); // Log the content type for debugging
  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}\n${text}`,
    );
  }
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/meetings`,
  // );
  const meetings: SacramentMeeting[] = await response.json();
  const sortedMeetings = meetings.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Upcoming Sacrament Meetings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMeetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </section>
  );
}
