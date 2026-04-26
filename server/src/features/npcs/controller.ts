import * as service from "./service.js";


export async function getAll(req, res) {
    const campId = Number(req.params.campId)
    try {
        const users = await service.getNpcs(campId);
        res.json(users);
    } catch (err) {
        console.error("Error in npcs controller: ", (err as Error).message);
        res.status(500).json({ error: "Failed to fetch npcs" });
    }
}

export async function newNpc(req, res) {
    const campId = Number(req.params.campId);
    const { name, desc, align } = req.body;
    if (!name || !desc || !align) {
        return res.status(500).json({ error: "Improper body format"});
    }
    try {
        const npc = await service.createNpc(name, desc, align, campId)
        res.json(npc);
   } catch (err) {
        console.error("Error in npcs controller: ", (err as Error).message);
        res.status(500).json({ error: "Failed to create npc" });
   }
}

export async function editNpc(req, res) {
    const npcId = Number(req.params.npcId);
    const { name, desc, align } = req.body;
    if (!name || !desc || !align) {
        return res.status(500).json({ error: "Improper body format"});
    }
    try {
        const npc = await service.modifyNpc( name, desc, align, npcId)
        res.json(npc);
   } catch (err) {
        console.error("Error in npcs controller: ", (err as Error).message);
        res.status(500).json({ error: "Failed to edit npc" });
   }
}

export async function removeNpc(req, res) {
    const npcId = Number(req.params.npcId);
    try {
        const npc = await service.deleteNpc(npcId);
        res.json(npc);
   } catch (err) {
        console.error("Error in npcs controller:", (err as Error).message);
        res.status(500).json({ error: "Failed to delete npc" });
   }
}