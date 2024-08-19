import { NextResponse } from "next/server";
import { query } from "../../../../../../lib/ConnectDb";


export async function DELETE(req,{params}) {

    const { id } = params;

    try {
        await query(`DELETE FROM users WHERE id = ?`, [id]);
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}