import { Avocado } from '@prisma/client'
import type { ResolverContext } from '../types/Resolvers.types'
import type { InputCreateAvocado } from '../types/Graphql.types'

async function findAll(
  parent: unknown,
  args: unknown,
  context: ResolverContext
): Promise<Avocado[]> {
  const avocados = await context.orm.avocado.findMany()
  return avocados
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

export default { findAll, createOne }
