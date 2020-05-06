const express = require('express');
const app = express();
const config = require('./config/config');


app.use(express.urlencoded({ extended: true }))
    .use(function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    })
    .use(express.json())
    .use('/api/', require('./routes/routes'))
    .get('/', (req, res, next) => res.send('Hello Foonapsty Users!'))
    .listen(config.port, () => console.log(`Service listening on port ${config.port}!`));

module.exports = app;