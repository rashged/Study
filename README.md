# StudyFlow (Next.js + Prisma + NextAuth)

Production-ready study platform with lessons, quizzes, leaderboard, and badges.

## Quick Start (Local)
1. Copy `.env.example` → `.env` and fill:
   - `DATABASE_URL` (Neon or Vercel Postgres)
   - `NEXTAUTH_SECRET` (long random string)
2. Install: `pnpm i` (or `npm i` / `yarn`)
3. Push schema: `pnpm build` (runs `prisma db push`)
4. Seed (optional): `pnpm seed`
5. Dev: `pnpm dev` → http://localhost:3000

Demo teacher (after seed): `teacher@studyflow.dev` / `Teacher@123`

## Deploy on Vercel
1. Push this repo to GitHub.
2. Import into Vercel (Framework: Next.js).
3. Add Environment Variables:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` = `https://<your-domain>`
4. Deploy. (Build runs `prisma db push && next build` to sync schema.)

## Notes
- Protected routes via `next-auth` middleware.
- Points increase by quiz score; badges auto-awarded:
  - `STARTER` (3 quizzes)
  - `SPEEDY` (≥80% & <90s)
