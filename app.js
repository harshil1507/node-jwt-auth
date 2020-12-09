const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');
const securedRoute = require('./routes/secured-route');

const UserModel = require('./model/model');

mongoose.connect('mongodb://127.0.0.1:27017/passport-jwt',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', error => console.log(error) );
mongoose.set("useCreateIndex", true);

require('./auth/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use('/public', usersRouter);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/protected', passport.authenticate('jwt', { session: false }), securedRoute);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log('Server started on: http://localhost:3000/')
});