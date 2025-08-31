import { prisma } from "@/lib/prisma";
export default async function LeaderboardPage() {
  const users = await prisma.user.findMany({ orderBy: { points: "desc" }, take: 5 });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Top 5 Students</h1>
      <ul className="space-y-3">
        {users.map((u, i) => (
          <li key={u.id} className="card flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="badge">#{i + 1}</div>
              <div><div className="font-medium">{u.name}</div><div className="text-xs text-zinc-500">{u.email}</div></div>
            </div>
            <div className="font-semibold">{u.points} pts</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
