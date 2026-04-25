import * as service from "./service.js";


export async function getAll(req, res) {
    const campaignId = Number(req.params.campId)
    try {
        const users = await service.getPlayers(campaignId);
        res.json(users);
    } catch (err) {
        console.error("Error in users controller", (err as Error).message);
        res.status(500).json({ error: "Failed to fetch all users" });
    }
}

export async function newPlayer(req, res) {
    //TODO: check if valid user details with typescript
    //Also move this to service.ts
    const campId = Number(req.params.campId);
    const playerInfo = req.body;
    if (!playerInfo.name || !playerInfo.desc || !playerInfo.align) {
        return res.status(500).json({ error: "Improper player format"});
    }
    try {
        const player = await service.createPlayer({ ...req.body, campaignId: campId})
        res.json(player);
   } catch (err) {
        console.error("Error in players controller", (err as Error).message);
        res.status(500).json({ error: "Failed to create player" });
   }
}

export async function removePlayer(req, res) {
    //TODO: validate
    const playerId = Number(req.params.playerId);
    try {
        const player = await service.deletePlayer(playerId);
        res.json(player);
   } catch (err) {
        console.error("Error in player controller", (err as Error).message);
        res.status(500).json({ error: "Failed to delete player" });
   }
}