// components/NavLinks.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";

type NavLinksProps = {
  isLoggedIn: boolean;
};

export default function NavLinks({ isLoggedIn }: NavLinksProps) {
  const pathname = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "Meetings", href: "/meetings" },
    { label: "Current Meeting", href: "/meetings/current" },
  ];

  const linkClass = (isActive: boolean) => `
    px-4 py-2 rounded-md text-sm font-medium
    transition-colors duration-150
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80
    focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800
    ${
      isActive
        ? "bg-white text-gray-900 shadow-sm"
        : "text-gray-200 hover:bg-white/15 hover:text-white"
    }
  `;

  return (
    <nav
      aria-label="Primary"
      className="flex flex-wrap items-center justify-center gap-2 mt-1"
    >
      {links.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname === link.href || pathname.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={linkClass(isActive)}
          >
            {link.label}
          </Link>
        );
      })}

      {isLoggedIn ? (
        <SignOutButton className={linkClass(false)} />
      ) : (
        <Link href="/login" className={linkClass(pathname === "/login")}>
          Login
        </Link>
      )}
    </nav>
  );
}
