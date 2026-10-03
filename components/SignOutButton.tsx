// components/SignOutButton.tsx
import { signOut } from "@/auth";

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="text-sm text-slate-700 underline hover:text-slate-900"
      >
        Sign out
      </button>
    </form>
  );
}
