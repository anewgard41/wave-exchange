import { gql } from "apollo-server-express";

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

export default typeDefs;