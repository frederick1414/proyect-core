import { SessionData } from './../../constants/generalTypes'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { getRepository, Repository } from 'typeorm'
import { ERR_LOG_MUTATION, ERR_LOG_QUERY } from '../../config/generalErrors'
import { HTTP_STATUS_BAD_REQUEST } from '../../config/statusCode'
import { ApiGraphqlError, AuthorizationError } from '../../helpers/apiFunc'
import { isAuth } from '../../helpers/authFunc'
import { Service } from '../../entity/ServiceEntity'
import { QueryServiceInput } from '../types/ServiceType'

/**
 * It returns a repository for the User entity
 */
export const getServiceRepo = (): Repository<Service> => getRepository(Service)

@Resolver(Service)
export class ServiceResolver {



    @Query(() => [Service], {
        description: 'Consultar Usuarios',
    })
    async GetService(
        @Arg('condition', () => QueryServiceInput, {
            description: 'query service argument.',
            nullable: true,
        })
        condition: QueryServiceInput,
        @Ctx('user') user: SessionData
    ): Promise<Service[] | Error> {
        try {
            if (!isAuth(user)) return AuthorizationError

            const response = await getServiceRepo().find(condition)


            return response
        } catch (e) {
            console.log(`${ERR_LOG_QUERY} GetService: ${e}`)
            return new ApiGraphqlError(
                HTTP_STATUS_BAD_REQUEST,
                'Error when consulting user information.',
                e?.message
            )
        }
    }


    @Mutation(() => Service, { description: 'Upsert Services' })
    async InsertService(
        @Arg('condition', () => QueryServiceInput, {
            description: 'Employees args',
        })
        condition: QueryServiceInput,
        @Ctx('user') user: SessionData
    ): Promise<Service[] | Error> {
        try {
            if (!isAuth(user)) return AuthorizationError

            const { businessId: BUSINESS_ID } = user


            const servisce = {
                ...condition,
                BUSINESS_ID,//
                CREATED_USER: user.username,//
                CREATED_DATE: new Date(),//
            }

            // service_id: string
            // description: string
            // BUSINESS_ID: string
            // ESTATUS: string
            // TIME?: number
            // CREATED_DATE: Date
            // UPDATE_DATE: Date
            // EMPLOYEE_ID: string
            // AMOUNT?:string
          
            // }s
            

            const response = await getServiceRepo().insert(servisce)


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