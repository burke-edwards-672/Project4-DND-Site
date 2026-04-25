import pool from "../../db/pool.js";

export async function getCampaigns(userId) {
    const { rows } = await pool.query(`SELECT * FROM campaigns WHERE user_id = ${userId} ORDER BY recency;`);
    return rows;
}

async function updateRecency(userId) {
    await pool.query(`
    UPDATE campaigns
    SET recency = recency + 1
    WHERE user_id = ${userId}    
    `);
}

export async function resetCampaignRecency(campId) {
    //Todo: Three whole queries, gross
    const { rows } = await pool.query(`SELECT * FROM campaigns WHERE id = ${campId}`);
    if (rows[0].user_id) {
        await updateRecency(rows[0].user_id)
    }
    await pool.query(`UPDATE campaigns SET recency = 0 WHERE id = ${campId}`);
}

export async function createCampaign(name, userId) {
    //TODO: Vet this one so that it only changes the values provided to it.
    await updateRecency(userId);
    const { rows } = await pool.query(`
    INSERT INTO campaigns (user_id, campaign_name)
    VALUES (${userId}, $1);
    `, [name]);
    return rows;
}

export async function modifyCampaign(name, campId) {
    const { rows } = await pool.query(`
    UPDATE campaigns
    SET campaign_name = $1::text
    WHERE id = ${campId};
    `, [name]);
    return rows;
}

export async function deleteCampaign(campId) {
    const result = await pool.query(`DELETE FROM campaigns WHERE id = ${campId}`);
    return result;
}