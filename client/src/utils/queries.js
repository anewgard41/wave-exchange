import { gql } from "@apollo/client";

// GraphQL query for fetching the current user's data
export const GET_ME = gql`
  {
    me {
      _id
      username
      savedMusic {
        artists
        id
        name
        checksum
      }
    }
  }
`;
