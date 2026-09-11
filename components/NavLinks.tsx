"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
    const pathname = usePathname();
    const links = [
      { href: "/", label: "Home" },
      { href: "/meetings", label: "Meetings" },
    ];
    
  return (
    <nav aria-label="primary" className="flex gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={
            pathname === link.href
              ? "text-white bg-blue-500 px-2"
              : "text-white hover:bg-blue-500 px-2"
          }
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
