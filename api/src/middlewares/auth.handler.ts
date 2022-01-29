import { Response, NextFunction } from 'express'
import { RequestUser } from '../types/Express.types'

import { verifyToken } from '../auth'

function auth(req: RequestUser, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization
  const token = authorization?.replace('Bearer ', '')
  if (token) {
    try {
      const payload = verifyToken(token as string)
      req.user = payload
    } catch (error) {
      next('sorry, check your token')
    }
  } else {
    req.user = null
  }
  next()
}

export default auth
