import type { Knex } from 'knex';
import dotenv from 'dotenv';
import { parse } from 'pg-connection-string';
dotenv.config();

const pgConfig = parse(process.env.DATABASE_URL!);

const sharedConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: pgConfig.host ?? undefined,
    port: pgConfig.port ? parseInt(pgConfig.port) : 5432,
    user: pgConfig.user,
    password: pgConfig.password,
    database: pgConfig.database ?? undefined,
    ssl: { rejectUnauthorized: false }
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