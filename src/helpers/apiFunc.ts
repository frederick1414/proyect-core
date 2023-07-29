import { GraphQLError } from 'graphql'
import {
  INVALID_CREDENTIALS_ERROR,
  NOT_AUTH,
  UNEXPECTED_ERROR,
} from '../config/generalErrors'
import { HTTP_STATUS_UNAUTHORIZED } from '../config/statusCode'

/**
 * Graphql errors
 */
export class ApiGraphqlError extends GraphQLError {
  message: string
  status: number
  _stack: string

  constructor(
    status: number,
    message: string,
    stack: string = UNEXPECTED_ERROR
  ) {
    super(message)
    this.message = message
    this.status = status
    this._stack = stack
  }
}

/**
 * Auth error
 */
export const AuthorizationError = new ApiGraphqlError(
  HTTP_STATUS_UNAUTHORIZED,
  NOT_AUTH,
  INVALID_CREDENTIALS_ERROR
)
