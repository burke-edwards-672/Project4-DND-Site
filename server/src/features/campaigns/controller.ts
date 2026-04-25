import * as service from "./service.js";


export async function getAll(req, res) {
    const userId = Number(req.params.userId);
    try {
        const camps = await service.getCampaigns(userId);
        res.json(camps);
    } catch (err) {
        console.error("Error in campaigns controller", (err as Error).message);
        res.status(500).json({ error: "Failed to fetch all campaigns" });
    }
}

export async function newCampaign(req, res) {
    const userId = Number(req.params.userId);
    const campaignName = req.body.name;
    if (!campaignName) {
        return res.status(500).json({ error: "Improper campaign format"});
    }
    try {
        const camp = await service.createCampaign(campaignName, userId)
        res.json(camp);
   } catch (err) {
        console.error("Error in campaignscontroller", (err as Error).message);
        res.status(500).json({ error: "Failed to create campaign" });
   }
}

export async function selectCampaign(req, res) {
    const campId = Number(req.params.campId);
    try {
        const camp = await service.resetCampaignRecency(campId);
        res.json(camp);
   } catch (err) {
        console.error("Error in campaigns controller", (err as Error).message);
        res.status(500).json({ error: "Failed to create campaign" });
   }
}

export async function editCampaign(req, res) {
    const campId = Number(req.params.campId);
    const newName = req.body.name
    if (!newName) {
        return res.status(500).json({ error: "Improper campaign format"});
    }
    try {
        const npc = await service.modifyCampaign(newName, campId);
        res.json(npc);
   } catch (err) {
        console.error("Error in campaigns controller", (err as Error).message);
        res.status(500).json({ error: "Failed to patch campaigns" });
   }
}

export async function removeCampaign(req, res) {
    //TODO: validate
    const campId = Number(req.params.campId);
    try {
        const camp = await service.deleteCampaign(campId);
        res.json(camp);
   } catch (err) {
        console.error("Error in campaigns controller", (err as Error).message);
        res.status(500).json({ error: "Failed to delete campaigns" });
   }
}