import { prisma } from "@/app/lib/prisma";
import StudentDetail from "@/app/components/StudentDetail";

export default async function Home() {
  const students = await prisma.student.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Students
        </h1>
        <StudentDetail students={students} />
      </div>
    </div>
  );
}
