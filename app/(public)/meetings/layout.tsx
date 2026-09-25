import MeetingsNav from "@/components/MeetingsNav";

export default function MeetingsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="flex flex-col items-center w-full min-h-screen py-6 print:min-h-0 print:py-0">
      <MeetingsNav />
      {children}
    </section>
  );
}
