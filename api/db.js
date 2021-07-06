import knex from "knex";

const db = knex({
  client: 'mysql',
  connection: {
    host: process.env.db_host || 'localhost',
    user: process.env.db_user || 'root',
    password: process.env.db_pass || 'root',
    database: process.env.db_name || 'stackovercloned',
  },
});

export default db;