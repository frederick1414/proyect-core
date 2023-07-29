import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import { resolve } from 'path'
import { resolvers } from './Resolvers'

export const createSchema = async (): Promise<GraphQLSchema> =>
  await buildSchema({
    resolvers,
  })
