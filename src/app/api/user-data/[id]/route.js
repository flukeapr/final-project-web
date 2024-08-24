import { query } from "../../../../../lib/ConnectDb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = params;
    const data = await query(`SELECT * FROM userdata WHERE userId = ?`, [id]);
    if(data.length === 0) return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
}