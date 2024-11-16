import { query } from "../../../../../../lib/ConnectDb";
import { NextResponse } from "next/server";
import sharp from "sharp";
import fs from "fs/promises";
import formidable from "formidable";
import { Readable } from "stream";
import multer from 'multer';
/**
 * @swagger
 * /api/post/image/{id}:
 *   put:
 *     summary: บันทึกรูปภาพ
 *     tags:
 *         - Post
 *     description: บันทึกรูปภาพลงเครื่อง server.
 *     parameters:
 *       - in: header
 *         name: Content-Type
 *         required: true
 *         schema:
 *           type: string
 *           default: multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: ไฟล์รูปภาพ
 * 
 * 
 *     responses:
 *        200:
 *          description: สำเร็จ
 *        500:
 *          description: ไม่สำเร็จ
 */
export const config = {
  api: {
    bodyParser: false,
  },
};



async function parseMultipartForm(req) {
  const contentType = req.headers.get('content-type');
  const boundary = contentType.split('; boundary=')[1];

  const chunks = [];
  const reader = req.body.getReader();
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const buffer = Buffer.concat(chunks);
  const bodyText = buffer.toString();

  // แบ่งส่วนตาม boundary
  const boundaryStart = `--${boundary}`;
  const boundaryEnd = `--${boundary}--`;
  const parts = bodyText.split(boundaryStart).filter(part => part.length > 0 && !part.includes(boundaryEnd));

  for (const part of parts) {
    // ตรวจสอบว่าเป็นส่วนของรูปภาพ
    if (part.includes('Content-Type: image')) {
      // หาตำแหน่งเริ่มต้นของข้อมูลไฟล์
      const contentStart = part.indexOf('\r\n\r\n') + 4;
      // หาตำแหน่งสิ้นสุดของข้อมูลไฟล์
      const contentEnd = part.lastIndexOf('\r\n');
      
      if (contentStart > 4 && contentEnd > contentStart) {
        // แปลงข้อมูลเป็น Buffer
        const rawImageData = buffer.slice(
          buffer.indexOf(Buffer.from('\r\n\r\n')) + 4,
          buffer.lastIndexOf(Buffer.from(`\r\n--${boundary}`))
        );
        return rawImageData;
      }
    }
  }
  return null;
}


export async function PUT(req, { params }) {
  try {
    const { id } = params;
    if (!id) {
      throw new Error("Missing id");
    }
    console.log(req);


    const imageBuffer = await parseMultipartForm(req);
    
    if (!imageBuffer) {
      throw new Error("Image is required");
    }

    // ตรวจสอบขนาดไฟล์
    if (imageBuffer.length > 5 * 1024 * 1024) { // 5MB
      throw new Error("File size too large");
    }

    // Process image
    const fileName = `post-${id}.jpg`;
    let finalBuffer;

    try {
      // แปลงเป็น JPEG และปรับคุณภาพ
      finalBuffer = await sharp(imageBuffer, {
        failOnError: false // เพิ่มตัวเลือกนี้
      })
        .rotate() // แก้ไขการหมุนภาพอัตโนมัติ
        .resize(1920, 1080, { // กำหนดขนาดสูงสุด
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ 
          quality: 80,
          progressive: true
        })
        .toBuffer();
    } catch (error) {
      console.error('Image processing error:', error);
      throw new Error("Invalid image format");
    }

    // Save file
    const path = `./public/post/uploads/posts/image/${fileName}`;
    await fs.writeFile(path, finalBuffer);
    
    // Update database
    const imageUrl = `/post/uploads/posts/image/${fileName}`;
    await query(`UPDATE post SET image = ? WHERE post_id = ?`, [imageUrl, id]);

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}



/**
 * @swagger
 * /api/post/image/{id}:
 *   delete:
 *     summary: ลบรูปภาพ
 *     tags:
 *         - Post
 *     description: ลบรูปภาพจากเครื่อง server.
 *     responses:
 *        200:
 *          description: สำเร็จ
 *        500:
 *          description: ไม่สำเร็จ
 */


export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const pathJpg = `./public/post/uploads/posts/image/post-${id}.jpg`;

    try {
      await fs.access(pathJpg);
      await fs.unlink(pathJpg);
    } catch (err) {
      return NextResponse.json({ message: "success" }, { status: 200 });
    } finally {
      return NextResponse.json({ message: "success" }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
