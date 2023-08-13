import { AuthResolver } from './AuthResolver'
import { BusinessResolver } from './BusinessResolver'
import { ServiceResolver } from './ServiceResolver'
import { UserResolver } from './UserResolver'

export const resolvers = [AuthResolver, BusinessResolver,UserResolver,ServiceResolver] as const
  