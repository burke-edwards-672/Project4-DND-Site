import * as service from "./service.js";

export async function getAll(req, res) {
    try {
        const users = await service.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error("Error in users controller", (err as Error).message);
        res.status(500).json({ error: "Failed to fetch all users" });
    }
}