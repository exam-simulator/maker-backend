require('dotenv').config()

const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const http = require('http')

const addUserIdToRequest = require('./middleware/addUserIdToRequest')
const addUserToRequest = require('./middleware/addUserToRequest')
const resolvers = require('./resolvers')
const { prisma } = require('./generated')

const { NODE_ENV, FRONTEND_DEV, FRONTEND_PROD, PORT } = process.env
const app = express()
const path = '/graphql'

// whitelist the frontend
const corsSettings = {
  origin: NODE_ENV === 'development' ? FRONTEND_DEV : FRONTEND_PROD,
  credentials: true
}

// playground settings
const playground = {
  settings: {
    'editor.fontFamily': 'Fira Code',
    'editor.fontSize': 12,
    'request.credentials': 'include'
  }
}

// add prisma, res, user and userId to server context
const context = ({ req, res }) => ({
  prisma,
  res,
  userId: req.userId,
  user: req.user
})

// read typeDefs from file
const typeDefs = importSchema('./src/schema.graphql')

// create Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground,
  uploads: false,
  context
})

app.get('/api/search', cors(), require('./routes/search'))

app.get('/api/download', cors(), require('./routes/download'))

// add middleware to parse cookies and add user to request object
app.use(cookieParser(), addUserIdToRequest, addUserToRequest)

const httpServer = http.createServer(app)
server.applyMiddleware({ app, path, server, cors: corsSettings })
server.installSubscriptionHandlers(httpServer)

if (NODE_ENV !== 'test') {
  httpServer.listen(PORT, () => {
    console.log(`server up @ ${PORT}`)
  })
}

module.exports = {
  typeDefs
}
