import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { query } from "../../../../lib/ConnectDb";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const body = await req.json();
        const {email} = body;
        const result = await query(`SELECT * FROM users WHERE email = ?`, [email]);
        if(result.length===0){
            return NextResponse.json({message: "Email not found"},{status: 404});
        }
        if(result){
            const token = jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: "30m" });
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            var transport = nodemailer.createTransport({
                secure:true,
                host:'smtp.gmail.com',
                port:465,
                auth: {
                  user: process.env.MAIL_USER,
                  pass: process.env.MAIL_PASSWORD
                }
              });
              const htmlBody = `<div>
              <h1>Please click on the link below to reset your password</h1>
              <a href= "https://17b9-2405-9800-bc20-5d14-9410-3020-2626-f7e1.ngrok-free.app/reset-password/${token}">Reset Password</a>
              </div>`
              const info = await transport.sendMail({
                from: "HappyMind@example.com",
                to:  email, 
                subject: "Reset Your Password",
                text: "Please reset your password using the link below.",
                html: htmlBody, 
              });
              console.log("Message sent: %s", info.messageId);
              return NextResponse.json({message: "Email sent"},{status: 200});
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}