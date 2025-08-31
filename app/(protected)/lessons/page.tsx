import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function LessonsPage() {
  const lessons = await prisma.lesson.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Lessons</h1>
      <ul className="grid md:grid-cols-2 gap-3">
        {lessons.map(l => (
          <li key={l.id} className="card">
            <div className="font-medium">{l.title}</div>
            <div className="text-xs text-zinc-500">{l.subject} · Grade {l.grade}</div>
            <p className="mt-2 text-sm">{l.summary}</p>
            <div className="mt-3 flex gap-2">
              <Link className="btn" href={`/lessons/${l.id}`}>Open</Link>
              <Link className="btn btn-primary" href={`/quiz/${l.id}`}>Start quiz</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
