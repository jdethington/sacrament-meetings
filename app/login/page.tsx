// app/login/page.tsx
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Sign In",
  description: "Sign in to manage sacrament meeting schedules.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">Bishopric Sign In</h1>
        <LoginForm />
      </div>
    </main>
  );
}
