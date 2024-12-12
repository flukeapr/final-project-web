import NextAuth from 'next-auth'
import {authOptions} from '../../../../../lib/authOptions';



/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: การล็อกอิน
 *   - name: Chat
 *     description: แชท
 *   - name: Media
 *     description: สื่อ
 *   - name: Post
 *     description: โพสต์ชุมชน
 *   - name: Quiz
 *     description: แบบประเมิน
 *   - name: Register
 *     description: สมัครสมาชิก
 *   - name: Reset-Password
 *     description: เปลี่ยนหัสผ่าน
 *   - name: Update-User
 *     description: อัพเดตข้อมูลส่วนตัว
 *   - name: User-Data
 *     description: ข้อมูลแบบสอบถามส่วนบุคคล
 *   - name: UserQuizView
 *     description: ข้อมูลแบบประเมินที่ผู้ใช้ทำ
 *   - name: Mood
 *     description: ข้อมูลอารมณ์
 *    - name: Like
 *     description: การกดไลค์
 *    - name: Comment
 *     description: ข้อมูลคอมเม้น 
 */


/**
 * @swagger
 * /api/auth/csrf: 
 *   get:
 *     summary: token csrf
 *     tags:
 *         - Authentication
 *     description: ขอ token เพื่อยืนยันการการร้องขอ api มาจากเราอย่างถูกต้อง
 *     responses:
 *           200:
 *            description: สำเร็จ
 */

/**
 * @swagger
 * /api/auth/session: 
 *   get:
 *     summary: ดึงข้อมูล session
 *     tags:
 *         - Authentication
 *     description: ขอ session เพื่อดูว่า user อยู่ในระบบหรือยัง
 *     responses:
 *           200:
 *            description: สำเร็จ
 */

/**
 * @swagger
 * /api/auth/signout: 
 *   post:
 *     summary: ออกจากระบบ
 *     tags:
 *         - Authentication
 *     description: ออกจากระบบ
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
 *               csrfToken:
 *                 type: string 
 *     responses:
 *           200:
 *            description: สำเร็จ
 */

/**
 * @swagger
 * /api/auth/callback/credentials:
 *   post:
 *     summary: ล็อกอินเข้าส่ระบบ
 *     tags:
 *        - Authentication
 *     description: ล็อกอินเข้าส่ระบบ.
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               csrfToken:
 *                 type: string  
 *     responses:
 *           200:
 *            description: สำเร็จ
 *           401:
 *            description: ไม่สำเร็จ
 *           500:
 *            description: ไม่สำเร็จ
 * 
 */





const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


