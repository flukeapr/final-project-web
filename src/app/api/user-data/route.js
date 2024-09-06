import { query } from "../../../../lib/ConnectDb";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/user-data:
 *   post:
 *     summary: เพิ่มข้อมูลแบบสอบถามส่วนบุคคล
 *     tags:
 *         - User-Data
 *     description: เพิ่มข้อมูลแบบสอบถามส่วนบุคคลลง database.
 *     parameters:
 *       - in: header
 *         name: Content-Type
 *         required: true
 *         schema:
 *           type: string
 *           default: application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 33
 *               gender:
 *                 type: string
 *                 example: ชาย
 *               age:
 *                 type: number
 *                 example: 20-25 ปี  
 *               education:
 *                 type: string
 *                 example: ปี 1
 *               faculty:
 *                 type: string
 *                 example: สำนักศาสตร์และศิลป์ดิจิทัล
 *               major:
 *                 type: string
 *                 example: ดิจิเทค
 *               religion:
 *                 type: string
 *                 example: พุทธ
 *               disease:
 *                 type: string
 *                 example: ไม่มี
 *               ph:
 *                 type: string
 *                 example: ไม่มี
 *               mh:
 *                 type: string
 *                 example: ไม่มี
 *               nearby:
 *                 type: string
 *                 example: ไม่มี
 *               nearby_relation:
 *                 type: string
 *                 example: ไม่มี
 * 
 * 
 *     responses:
 *        200:
 *          description: สำเร็จ
 *          content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      message:
 *                        type: string
 *                        example: success
 *        500:
 *          description: ไม่สำเร็จ
 */


export async function POST(req){
    try {
        const body = await req.json()
        const {userId ,gender,age ,education,faculty,major ,religion,disease,ph,mh,nearby,nearby_relation} = body

        await query(`INSERT INTO userdata (userId ,gender,age ,education,faculty,major ,religion,disease,physical_health,mental_health,nearby,nearby_relation) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) `
            ,[userId ,gender,age ,education,faculty,major ,religion,disease,ph,mh,nearby,nearby_relation]
        )

        return NextResponse.json({message : "Success"},{status:201})



    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}