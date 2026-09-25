import { Suspense } from "react";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";
import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";

export const dynamic = "force-dynamic";

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <section className="flex flex-col items-center min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold mb-6">Upcoming Sacrament Meetings</h1>

      <div className="w-full max-w-md mb-8">
        <Suspense
          fallback={<div className="h-10 bg-gray-100 rounded animate-pulse" />}
        >
          <MeetingSearch />
        </Suspense>
      </div>

      {meetings.length === 0 ? (
        <p className="text-gray-600">No meetings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      <Suspense fallback={null}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </section>
  );
}
