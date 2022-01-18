import type { PrismaClient } from '@prisma/client'

export type ResolverContext = {
  orm: PrismaClient
}
