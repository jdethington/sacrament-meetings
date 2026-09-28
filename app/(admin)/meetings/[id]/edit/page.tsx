import { notFound } from "next/navigation";
import { getMeetingById } from "@/lib/meetings-db";
import { updateMeeting } from "@/lib/actions";
import MeetingForm from "@/components/MeetingForm";

export default async function EditMeetingPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }

  // Bind id first; useActionState will pass (prevState, formData)
  const updateMeetingWithId = updateMeeting.bind(null, id);

  return (
    <section className="min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Meeting</h1>
      <MeetingForm
        action={updateMeetingWithId}
        meeting={meeting}
        submitLabel="Update Meeting"
      />
    </section>
  );
}
