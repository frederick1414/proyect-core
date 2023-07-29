import 'reflect-metadata'
import { startServer } from './services/server'
import { startMySqlDBConnection } from './db/connection/mySqlDb'

require('./config/config')

const main = async (): Promise<void> => {
  await startMySqlDBConnection()
  await startServer()
}

main()
