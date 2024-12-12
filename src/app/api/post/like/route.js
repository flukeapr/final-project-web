import { query } from "../../../../../lib/ConnectDb";
import { NextResponse } from "next/server";


/**
 * @swagger
 * /api/post/like:
 *   post:
 *     summary: บันทึกการกดไลค์ของผู้ใช้งานจากโพสต์นั้นๆ
 *     tags:
 *         - Like
 *     description: บันทึกการกดไลค์ของผู้ใช้งานจากโพสต์นั้นๆลง database.
 *     responses:
 *        201:
 *          description: สำเร็จ
 *        500:
 *          description: ไม่สำเร็จ
 */



export async function POST(req) {
    try {
        const body = await req.json();
        const {userId, postId} = body;
         
        await query(`INSERT INTO likes (userId, postId) VALUES (?, ?)`, [userId, postId]);
        return NextResponse.json({ message: "Like created successfully" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }  
}