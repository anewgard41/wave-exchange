const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
    }

    type Query {
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
        songId: String!
        songTitle: String
    }

    type User {
        _id: ID!
        username: String!
        savedMusic: [Song]
        donationTotal: Int
    }

    type Song {
        songId: String!
        artists: [String]
        songTitle: String
    }

    type Song {
        id: ID!
        title: String!
        # Add other fields as needed
      }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;