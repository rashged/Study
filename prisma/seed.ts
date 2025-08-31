import { PrismaClient, QuizType, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  await prisma.badge.upsert({ where: { code: "STARTER" }, update: {}, create: { code: "STARTER", label: "First 3 Quizzes" } });
  await prisma.badge.upsert({ where: { code: "SPEEDY" }, update: {}, create: { code: "SPEEDY", label: "Finish < 90s with ≥80%" } });

  const lesson = await prisma.lesson.create({
    data: {
      title: "Periodic Motion Basics",
      subject: "Physics",
      grade: "10",
      summary: "Periodic motion repeats in equal time intervals; amplitude is the maximum displacement; net force at equilibrium is zero.",
      termsEn: ["periodic motion", "amplitude", "equilibrium"]
    }
  });
  await prisma.quiz.create({
    data: {
      lessonId: lesson.id,
      items: {
        create: [
          { type: QuizType.MCQ, question: "Periodic motion repeats after equal _____.", choices: ["time intervals","distances","forces","velocities"], answer: "time intervals", order: 1 },
          { type: QuizType.TRUE_FALSE, question: "Net force at equilibrium is zero.", choices: [], answer: "true", order: 2 },
          { type: QuizType.MCQ, question: "Amplitude is the maximum ________ from equilibrium.", choices: ["energy","displacement","velocity","force"], answer: "displacement", order: 3 }
        ]
      }
    }
  });

  const hash = await bcrypt.hash("Teacher@123", 10);
  await prisma.user.upsert({
    where: { email: "teacher@studyflow.dev" },
    update: {},
    create: { email: "teacher@studyflow.dev", name: "Demo Teacher", role: Role.TEACHER, passwordHash: hash }
  });

  console.log("Seeded");
}

main().finally(async () => { await prisma.$disconnect(); });
