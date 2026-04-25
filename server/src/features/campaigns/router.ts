import { Router } from "express";
import { getAll } from "./controller.js";
import { newCampaign } from "./controller.js";
import { selectCampaign } from "./controller.js";
import { editCampaign } from "./controller.js";
import { removeCampaign } from "./controller.js";

const router = Router();

//TODO: Make better routes, cuz these are a little clunky to remember

router.get("/:userId", getAll);
router.post("/:userId", newCampaign);
router.patch("/recency/:campId", selectCampaign)
router.patch("/:campId", editCampaign);
router.delete("/:campId", removeCampaign);

export default router;