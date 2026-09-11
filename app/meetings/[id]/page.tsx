import MeetingDetails from "@/components/MeetingDetails";
// import { SacramentMeeting } from "@/lib/types";
import { getMeetingById } from "@/lib/meetings-db";

export default async function MeetingsId({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // const { id } = await params;
  const id = Number((await params).id);
  if (Number.isNaN(id)) {
    throw new Error("Invalid meeting ID");
  }
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/meetings/${id}`,
  // );
  // const sMeeting: SacramentMeeting = await response.json();

  const sMeeting = getMeetingById(id);

  if (!sMeeting) {
    return <p>Meeting not found.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <MeetingDetails meeting={sMeeting} />
    </div>
  );
}
