'use client'

import { useState, useTransition } from "react"
import { saveStudent } from "./saveStudent"
import { deleteStudent } from "./deleteStudent"

type StudentType = {
    id: number
    name: string
    email: string
}

export type ActionResult = {
    success?: boolean;
    errors?: { name?: string[]; email?: string[] };
};

export default function ListStudent({ students }: { students: StudentType[] }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [editId, setEditId] = useState(0)
    const [errors, setErrors] = useState<ActionResult["errors"]>()
    const [isPending, startTransition] = useTransition();

    const resetForm = () => {
        setName("")
        setEmail("")
        setEditId(0)
        setErrors(undefined)
    }

    const handleEdit = (student: StudentType) => {
        setName(student.name);
        setEmail(student.email);
        setEditId(student.id);
        setErrors(undefined);
    };


    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this student?")) return;
        await deleteStudent(id)
    }


    return (
        <div>
            <div>
                <form className="p-4 bg-white shadow-lg rounded-xl border border-zinc-400" action={
                    (formData) => {

                        if (editId) formData.append("id", String(editId));

                        startTransition(
                            async () => {
                                const result = await saveStudent({}, formData)
                                if (result.errors)
                                    setErrors(result.errors)
                                else
                                    resetForm()
                            }
                        )
                    }
                }>
                    <h2 className="text-xl text-zinc-900 text-left">Add Student</h2>
                    <div>
                        <input type="text" name="name" placeholder="name" value={name}
                            className="w-full px-3 py-2 mb-4 text-zinc-600 border-zinc-300 border rounded"
                            onChange={e => setName(e.target.value)}
                            required
                        />
                        {errors?.name && (<p className="mt-2 text-red-500" > {errors.name[0]} </p>)}
                    </div>
                    <div>
                        <input type="text" name="email" placeholder="email" value={email}
                            className="w-full px-3 py-2 text-zinc-600 border-zinc-300 border rounded"
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        {errors?.email && (<p className="mt-2 text-red-500" > {errors.email[0]} </p>)}
                    </div>
                    <div>
                        <button className="border bg-black text-white px-3 py-2 rounded-md mt-4"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? "Saving..." : editId? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="border border-zinc-400 mt-8 bg-white shadow-lg rounded-xl overflow-clip">
                <table className="w-full text-left">
                    <thead className="bg-zinc-200">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 text-zinc-600">
                        {students.map((student, index) =>
                            <tr key={index}>
                                <td className="px-4 py-2">{student.id}</td>
                                <td className="px-4 py-2">{student.name}</td>
                                <td className="px-4 py-2">{student.email}</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="bg-zinc-200 p-2 mr-2 rounded-xl"
                                        onClick={() => handleEdit(student)}

                                    >Edit</button>

                                    <button
                                        className="bg-zinc-200 p-2 mr-2 rounded-xl"
                                        onClick={() => handleDelete(student.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
