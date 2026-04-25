import { Router } from "express";
import { getAll } from "./controller.js";
import { newNpc } from "./controller.js";
import { removeNpc } from "./controller.js";

const router = Router();

router.get("/:campId", getAll);
router.post("/:campId", newNpc);
router.delete("/:npcId", removeNpc)

export default router;