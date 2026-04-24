import "dotenv/config";
import chalk from "chalk";
import app from "./app.js";
import pool from "./db/pool.js";

const PORT = process.env.PORT || 3000;

async function start() {
    //Check if DB is reachable
    try {
        await pool.query("SELECT 1");
        console.log(chalk.green("Successfully connected to database"));
    } catch (err) {
        console.error(chalk.red("Failed to connect to database: "), (err as Error).message);
        process.exit(1);
    }

    //Start HTTP server
    const server = app.listen(PORT, () => {
        console.log(chalk.green(`Server running on port ${PORT}`));
    });

    server.on("error", (err) => {
        console.error(chalk.red("Failed to start server: "), err.message);
        process.exit(1);
    });
}

start();