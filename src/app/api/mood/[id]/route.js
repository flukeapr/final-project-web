import { NextResponse } from "next/server";
import { query } from '../../../../../lib/ConnectDb';

/**
 * @swagger
 * /api/mood/{id}:
 *   get:
 *     summary: ดึงข้อมูลอารมณ์
 *     tags:
 *         - Mood
 *     description: ดึงข้อมูลอารมณ์จาก database.
 *     responses:
 *        200:
 *          description: สำเร็จ
 *        500:
 *          description: ไม่สำเร็จ
 */

export async function GET(request, { params }) {
    try {
        const id = params.id;
        const result = await query(`SELECT * FROM mood WHERE user_id = ${id} ORDER BY create_at DESC`);
        return NextResponse.json(result,{status: 200});
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
}

/**
 * @swagger
 * /api/mood/{id}:
 *   delete:
 *     summary: ลบข้อมูลอารมณ์
 *     tags:
 *         - Mood
 *     description: ลบข้อมูลอารมณ์จาก database.
 *     responses:
 *        200:
 *          description: สำเร็จ
 *        500:
 *          description: ไม่สำเร็จ
 */

export async function DELETE(req, { params }) {
    try {
        const {id} = params
        await query('DELETE FROM mood WHERE id = ?', [id]);
        return NextResponse.json({ message: "Mood deleted successfully" }, { status: 200 });


    } catch (error) {   
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}