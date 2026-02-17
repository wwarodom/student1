"use client";

import { useState, useTransition } from "react";
import { saveStudent, deleteStudent } from "@/app/actions/student";
import type { ActionResult } from "@/app/actions/student";

interface Student {
  id: number;
  name: string;
  email: string;
}

export default function StudentDetail({ students }: { students: Student[] }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<ActionResult["errors"]>();
  const [isPending, startTransition] = useTransition();

  const resetForm = () => {
    setName("");
    setEmail("");
    setEditingId(null);
    setErrors(undefined);
  };

  const handleEdit = (student: Student) => {
    setName(student.name);
    setEmail(student.email);
    setEditingId(student.id);
    setErrors(undefined);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    await deleteStudent(id);
  };

  return (
    <>
      {/* Form */}
      <form
        action={(formData) => {
          if (editingId) formData.append("id", String(editingId));

          startTransition(async () => {
            const result = await saveStudent({}, formData);
            if (result.errors) {
              setErrors(result.errors);
            } else {
              resetForm();
            }
          });
        }}
        className="mb-8 flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {editingId ? "Edit Student" : "Add Student"}
        </h2>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500"
            required
          />
          {errors?.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name[0]}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500"
            required
          />
          {errors?.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email[0]}</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {isPending ? "Saving..." : editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      {students.length === 0 ? (
        <p className="text-zinc-500">No students found.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-zinc-200 shadow-sm dark:border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-900">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">
                    {student.id}
                  </td>
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                    {student.name}
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {student.email}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleEdit(student)}
                      className="mr-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
