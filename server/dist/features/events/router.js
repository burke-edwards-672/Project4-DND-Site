import { Router } from "express";
import { getAll } from "./controller.js";
import { newEvent } from "./controller.js";
import { editEvent } from "./controller.js";
import { removeEvent } from "./controller.js";
const router = Router();
router.get("/:campId", getAll);
router.post("/:campId", newEvent);
router.put("/single/:eventId", editEvent);
router.delete("/single/:eventId", removeEvent);
export default router;
//# sourceMappingURL=router.js.map