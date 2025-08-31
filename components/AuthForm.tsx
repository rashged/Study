"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof LoginSchema>>({ resolver: zodResolver(LoginSchema) });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    const res = await signIn("credentials", { ...values, redirect: false });
    setLoading(false);
    if (res?.ok) router.push("/dashboard");
    else alert("Invalid email or password");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4">
      <div><label className="label">Email</label><input className="input" type="email" {...register("email")} />{errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}</div>
      <div><label className="label">Password</label><input className="input" type="password" {...register("password")} />{errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}</div>
      <button className="btn btn-primary w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
    </form>
  );
}

const SignupSchema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6) });

export function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof SignupSchema>>({ resolver: zodResolver(SignupSchema) });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
    setLoading(true);
    const res = await fetch("/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    setLoading(false);
    if (res.ok) await signIn("credentials", { email: values.email, password: values.password, callbackUrl: "/dashboard" });
    else { const j = await res.json().catch(()=>({})); alert(j?.error ?? "Failed to sign up"); }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4">
      <div><label className="label">Name</label><input className="input" {...register("name")} />{errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}</div>
      <div><label className="label">Email</label><input className="input" type="email" {...register("email")} />{errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}</div>
      <div><label className="label">Password</label><input className="input" type="password" {...register("password")} />{errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}</div>
      <button className="btn btn-primary w-full" disabled={loading}>{loading ? "Creating..." : "Create account"}</button>
    </form>
  );
}
