import "dotenv/config";
import pg from "pg";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const students = [
  { name: "Alice Johnson", email: "alice@example.com" },
  { name: "Bob Smith", email: "bob@example.com" },
  { name: "Charlie Brown", email: "charlie@example.com" },
  { name: "Diana Prince", email: "diana@example.com" },
  { name: "Edward Norton", email: "edward@example.com" },
  { name: "Fiona Green", email: "fiona@example.com" },
  { name: "George Wilson", email: "george@example.com" },
  { name: "Hannah Lee", email: "hannah@example.com" },
  { name: "Ivan Petrov", email: "ivan@example.com" },
  { name: "Julia Chen", email: "julia@example.com" },
];

async function main() {
  for (const student of students) {
    await prisma.student.upsert({
      where: { email: student.email },
      update: {},
      create: student,
    });
  }
  console.log("Seeded 10 students");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
