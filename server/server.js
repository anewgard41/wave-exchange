const express = require("express");
const axios = require('axios');
const path = require("path");
const db = require("./config/connection");
const { ApolloServer, gql } = require('apollo-server-express');
const { expressMiddleware } = require("@apollo/server/express4");
require('dotenv').config();

const typeDefs = gql`
  type Song {
    id: ID!
    title: String!
    # Add other fields as needed
  }

  type Query {
    search(query: String!): [Song]
  }
`;

const resolvers = {
  Query: {
    search: async (_, { query }) => {
      try {
        const accessToken = process.env.GENIUS_ACCESS_TOKEN;
        const apiUrl = `https://api.genius.com/search?q=${query}&access_token=${accessToken}`;

        const response = await axios.get(apiUrl);
        const searchData = response.data.response.hits;

        return searchData.map(hit => ({
          id: hit.result.id,
          title: hit.result.title,
          // Add other fields as needed
        }));
      } catch (error) {
        console.error('Error fetching data from Genius API:', error);
        throw new Error('Internal Server Error');
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  await server.start();
  const app = express();

  server.applyMiddleware({ app });

  // Handle requests for the root path
  app.get('/', (req, res) => {
    res.send('Hello, this is your GraphQL server!');
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();