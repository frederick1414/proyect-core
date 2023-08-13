import { SessionData, Upload } from './../../constants/generalTypes'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { getConnection, getRepository, Repository } from 'typeorm'
import { ERR_LOG_MUTATION, ERR_LOG_QUERY } from '../../config/generalErrors'
import { HTTP_STATUS_BAD_REQUEST } from '../../config/statusCode'
import { ApiGraphqlError, AuthorizationError } from '../../helpers/apiFunc'
import { User } from '../../entity/User'
import {
    QueryUserInput,
    RegisterUserInput,
    UpdateUserInput,
} from '../types/UserType'
import { isAuth } from '../../helpers/authFunc'
import {
    ACTIVE_GLOBAL,
    INACTIVE_GLOBAL,
} from '../../config/constants'
import { EncriptPass } from '../../helpers/passwordFunc'
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

            const userInfo = await getServiceRepo().find(condition)


            return userInfo
        } catch (e) {
            console.log(`${ERR_LOG_QUERY} GetService: ${e}`)
            return new ApiGraphqlError(
                HTTP_STATUS_BAD_REQUEST,
                'Error when consulting user information.',
                e?.message
            )
        }
    }












    // @Mutation(() => Service, {
    //     description: 'Service Registration',
    // })
    // async RegisterService(
    //     @Arg('condition', () => RegisterUserInput, {
    //         description: 'condition',
    //     })
    //     condition: RegisterUserInput,
    //     @Ctx('user') user: SessionData
    // ): Promise<Service | Error> {
    //     try {
    //         if (!isAuth(user)) return AuthorizationError;


    //         let pathFile = null

    //         const [serviceExist] = await getServiceRepo().find(condition)

    //         if (serviceExist) {
    //             return Error(`ya existe el service ${serviceExist.description}` )
    //         }
    //         const serviceData = {
    //             ...condition,
    //             STATUS: ACTIVE_GLOBAL,
    //             CREATED_DATE: new Date(),
    //         }

    //         const data = await getServiceRepo().insert(serviceData)

    //         const [insertedUser] = await getServiceRepo().find(data.identifiers[0])

    //         console.log('insertedUser',insertedUser)
    //         return insertedUser[0]
    //     } catch (e) {
    //         console.log(`${ERR_LOG_MUTATION} Register: ${e}`)
    //         return new ApiGraphqlError(
    //             HTTP_STATUS_BAD_REQUEST,
    //             'Error creating service.',
    //             e?.message
    //         )
    //     }
    // }
}