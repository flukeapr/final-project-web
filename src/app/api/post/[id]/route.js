
import { query } from "../../../../../lib/ConnectDb";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/post/{id}:
 *   put:
 *     summary: แก้ไขข้อมูลโพสต์
 *     tags:
 *         - Post
 *     description: แก้ไขโพสต์และอัพเดท database.
 *     responses:
 *        200:
 *          description: สำเร็จ
 *        500:
 *          description: ไม่สำเร็จ
 */

/**
 * @swagger
 * /api/post/{id}:
 *   delete:
 *     summary: ลบข้อมูลโพสต์
 *     tags:
 *         - Post
 *     description: ลบโพสต์จาก database.
 *     responses:
 *        200:
 *          description: สำเร็จ
 *        500:
 *          description: ไม่สำเร็จ
 */
export async function PUT(req,{params}) {   
    try {
        const {id} = params 
        const body = await req.json()
        const {text} = body
        await query('UPDATE post SET text = ? WHERE post_id = ?', [text,id]);
        return NextResponse.json({ message: "Post update successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
}


export async function DELETE(req,{params}){

    const { id } = params;
    try {
        await query(`DELETE FROM post WHERE post_id = ?`, [id]);
        
        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}