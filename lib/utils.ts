export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
export function awardBadges(score: number, timeSec: number, quizCountForUser: number) {
  const codes: string[] = [];
  if (quizCountForUser + 1 >= 3) codes.push("STARTER");
  if (score >= 80 && timeSec < 90) codes.push("SPEEDY");
  return codes;
}
