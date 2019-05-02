const { Pool } = require('pg')

const postgres = new Pool({
  host: process.env.PG_HOST || 'localhost',
  user: process.env.PG_USER || 'alamtalash',
  password: process.env.PG_PASSWORD || '',
  database: process.env.PG_DB || 'spaceexplorer',
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

module.exports = postgres