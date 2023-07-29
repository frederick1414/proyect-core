import { existsSync, mkdirSync, writeFileSync } from 'fs'

/**
 * Create a directory
 * @param _dir
 */
export const createDir = (_dir: string): string => {
  if (!existsSync(_dir)) {
    mkdirSync(_dir)
  }
  return ''
}

/**
 * Create file
 * @param _filePath
 * @param buff
 * @returns
 */
export const createFile = (_filePath: string, buff: Buffer): boolean => {
  if (existsSync(_filePath)) {
    return true // Error('Archivo ya existe.')
  } else {
    writeFileSync(_filePath, buff)
    return false
  }
}

/**
 *
 * @param _filename
 * @returns
 */
export const GetExtFile = (_filename: string): string => {
  return _filename.slice(
    (Math.max(0, _filename.lastIndexOf('.')) || Infinity) + 1
  )
}
