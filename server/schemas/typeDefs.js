const { gql } = require('apollo-server-express');

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

module.exports = typeDefs;