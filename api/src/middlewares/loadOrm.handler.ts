import { Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { RequestOrm } from '../types/Express.types'

function loadOrm() {
  const orm = new PrismaClient()
  return (req: RequestOrm, res: Response, next: NextFunction) => {
    req.orm = orm
    next()
  }
}

export default loadOrm
