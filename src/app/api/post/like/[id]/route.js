
import { query } from "../../../../../../lib/ConnectDb";
import { NextResponse } from "next/server"; 


/**
 * @swagger
 * /api/post/like/{id}:
 *   get:
 *     summary: เช็คว่าเราได้กดไลค์โพสต์ไหนบ้าง
 *     tags:
 *         - Like
 *     description: เช็คว่าเราได้กดไลค์โพสต์ไหนบ้าง
 *     responses:
 *        200:
 *          description: สำเร็จ
 *        500:
 *          description: ไม่สำเร็จ
 */


export async function GET(req, { params }) {
    try {
        const { id } = params;
        const result = await query(`SELECT * FROM likes WHERE userId = ?`, [id]);
        if(result.length > 0){
            return NextResponse.json({data : result},{status: 200});
        }else{
            return NextResponse.json({status: 200});
        }

        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
}