import { Arg, Mutation, Resolver } from 'type-graphql'
import { EMAIL_ERROR, ERR_LOG_MUTATION } from '../../config/generalErrors'
import { HTTP_STATUS_BAD_REQUEST } from '../../config/statusCode'
import { UserRol } from '../../constants/generalTypes'
import { ApiGraphqlError } from '../../helpers/apiFunc'
import { generateToken, getSessionExpirationDate } from '../../helpers/sesion'
import { LoginInput, SesionData } from '../types/AuthType'
import { getUserRepository } from './UserResolver'

import { compare } from 'bcrypt'
import { GenerateId } from '../../helpers/idFunc'
import { ACTIVE_GLOBAL } from '../../config/constants'

@Resolver()
export class AuthResolver {
  /**
   *
   * @param login
   * @returns
   */
  @Mutation(() => SesionData, { description: 'Login' })
  async Login(
    @Arg('login', () => LoginInput, {
      description: 'parameters to login',
    })
    login: LoginInput
  ): Promise<SesionData | Error> {
    try {
      const { USERNAME, PASSWORD } = login

      console.log('login',login)

      /* Getting the user from the database. */
      const user = await getUserRepository().find({
        where: {
          USERNAME: login.USERNAME,
        },
      })

      console.log('user',user)

      if (!user?.length) return Error('Usuario y/o Contraseña son incorrectos.')

       const correctPass =   user[0].PASSWORD === login.PASSWORD ? true :  await compare(PASSWORD, user[0].PASSWORD)

       if (!correctPass)
         return new Error('Usuario y/o Contraseña son incorrectos.')

      // if (userExist[0].CORREO_VALIDADO !== 'V')
      // return new Error("El correo no ha sido validado.");

      // delete field in model
      delete user[0].PASSWORD

      /* Generating a token. */
        
      const token = generateToken({
        id: user[0].USER_ID,
        username: user[0].USERNAME,
        email: user[0].EMAIL,
        name: '', // user[0].NAME + ' ' + user[0].LASTNAME,
        businessId: user[0].BUSINESS_ID,
        // phone:user[0].PHONE

        

        // roles: _roles,
      })

      return {
        data: user[0],
        sessionCookie: {
          expiration: getSessionExpirationDate(),
          token,
        },
      }
    } catch (e) {
      console.log(`${ERR_LOG_MUTATION} AuthResolver: ${e}`)
      return new ApiGraphqlError(
        HTTP_STATUS_BAD_REQUEST,
        'Failed to login.',
        e?.message
      )
    }
  }

  // TODO: COMPLETAR SERVICIO
  @Mutation(() => String, { description: 'Forgot my password' })
  async ForgotPassword(
    @Arg('email', () => String, {
      description: '',
    })
    email: string
  ): Promise<string | Error> {
    try {
      const id = GenerateId()

      const userExist = await getUserRepository().find({
        where: {
          EMAIL: email,
        },
      })

      const request = {
        TOKEN: id,
        USER_ID: userExist[0].USER_ID,
        TOKEN_TYPE: 'RP',
        STATUS: ACTIVE_GLOBAL,
      }

      // createResetRequest(request);

      //enviar respuesta al correo
      // const response = await sendResetLink(email, id);

      return '' // response;
    } catch (e) {
      console.log(`${ERR_LOG_MUTATION} ForgotPassword: ${e}`)
      return new ApiGraphqlError(
        HTTP_STATUS_BAD_REQUEST,
        EMAIL_ERROR,
        e?.message
      )
    }
  }
}
