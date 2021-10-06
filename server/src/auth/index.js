import express from 'express';
import database from '../database'
import passport from 'passport';
import passportLocal from 'passport-local';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { EnvironmentVariables } from '../config/environmentVariables.js';

// init dotenv library
dotenv.config();

const app = express.Router();

const LocalStrategy = passportLocal.Strategy;

/*
Use local strategy
*/
passport.use(
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (username, password, done) => {
      try {
        // get user by username
        const user = await database.User.findOne({ where: { username: username }});

        // check if the user exists
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        if (!(password === user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

/*
User Registration
*/
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  const newUser = await database.User.create({ username, password, email });

  res.status(201).json(newUser);
})

/*
Authenticate a user
*/
app.post('/login', (req, res) =>
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      res.status(401).send(error);
    } else if (!user) {
      res.status(401).send(info);
    } else {
      const jwtData = {
        id: user.id,
        username: user.username,
        email: user.email
      }
      console.log(jwtData)
      const token = jwt.sign(jwtData, process.env.JWT_SECRET_KEY, {
        expiresIn: parseInt(process.env.JWT_LIFETIME),
      });
      res.status(200).json({
        success: true,
        token: token,
        user: {
          id: user.id,
          username: user.username,
        },
      });
    }
  })(req, res)
);

export default app;