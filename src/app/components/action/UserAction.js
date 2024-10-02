'use server';

import { query } from "../../../../lib/ConnectDb";

export async function GetUserData(){
    try {
        const result = await query(`SELECT * FROM users`);
        if(result.length < 1) return { error: "No user found" };
        return { data: result };
    } catch (error) {
        return { error: error.message };
    }
}


export async function GetUserScore() {
    try {
        const result = await query(`SELECT * FROM userscore_view WHERE role = 2`)
        return { data: result }
    } catch (error) {
        return { error: error.message }
    }
}

export async function GetUserQuiz() {
    try {
        const result = await query(`SELECT * FROM userquiz_view`);
        return { data: result }
    } catch (error) {
        return { error: error.message }
    }
}