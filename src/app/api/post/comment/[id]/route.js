import { query } from "../../../../../../lib/ConnectDb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        await query(`DELETE FROM comments WHERE postId = ?`, [id]);
        return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}