import pool from "../../db/pool.js";

export async function getPlayers(campId) {
    const { rows } = await pool.query(`SELECT * FROM players where campaign_id = ${campId}`);
    return rows;
}

export async function editPlayer({ playerId, playerName, playerDesc, playerAlign }) {
    //TODO: Vet this one so that it only changes the values provided to it.
    const { rows } = await pool.query(`
    UPDATE players
    SET player_name = $1::text, player_desc = $2::text, player_align = $3::text
    WHERE id = ${playerId};
    `, [playerName, playerDesc, playerAlign]);
    return rows;
}

export async function createPlayer({ name, desc, align, campaignId }) {
    const { rows } = await pool.query(`
    INSERT INTO players (player_name, player_desc, player_align, campaign_id)
    VALUES ($1::text, $2::text, $3::text, ${campaignId})
    `, [name, desc, align]);
    return rows;
}

export async function deletePlayer(playerId) {
    const result = await pool.query(`DELETE FROM players WHERE id = ${playerId}`);
    return result;
}