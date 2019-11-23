'use strict';
const log = require('loglevel');

log.setLevel(process.env.LOG_LEVEL || 'warn');

module.exports = ({ApolloServer, gql}, context) =>
    new ApolloServer({
        typeDefs: gql`
            type Query {
                hello: String
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello world!',
            },
        },
        context,
    });
