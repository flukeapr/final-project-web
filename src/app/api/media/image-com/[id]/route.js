import { NextResponse } from "next/server";
import { query } from "../../../../../../lib/ConnectDb";
import fs from 'node:fs/promises'


export async function PUT(req,{params}) {
    try {
        const {id} = params;
        if(!id){
            return NextResponse.json({status: 400 ,message : "please provide id"})
        }
        const file = await req.formData();
        const image = file.get('image');

        if(image.size > 2621440){
            return NextResponse.json({ status: 400, message: "The file must be less than 2.5MB" });
        }
       
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (!allowedTypes.includes(image.type)) {
                return NextResponse.json({ status: 400, message: "The file must be a .jpg or .png" }, { status: 400 });
            }

         let isJpg = false

        image.type === 'image/jpeg' ? isJpg = true : isJpg = false
        const fileName = `media-${id}.${isJpg ? 'jpg' : 'png'}`;

        
        const imageBuffer = await image.arrayBuffer();
        const buffer = new Uint8Array(imageBuffer);
        
        await fs.writeFile(`./public/media/uploads/${fileName}`, buffer);
         const imageUrl = `/media/uploads/${fileName}`
        await query(`UPDATE media SET image = ? WHERE id = ?`, [imageUrl, id]);
        return NextResponse.json({ message: "success" }, { status: 200 })
       

       
        

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}