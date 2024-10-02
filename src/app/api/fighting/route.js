import { NextResponse } from 'next/server'
import { query } from '../../../../lib/ConnectDb'


export async function GET(){
    try {
    const result = await query(`SELECT * FROM fighting`);

        // random id from quiz data
     const length = result.length
     const dataId = []
     for (let i = 0; i < length; i++) {
         dataId.push(result[i].id)
     }
 
     const randomIndex = Math.floor(Math.random() * dataId.length );
     console.log(dataId[randomIndex])

     return NextResponse.json(result[randomIndex]);
    } catch (error) {
        return  NextResponse.json({ error: error.message }, { status: 500 });
    }
    

}

export async function POST(req){
    try {
        const body = await req.json();
        const {title , text , image ,create_by} = body

        await query(`INSERT INTO fighting (title , text , image , create_by) VALUES (?, ?, ?, ?)`, [title , text , image , create_by]);
        const result = await query('SELECT id FROM fighting WHERE title = ? AND text = ? AND image = ? AND create_by = ?', [title , text , image , create_by]);
        const id = result[0].id
        return NextResponse.json({ message: "Fighting created successfully" , id}, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}