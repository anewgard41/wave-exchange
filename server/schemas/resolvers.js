const { User } = require('../models');
const axios = require('axios');
const { signToken, AuthenticationError } = require("../utils/auth");
const { GraphQLError } = require('graphql');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return await User.findOne({ _id: context.user._id }).populate("savedMusic");
    },
    allUsers: async () => {
      try {
        // Fetch all users from the database
        const allUsers = await User.find();
        return allUsers;
      } catch (error) {
        console.error('Error fetching all users:', error);
        throw new Error('Internal Server Error');
      }
    },
    search: async (_, { query }) => {
        try {
          const accessToken = process.env.GENIUS_ACCESS_TOKEN;
          const apiUrl = `https://api.genius.com/search?q=${query}&access_token=${accessToken}`;
  
          const response = await axios.get(apiUrl);
          const searchData = response.data.response.hits;
  
          return searchData.map(hit => ({
            id: hit.result.id,
            title: hit.result.title,
            // Add other fields as needed
          }));
        } catch (error) {
          console.error('Error fetching data from Genius API:', error);
          throw new Error('Internal Server Error');
        }
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
      //console.log(context);
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
