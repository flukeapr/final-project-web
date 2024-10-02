import { query } from "../../../../../lib/ConnectDb";
import { NextResponse } from "next/server";



export async function PUT(req,{params}){
    try {
        const { id } = params;
        const body = await req.json();
        const {title , text , image , create_by} = body;
        await query(`UPDATE fighting SET title = ? , text = ? , image = ? , create_by = ? WHERE id = ?`, [title , text , image , create_by , id]);
        return NextResponse.json({ message: "Fighting updated successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }    
}

export async function DELETE(req,{params}){
    try {
        const { id } = params;
        await query(`DELETE FROM fighting WHERE id = ?`, [id]);
        return NextResponse.json({ message: "Fighting deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });        
    }
}