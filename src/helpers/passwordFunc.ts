import { GEN_SALT } from '../config/constants'

import bcrypt from 'bcryptjs'

/**
 * Encriptar pass
 * @param pass
 * @returns
 */
export const EncriptPass = async (pass: string): Promise<string> => {
  const salt = await bcrypt.genSalt(GEN_SALT)
  return await bcrypt.hash(pass, salt)
}
