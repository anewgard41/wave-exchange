const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return User.findOne({ _id: context.user._id }).populate("savedMusic");
    },
  },
  Mutation: {
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new GraphQLError("Incorrect Password");
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    saveSong: async (parent, { input }, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedMusic: input } },
        { new: true, runValidators: true }
      );
    },
    removeSong: async (parent, { songId }, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedMusic: { songId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
