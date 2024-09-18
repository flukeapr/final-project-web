import { query } from "../../../../lib/ConnectDb";
import { NextResponse } from "next/server";





export async function GET(req){
    try {
        const result = await query(`SELECT * FROM chat`);
        return NextResponse.json(result,{status: 200});
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: บันทึกข้อความแชท
 *     tags:
 *         - Chat
 *     description: บันทึกข้อความแชทเข้า database.
 *     parameters:
 *       - in: header
 *         name: Content-Type
 *         required: true
 *         schema:
 *           type: string
 *           default: application/json
 *      
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               from:
 *                 type: string
 *               to:
 *                 type: string  
 *     responses:
 *        201:
 *          description: สำเร็จ
 *        500:
 *          description: ไม่สำเร็จ
 */

export async function POST(req) {
    try {
        const body =await req.json()
        const {message,from,to} = body

        await query(`INSERT INTO chat (user_from,user_to,sender,message) VALUES (?, ?, ?,?)`, [from, to, from, message]);
        return NextResponse.json({ message: "Message sent successfully" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
