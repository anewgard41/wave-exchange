const express = require("express");
const path = require("path");
const db = require("./config/connection");
const { ApolloServer } = require('apollo-server-express');
const { expressMiddleware } = require("@apollo/server/express4");
require('dotenv').config();
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const server = new ApolloServer({ 
  typeDefs, 
  resolvers 
});

const startServer = async () => {
  await server.start();
  const app = express();

  server.applyMiddleware({ app });

  app.use("/graphql", expressMiddleware(server, {
    context: authMiddleware
  }))

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  };

  // Handle requests for the root path
  app.get('/', (req, res) => {
    res.send('Hello, this is your GraphQL server!');
  });

  const PORT = process.env.PORT || 4000;
  db.once('open', () => {
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
};

startServer();