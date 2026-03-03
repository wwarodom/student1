'use server'
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";
import { ActionResult } from "./student";

export async function addNewStudent(prev: ActionResult, formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string

    console.log(name, email)
    const data = { name, email }

    await prisma.student.create({ data });

    revalidatePath("/");
    return { success: true };
}