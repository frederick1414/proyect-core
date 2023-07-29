import { config } from 'dotenv'

config()

export const configurations = {
  PROD: {
    ssl: false,
    port: process.env.APP_PORT,
    hostname: `${process.env.BACKEND_URL}`,
    playground: false,
    apollo_graph: true,
    introspection: false,
    db: 'prod',
  },
  DEV: {
    ssl: false,
    port: process.env.APP_PORT,
    hostname: 'localhost',
    playground: true,
    apollo_graph: true,
    introspection: true,
    db: 'dev',
  },
}
