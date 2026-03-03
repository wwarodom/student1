'use server'
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";
import { ActionResult } from "./ListStudent";
import z from "zod";


const studentSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(20, "Name must be at most 20 characters"),
    email: z.email("Invalid email address"),
});

export async function saveStudent(prev: ActionResult, formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string

    console.log(name, email)
    const data = { name, email }

    const result = studentSchema.safeParse(data);

    if (!result.success) {
        return { errors: z.flattenError(result.error).fieldErrors };
    }

    const id = formData.get("id");
    if (id) {
        await prisma.student.update({
            where: { id: Number(id) },
            data: result.data,
        });
    } else {
        await prisma.student.create({ data: result.data });
    }

    // await prisma.student.create({ data });

    revalidatePath("/");
    return { success: true };
}