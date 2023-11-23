const { User, Workout } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }


      return await User.findById(context.user._id);
    },
    getWorkout: async (parent, args) => {
      // TODO: wacky code for website querying
      return await Workout.find({})
    },
    getFollowing: async (parent, args, context) => {
      // TODO: return an array of Users that the current user is following
    },
    searchUsers: async (parent, args) => {
      // TODO: return an array of users that matches the search query
      return await User.find({username: args.username})
    }
  },
  Mutation: {
    signin: async (parent, args) => {
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
    saveWorkout: async (parent, {title, type, exercises}, context) => {
      // TODO saves workout to the context users workouts array
    },
    follow: async (parent, {_id}, context) => {
      // TODO add follower to the context users following array and update the followed
      // users following field
    }
  }
};

module.exports = resolvers;
