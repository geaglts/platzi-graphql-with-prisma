import path from 'path'
import { readFileSync } from 'fs'
import http from 'http'
import { PrismaClient } from '@prisma/client'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import resolvers from './resolvers'

async function startApolloServer() {
  const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')
  const orm = new PrismaClient()

  // express
  const app = express()
  app.use('/static', express.static(path.join(process.cwd(), 'public')))

  // http server
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { orm },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start()
  server.applyMiddleware({ app, path: '/graphql' })

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  )

  console.log(`🚀 Listening on *${server.graphqlPath}`)
}

startApolloServer()
