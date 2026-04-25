import pool from "../../db/pool.js";

export async function getNpcs(campId) {
    const { rows } = await pool.query(`SELECT * FROM npcs WHERE campaign_id = ${campId}`);
    return rows;
}

export async function editNpcs({ npcId, npcName, npcDesc, npcAlign }) {
    //TODO: Vet this one so that it only changes the values provided to it.
    const { rows } = await pool.query(`
    UPDATE npcs
    SET npc_name = $1::text, npc_desc = $2::text, npc_align = $3::text
    WHERE id = ${npcId};
    `, [npcName, npcDesc, npcAlign]);
    return rows;
}

export async function createNpc({ name, desc, align, campaignId }) {
    const { rows } = await pool.query(`
    INSERT INTO npcs (npc_name, npc_desc, npc_align, campaign_id)
    VALUES ($1::text, $2::text, $3::text, ${campaignId})
    `, [name, desc, align]);
    return rows;
}

export async function deleteNpc(npcId) {
    const result = await pool.query(`DELETE FROM npcs WHERE id = ${npcId}`);
    return result;
}