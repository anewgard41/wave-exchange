const { User } = require('../models');
const axios = require('axios');

const resolvers = {
    Query:{
        // users: async () =>{
        //     return User.find();
        // },
        // user: async ()=>{

        // },
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

};

module.exports = resolvers;
