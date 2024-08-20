import { NextResponse } from "next/server";
import { query } from "../../../../lib/ConnectDb";





export async function GET(){
    try {
        const result = await query(`SELECT * FROM media`);
        if(result.length < 1) return NextResponse.json({message: "No media found"},{status: 400});
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
export async function POST(req){
    try {
        const body = await req.json();
        const {title, url} = body;
         await query(`INSERT INTO media (title, url) VALUES (?, ?)`, [title, url]);
         const result = await query(`SELECT id FROM media WHERE title = ?`, [title]);
         const mediaId = result[0].id;
        return NextResponse.json({ message: "Media created successfully", id: mediaId }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
