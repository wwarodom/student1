import { prisma } from "../lib/prisma"; 
import ListStudent from "./ListStudent";

export default async function Student2() {
    const students = await prisma.student.findMany({
        orderBy: { id: "asc" },
    });

    console.log(students)

    return (
        <div className="min-h-screen py-12 bg-zinc-100">
            <div className="max-w-2xl  mx-auto text-center ">
                <h1 className="text-2xl font-bold mb-8">
                    Student2
                </h1> 
                <ListStudent students={students} />
            </div>
        </div>
    )
}
