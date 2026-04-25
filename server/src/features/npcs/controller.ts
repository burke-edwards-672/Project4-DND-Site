import * as service from "./service.js";


export async function getAll(req, res) {
    const campaignId = Number(req.params.campId)
    try {
        const users = await service.getNpcs(campaignId);
        res.json(users);
    } catch (err) {
        console.error("Error in users controller", (err as Error).message);
        res.status(500).json({ error: "Failed to fetch all users" });
    }
}

export async function newNpc(req, res) {
    //TODO: check if valid user details with typescript
    //Also move this to service.ts
    const campId = Number(req.params.campId);
    const npcInfo = req.body;
    if (!npcInfo.name || !npcInfo.desc || !npcInfo.align) {
        return res.status(500).json({ error: "Improper npc format"});
    }
    try {
        const npc = await service.createNpc({ ...req.body, campaignId: campId})
        res.json(npc);
   } catch (err) {
        console.error("Error in npcs controller", (err as Error).message);
        res.status(500).json({ error: "Failed to create npc" });
   }
}

export async function removeNpc(req, res) {
    //TODO: validate
    const npcId = Number(req.params.npcId);
    try {
        const npc = await service.deleteNpc(npcId);
        res.json(npc);
   } catch (err) {
        console.error("Error in npc controller", (err as Error).message);
        res.status(500).json({ error: "Failed to delete npc" });
   }
}