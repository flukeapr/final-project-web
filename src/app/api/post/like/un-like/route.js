import { query } from "../../../../../../lib/ConnectDb";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const body = await req.json();
        const { userId, postId } = body;
        await query(`DELETE FROM likes WHERE userId = ? AND postId = ?`, [userId, postId]);
        return NextResponse.json({ message: "Like deleted successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}