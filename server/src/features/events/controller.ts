import * as service from "./service.js";


export async function getAll(req, res) {
    const campId = Number(req.params.campId);
    console.log(campId);
    try {
        const camps = await service.getEvents(campId);
        res.json(camps);
    } catch (err) {
        console.error("Error in events controller", (err as Error).message);
        res.status(500).json({ error: "Failed to fetch all events" });
    }
}

export async function newEvent(req, res) {
    //TODO: Make events follow a date format for more intuitive order management.
    const {desc, time} = req.body
    const campId = Number(req.params.campId);
    if (!desc || !time) {
        res.status(500).json({ error: "Invalid request format" });
    }
    try {
        const ev = await service.createEvent(desc, time, campId);
        res.json(ev);
    } catch (err) {
        console.error("Error in events controller", (err as Error).message);
        res.status(500).json({ error: "Failed to create event" });
    }
}

export async function editEvent(req, res) {
    const eventId = Number(req.params.eventId);
    const { desc, time } = req.body;
    if (!desc || !time) {
        res.status(500).json({ error: "Invalid request format" });
    }
    try {
        const evNpcs = await service.modifyEvent(desc, time, eventId);
        res.json(evNpcs);
    } catch (err) {
        console.error("Error in events controller", (err as Error).message);
        res.status(500).json({ error: "Failed to fetch event npcs" });
    }
}

export async function removeEvent(req, res) {
    const eventId = Number(req.params.eventId);
    try {
        const evNpcs = await service.deleteEvent(eventId);
        res.json(evNpcs);
    } catch (err) {
        console.error("Error in events controller", (err as Error).message);
        res.status(500).json({ error: "Failed to fetch event npcs" });
    }
}