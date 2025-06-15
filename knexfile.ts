import type { Knex } from 'knex';
import dotenv from 'dotenv';
dotenv.config(); // load .env early

const sharedConfig: Knex.Config = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for Render external DB
  },
  migrations: {
    directory: './migrations'
  }
};

const config: { [key: string]: Knex.Config } = {
  development: sharedConfig,
  production: sharedConfig
};

module.exports = config;
