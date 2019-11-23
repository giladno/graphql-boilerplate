'use strict';

const server = require('./app')(require('apollo-server'));

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
});
