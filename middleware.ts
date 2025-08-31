export { default } from "next-auth/middleware";
export const config = { matcher: ["/dashboard", "/lessons/:path*", "/quiz/:path*", "/leaderboard", "/profile"] };
