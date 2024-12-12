import { query } from "../../../../../../lib/ConnectDb";
import { NextResponse } from "next/server";


/**
 * @swagger
 * /api/post/like/check-like:
 *   post:
 *     summary: เช็คว่าเราได้กดไลค์โพสต์นั้นหรือยัง
 *     tags:
 *         - Like
 *     description: เช็คว่าเราได้กดไลค์โพสต์นั้นหรือยัง
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
        const result = await query("SELECT * FROM likes WHERE userId = ? AND postId = ?",[userId, postId]);
        if(result.length > 0){
            return NextResponse.json({ message: "Already liked" }, { status: 201 });
        }else{
            return NextResponse.json({ message: "Not liked" }, { status: 200 });
        }
        

        } catch (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        
    }