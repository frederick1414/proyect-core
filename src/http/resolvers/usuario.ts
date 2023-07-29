import { SessionData, Upload } from './../../constants/generalTypes'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { getConnection, getRepository, Repository } from 'typeorm'
import { ERR_LOG_MUTATION, ERR_LOG_QUERY } from '../../config/generalErrors'
import { HTTP_STATUS_BAD_REQUEST } from '../../config/statusCode'
import { ApiGraphqlError, AuthorizationError } from '../../helpers/apiFunc'
import { User } from '../../entity/User'
import {
  QueryUserInput,
  QueryUsuarioInput,
  RegisterUserInput,
  UpdateUserInput,
} from '../types/UserType'
import { GraphQLUpload } from 'graphql-upload'
import { isAuth } from '../../helpers/authFunc'
import {
  ACTIVE_GLOBAL,
  INACTIVE_GLOBAL,
  MAIN_FILE_PATH,
} from '../../config/constants'
import { EncriptPass } from '../../helpers/passwordFunc'
import { Usuario } from '../../entity/usuario'

/**
 * It returns a repository for the User entity
 */
export const getUserRepository = (): Repository<Usuario> => getRepository(Usuario)

@Resolver(User)
export class UserResolver {

  @Query(() => [User], {
    description: 'Consultar Usuarios',
  })
  async GetUserInfo(
    @Arg('userArg', () => QueryUsuarioInput, {
      description: 'query user argument.',
      nullable: true,
    })
    userArg: QueryUsuarioInput,
    @Ctx('user') user: SessionData
  ): Promise<Usuario[] | Error> {
    try {
      if (!isAuth(user)) return AuthorizationError

      const {ID_USUARIO} = userArg

      console.log('ID_USUARIO',ID_USUARIO)
      const userInfo = await getUserRepository().find({
        where: {
          ID_USUARIO:1,
        },
      })


      return userInfo
    } catch (e) {
      console.log(`${ERR_LOG_QUERY} GetUserInfo: ${e}`)
      return new ApiGraphqlError(
        HTTP_STATUS_BAD_REQUEST,
        'Error when consulting user information.',
        e?.message
      )
    }
  }
}
