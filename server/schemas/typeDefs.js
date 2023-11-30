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
    types: [String]
    exercises: [Exercise]
    estimatedTime: Int
  }

  type Auth {
    token: ID
  }

  type Query {
    users: [User]!
    user(userId: ID): User
    getWorkout(types: [String], length: Int): Workout
    getFollowing: [User]
    searchUsers(username: String!): [User]
    me: User
    getWorkoutById(id: ID!): Workout
  }

  type Mutation {
    signup(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveWorkout(title: String!, type: [String!]): Workout
    follow(_id: Int!): User
  }
`;

module.exports = typeDefs;
