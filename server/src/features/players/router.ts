import { Router } from "express";
import { getAll } from "./controller.js";
import { newPlayer } from "./controller.js";
import { removePlayer } from "./controller.js";

const router = Router();

router.get("/:campId", getAll);
router.post("/:campId", newPlayer);
router.delete("/:playerId", removePlayer)

export default router;