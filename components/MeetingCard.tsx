import Link from "next/link";
import { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <div className="border rounded p-4 mb-4 bg-white shadow">
      <h2 className="text-xl font-bold mb-2">{meeting.date}</h2>
      <p className="mb-1">
        <strong>Meeting Type:</strong> {meeting.meetingType}
      </p>
      <p className="mb-1">
        <strong>Presiding:</strong> {meeting.presiding}
      </p>
      <p className="mb-1">
        <strong>Conducting:</strong> {meeting.conducting}
      </p>
      <Link
        href={`/meetings/${meeting.id}`}
        className="text-blue-500 hover:underline mt-2 inline-block"
      >
        View Details
      </Link>
    </div>
  );
}
