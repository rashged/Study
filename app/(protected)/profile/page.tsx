import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  const me = await prisma.user.findUnique({ where: { id: user.id }, include: { badges: { include: { badge: true } } } });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">My Profile</h1>
      <div className="card">
        <div className="font-medium">{me?.name}</div>
        <div className="text-sm text-zinc-500">{me?.email}</div>
        <div className="mt-2">Points: <span className="font-semibold">{me?.points}</span></div>
        <div className="mt-3">
          <div className="text-sm font-medium mb-1">Badges</div>
          <div className="flex gap-2 flex-wrap">
            {me?.badges?.length ? me.badges.map((b) => (<span key={b.id} className="badge">{b.badge.label}</span>)) : <span className="text-sm text-zinc-500">No badges yet.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
