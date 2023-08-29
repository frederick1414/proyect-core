import { Resolver, Query, Arg, Ctx } from "type-graphql"
import { Repository, getRepository } from "typeorm"
import { ERR_LOG_QUERY } from "../../config/generalErrors"
import { HTTP_STATUS_BAD_REQUEST } from "../../config/statusCode"
import { SessionData } from "../../constants/generalTypes"
import { AuthorizationError, ApiGraphqlError } from "../../helpers/apiFunc"
import { isAuth } from "../../helpers/authFunc"
import { QueryRolInput } from "../types/RolType"
import { Rol } from "../../entity/RolEntity"

/**
 * It returns a repository for the User entity
 */
export const getRolRepo = (): Repository<Rol> => getRepository(Rol)

@Resolver(Rol)
export class RolResolver {


    @Query(() => [Rol], {
        description: 'Consultar Empleadoa',
    })
    async GetRoles(
        @Arg('condition', () => QueryRolInput, {
            description: 'query Rol argument.',
            nullable: true,
        })
        condition: QueryRolInput,
        @Ctx('user') user: SessionData
    ): Promise<Rol[] | Error> {
        try {
            if (!isAuth(user)) return AuthorizationError

            const response = await getRolRepo().find(condition)

            if (response instanceof Error) {
                Error(response.message)
            }

            return response
        } catch (e) {
            console.log(`${ERR_LOG_QUERY} GetRoles: ${e}`)
            return new ApiGraphqlError(
                HTTP_STATUS_BAD_REQUEST,
                'Error when consulting user information.',
                e?.message
            )
        }
    }

}