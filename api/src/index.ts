import path from 'path'
import { readFileSync } from 'fs'
import http from 'http'
import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import resolvers from './resolvers'
import { RequestUser } from './types/Express.types'

import app from './server'

async function startApolloServer() {
  const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')
  const orm = new PrismaClient()

  // http server
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const { user } = req as RequestUser
      return { orm, user }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true,
  })
  await server.start()
  server.applyMiddleware({ app, path: '/graphql' })

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  )

  console.log(`🚀 Listening on *${server.graphqlPath}`)
}

startApolloServer()
