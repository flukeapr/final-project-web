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

export async function POST(req){
    try {
        const body = await req.json();
        const {userId ,quizId ,quizType,answers} = body;
       
        await query(`INSERT INTO userquiz (userId, quizId, quizType, answers) VALUES (?, ?, ?, ?)`, [userId, quizId, quizType, JSON.stringify(answers)]);
        return NextResponse.json({ message: "Quiz created successfully" }, { status: 201 });


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}