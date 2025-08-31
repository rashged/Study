import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  const lessons = await prisma.lesson.findMany({ orderBy: { createdAt: "desc" } });
  const results = await prisma.result.findMany({ where: { userId: user.id }, include: { quiz: { include: { lesson: true } } }, orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-semibold">Hi {user?.name?.split(" ")[0] ?? "there"} 👋</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Continue where you left off or start a new quiz.</p>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Recent results</h2>
        {results.length === 0 && <p className="text-sm text-zinc-500">No results yet.</p>}
        <ul className="grid md:grid-cols-2 gap-3">
          {results.map(r => (
            <li key={r.id} className="card">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{r.quiz.lesson.title}</div>
                  <div className="text-xs text-zinc-500">Score: {r.score}% · Time: {r.timeSec}s</div>
                </div>
                <Link href={`/lessons/${r.quiz.lesson.id}`} className="btn">Review</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">All lessons</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          {lessons.map(l => (
            <li key={l.id} className="card">
              <div className="font-medium">{l.title}</div>
              <div className="text-xs text-zinc-500">{l.subject} · Grade {l.grade}</div>
              <p className="mt-2 text-sm">{l.summary}</p>
              <div className="mt-3 flex gap-2">
                <Link href={`/lessons/${l.id}`} className="btn">Open</Link>
                <Link href={`/quiz/${l.id}`} className="btn btn-primary">Start quiz</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
