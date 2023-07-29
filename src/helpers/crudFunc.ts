import { FindConditions, FindManyOptions, Repository } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { SessionData } from '../constants/generalTypes'
import { AuthorizationError } from './apiFunc'

/**
 *
 * @param user
 * @param repository
 * @param condition
 * @param onErrorMessage
 * @returns
 */
export const defaultQuery = async <Type>(
  user: SessionData,
  repository: Repository<Type>,
  condition: FindManyOptions<Type> | FindConditions<Type> | unknown,
  operation: string
): Promise<Type[] | Error> => {
  try {
    // if (!user) {
    //   return Error(AuthorizationError.message)
    // }

    const entityResult = await repository.find(condition)

    return entityResult
  } catch (e) {
    console.log(`Error in query ${operation}. ${e}`)
    return Error(e)
  }
}

/**
 * insert new record into table
 * @param user user loged
 * @param repository repository of entity
 * @param entity entity
 * @param operation method name
 * @returns data inserted or error
 */
export const defaultInsert = async <Type>(
  user: SessionData,
  repository: Repository<Type>,
  entity: QueryDeepPartialEntity<Type>,
  operation: string
): Promise<Type | Error> => {
  try {
    // if (!user) {
    //   return Error(AuthorizationError.message)
    // }

    const entityInserted = await repository.insert({
      ...entity,
      CREATED_DATE: new Date(),
      CREATED_USER: user?.username || 'TEST',
    })

    const result = await repository.find(entityInserted.identifiers[0])

    return result[0]
  } catch (e) {
    console.log(`Error in mutation ${operation}. ${e}`)
    return Error(e)
  }
}

/**
 *
 * @param user
 * @param repository
 * @param entity
 * @param updateConditions
 * @param operation
 * @returns
 */
export const defaultUpdate = async <Type>(
  user: SessionData,
  repository: Repository<Type>,
  entity: QueryDeepPartialEntity<Type>,
  updateConditions: FindConditions<Type>,
  operation: string
): Promise<Type | Error> => {
  try {
    if (!user) return Error(AuthorizationError.message)

    const entityUpdated = await repository.update(updateConditions, {
      ...entity,
      UPDATED_DATE: new Date(),
      UPDATED_USER: user?.username || 'TEST',
    })

    if (!entityUpdated.raw) {
      throw Error('The record you are trying to update does not exist.')
    }

    const result = await repository.find(updateConditions)

    return result[0]
  } catch (e) {
    console.log(`Error in mutation ${operation}. ${e}`)
    return Error(e)
  }
}
