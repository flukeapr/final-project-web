import { query } from "../../../../../lib/ConnectDb";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/chat/unread:
 *   post:
 *     summary: เช็คข้อความที่ยังไม่ได้อ่าน
 *     tags:
 *         - Chat
 *     description: เช็คข้อความที่ยังไม่ได้อ่าน
 *     responses:
 *        200:
 *          description: สำเร็จ
 *          
 *        500:
 *          description: ไม่สำเร็จ
 */


export async function POST(req){
    try {
        const body = await req.json();
        const {id} = body;
        const result = await query(`SELECT * FROM chat WHERE user_to = ? AND is_read = 'false'`, [id]);
        return NextResponse.json(result,{status: 200});
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}