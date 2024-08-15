import { NextResponse } from "next/server";
import { query } from "../../../../../lib/ConnectDb";


export async function GET(req,{params}) {
    try {
        const { id } = params;
        const string = id.toString();
        const from = string.split(',')[0];
        const to = string.split(',')[1];

       const result = await query(`SELECT * FROM chat WHERE (user_from = ? AND user_to = ?) OR (user_from = ? AND user_to = ?) ORDER BY create_at ASC`, [from, to,to,from]);
       if(result.length == 0) return NextResponse.json({message: "No messages found"},{status: 400});

       const message = result.map((item) => {
            return {
                id: item.id,
                message: item.message,
                fromSelf:  item.user_from.toString() == from,
                createAt : item.create_at
            }
        })



        return NextResponse.json({message},{status: 200});
        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req,{params}) {
    try {
        const { id } = params;
        const string = id.toString();
        const from = string.split(',')[0];
        const to = string.split(',')[1];
    
        await query(`
          UPDATE chat
          SET is_read = 'true'
            WHERE (user_from = ? AND user_to = ?) OR (user_from = ? AND user_to = ?) AND is_read = 'false'
        `, [from, to, to, from]);
    
        return NextResponse.json({ message: "Messages marked as read" }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
}