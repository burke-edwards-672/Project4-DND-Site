import { Router } from "express";
import { getAll } from "./controller.js";
import { newEvent } from "./controller.js";
import { editEvent } from "./controller.js";
import { removeEvent } from "./controller.js";


const router = Router();

//TODO: Make better routes, cuz these are a little clunky to remember
//I don't like that getAll (/:campId) and editEvent (/:eventId) follow the exact same format.
//That is very bad!

router.get("/:campId", getAll);
router.post("/:campId", newEvent);
router.put("/:eventId", editEvent); //Only changes description and/or rel_time, which I still need to figure out the logic behind
router.delete("/:eventId", removeEvent);

export default router;