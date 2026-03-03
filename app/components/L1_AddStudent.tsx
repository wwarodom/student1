'use client'

import { useActionState, useState } from "react"
import { addNewStudent } from "../actions/t_addStudent";

export type ActionResult = {
    success?: boolean;
    // errors?: { name?: string[]; email?: string[] };
};

export default function L1_AddStudent() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [state, action, isPending] = useActionState(addNewStudent, {} as ActionResult)

    console.log("state: ", state)

    return (
        <div>
            <form action={action} className="bg-white mt-8 flex flex-col gap-3 p-6 shadow-sm">
                <h2 className="text-lg font-bold">L Add: </h2>
                <div>
                    <input
                        className="border w-full px-3 py-2 rounded border-zinc-300"
                        type="text" name="name" placeholder="name"
                        value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <input
                        className="border w-full px-3 py-2 rounded border-zinc-300"
                        type="text" name="email" placeholder="email"
                        value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <button
                        className="border px-3 py-2 rounded text-zinc-300 bg-black"
                        type="submit" disabled={isPending}>Add</button>
                </div>
            </form>
        </div>
    )
}
