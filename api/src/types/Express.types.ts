import { Request } from 'express'
import { PrismaClient } from '@prisma/client'

export interface RequestOrm extends Request {
  orm?: PrismaClient
}

export type RequestUser = {
  user?: object | string | null
} & Request
