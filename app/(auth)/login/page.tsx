import { LoginForm } from "@/components/AuthForm";
export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <LoginForm />
      <p className="mt-3 text-sm">No account? <a className="underline" href="/signup">Create one</a>.</p>
    </div>
  );
}
