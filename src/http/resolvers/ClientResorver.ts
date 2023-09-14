import { Resolver, Query, Arg, Ctx, Mutation } from "type-graphql"
import { Repository, getRepository } from "typeorm"
import { ERR_LOG_MUTATION, ERR_LOG_QUERY } from "../../config/generalErrors"
import { HTTP_STATUS_BAD_REQUEST } from "../../config/statusCode"
import { SessionData } from "../../constants/generalTypes"
import { AuthorizationError, ApiGraphqlError } from "../../helpers/apiFunc"
import { isAuth } from "../../helpers/authFunc"
import { Client } from "../../entity/ClientEntity"
import { QueryClientInput } from "../types/ClientType"


/**
 * It returns a repository for the User entity
 */
export const getClientRepo = (): Repository<Client> => getRepository(Client)

@Resolver(Client)
export class ClientResolver {


    @Query(() => [Client], {
        description: 'Consultar Empleadoa',
    })
    async GetClient(
        @Arg('condition', () => QueryClientInput, {
            description: 'query Rol argument.',
            nullable: true,
        })
        condition: QueryClientInput,
        @Ctx('user') user: SessionData
    ): Promise<Client[] | Error> {
        try {
            if (!isAuth(user)) return AuthorizationError

            const response = await getClientRepo().find(condition)

            if (response instanceof Error) {
                Error(response.message)
            }

            return response
        } catch (e) {
            console.log(`${ERR_LOG_QUERY} GetClient: ${e}`)
            return new ApiGraphqlError(
                HTTP_STATUS_BAD_REQUEST,
                'Error when consulting user information.',
                e?.message
            )
        }
    }


    @Mutation(() => Client, { description: 'Update Client' })
    async UpdateClient(
        @Arg('condition', () => QueryClientInput, {
            description: 'Client args',
        })
        condition: QueryClientInput,
        @Ctx('user') user: SessionData
    ): Promise<Client | Error> {
        try {
            if (!isAuth(user)) return AuthorizationError

            const { businessId: BUSINESS_ID } = user
            const { CLIENT_ID } = condition


            const clientUpdate = {
                ...condition,
                BUSINESS_ID,
                UPDATED_USER: user.username,
                UPDATED_DATE: new Date(),
            }

            const response = await getClientRepo().update(
                {
                    CLIENT_ID,
                },
                clientUpdate
            )

            if (response instanceof Error) {
                return Error(response.message)
            }


            return  clientUpdate[0] || ''
        } catch (e) {
            console.log(`${ERR_LOG_MUTATION} UpdateClient: ${e}`)

            return new ApiGraphqlError(
                HTTP_STATUS_BAD_REQUEST,
                'Failed to update Client.',
                e?.message
            )
        }
    }




    @Mutation(() => Client, { description: 'Insert Client' })
    async InsertClient(
        @Arg('condition', () => QueryClientInput, {
            description: 'Client args',
        })
        condition: QueryClientInput,
        @Ctx('user') user: SessionData
    ): Promise<Client[] | Error> {
        try {
            if (!isAuth(user)) return AuthorizationError

            const { businessId: BUSINESS_ID } = user

            const clientUpdate = {
                ...condition,
                BUSINESS_ID,
                CREATED_USER: user.username,
                CREATED_DATE: new Date(),
            }

            const response = await getClientRepo().insert(clientUpdate)

            return response[0]
        } catch (e) {
            console.log(`${ERR_LOG_MUTATION} InsertEmployee: ${e}`)

            return new ApiGraphqlError(
                HTTP_STATUS_BAD_REQUEST,
                'Failed to Insert Employee .',
                e?.message
            )
        }
    }


}