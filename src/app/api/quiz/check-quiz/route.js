import { query } from "../../../../../lib/ConnectDb";
import { NextResponse } from "next/server";


export async function POST(req){
    try {
        const body = await req.json();
        const {quizId, userId} = body;

        const preQuiz = await query(`SELECT * FROM userquiz WHERE userId = ? AND quizId = ? AND quizType = "PRE"`, [userId, quizId]);
        const postQuiz = await query(`SELECT * FROM userquiz WHERE userId = ? AND quizId = ? AND quizType = "POST"`, [userId, quizId]);

       if(preQuiz.length > 0 && postQuiz.length > 0){
           return NextResponse.json({message : "Have a Pre and Post Quiz"},{status:201});
       }else if(preQuiz.length > 0){
           return NextResponse.json({message : "Have a Pre Quiz"},{status:201});
       }else if(postQuiz.length > 0){
           return NextResponse.json({message : "Have a Post Quiz"},{status:201});
       }else {
           return NextResponse.json({message : "No Quiz"},{status:200});
       }

    } catch (error) {
        
    }
}