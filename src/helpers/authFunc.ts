import { AuthenticationError } from 'apollo-server-core'
import { SessionData } from '../constants/generalTypes'

/**
 *
 * @param _ctx
 * @returns
 */
export const isAuth = (_ctx: SessionData): boolean => {
  console.log(_ctx)
  if (_ctx) return true

  return false
}

/**
 *
 * @param context
 */
export const assertAuthenticated = (context: SessionData) => {
  if (!context) {
    throw new AuthenticationError('You need to be logged in')
  }
}

/**
 *
 * @param context
 */
export const assertAdmin = (context: SessionData) => {
  if (!context.roles?.name?.includes('ADMIN')) {
    throw new AuthenticationError('You need to be a admin')
  }
}
