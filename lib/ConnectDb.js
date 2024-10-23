import mysql from 'mysql2/promise'; // npm install mysql2 package ที่เอาไว้เชื่อม database


export const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE, 
    connectionLimit:100 
});

export const query = async (sql, params) => { 
  try {
    const [rows] = await pool.query(sql, params); 
  
    return rows;
  } catch (error) {
    console.error('Database query error:', error.message); 
     throw new Error('Database query failed '+error.message);
  }
   
  };


