import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'
import cors from 'cors'
import { verify } from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { graphqlUploadExpress } from 'graphql-upload'
import { join } from 'path'
import colors from 'colors'

import { createSchema } from '../http/resolvers/createSchema'
import { configurations } from '../config/config'
import {
  ARGUMENT_VALIDATION_ERROR,
  INTERNAL_SERVER_ERROR,
} from '../config/generalErrors'
import { GraphQLError } from 'graphql'

const environment = process.env.NODE_ENV || 'DEV'
const config = configurations[environment]

export const startServer = async (): Promise<void> => {
  try {
    const app = express()

    app.use(cookieParser())
    app.use(bodyParser.json())
    app.use(cors({ origin: '*' }))

    const schema = await createSchema()

    console.log({ config: config })

    app.use(graphqlUploadExpress({ maxFileSize: 20000000, maxFiles: 10 }))

    // ? setup the logger

    const server = new ApolloServer({
      schema,
      uploads: false,
      subscriptions: {
        keepAlive: 30000,
      },
      context: ({ req }) => {
        try {
          const token = req?.header('authorization') || ''

          if (token) {
            const user = verify(token, process.env.JWT_SECRET)
            return {
              user: user,
              ip: req.ip,
            }
          }
        } catch (error) {
          console.log(error)
        }
      },
      formatError: (err: GraphQLError) => {
        console.log(
          '🚀 ~ file: server.ts ~ line 76 ~ startServer ~ GraphQLError',
          err
        )

        if (err.message.startsWith('Database Error: ')) {
          return new GraphQLError(INTERNAL_SERVER_ERROR)
        }

        if (err.extensions?.exception.validationErrors) {
          err.message = ARGUMENT_VALIDATION_ERROR
        }

        delete err.extensions?.exception?.stacktrace

        return err
      },
      playground: config?.playground,
      introspection: config?.introspection,
    })

    app.use(express.static(join(process.cwd(), 'Assets')))

    server.applyMiddleware({
      app,
      path: '/graphql',
    })

    let httpServer

    if (config.ssl) {
      // activate ssl
      // const httpsOptions = {
      //   key: readFileSync(''),
      //   cert: readFileSync(''),
      //   ca: [readFileSync('')],
      // }
      // // create https server
      // httpServer = ScreateServer.createServer(httpsOptions, app)
    } else {
      // create https server
      httpServer = createServer(app)
    }

    server.installSubscriptionHandlers(httpServer)

    httpServer.listen(process.env.APP_PORT)

    console.log(
      colors.magenta(`🚀 Server Started at port: ${process.env.APP_PORT}`)
    )
  } catch (e) {
    console.log(`Server error: ${e}`)
  }
}
