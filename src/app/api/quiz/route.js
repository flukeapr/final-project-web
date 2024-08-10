import { query } from "../../../../lib/ConnectDb";
import {NextResponse} from "next/server";

export async function GET(req){
    try {
    const result = await query(`SELECT * FROM quiz`);

   

    return NextResponse.json(result);

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
}