import { Resolver, Query, Arg, Ctx, Mutation } from "type-graphql"
import { Repository, getRepository } from "typeorm"
import { ERR_LOG_MUTATION, ERR_LOG_QUERY } from "../../config/generalErrors"
import { HTTP_STATUS_BAD_REQUEST } from "../../config/statusCode"
import { SessionData } from "../../constants/generalTypes"
import { AuthorizationError, ApiGraphqlError } from "../../helpers/apiFunc"
import { isAuth } from "../../helpers/authFunc"
import { Turns } from "../../entity/TurnsEntity"
import { QueryTurnsInput, UpdateTurnsResponse } from "../types/TurnsType"
import { ACTIVE_GLOBAL, EN_ESPERA, HOUR, ONE, SECOND } from "../../config/constants"
import { addMinutes } from "date-fns"

/**
 * It returns a repository for the User entity
 */
export const getTurnsRepo = (): Repository<Turns> => getRepository(Turns)

@Resolver(Turns)
export class TurnsResolver {


  @Query(() => [Turns], {
    description: 'Consultar Empleadoa',
  })
  async GetTurns(
    @Arg('condition', () => QueryTurnsInput, {
      description: 'query Turns argument.',
      nullable: true,
    })
    condition: QueryTurnsInput,
    @Ctx('user') user: SessionData
  ): Promise<Turns[] | Error> {
    try {
      if (!isAuth(user)) return AuthorizationError

      const response = await getTurnsRepo().find(condition)

      return response
    } catch (e) {
      console.log(`${ERR_LOG_QUERY} GetTurns: ${e}`)
      return new ApiGraphqlError(
        HTTP_STATUS_BAD_REQUEST,
        'Error when consulting user information.',
        e?.message
      )
    }

  }

  @Mutation(() => Turns, {
    description: 'User Registration',
  })
  async RegisterTurns(
    @Arg('condition', () => QueryTurnsInput, {
      description: 'condition para consultar',
    })
    condition: QueryTurnsInput,
    @Ctx('user') user: SessionData
  ): Promise<Turns | Error> {
    try {
      if (!isAuth(user)) return AuthorizationError;

      const { WAITING_TIME } = condition
      const { businessId: BUSINESS_ID } = user

      const currentTime = new Date();

      console.log('user', BUSINESS_ID)
      const response = await getTurnsRepo().find({BUSINESS_ID})
      console.log('response', response)

      if (response instanceof Error) {
        return Error('error')
      }

      if (response) {

        let maxTurnId = 0; // Suponiendo que los IDs son números positivos
        let maxTime = new Date();  // Una fecha muy antigua como punto de partida
        console.log('newDate', maxTime)

        // Recorremos la lista de registros para encontrar el TURN_ID más alto
        for await (const turn of response) {
          const currentTurnId = parseInt(turn.TURN_ID); // Convertimos a número
          const currentTurnTime = new Date(turn.TIME); // Convertimos a objeto Date

          if (currentTurnId > maxTurnId) {
            maxTurnId = currentTurnId;
          }

          if (currentTurnTime > maxTime) {
            maxTime = currentTurnTime;
          }
        }

        console.log('maxTurnId', maxTurnId)

        // Sumamos 30 minutos al TIME más alto
        const nextTime = new Date(maxTime.getTime() + WAITING_TIME * HOUR * SECOND); // 30 minutos en milisegundos
        const turnsData = {
          ...condition,
          TURN_ID: (maxTurnId + ONE).toString(),
          ESTATUS: EN_ESPERA,
          CREATE_DATE: currentTime,
          CREATED_USER: user?.username || 'TEST',
          TIME: response.length ? nextTime : new Date(),
          BUSINESS_ID: BUSINESS_ID || '001',
          USERNAME: user.username
        };

        const data = await getTurnsRepo().insert(turnsData);

        const result = await getTurnsRepo().find(data.identifiers[0]);
        /////validar jd emr=presa null

        return result[0];
      }

    } catch (e) {
      console.log(`${ERR_LOG_MUTATION} Register: ${e}`);
      return new ApiGraphqlError(
        HTTP_STATUS_BAD_REQUEST,
        'Error creating user.',
        e?.message
      );
    }
  }



  @Mutation(() => Turns, {
    description: 'User Registration',
  })
  async UpdateTurns(
    @Arg('condition', () => QueryTurnsInput, {
      description: 'condition para update',
    })
    condition: QueryTurnsInput,
    @Ctx('user') user: SessionData
  ): Promise<UpdateTurnsResponse | Error> {
    try {
      if (!isAuth(user)) return AuthorizationError;

      const updateData = {
        ...condition,
        UPDATED_USER: user.username,
        UPDATE_DATE: new Date(),
      }

      const data = await getTurnsRepo().update(
        {
          TURN_ID: condition.TURN_ID
        },
        { ...updateData }
      )

      if (data instanceof Error) {
        return Error('Error al actualizar turnos')
      }


      return updateData;

    } catch (e) {
      console.log(`${ERR_LOG_MUTATION} Update: ${e}`);
      return new ApiGraphqlError(
        HTTP_STATUS_BAD_REQUEST,
        'Error creating user.',
        e?.message
      );
    }
  }

}