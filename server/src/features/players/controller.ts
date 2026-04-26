import * as service from "./service.js";

//Duplicated from npcs, just with name changes.

export async function getAll(req, res) {
    const campId = Number(req.params.campId)
    try {
        const users = await service.getPlayers(campId);
        res.json(users);
    } catch (err) {
        console.error("Error in players controller: ", (err as Error).message);
        res.status(500).json({ error: "Failed to fetch players" });
    }
}

export async function newPlayer(req, res) {
    const campId = Number(req.params.campId);
    const { name, desc, align } = req.body;
    if (!name || !desc || !align) {
        return res.status(500).json({ error: "Improper body format"});
    }
    try {
        const player = await service.createPlayer(name, desc, align, campId)
        res.json(player);
   } catch (err) {
        console.error("Error in players controller: ", (err as Error).message);
        res.status(500).json({ error: "Failed to create player" });
   }
}

export async function editPlayer(req, res) {
    const playerId = Number(req.params.playerId);
    const { name, desc, align } = req.body;
    if (!name || !desc || !align) {
        return res.status(500).json({ error: "Improper body format"});
    }
    try {
        const player = await service.modifyPlayer( name, desc, align, playerId)
        res.json(player);
   } catch (err) {
        console.error("Error in players controller: ", (err as Error).message);
        res.status(500).json({ error: "Failed to edit player" });
   }
}

export async function removePlayer(req, res) {
    const playerId = Number(req.params.playerId);
    try {
        const player = await service.deletePlayer(playerId);
        res.json(player);
   } catch (err) {
        console.error("Error in players controller:", (err as Error).message);
        res.status(500).json({ error: "Failed to delete player" });
   }
}