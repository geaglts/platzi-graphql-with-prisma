import { ApolloServer } from 'apollo-server'
import { Context } from 'apollo-server-core'
import path from 'path'
import { readFileSync } from 'fs'

import { Avocado, InputCreateAvocado } from './types/Graphql.types'
const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')

const avocados: Avocado[] = [
  {
    id: new Date().getTime().toString(),
    sku: 'avocado-kwai',
    name: 'avocado kwai',
    price: 2.1,
    description: 'este es un avocado kwai',
    imgUrl: 'https://dummyimage.com/230x300/9ca9ff/212121.png',
    attributes: {
      shape: 'redondito',
      taste: 'te pone bien loco',
      hardiness: '2 en la escala de mohs',
    },
  },
]

const resolvers = {
  Query: {
    getAvocados: () => avocados,
    getAvocado: (prnt: any, prms: { id: string }, ctx: Context) => avocados[0],
  },
  Mutation: {
    addAvocado(prnt: any, prms: { data: InputCreateAvocado }, ctx: Context) {
      const { data } = prms

      const id = new Date().getTime().toString()

      const newAvocado: Avocado = {
        id,
        name: data.name,
        price: data.price,
        sku: data.sku,
        description: data.description,
        imgUrl: data.imgUrl,
        attributes: {
          hardiness: data.hardiness,
          shape: data.shape,
          taste: data.taste,
        },
      }

      avocados.push(newAvocado)
      return newAvocado
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀 Listening on ${url}`)
})
