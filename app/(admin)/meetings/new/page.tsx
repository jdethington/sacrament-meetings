// Create Meeting -- Coming in Week 04
import { createMeeting } from "@/lib/actions";
import MeetingForm from "@/components/MeetingForm";

export default function NewMeetingPage() {
  return (
    <section className="min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Create Meeting</h1>
      <MeetingForm action={createMeeting} submitLabel="Save Meeting" />
    </section>
  );
}