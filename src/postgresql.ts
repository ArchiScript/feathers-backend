import knex from 'knex'
import { parse } from 'pg-connection-string'
import type { Knex } from 'knex'
import type { Application } from './declarations'

declare module './declarations' {
  interface Configuration {
    postgresqlClient: Knex
  }
}

export const postgresql = (app: Application) => {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL not set')
  }

  const pgConfig = parse(connectionString)

  const db = knex({
    client: 'pg',
    connection: {
      host: pgConfig.host ?? undefined,
      port: pgConfig.port ? parseInt(pgConfig.port) : 5432,
      user: pgConfig.user,
      password: pgConfig.password,
      database: pgConfig.database ?? undefined,
      ssl: { rejectUnauthorized: false }
    }
  })

  app.set('postgresqlClient', db)
}
