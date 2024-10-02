import { query } from "../../../../../lib/ConnectDb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body =await req.json()
        const {message,from} = body

        const result = await query(`SELECT id FROM users WHERE role_id = 1`);

        for (let i = 0; i < result.length; i++) {
            const to = result[i].id;
            await query(`INSERT INTO chat (user_from,user_to,sender,message) VALUES (?, ?, ?,?)`, [from, to, from, message]);
        }

        return NextResponse.json({ message: "Message sent successfully"}, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}