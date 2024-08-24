import { query } from "../../../../lib/ConnectDb";
import { NextResponse } from "next/server";


export async function POST(req){
    try {
        const body = await req.json()
        const {userId ,gender,age ,education,faculty,major ,religion,disease,ph,mh,nearby,nearby_relation} = body

        await query(`INSERT INTO userdata (userId ,gender,age ,education,faculty,major ,religion,disease,physical_health,mental_health,nearby,nearby_relation) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) `
            ,[userId ,gender,age ,education,faculty,major ,religion,disease,ph,mh,nearby,nearby_relation]
        )

        return NextResponse.json({message : "Success"},{status:201})



    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}