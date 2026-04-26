import pool from "../../db/pool.js";
export async function getUser(username, password) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE username = $1::text AND password = $2::text`, [username, password]);
    return rows;
}
export async function createUser(username, password, email) {
    const result = await pool.query(`
    INSERT INTO users (username, password, email)
    VALUES ($1::text, $2::text, $3::text);
    `, [username, password, email]);
    return result;
}
export async function deleteUser(userId) {
    const result = await pool.query(`DELETE FROM users WHERE id = ${userId}`);
    return result;
}
//# sourceMappingURL=service.js.map