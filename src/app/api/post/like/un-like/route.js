import { query } from "../../../../../../lib/ConnectDb";
import { NextResponse } from "next/server";


/**
 * @swagger
 * /api/post/like/un-like:
 *   post:
 *     summary: ยกเลิกการกดไลค์โพสต์นั้นๆ
 *     tags:
 *         - Like
 *     description: ยกเลิกการกดไลค์โพสต์นั้นๆ
 *     responses:
 *        201:
 *          description: สำเร็จ
 *        500:
 *          description: ไม่สำเร็จ
 */


export async function POST(req) {
    try {
        const body = await req.json();
        const { userId, postId } = body;
        await query(`DELETE FROM likes WHERE userId = ? AND postId = ?`, [userId, postId]);
        return NextResponse.json({ message: "Like deleted successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}