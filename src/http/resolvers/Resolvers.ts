import { AuthResolver } from './AuthResolver'
import { BusinessResolver } from './BusinessResolver'
import { ClientResolver } from './ClientResorver'
import { EmployeesResolver } from './EmployeesResolver'
import { RolResolver } from './RolResolver'
import { ServiceResolver } from './ServiceResolver'
import { TurnsResolver } from './TurnsResolver'
import { UserResolver } from './UserResolver'

export const resolvers = [
    AuthResolver,
    BusinessResolver,
    UserResolver,
    ServiceResolver,
    EmployeesResolver,
    TurnsResolver,
    RolResolver,
    ClientResolver] as const
