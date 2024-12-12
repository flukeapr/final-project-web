import { NextResponse } from "next/server"; 
import {query} from "../../../../lib/ConnectDb"


/**
 * @swagger
 * /api/mood:
 *   post:
 *     summary: เพิ่มข้อมูลอารมณ์
 *     tags:
 *         - Mood
 *     description: เพิ่มข้อมูลอารมณ์ลง database.
 *     responses:
 *        201:
 *          description: สำเร็จ
 *        500:
 *          description: ไม่สำเร็จ
 */


export async function POST(req) {
    try {
        const boy = await req.json();
        const {mood,description,userId} = boy;
        await query(`INSERT INTO mood (mood_name,description,user_id) VALUES (?,?,?)`, [mood,description,userId]);
        return NextResponse.json({ message: "Mood created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}