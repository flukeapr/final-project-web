
import { query } from "../../../../../lib/ConnectDb";
import { NextResponse } from "next/server";


export async function DELETE(req,{params}){

    const { id } = params;
    try {
        await query(`DELETE FROM post WHERE post_id = ?`, [id]);
        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}