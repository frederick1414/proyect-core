import { SessionData } from './../../constants/generalTypes'
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
import { BUSINESS_ID_DEFAULT, ROL_EMPLOYEE, ROL_USER_DEFAULT } from '../../constants/parameter'
import {getRolRepo } from './RolResolver'
import { EmployeesResolver } from './EmployeesResolver'

/**
 * It returns a repository for the User entity
 */
export const getUserRepository = (): Repository<User> => getRepository(User)

@Resolver(User)
export class UserResolver {
  @Mutation(() => User, {
    description: 'User Registration',
  })
  async Register(
    @Arg('newUser', () => RegisterUserInput, {
      description: 'new user args',
    })
    newUser: RegisterUserInput,
    @Ctx('user') user: SessionData
  ): Promise<User | Error> {
    try {
      // if (!isAuth(user)) return AuthorizationError;

      const { USERNAME, PASSWORD } = newUser
      // newUser.PASSWORD = await EncriptPass(PASSWORD)

      // const BUSINESS_ID = user ? user.businessId : BUSINESS_ID_DEFAULT

      let pathFile = null

      const [userExist] = await getUserRepository().find({
        where: {
          USERNAME: USERNAME,
        },
      })


      // const rol = await getRolRepo().find({ where: { BUSINESS_ID, NAME: user.roles } })

      // if (rol instanceof Error) {
      //   Error(rol.message)
      // }

      if (userExist) return Error(`User '${USERNAME}' is already registered.`)



      const userData = {
        ...newUser,
        STATUS: ACTIVE_GLOBAL,
        CREATED_DATE: new Date(),
        CREATED_USER: user?.username || 'TEST',
        // IMAGE: pathFile,
        BUSINESS_ID: newUser.BUSINESS_ID || BUSINESS_ID_DEFAULT,
        ROL_ID: ROL_USER_DEFAULT
      }


      console.log('userDatacondition', userData)

      const data = await getUserRepository().insert(userData)

      // const [insertedUser] = await getUserRepository().find(data.identifiers[0])

      // delete insertedUser.PASSWORD

      return userData
    } catch (e) {
      console.log(`${ERR_LOG_MUTATION} Register: ${e}`)
      return new ApiGraphqlError(
        HTTP_STATUS_BAD_REQUEST,
        'Error creating user.',
        e?.message
      )
    }
  }

  @Mutation(() => User, { description: 'Update user' })
  async UpdateUser(
    @Arg('userUpdate', () => UpdateUserInput, {
      description: 'user args',
    })
    userUpdate: UpdateUserInput,
    @Ctx('user') user: SessionData
  ): Promise<User | Error> {
    try {
      if (!isAuth(user)) return AuthorizationError
      const conection = getConnection()
      const Employees = new EmployeesResolver()
      const { USER_ID, ROL_ID, USERNAME } = userUpdate

      const BUSINESS_ID = user.businessId

      if (!userUpdate.PASSWORD) delete userUpdate.PASSWORD

      if (userUpdate.PASSWORD?.length >= 1) {
        userUpdate.PASSWORD = await EncriptPass(userUpdate.PASSWORD)
      }

      const queryBuilder = conection.createQueryBuilder()
        .select('MAX(EMPLOYEE_ID)', 'max_id')
        .from('employees', 'e') 
        .where('e.BUSINESS_ID = :businessId', { businessId: BUSINESS_ID });

      const result = await queryBuilder.getRawOne();

      const SECUENCIA = Number(result.max_id)

      if (ROL_ID === ROL_EMPLOYEE) {

        const _usuario = await getUserRepository().find(
          {
            where: {
              USER_ID

            }
            ,
          })

        if (_usuario instanceof Error) {
          return Error(_usuario.message)
        }

        const {
          PHONE,
          EMAIL,
          STATUS: ESTATUS,
          USERNAME,
        } = _usuario[0]

        const EMPLOYEE_ID = SECUENCIA + 1
        const CREATED_DATE = new Date()
        const CREATED_USER = user.username

        const condition = {
          EMPLOYEE_ID: EMPLOYEE_ID?.toString(),
          ESTATUS,
          PHONE_NUMBER: PHONE,
          USERNAME,
          EMAIL,
          USER_ID,
          ROL_ID,
          CREATED_DATE,
          CREATED_USER,
        }

        await Employees.InsertEmployee(condition, user)
      }


      const exist = await getUserRepository().find({
        USER_ID,
      })

      if (!exist.length) {
        return Error('The user trying to update does not exist.')
      }

      if (userUpdate.EMAIL) {
        const userEmail = await getConnection()
          .createQueryBuilder(User, 'u')
          .where('u.EMAIL = :email', { email: userUpdate.EMAIL })
          .andWhere('u.USER_ID != :userId', {
            userId: userUpdate.USER_ID,
          })
          .getOne()

        if (userEmail)
          return Error(`Email '${userUpdate.EMAIL}' is already registered.`)
      }

      if (userUpdate.USERNAME) {
        const userEmail = await getConnection()
          .createQueryBuilder(User, 'u')
          .where('u.USERNAME = :userName', {
            userName: userUpdate.USERNAME,
          })
          .andWhere('u.USER_ID != :userId', {
            userId: userUpdate.USER_ID,
          })
          .getOne()

        if (userEmail)
          return Error(`User '${userUpdate.USERNAME}' is already registered.`)
      }

      delete userUpdate.USER_ID

      const userData = {
        ...userUpdate,
        EMPLOYEE_ID: SECUENCIA?.toString() || null,
        UPDATED_USER: user.username,
        UPDATED_DATE: new Date(),
      }

      await getUserRepository().update(
        {
          USER_ID,
        },
        userData
      )

      const [updatedUser] = await getUserRepository().find({
        USER_ID,
      })

      delete updatedUser.PASSWORD

      return updatedUser
    } catch (e) {
      console.log(`${ERR_LOG_MUTATION} UpdateUser: ${e}`)

      return new ApiGraphqlError(
        HTTP_STATUS_BAD_REQUEST,
        'Failed to update user.',
        e?.message
      )
    }
  }

  @Query(() => User, {
    description: 'Consult information of the connected user',
  })
  async Profile(@Ctx('user') user: SessionData): Promise<User | Error> {
    try {
      if (!isAuth(user)) return AuthorizationError

      const [userInfo] = await getUserRepository().find({
        where: {
          USERNAME: user.username,
        },
      })

      delete userInfo?.PASSWORD

      return userInfo
    } catch (e) {
      console.log(`${ERR_LOG_QUERY} Profile: ${e}`)
      return new ApiGraphqlError(
        HTTP_STATUS_BAD_REQUEST,
        'Error when consulting user information.',
        e?.message
      )
    }
  }

  @Query(() => [User], {
    description: 'Consultar Usuarios',
  })
  async GetUserInfo(
    @Arg('userArg', () => QueryUserInput, {
      description: 'query user argument.',
      nullable: true,
    })
    userArg: QueryUserInput,
    @Ctx('user') user: SessionData
  ): Promise<User[] | Error> {
    try {
      if (!isAuth(user)) return AuthorizationError

      const userInfo = await getUserRepository().find({
        where: {
          ...userArg,
          BUSINESS_ID: user.businessId,
        },
      })

      userInfo.forEach((v) => {
        delete v.PASSWORD
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

  @Mutation(() => String, { description: 'Delete User' })
  async DeleteUser(
    @Arg('idUser', () => String) idUser: string,
    @Ctx('user') user: SessionData
  ): Promise<string | Error> {
    try {
      if (!isAuth(user)) return AuthorizationError

      await getUserRepository().update(
        {
          USER_ID: idUser,
        },
        {
          STATUS: INACTIVE_GLOBAL,
          UPDATED_DATE: new Date(),
          UPDATED_USER: user.username,
        }
      )

      const deleted = await getUserRepository().find({
        USER_ID: idUser,
        STATUS: INACTIVE_GLOBAL,
      })

      if (!deleted.length) return Error('Error deleting user')

      return 'User deleted successfully'
    } catch (e) {
      console.log(`${ERR_LOG_MUTATION} <DeleteProvince>: ${e}`)
      return new ApiGraphqlError(
        HTTP_STATUS_BAD_REQUEST,
        'Error deleting user.',
        e?.message
      )
    }
  }


  @Mutation(() => User, { description: 'Update user' })
  async UpdateRolUser(
    @Arg('userUpdate', () => UpdateUserInput, {
      description: 'user args',
    })
    userUpdate: UpdateUserInput,
    @Ctx('user') user: SessionData
  ): Promise<User | Error> {
    try {
      if (!isAuth(user)) return AuthorizationError

      const { USER_ID } = userUpdate
      // validar row
      const exist = await getUserRepository().find({
        USER_ID,
      })

      if (!exist.length) {
        return Error('The user trying to update does not exist.')
      }

      const userData = {
        ...userUpdate,
        UPDATED_USER: user.username,
        UPDATED_DATE: new Date(),
      }

      await getUserRepository().update(
        {
          USER_ID,
        },
        userData
      )

      const [updatedUser] = await getUserRepository().find({
        USER_ID,
      })

      delete updatedUser.PASSWORD

      return updatedUser
    } catch (e) {
      console.log(`${ERR_LOG_MUTATION} UpdateUser: ${e}`)

      return new ApiGraphqlError(
        HTTP_STATUS_BAD_REQUEST,
        'Failed to update user.',
        e?.message
      )
    }
  }

}
