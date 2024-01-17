const { User } = require("../models");
const axios = require("axios");
const { signToken, AuthenticationError } = require("../utils/auth");
const { GraphQLError } = require("graphql");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return await User.findOne({ _id: context.user._id }).populate(
        "savedMusic"
      );
    },
    allUsers: async () => {
      try {
        // Fetch all users from the database
        const allUsers = await User.find();
        return allUsers;
      } catch (error) {
        console.error("Error fetching all users:", error);
        throw new Error("Internal Server Error");
      }
    },
    search: async (_, { query }) => {
      try {
        // Fetch data from Genius API
        const accessToken = process.env.GENIUS_ACCESS_TOKEN;
        const apiUrl = `https://api.genius.com/search?q=${query}&access_token=${accessToken}`;

        const response = await axios.get(apiUrl);
        const searchData = response.data.response.hits;
        // Return an array of objects containing song data
        return searchData.map((hit) => ({
          id: hit.result.id,
          title: hit.result.title,
        }));
      } catch (error) {
        console.error("Error fetching data from Genius API:", error);
        throw new Error("Internal Server Error");
      }
    },
  },
  Mutation: {
    // Login a user
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
    // Add a new user
    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    // Save a song to a user's `savedMusic` field by adding it to the set (to prevent duplicates)
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
    // Remove a song from `savedMusic`
    removeSong: async (parent, { songId }, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedMusic: { id: songId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
