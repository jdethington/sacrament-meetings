import MeetingDetails from "@/components/MeetingDetails";
import { SacramentMeeting } from "@/lib/types";

export default async function MeetingsId({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/meetings/${id}`,
  );
  const sMeeting: SacramentMeeting = await response.json();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <MeetingDetails meeting={sMeeting} />
    </div>
  );
}
