const Koa = require('koa');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const helmet = require('koa-helmet');
const ip = require('ip');
const routing = require('./routes/routeHandler.js');
const {port, mongo} = require('./utils/port.js');
mongoose.connect(mongo.uri, mongo.config).catch(err => console.error); // Create Database Connection

const app = new Koa(); // Create Koa Server

app.use(logger());
app.use(koaBody());
app.use(helmet()); // Invoke Middleware

routing(app); // Start Routes

app.listen(port, () => { console.log(`Server is now running on http://${ip.address()}:${port}`);}); // Start the server
module.exports = app;