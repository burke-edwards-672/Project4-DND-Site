import { Router } from "express";
import { getUser } from "./controller.js";
import { newUser } from "./controller.js";
import { removeUser } from "./controller.js";
const router = Router();
router.get("/", getUser);
router.post("/", newUser);
router.delete("/:id", removeUser);
export default router;
//# sourceMappingURL=router.js.map