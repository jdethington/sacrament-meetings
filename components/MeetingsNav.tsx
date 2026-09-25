"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MeetingsNav() {
  const pathname = usePathname();

  const links = [
    {
      href: "/meetings",
      label: "All Meetings",
      match: (p: string) => p === "/meetings",
    },
    {
      href: "/meetings/current",
      label: "Current Meeting",
      match: (p: string) => p === "/meetings/current",
    },
  ];

  return (
    <nav
      aria-label="Meetings"
      className="print:hidden flex flex-wrap items-center justify-center gap-2 mb-6"
    >
      {links.map((link) => {
        const isActive = link.match(pathname);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              px-4 py-2 rounded-md text-sm font-medium
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2
              ${
                isActive
                  ? "bg-gray-800 text-white shadow-sm"
                  : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
              }
            `}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
