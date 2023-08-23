import { Resolver, Query, Arg, Ctx, Mutation } from "type-graphql"
import { Repository, getRepository } from "typeorm"
import { ERR_LOG_MUTATION, ERR_LOG_QUERY } from "../../config/generalErrors"
import { HTTP_STATUS_BAD_REQUEST } from "../../config/statusCode"
import { SessionData } from "../../constants/generalTypes"
import { AuthorizationError, ApiGraphqlError } from "../../helpers/apiFunc"
import { isAuth } from "../../helpers/authFunc"
import { Turns } from "../../entity/TurnsEntity"
import { QueryTurnsInput, UpdateTurnsResponse } from "../types/TurnsType"
import { ACTIVE_GLOBAL, EN_ESPERA, HOUR, ID_TIPO_TRANS_TURN, ONE, SECOND } from "../../config/constants"
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

      const response = await getTurnsRepo().find({ BUSINESS_ID, TYPE_TRANS: ID_TIPO_TRANS_TURN })
      if (response instanceof Error) {
        return Error('error')
      }

      if (response) {

        let maxTurnId = 0;
        let maxTime = new Date();

        for await (const turn of response) {
          const currentTurnId = parseInt(turn.TURN_ID);
          if (turn.ESTATUS === EN_ESPERA) {
            const currentTurnTime = new Date(turn.TIME);

            if (currentTurnTime > maxTime) {
              maxTime = currentTurnTime;
            }
          }

          if (currentTurnId > maxTurnId) {
            maxTurnId = currentTurnId;
          }

        }


        const nextTime = new Date(maxTime.getTime() + WAITING_TIME * HOUR * SECOND); 
        const ESTATUS_ACTIVE = response.find((x) => x.ESTATUS === EN_ESPERA)
        const turnsData = {
          ...condition,
          TURN_ID: (maxTurnId + ONE).toString(),
          ESTATUS: EN_ESPERA,
          CREATE_DATE: currentTime,
          CREATED_USER: user?.username || 'TEST',
          TIME: ESTATUS_ACTIVE ? nextTime : new Date(),
          BUSINESS_ID: BUSINESS_ID || '001',
          USERNAME: user.username,
          TYPE_TRANS: ID_TIPO_TRANS_TURN
        };

        const data = await getTurnsRepo().insert(turnsData);

        const result = await getTurnsRepo().find(data.identifiers[0]);

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