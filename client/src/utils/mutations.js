import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;


export const SIGNUP_MUTATION = gql`
mutation Mutation($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
  signup(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password) {
    token
  }
}
`;
