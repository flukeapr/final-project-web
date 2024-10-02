
import { query } from "../../../../../../lib/ConnectDb";
import { NextResponse } from "next/server"; 



export async function GET(req, { params }) {
    try {
        const { id } = params;
        const result = await query(`SELECT * FROM likes WHERE userId = ?`, [id]);
        if(result.length > 0){
            return NextResponse.json({data : result},{status: 200});
        }else{
            return NextResponse.json({status: 200});
        }

        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
}