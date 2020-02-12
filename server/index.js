const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const helmet = require('koa-helmet');
const ip = require('ip');
const passport = require('koa-passport');
const routing = require('./routes/routeHandler.js');
const {port, mongo} = require('./utils/port.js');
mongoose.connect(mongo.uri, mongo.config).catch(err => console.error); // Create Database Connection

const app = new Koa(); // Create Koa Server

app.use(logger()); // Invoke Middleware

// sessions
const session = require('koa-session');
app.keys = ['stay-modern'];
app.use(session({}, app));

app.use(koaBody());

require('./utils/auth')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(helmet());
app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/1') {
      return false;
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

routing(app); // Start Routes

app.listen(port, () => { console.log(`Server is now running on http://${ip.address()}:${port}`);}); // Start the server
module.exports = app;
