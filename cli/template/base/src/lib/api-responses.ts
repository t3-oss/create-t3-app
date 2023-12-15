import type { NextApiResponse } from 'next'

import { formatError } from './utils'

// Some helpers for usual http responses

export function success(
  res: NextApiResponse,
  json: { [key: string]: unknown } = {}
) {
  return res.status(200).json(json)
}

export function badRequest(
  res: NextApiResponse,
  error: unknown = 'Bad Request'
) {
  console.error(error)
  return res.status(400).json({ error: formatError(error) })
}

export function notAuthorized(
  res: NextApiResponse,
  error: unknown = 'Not Authorized'
) {
  console.error(error)
  return res.status(401).json({ error: formatError(error) })
}

export function notFound(res: NextApiResponse, error: unknown = 'Not Found') {
  console.error(error)
  return res.status(404).json({ error: formatError(error) })
}

export function internalServerError(
  res: NextApiResponse,
  error: unknown,
  code = 500
) {
  console.error(error)
  return res.status(code).json({ error: formatError(error) })
}
