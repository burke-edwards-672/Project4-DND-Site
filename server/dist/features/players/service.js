import pool from "../../db/pool.js";
//Duplicated from npcs, just with name changes.
export async function getPlayers(campId) {
    const { rows } = await pool.query(`SELECT * FROM players WHERE campaign_id = ${campId}`);
    return rows;
}
export async function createPlayer(name, desc, align, campId) {
    const { rows } = await pool.query(`
    INSERT INTO players (player_name, player_desc, player_align, campaign_id)
    VALUES ($1::text, $2::text, $3::text, ${campId})
    `, [name, desc, align]);
    return rows;
}
export async function modifyPlayer(name, desc, align, playerId) {
    const { rows } = await pool.query(`
    UPDATE players
    SET player_name = $1::text, player_desc = $2::text, player_align = $3::text
    WHERE id = ${playerId};
    `, [name, desc, align]);
    return rows;
}
export async function deletePlayer(playerId) {
    const result = await pool.query(`DELETE FROM players WHERE id = ${playerId}`);
    return result;
}
//# sourceMappingURL=service.js.map