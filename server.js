'use strict';
const log = require('loglevel');
const express = require('express');

const server = require('./app')(require('apollo-server-express'), ({req, res}) => ({req, res}));

const app = express();
app.set('x-powered-by', false);

server.applyMiddleware({app});

app.use((req, res) => {
    log.warn('not found', req.url);
    res.status(404).end();
});

app.use((err, req, res, next) => {
    log.error(req.url, err);
    res.status(500).end();
    next;
});

process.on('unhandledRejection', err => {
    log.error(err);
    throw err;
});

require('http')
    .Server(app)
    .listen(Number(process.env.PORT) || 3000, function() {
        log.info(`server is running on port ${this.address().port}`);
    })
    .on('error', err => log.error(err));
