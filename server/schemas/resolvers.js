const { User, Workout } = require('../models');
const exercises = require('../seeds/exercises.json');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
    },
    user: async (parent, { userId }) => {
      return await User.findOne({ _id: userId })
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }

      throw AuthenticationError;
    },
    getWorkoutById: async (parent, { id }) => {
      const userWithWorkout = await User.findOne({ "savedWorkouts._id": id });
      if (!userWithWorkout) {
        return null;
      }
      const workout = userWithWorkout.savedWorkouts.find(workout => workout._id.toString() === id);
      return workout;
    },

    getWorkout: async (parent, args) => {
      // TODO: wacky code for workout querying and randomizing

      types = args.types;
      length = args.length;
      let matches = [];
      //filters to match the types
      matches = exercises.filter((exercise) => {
        var x = true;
        for (type of types) {
          if (!exercise.types.includes(type)) { x = false; }
        }
        return x
      });
      //shuffles array
      for (let i = matches.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [matches[i], matches[j]] = [matches[j], matches[i]];
      };
      temp = []
      // prevents users from requesting more exercises than is available
      length = Math.min(length, matches.length)

      //pushes the requested number of exercises to the temp array
      for (let i = 0; i < length; i++) {
        temp.push(matches[i])
      }
      matches = temp;
      const workout =
      {
        title: "",
        types: types,
        exercises: matches
      }
      return workout;
    },
    getFollowing: async (parent, args, context) => {
      //return an array of Users that the current user is following
      if (context.user) {
        const user = User.findById(context.user._id);
        return user.following;
      };
      throw AuthenticationError;

    },
    searchUsers: async (parent, args) => {
      //return an array of users that matches the search query
      return await User.find({ username: args.username })
    }
  },
  Mutation: {
    signup: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.verifyPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token };
    },
    saveWorkout: async (parent, args, context) => {
      // saves workout to the context users workouts array

      if (context.user) {
        const user = User.findOneAndUpdate(
          { id: context.user._id },
          { $addToSet: { savedWorkouts: args } },
          { new: true });

        return user;
      }

      throw AuthenticationError;
    },
    follow: async (parent, { id }, context) => {
      // TODO add follower to the context users following array and update the followed
      // users following field
      if (context.user) {
        const user = User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { following: id } },
          { new: true });

        const followed = User.findOneAndUpdate(
          { _id: id },
          { $addToSet: { followers: context.user._id } },
          { new: true });

        return { user, followed }
      }

      throw AuthenticationError;
    }
  }
};

module.exports = resolvers;
