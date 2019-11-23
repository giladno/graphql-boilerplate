'use strict';

const handler = require('./app')(require('apollo-server-lambda'), ({event, context}) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
})).createHandler({
    cors: {
        origin: true,
        credentials: true,
    },
});

module.exports.graphql = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return handler(event, context, callback);
};
