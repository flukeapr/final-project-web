
import { NextResponse } from 'next/server';
import { query } from '../../../../../lib/ConnectDb';


export async function DELETE(req,{params}){
    try {   
        const {id} = params;
         await query(`DELETE FROM media WHERE id = ?`, [id]);
        return NextResponse.json({ message: "Media deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export async function PUT(req,{params}){
    try {
       const {id} =params;
       const body = await req.json();
        const {name, url} = body;
        if(!name || !url){
            throw Error("Missing name or url");
        } 
        await query(`UPDATE media SET name = ?, url = ? WHERE id = ?`, [name, url, id]);

        return NextResponse.json({ message: "Media updated successfully" }, { status: 200 });   
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}