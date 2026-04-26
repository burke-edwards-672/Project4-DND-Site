import pool from "../../db/pool.js";
export async function getNpcs(campId) {
    const { rows } = await pool.query(`SELECT * FROM npcs WHERE campaign_id = ${campId}`);
    return rows;
}
export async function createNpc(name, desc, align, campId) {
    const { rows } = await pool.query(`
    INSERT INTO npcs (npc_name, npc_desc, npc_align, campaign_id)
    VALUES ($1::text, $2::text, $3::text, ${campId})
    `, [name, desc, align]);
    return rows;
}
export async function modifyNpc(name, desc, align, npcId) {
    const { rows } = await pool.query(`
    UPDATE npcs
    SET npc_name = $1::text, npc_desc = $2::text, npc_align = $3::text
    WHERE id = ${npcId};
    `, [name, desc, align]);
    return rows;
}
export async function deleteNpc(npcId) {
    const result = await pool.query(`DELETE FROM npcs WHERE id = ${npcId}`);
    return result;
}
//# sourceMappingURL=service.js.map