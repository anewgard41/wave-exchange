import { gql } from "@apollo/client";

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

export const SAVE_SONG = gql`
  mutation saveSong($input: SongInput!) {
    saveSong(input: $input) {
      _id
      username
    }
  }
`;

export const REMOVE_SONG = gql`
  mutation RemoveSong($songId: String!) {
    removeSong(songId: $songId) {
      _id
      username
    }
  }
`;
