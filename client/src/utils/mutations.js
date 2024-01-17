import { gql } from "@apollo/client";

// GraphQL mutation for user login
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// GraphQL mutation for adding a new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// GraphQL mutation for saving a song
export const SAVE_SONG = gql`
  mutation saveSong($input: SongInput!) {
    saveSong(input: $input) {
      _id
      username
    }
  }
`;

// GraphQL mutation for removing a saved song
export const REMOVE_SONG = gql`
  mutation removeSong($songId: String!) {
    removeSong(songId: $songId) {
      _id
      username
    }
  }
`;
