import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function LessonPage({ params }: { params: { id: string } }) {
  const lesson = await prisma.lesson.findUnique({ where: { id: params.id } });
  if (!lesson) return <div>Lesson not found.</div>;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{lesson.title}</h1>
      <div className="card">
        <h2 className="font-semibold mb-2">شرح بالعربي</h2>
        <p className="text-sm leading-6">{lesson.summary}</p>
        <h2 className="font-semibold mt-4 mb-2">English Terms</h2>
        <div className="flex flex-wrap gap-2">
          {lesson.termsEn.map((t, i) => (<span key={i} className="badge">{t}</span>))}
        </div>
      </div>
      <Link href={`/quiz/${lesson.id}`} className="btn btn-primary">Start quiz</Link>
    </div>
  );
}
