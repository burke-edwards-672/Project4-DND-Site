import { Router } from "express";
import { getAll } from "./controller.js";
import { getUser } from "./controller.js";
import { newUser } from "./controller.js";
import { removeUser } from "./controller.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getUser);
router.post("/", newUser);
router.delete("/:id", removeUser)

export default router;