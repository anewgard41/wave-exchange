const {User} = require('../models');

const resolvers = {
    Query:{
        users: async () =>{
            return User.find();
        },
        user: async ()=>{
            
        }
    }
}