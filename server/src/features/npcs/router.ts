import { Router } from "express";
import { getAll } from "./controller.js";
import { newNpc } from "./controller.js";
import { editNpc } from "./controller.js";
import { removeNpc } from "./controller.js";

const router = Router();

router.get("/:campId", getAll);
router.post("/:campId", newNpc);
router.put("/single/:npcId", editNpc);
router.delete("/single/:npcId", removeNpc);

export default router;