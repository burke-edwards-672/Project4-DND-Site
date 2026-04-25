import express from "express";
import cors from "cors";
//import swaggerUi from "swagger-ui-express";
//import swaggerFile from "../swagger-output.json" with { type: "json" };
import type { Request, Response, NextFunction } from "express";

//Routers imports:
import usersRouter from "./features/users/router.js";
import playersRouter from "./features/players/router.js";
import npcsRouter from "./features/npcs/router.js";
//import campaignsRouter from "./features/campaigns/router.js";

const app = express();

//Middleware:
app.use(cors());
app.use(express.json());

//swagger stuff goes here

//health
app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", uptime: process.uptime() });
});

//Routers
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/players", playersRouter);
app.use("/api/v1/npcs", npcsRouter);
//app.use("api/v1/campaigns". campaignsRouter);

//404
app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found" });
});

//Error route
app.use((err: { status?: number, message?: string, stack?: string }, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status ?? 500).json({ error: err.message ?? "Internal server error" });
});

export default app;