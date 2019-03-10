require('dotenv').config()

const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const cookieParser = require('cookie-parser')
const http = require('http')

const addUserIdToRequest = require('./middleware/addUserIdToRequest')
const addUserToRequest = require('./middleware/addUserToRequest')
const resolvers = require('./resolvers')
const { Prisma } = require('./generated')

const { NODE_ENV, FRONTEND_DEV, FRONTEND_PROD, PORT } = process.env
const app = express()
const path = '/graphql'

// whitelist the frontend
const cors = {
  origin: NODE_ENV === 'development' ? FRONTEND_DEV : FRONTEND_PROD,
  credentials: true
}

const db = new Prisma({
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET
})

// add prisma, res, user and userId to server context
const context = ({ req, res }) => ({
  prisma: db,
  res,
  userId: req.userId,
  user: req.user
})

const typeDefs = importSchema('./src/schema.graphql')

// create Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      'editor.fontFamily': 'Fira Code',
      'editor.fontSize': 12,
      'request.credentials': 'include'
    }
  },
  uploads: false,
  context
})

app.use(cookieParser(), addUserIdToRequest, addUserToRequest)

const httpServer = http.createServer(app)
server.applyMiddleware({ app, path, server, cors })
server.installSubscriptionHandlers(httpServer)

if (NODE_ENV !== 'test') {
  httpServer.listen(PORT, () => {
    console.log(`server up @ ${PORT}`)
  })
}

module.exports = {
  typeDefs
}
