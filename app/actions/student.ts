"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod/v4";

const studentSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters"),
  email: z.email("Invalid email address"),
});

export type ActionResult = {
  success?: boolean;
  errors?: { name?: string[]; email?: string[] };
};

export async function saveStudent(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const result = studentSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

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

  revalidatePath("/");
  return { success: true };
}

export async function deleteStudent(id: number) {
  await prisma.student.delete({ where: { id } });
  revalidatePath("/");
}
