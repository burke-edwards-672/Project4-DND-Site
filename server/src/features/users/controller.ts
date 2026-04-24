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

export async function getUser(req, res) {
    //TODO: validate
    const userId = Number(req.params.id);
    try {
        const user = await service.getUserById(userId)
        res.json(user);
   } catch (err) {
        console.error("Error in users controller", (err as Error).message);
        res.status(500).json({ error: "Failed to fetch user" });
   }
}

export async function newUser(req, res) {
    //TODO: check if valid user details with typescript
    //Also move this to service.ts
    console.log(req.body);
    const userInfo = req.body;
    if (!userInfo.userName || !userInfo.userPswd) {
        return res.status(500).json({ error: "Improper user format"});
    }
    try {
        const user = await service.createUser(req.body)
        res.json(user);
   } catch (err) {
        console.error("Error in users controller", (err as Error).message);
        res.status(500).json({ error: "Failed to create user" });
   }
}

export async function removeUser(req, res) {
    //TODO: validate
    const userId = Number(req.params.id);
    try {
        const user = await service.deleteUser(userId);
        res.json(user);
   } catch (err) {
        console.error("Error in users controller", (err as Error).message);
        res.status(500).json({ error: "Failed to delete user" });
   }
}