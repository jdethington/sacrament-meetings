"use client";

import { deleteMeeting } from "@/lib/actions";

export default function DeleteMeetingButton({ id }: { id: string }) {
  return (
    <form
      action={deleteMeeting.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm("Delete this meeting? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="text-sm text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded"
      >
        Delete
      </button>
    </form>
  );
}
