// components/SignOutButton.tsx
"use client";

import { signOut } from "next-auth/react";

type SignOutButtonProps = {
  className?: string;
};

export default function SignOutButton({ className }: SignOutButtonProps) {
  return (
    <button
      type="button"
      onClick={() => void signOut({ redirectTo: "/" })}
      className={className}
    >
      Sign Out
    </button>
  );
}
