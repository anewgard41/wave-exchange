const typeDefs = `
    type Query {
        me: User
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
        donationTotal: Decimal
    }

    type Song {
        songId: String!
        artists: [String]
        songTitle: String
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;
