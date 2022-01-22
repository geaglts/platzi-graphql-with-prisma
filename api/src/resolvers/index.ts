import avocadoResolver from './avocado.resolvers'
import dateScalar from './scalar.resolvers'
export default {
  Date: dateScalar,
  Query: {
    getAvocados: avocadoResolver.findAll,
    getAvocado: avocadoResolver.findById,
  },
  Mutation: {
    addAvocado: avocadoResolver.createOne,
  },
}
