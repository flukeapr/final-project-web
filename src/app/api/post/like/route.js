import { query } from "../../../../../lib/ConnectDb";
import { NextResponse } from "next/server";





export async function POST(req) {
    try {
        const body = await req.json();
        const {userId, postId} = body;
         
        await query(`INSERT INTO likes (userId, postId) VALUES (?, ?)`, [userId, postId]);
        return NextResponse.json({ message: "Like created successfully" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }  
}