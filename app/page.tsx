// import Image from "next/image";
import MeetingCard from "@/components/MeetingCard";
import { getMeetings } from "@/lib/meetings-db";

export default function Home() {
  const meetings = getMeetings();
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + ((7 - dayOfWeek) % 7)); // Calculate next Sunday

  // Find the next meeting after today
  const nextMeeting = meetings.find(
    (meeting) => new Date(meeting.date) >= today,
  );

  if (!nextMeeting) {
    return (
      <div className="">
        <main className="">
          <h2>No upcoming meetings found.</h2>
        </main>
        <p className="">Please check back later for updates.</p>
      </div>
    );
  }

  return (
    <div className="">
      <main className="">
        <h2>Welcome to the Catalina Ward Sacrament Meeting page.</h2>
        <MeetingCard meeting={nextMeeting} />
      </main>
    </div>
  );
}
