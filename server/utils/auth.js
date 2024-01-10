const jwt = require('jsonwebtoken');
// import error handling 
const { GraphQLError } = require('graphql');

// set token secret and expiration date
const secret = "doNotTELLanyoneORiWILLCRY";
const expiration = "2h";

module.exports = {
    AuthenticationError: new GraphQLError('Authentication Error', {
        extensions: {
            code: 'UNAUTHENTICATED'
        }  
    }),
    // function for our authenticated routes
    authMiddleware: function({ req }) {
        const operationName = req.body.operationName;
        if (operationName === 'login' || operationName === 'addUser')
            return req;
        // allows token to be sent via req.body, req.query, or headers
        let token = req.headers.authorization || req.body.token || req.query.token;
        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }
        // if no token, return request object as is
        if (!token) {
            return req;
        }
        try {
            // decode and attach user data to request object
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
            throw new GraphQLError('Invalid token', {
                extensions: {
                    code: 'UNAUTHENTICATED'
                }  
            });
        }
        // return updated request object
        return req;
    },
    signToken: function({ username, _id }) {
        const payload = { username, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    }
};