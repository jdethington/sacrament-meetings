// app/(public)/meetings/[id]/page.tsx
import MeetingDetails from "@/components/MeetingDetails";
import PrintButton from "@/components/PrintButton";
import { getMeetingById } from "@/lib/meetings-db";

export default async function MeetingIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  if (Number.isNaN(id)) {
    return <p className="p-8 text-center">Invalid meeting ID.</p>;
  }

  const meeting = await getMeetingById(id);

  if (!meeting) {
    return <p className="p-8 text-center">Meeting not found.</p>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen py-8 px-4 bg-slate-100 print:min-h-0 print:h-auto print:py-0 print:px-0 print:bg-white">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-4 print:max-w-none print:gap-0">
        <div className="flex justify-end print:hidden">
          <PrintButton />
        </div>
        <MeetingDetails meeting={meeting} />
      </div>
    </div>
  );
}
