import { query } from "../../../../../lib/ConnectDb";
import { NextResponse } from "next/server";


export async function POST(req){
    try {
        const body = await req.json()
        const {text, userId, postId} = body
        if(!text || !userId || !postId) throw Error("text and userId are required")
        
        await query(`INSERT INTO comments (text, userId, postId) VALUES (?, ?, ?)`, [text, userId, postId])
        return NextResponse.json({ message: "Comment created successfully" }, { status: 201 })


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}