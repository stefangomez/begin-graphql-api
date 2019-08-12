let {ApolloServer, gql} = require('apollo-server-lambda')

let typeDefs = gql`
  type Query {
    hello(name: String!): String
  }
`

let resolvers = {
  Query: {
    hello: (parent, args, context, info) => `Hello ${args.name}!`,
  },
}

let server = new ApolloServer({typeDefs, resolvers})
let handler = server.createHandler()

exports.handler = function(event, context, callback) {
  let defaults = {
    httpMethod: 'POST',
    body: JSON.stringify(event.body)
  }
  
  let massaged = Object.assign({}, event, defaults)
  handler(massaged, context, callback)
}
