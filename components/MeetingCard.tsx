import Link from "next/link";
import { SacramentMeeting } from "@/lib/types";
import DeleteMeetingButton from "@/components/DeleteMeetingButton";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <div className="border rounded p-4 mb-4 bg-white shadow flex flex-col">
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

      <div className="mt-auto pt-4 flex flex-wrap gap-3 items-center">
        <Link
          href={`/meetings/${meeting.id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          View Details
        </Link>
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded"
        >
          Edit
        </Link>
        <DeleteMeetingButton id={String(meeting.id)} />
      </div>
    </div>
  );
}
