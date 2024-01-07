import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      savedMusic {
        artists
        songId
        songTitle
      }
    }
  }
`;