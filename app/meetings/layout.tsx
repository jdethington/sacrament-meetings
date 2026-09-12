import Link from "next/link";

export default function MeetingsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-2">
      <nav className="mb-4">
        <Link href="/meetings" className="mr-4 text-blue-500 hover:underline">
          All Meetings
        </Link>
        <Link
          href="/meetings/current"
          className="mr-4 text-blue-500 hover:underline"
        >
          Current Meeting
        </Link>
      </nav>
      {children}
    </section>
  );
}
