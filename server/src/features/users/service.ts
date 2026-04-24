import pool from "../../db/pool.js";

export async function getAllUsers() {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
}

export async function getUserById(userId) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = ${userId}`);
    return rows;
}

export async function deleteUser(userId) {
    const result = await pool.query(`DELETE FROM users WHERE id = ${userId}`);
    return result;
}

export async function createUser({userName, userPswd, userEmail}) {
    const result = await pool.query(`
    INSERT INTO users (username, password, email)
    VALUES ($1::text, $2::text, $3::text);
    `, [userName, userPswd, userEmail]);
    return result;
}