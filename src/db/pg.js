import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.PG_URI
});

export default pool;
