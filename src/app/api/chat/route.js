import { query } from "../../../../lib/ConnectDb";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        const result = await query(`SELECT * FROM chat`);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body =await req.json()
        const {message,from,to} = body

        await query(`INSERT INTO chat (user_from,user_to,sender,message) VALUES (?, ?, ?,?)`, [from, to, from, message]);
        return NextResponse.json({ message: "Message sent successfully" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
