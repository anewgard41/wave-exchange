const { gql } = require("apollo-server-express");

// Define the GraphQL schema
const typeDefs = gql`
  type Query {
    me: User
    allUsers: [User]
    search(query: String!): [Song]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    saveSong(input: SongInput!): User
    removeSong(songId: String!): User
  }

  input SongInput {
    artists: [String]
    id: String!
    name: String!
    checksum: String!
  }

  type Song {
    artists: [String]
    id: String!
    name: String!
    checksum: String!
  }

  type User {
    _id: ID!
    username: String!
    savedMusic: [Song]
    donation: Int
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
