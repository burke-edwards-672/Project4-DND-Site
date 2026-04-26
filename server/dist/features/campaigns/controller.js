import * as service from "./service.js";
export async function getAll(req, res) {
    const userId = Number(req.params.userId);
    try {
        const camps = await service.getCampaigns(userId);
        res.json(camps);
    }
    catch (err) {
        console.error("Error in campaigns controller: ", err.message);
        res.status(500).json({ error: "Failed to fetch all campaigns" });
    }
}
export async function newCampaign(req, res) {
    const userId = Number(req.params.userId);
    const { name } = req.body;
    if (!name) {
        return res.status(500).json({ error: "Improper body format" });
    }
    try {
        const camp = await service.createCampaign(name, userId);
        res.json(camp);
    }
    catch (err) {
        console.error("Error in campaigns controller: ", err.message);
        res.status(500).json({ error: "Failed to create campaign" });
    }
}
export async function selectCampaign(req, res) {
    const campId = Number(req.params.campId);
    try {
        const camp = await service.resetCampaignRecency(campId);
        res.json(camp);
    }
    catch (err) {
        console.error("Error in campaigns controller: ", err.message);
        res.status(500).json({ error: "Failed to select campaign" });
    }
}
export async function editCampaign(req, res) {
    const campId = Number(req.params.campId);
    const { name } = req.body;
    if (!name) {
        return res.status(500).json({ error: "Improper body format" });
    }
    try {
        const npc = await service.modifyCampaign(name, campId);
        res.json(npc);
    }
    catch (err) {
        console.error("Error in campaigns controller: ", err.message);
        res.status(500).json({ error: "Failed to edit campaign" });
    }
}
export async function removeCampaign(req, res) {
    const campId = Number(req.params.campId);
    try {
        const camp = await service.deleteCampaign(campId);
        res.json(camp);
    }
    catch (err) {
        console.error("Error in campaigns controller: ", err.message);
        res.status(500).json({ error: "Failed to delete campaign" });
    }
}
//# sourceMappingURL=controller.js.map