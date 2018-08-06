const expressGraphQL = require('express-graphql');
const GraphQL = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLBoolean, GraphQLString } = GraphQL;
const { logoutUser, getUser } = require('./../services/AuthUtils');
const contextMiddleware = require('./../services/contextMiddleware');

module.exports = app => {
  app.use(
    '/graphql',
    contextMiddleware,
    expressGraphQL({
      graphiql: true,
      schema: new GraphQLSchema({
        query: new GraphQLObjectType({
          name: 'RootQuery',
          fields: {
            user: {
              type: new GraphQLObjectType({
                name: 'UserProfile',
                description: 'Show result',
                fields: {
                  googleId: { type: GraphQLString },
                  image: { type: GraphQLString },
                },
              }),
              resolve: getUser,
            },
          },
        }),
        mutation: new GraphQLObjectType({
          name: 'Mutation',
          fields: {
            user: {
              type: new GraphQLObjectType({
                name: 'User',
                fields: {
                  logout: {
                    description: 'Logout user',
                    type: new GraphQLObjectType({
                      name: 'Result',
                      description: 'Show result',
                      fields: {
                        success: { type: GraphQLBoolean },
                      },
                    }),
                    resolve: logoutUser,
                  },
                },
              }),
              resolve: () => Promise.resolve(),
            },
          },
        }),
      }),
    }),
  );
};
