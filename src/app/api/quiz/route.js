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

export async function POST(req) {
    try {
     

      const body = await req.json();
      const {userId ,quizId ,quizType,answers,pressure,encouragement,obstacle,total,risk} = body;
      // quiz 7 = rq20 and 8 = rq3 quiz 6 = mhl29
      if(quizId==7){
        await query(`INSERT INTO userquiz (userId ,quizId ,quizType,answers,pressure,encouragement,obstacle,total,risk) VALUES (?,?,?,?,?,?,?,?,?)`,[userId,quizId,quizType,JSON.stringify(answers),pressure,encouragement,obstacle,total,risk])
        if(quizType=="PRE"){
          await query(`UPDATE userscore SET preRq20=? WHERE userId=?`,[total,userId])
        }else if(quizType=="POST"){
          await query(`UPDATE userscore SET postRq20=? WHERE userId=?`,[total,userId])
        }
        return NextResponse.json({message : "Success"},{status:201});
      }
      if(quizId==8||quizId==6){
        await query(`INSERT INTO userquiz (userId ,quizId ,quizType,answers,total,risk) VALUES (?,?,?,?,?,?)`,[userId,quizId,quizType,JSON.stringify(answers),total,risk])
        if(quizType=="PRE" && quizId==8){
          await query(`UPDATE userscore SET preRq3=? WHERE userId=?`,[total,userId])
        }else if(quizType=="POST" && quizId==8){
          await query(`UPDATE userscore SET postRq3=? WHERE userId=?`,[total,userId])
        }
        return NextResponse.json({message : "Success"},{status:201});
      }
      
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
      
    }



}