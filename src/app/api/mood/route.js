import { NextResponse } from "next/server"; 
import {query} from "../../../../lib/ConnectDb"



export async function POST(req) {
    try {
        const boy = await req.json();
        const {mood,description,userId} = boy;
        await query(`INSERT INTO mood (mood_name,description,user_id) VALUES (?,?,?)`, [mood,description,userId]);
        return NextResponse.json({ message: "Mood created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}