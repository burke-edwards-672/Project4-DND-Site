import pool from "../../db/pool.js";
export async function getCampaigns(userId) {
    const { rows } = await pool.query(`SELECT * FROM campaigns WHERE user_id = ${userId} ORDER BY recency;`);
    return rows;
}
async function updateRecency(userId) {
    //"recency" column in campaigns table keeps track of the order in which they've all been opened last.
    //0 is the lowest, and is unique to the most-recently-opened campaign.
    await pool.query(`
    UPDATE campaigns
    SET recency = recency + 1
    WHERE user_id = ${userId}    
    `);
}
export async function resetCampaignRecency(campId) {
    const { rows } = await pool.query(`SELECT * FROM campaigns WHERE id = ${campId}`);
    if (rows[0].user_id) {
        await updateRecency(rows[0].user_id);
    }
    await pool.query(`UPDATE campaigns SET recency = 0 WHERE id = ${campId}`);
}
export async function createCampaign(name, userId) {
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
//# sourceMappingURL=service.js.map