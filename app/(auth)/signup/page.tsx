import { SignupForm } from "@/components/AuthForm";
export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Create your account</h1>
      <SignupForm />
      <p className="mt-3 text-sm">Already have an account? <a className="underline" href="/login">Sign in</a>.</p>
    </div>
  );
}
