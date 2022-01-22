import { GraphQLScalarType, Kind, ValueNode } from 'graphql'

export default new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return (<Date>value).getTime()
  },
  parseValue(value) {
    return new Date(value as string)
  },
  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10))
    }
    return null
  },
})
