import { Resolver, Query, Arg, Ctx } from "type-graphql"
import { Repository, getRepository } from "typeorm"
import { ERR_LOG_QUERY } from "../../config/generalErrors"
import { HTTP_STATUS_BAD_REQUEST } from "../../config/statusCode"
import { SessionData } from "../../constants/generalTypes"
import { AuthorizationError, ApiGraphqlError } from "../../helpers/apiFunc"
import { isAuth } from "../../helpers/authFunc"
import { Employees } from "../../entity/EmployeeEntity"
import { QueryEmployeesInput } from "../types/EmployeeType"

/**
 * It returns a repository for the User entity
 */
export const getEmployeesRepo = (): Repository<Employees> => getRepository(Employees)

@Resolver(Employees)
export class EmployeesResolver {


    @Query(() => [Employees], {
        description: 'Consultar Empleadoa',
    })
    async GetEmployee(
        @Arg('condition', () => QueryEmployeesInput, {
            description: 'query employees argument.',
            nullable: true,
        })
        condition: QueryEmployeesInput,
        @Ctx('user') user: SessionData
    ): Promise<Employees[] | Error> {
        try {
            if (!isAuth(user)) return AuthorizationError

            const response = await getEmployeesRepo().find(condition)

            return response
        } catch (e) {
            console.log(`${ERR_LOG_QUERY} GetEmployee: ${e}`)
            return new ApiGraphqlError(
                HTTP_STATUS_BAD_REQUEST,
                'Error when consulting user information.',
                e?.message
            )
        }
    }

}