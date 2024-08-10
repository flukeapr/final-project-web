import { NextResponse } from "next/server";
import { query } from "../../../../lib/ConnectDb";





export async function GET(){
    try {
        const result = await query(`SELECT * FROM media`);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
export async function POST(req){
    try {
        const body = await req.json();
        const {name, url,createBy} = body;
         await query(`INSERT INTO media (name, url,create_by) VALUES (?, ?, ?)`, [name, url, createBy]);
        return NextResponse.json({ message: "Media created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
