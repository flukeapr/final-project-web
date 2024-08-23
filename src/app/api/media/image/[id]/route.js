import { NextResponse } from "next/server";
import { query } from "../../../../../../lib/ConnectDb";
import fs from 'node:fs/promises'
import sharp from "sharp";


export async function PUT(req,{params}) {
    try {
        const {id} = params;
        if(!id){
            throw Error("Missing id");
        }
        
        const file = await req.formData();
        const image = file.get('image');

        if(image.size > 2621440){
            // size less than 2.5MB
            throw Error("The file must be less than 2.5MB")
        }
       
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (!allowedTypes.includes(image.type)) {
                throw Error("The file must be a .jpg or .png")
            }

       
        const fileName = `media-${id}.jpg`;


        
        const imageBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(imageBuffer);

        let finalBuffer
        if(image.type === 'image/png'){
            finalBuffer = await sharp(buffer).jpeg({quality: 90}).toBuffer();
        }else{
            finalBuffer = buffer
        }
            

        
        await fs.writeFile(`./public/media/uploads/${fileName}`, finalBuffer);
        const imageUrl = `/media/uploads/${fileName}`

        await query(`UPDATE media SET image = ? WHERE id = ?`, [imageUrl, id]);
        return NextResponse.json({ message: "success" }, { status: 200 });
       

       
        

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(req,{params}) {
    try {
        const {id} = params;
        

        const pathJpg = `./public/media/uploads/media-${id}.jpg`;
        

        
        try {
            await fs.access(pathJpg);
            await fs.unlink(pathJpg);
        } catch (err) {
            
            
                return NextResponse.json({ message: "success" }, { status: 200 });
            
        }finally{
            return NextResponse.json({ message: "success" }, { status: 200 });

        }

        
        
       
         
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
        
    }
}