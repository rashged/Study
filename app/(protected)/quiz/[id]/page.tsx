"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type QuizItem = { id: string; type: "MCQ" | "TRUE_FALSE"; question: string; choices: string[]; answer: string };

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<QuizItem[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [start] = useState<number>(Date.now());

  useEffect(() => { (async () => {
    const res = await fetch(`/api/quiz/submit?lessonId=${params.id}`, { method: "GET" });
    const j = await res.json();
    setItems(j.items || []);
    setLoading(false);
  })(); }, [params.id]);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  const submit = async () => {
    const timeSec = Math.round((Date.now() - start) / 1000);
    const res = await fetch(`/api/quiz/submit`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lessonId: params.id, answers, timeSec }) });
    const j = await res.json();
    if (j?.ok) { alert(`Score: ${j.score}% | Time: ${j.timeSec}s`); router.push("/dashboard"); }
    else alert("Failed to submit");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Quiz</h1>
      {items.map((it, idx) => (
        <div key={it.id} className="card">
          <div className="text-sm text-zinc-500">Q{idx + 1}</div>
          <div className="font-medium mb-2">{it.question}</div>
          {it.type === "MCQ" ? (
            <div className="flex flex-col gap-2">
              {it.choices.map((c) => (
                <label key={c} className="flex items-center gap-2">
                  <input type="radio" name={it.id} value={c} onChange={(e) => setAnswers(a => ({ ...a, [it.id]: e.target.value }))} />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="flex gap-4">
              {(["true","false"] as const).map(v => (
                <label key={v} className="flex items-center gap-2">
                  <input type="radio" name={it.id} value={v} onChange={(e) => setAnswers(a => ({ ...a, [it.id]: e.target.value }))} />
                  <span>{v.toUpperCase()}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-500">Answered: {answeredCount}/{items.length}</div>
        <button className="btn btn-primary" onClick={submit} disabled={answeredCount < items.length}>Submit</button>
      </div>
    </div>
  );
}
