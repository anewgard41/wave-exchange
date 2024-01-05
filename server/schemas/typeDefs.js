const typeDefs = `
    type User {
        _id: ID
        username: String
        password: String
        donation: Number
        savedMusic: [Music]
    }

    type Music {
        artists: [String]
        songId: String
        songTitle: String
    }

    type Query {
        
    }
`;

module.exports = typeDefs;