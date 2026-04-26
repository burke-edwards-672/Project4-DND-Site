import { Router } from "express";
import { getAll } from "./controller.js";
import { newCampaign } from "./controller.js";
import { selectCampaign } from "./controller.js";
import { editCampaign } from "./controller.js";
import { removeCampaign } from "./controller.js";

const router = Router();

router.get("/:userId", getAll);
router.post("/:userId", newCampaign);
router.patch("/select/:campId", selectCampaign)
router.patch("/single/:campId", editCampaign);
router.delete("/single/:campId", removeCampaign);

export default router;