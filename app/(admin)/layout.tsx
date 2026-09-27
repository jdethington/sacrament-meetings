export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      {children}
    </section>
  );
}
