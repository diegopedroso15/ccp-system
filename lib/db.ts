import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "9736",
  database: "esi-project-b",
  port: 5432,
  max: 100,
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 2000,
});

export default pool;
