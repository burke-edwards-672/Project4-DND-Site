import pg from "pg";
import "dotenv/config";

const { Pool } = pg

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

//Taken from lecture notes, something about making the exit process smoother.
process.on('SIGINT', async () => {
    await pool.end();
    process.exit(0);
});

export default pool;