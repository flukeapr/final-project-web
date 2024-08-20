import { NextResponse } from "next/server";
import { query } from "../../../../lib/ConnectDb";
import bcrypt from "bcrypt";

const avatars = [
   "/images/avatars/avatar1.png",
   "/images/avatars/avatar2.png",
   "/images/avatars/avatar3.png",
   "/images/avatars/avatar4.png",
];

function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = getRandomItem(avatars);
    const result  = await  query(`SELECT * FROM users WHERE email = ?`, [email]);
    const  hasEmail = result[0];

    if (hasEmail) {
      throw  Error("Email already exists");
    }

    await query(
      `INSERT INTO users (name, email, password, role_id, image) VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, role, avatar]
    );
    const resultId  = await  query(`SELECT id FROM users WHERE email = ?`, [email]);
    const id = resultId[0];

    await query(`INSERT INTO userscore (userId) VALUES (?)`, [id.id]);

    return NextResponse.json({ message: "User created successfully" , id:id.id}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
    
  }
}

export async function GET(req) {
  try {
    const dataUser = getRandomItem(avatars);
    return NextResponse.json({ avatar: dataUser });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
