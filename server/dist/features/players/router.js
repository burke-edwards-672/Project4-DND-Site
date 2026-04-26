import { Router } from "express";
import { getAll } from "./controller.js";
import { newPlayer } from "./controller.js";
import { editPlayer } from "./controller.js";
import { removePlayer } from "./controller.js";
const router = Router();
//Duplicated from npcs, just with name changes.
router.get("/:campId", getAll);
router.post("/:campId", newPlayer);
router.put("/single/:playerId", editPlayer);
router.delete("/single/:playerId", removePlayer);
export default router;
//# sourceMappingURL=router.js.map