import { Pool } from "pg";

const pool = new Pool({
  /* connectionString: process.env.POSTGRES_URL, */
  user: 'postgres',
  host: 'localhost',
  database: 'esi-project-b',
  password: '9736'
});

export default pool;
