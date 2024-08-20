import { query } from "../../../../../../../lib/ConnectDb";
import { NextResponse } from "next/server";


export async function PUT(req,{params}) {
    try {
        const { id } = params;
        const body = await req.json();
        const {name,email,role} = body;
        await query(`UPDATE users SET name = ?, email = ?, role_id = ? WHERE id = ?`, [name,email,role,id]);
        return NextResponse.json({ message: "User updated successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req,{params}) {
    try {
        const { id } = params;
        await query(`DELETE FROM users WHERE id = ?`, [id]);
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}