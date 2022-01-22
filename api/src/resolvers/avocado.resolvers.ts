import { Avocado, Prisma } from '@prisma/client'
import type { ResolverContext } from '../types/Resolvers.types'
import type { InputCreateAvocado } from '../types/Graphql.types'

async function findAll(
  parent: unknown,
  args: { skip?: number; take?: number; where?: Prisma.AvocadoWhereInput },
  context: ResolverContext
): Promise<Avocado[]> {
  const avocados = await context.orm.avocado.findMany({
    include: { attributes: true },
    skip: args.skip,
    take: args.take,
    where: args.where,
  })
  return avocados
}

async function findById(
  parent: unknown,
  args: { id: string },
  context: ResolverContext
): Promise<Avocado | null> {
  const avocado = await context.orm.avocado.findUnique({
    where: { id: parseInt(args.id, 10) },
    include: { attributes: true },
  })
  return avocado
}

async function createOne(
  parent: unknown,
  { data }: { data: InputCreateAvocado },
  context: ResolverContext
): Promise<Avocado> {
  const { name, price, image, ...attributes } = data
  const avocado = await context.orm.avocado.create({
    data: {
      name,
      image,
      price,
      sku: new Date().getTime().toString(),
      attributes: {
        create: {
          ...attributes,
        },
      },
    },
  })
  return avocado
}

export default { findAll, createOne, findById }
