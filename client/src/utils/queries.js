import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
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