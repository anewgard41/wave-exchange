const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// Export the typeDefs and resolvers as an object so we can import them into the ApolloServer instance in server.js
module.exports = { typeDefs, resolvers };