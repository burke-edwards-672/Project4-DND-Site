import * as service from "./service.js";

export async function getUser(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(500).json({ error: "Improper body format" });
    }
    try {
        const user = await service.getUser(username, password);
        res.json(user);
   } catch (err) {
        console.error("Error in users controller: ", (err as Error).message);
        res.status(500).json({ error: "Failed to fetch user" });
   }
}

export async function newUser(req, res) {
    console.log(req.body);
    const { username, password, email } = req.body;
    if (!username || !password) {
        return res.status(500).json({ error: "Improper body format"});
    }
    try {
        const user = await service.createUser(username, password, email)
        res.json(user);
   } catch (err) {
        console.error("Error in users controller: ", (err as Error).message);
        res.status(500).json({ error: "Failed to create user" });
   }
}

export async function removeUser(req, res) {
    const userId = Number(req.params.id);
    try {
        const user = await service.deleteUser(userId);
        res.json(user);
   } catch (err) {
        console.error("Error in users controller: ", (err as Error).message);
        res.status(500).json({ error: "Failed to delete user" });
   }
}