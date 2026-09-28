import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Meeting Not Found</h1>
      <p className="mb-4">The meeting you are looking for does not exist.</p>
      <Link href="/admin/meetings" className="text-blue-500 hover:underline">
        Go back to meetings
      </Link>
    </div>
  );
}
