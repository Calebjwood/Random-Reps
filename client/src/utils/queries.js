import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
query Users {
  users {
    _id
    username
  }
}
 `;


export const QUERY_SINGLE_USER = gql`
query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      firstName
     lastName
      email
      savedWorkouts {
        _id
        title
        types
        exercises {
          title
          sets
          reps
          rest
        }
        estimatedTime
      }
    }
  }
 `;


export const QUERY_ME = gql`
{
  me {
    _id
    username
    firstName
    lastName
    email
    savedWorkouts {
      _id
      title
      types
      exercises {
        title
        sets
        reps
        rest
      }
      estimatedTime
    }
  }
}
`;

export const QUERY_WORKOUTS = gql`
query GetWorkout($types: [String], $length: Int) {
  getWorkout(types: $types, length: $length) {
    title
    types
    exercises {
      title
      sets
      reps
      rest
      link
    }
  }
}
`;
export const SEARCH_USERS = gql`
query SearchUsers($username: String!) {
  searchUsers(username: $username) {
    _id
    username
    savedWorkouts {
      exercises {
        title
        sets
        reps
        rest
        time
      }
    }
  }
}
`