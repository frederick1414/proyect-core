import jwt from 'jsonwebtoken'
import { SessionData } from '../constants/generalTypes'

/**
 *
 * @param payload
 * @returns
 */
export const generateToken = (payload: SessionData): string => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })
}

/**
 *
 * @returns
 */
export const getSessionExpirationDate = (): string => {
  const expirationDate = new Date()

  expirationDate.setDate(expirationDate.getDate() + 1)

  return expirationDate.toUTCString()
}
