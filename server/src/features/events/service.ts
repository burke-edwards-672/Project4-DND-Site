import pool from "../../db/pool.js";

export async function getEvents(campId) {
    const { rows } = await pool.query(`SELECT * FROM events WHERE campaign_id = ${campId} ORDER BY time;`);
    return rows;
}

export async function createEvent(desc, time, campId) {
    const { rows } = await pool.query(`
    INSERT INTO events (campaign_id, event_desc, time)
    VALUES (${campId}, $1, $2);
    `, [desc, time]);
    return rows;
}

export async function modifyEvent(desc, time, eventId) {
    const { rows } = await pool.query(`
    UPDATE events
    SET event_desc = $1::text, time = $2
    WHERE id = ${eventId};
    `, [desc, time]);
    return rows;
}

export async function deleteEvent(eventId) {
    const result = await pool.query(`DELETE FROM events WHERE id = ${eventId}`);
    return result;
}