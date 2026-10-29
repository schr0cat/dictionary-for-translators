const session = require('express-session');

const sessionMiddleware = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
});

module.exports = sessionMiddleware;