const typeDefs = `
  type User {
    _id: ID
    username: String
    firstName: String
    lastName: String
    email: String
    savedWorkouts: [Workout]
    followers: Int
    following: [User]
    followingCount: Int
  }

  type Exercise {
    _id: ID
    title: String
    types: [String]
    sets: Int
    reps: Int
    rest: Int
    link: String
    time: Int
  }

  type Workout {
    _id: ID
    title: String
    type: [String]
    exercises: [Exercise]
    estimatedTime: Int
  }

  type Auth {
    token: ID
  }

  type Query {
    user: User
    getWorkout: Workout
    getFollowing: [User]
    searchUsers(username: String!): [User]
  }

  type Mutation {
    signin(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveWorkout(title: String!, type: [String!], exercises: String): Workout
    follow(_id: Int!): User
  }
`;

module.exports = typeDefs;
