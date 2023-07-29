import { AuthResolver } from './AuthResolver'
import { BusinessResolver } from './BusinessResolver'

export const resolvers = [AuthResolver, BusinessResolver] as const
