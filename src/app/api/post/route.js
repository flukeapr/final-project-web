import { query } from "../../../../lib/ConnectDb";
import { NextResponse } from "next/server";




export async function GET(req){
    try {
        const result = await query(`SELECT * FROM full_post_view`);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req){
    try {
        const body = await req.json()
        const {text, userId} = body
        if(!text || !userId) throw Error("text and userId are required")

        await query(`INSERT INTO post (text, userId) VALUES (?, ?)`, [text, userId]);
        return NextResponse.json({ message: "Post created successfully" }, { status: 201});


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}