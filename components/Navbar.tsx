"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { data } = useSession();
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/lessons", label: "Lessons" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-semibold">StudyFlow</Link>
        <nav className="flex items-center gap-4">
          {links.map(l => (
            <Link key={l.href} href={l.href} className={cn("text-sm", pathname===l.href && "underline")}>{l.label}</Link>
          ))}
          {data?.user ? (
            <>
              <Link href="/dashboard" className="text-sm">Dashboard</Link>
              <Link href="/profile" className="text-sm">Profile</Link>
              <button className="btn" onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn">Login</Link>
              <Link href="/signup" className="btn btn-primary">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
