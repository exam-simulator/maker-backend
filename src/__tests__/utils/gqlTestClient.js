const { graphql } = require('graphql')
const { makeExecutableSchema } = require('apollo-server-express')

const { prisma } = require('./createPrismaMock')
const resolvers = require('../../resolvers')
const { typeDefs } = require('../../')

const schema = makeExecutableSchema({ typeDefs, resolvers })

const gqlTestClient = async (query, variables, user) => {
  return graphql(schema, query, undefined, { prisma, user }, variables)
}

module.exports = {
  gqlTestClient
}
