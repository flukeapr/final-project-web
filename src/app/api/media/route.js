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
        const {title, url ,content} = body;
        const result = await query(`SELECT id FROM media WHERE title = ?`, [title]);
        if(result.length > 0)  throw Error("Media already exists");

        if(content){
            await query(`INSERT INTO media (title, url, content) VALUES (?, ?, ?)`, [title, url,content]);
            const result = await query(`SELECT id FROM media WHERE title = ? AND url = ? AND content = ?`, [title, url,content]);
            const mediaId = result[0].id;
           return NextResponse.json({ message: "Media created successfully", id: mediaId }, { status: 201 });
        }else{
            await query(`INSERT INTO media (title, url) VALUES (?, ?)`, [title, url]);
            const result = await query(`SELECT id FROM media WHERE title = ? AND url = ?`, [title, url]);
            const mediaId = result[0].id;
           return NextResponse.json({ message: "Media created successfully", id: mediaId }, { status: 201 });
        }
       
       
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
