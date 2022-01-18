import avocadoResolver from './avocado.resolvers'
import type { InputCreateAvocado } from '../types/Graphql.types'
import type { Avocado } from '@prisma/client'

export default {
  Query: {
    getAvocados: avocadoResolver.findAll,
    getAvocado: (prnt: any, prms: { id: string }, ctx: unknown) => null,
  },
  Mutation: {
    addAvocado: avocadoResolver.createOne,
  },
}
