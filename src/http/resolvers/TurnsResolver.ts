import { Resolver, Query, Arg, Ctx, Mutation } from "type-graphql"
import { Repository, getRepository } from "typeorm"
import { ERR_LOG_MUTATION, ERR_LOG_QUERY } from "../../config/generalErrors"
import { HTTP_STATUS_BAD_REQUEST } from "../../config/statusCode"
import { SessionData } from "../../constants/generalTypes"
import { AuthorizationError, ApiGraphqlError } from "../../helpers/apiFunc"
import { isAuth } from "../../helpers/authFunc"
import { Turns } from "../../entity/TurnsEntity"
import { QueryTurnsInput } from "../types/TurnsType"
import { ACTIVE_GLOBAL } from "../../config/constants"
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
    
        const currentTime = new Date();
        const newTime = addMinutes(currentTime, 30); // Sumar 30 minutos a la hora actual
    
        const userData = {
          ...condition,
          STATUS: ACTIVE_GLOBAL,
          CREATE_DATE: currentTime,
          CREATED_USER: user?.username || 'TEST',
          TIME: newTime,
        };
    
        const data = await getTurnsRepo().insert(userData);
    
        const [insertedUser] = await getTurnsRepo().find(data.identifiers[0]);
    
        return insertedUser;
      } catch (e) {
        console.log(`${ERR_LOG_MUTATION} Register: ${e}`);
        return new ApiGraphqlError(
          HTTP_STATUS_BAD_REQUEST,
          'Error creating user.',
          e?.message
        );
      }
    }
    
}