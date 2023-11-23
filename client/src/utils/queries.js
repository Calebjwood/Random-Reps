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
        type
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
  {
    workouts {
      _id
      title
      types
      exercises
    }
  }
`