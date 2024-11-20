import { NextResponse } from "next/server";
import { query } from '../../../../../lib/ConnectDb';

export async function GET(request, { params }) {
    try {
        const id = params.id;
        const result = await query(`SELECT * FROM mood WHERE user_id = ${id} ORDER BY create_at DESC`);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
}


export async function DELETE(req, { params }) {
    try {
        const {id} = params
        await query('DELETE FROM mood WHERE id = ?', [id]);
        return NextResponse.json({ message: "Mood deleted successfully" }, { status: 200 });


    } catch (error) {   
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}