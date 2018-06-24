import * as R from 'ramda'
import mongoose from 'mongoose'
import expressSession from 'express-session'
import connectMongo from 'connect-mongo'
import passport from 'passport'
import { OAuth2Strategy } from 'passport-google-oauth'
import { HOST } from 'config'
import { User } from 'data/user'

const AUTH_PATH = '/api/auth'
const AUTH_CALLBACK_PATH = '/api/auth/callback'

export default (app) => {
  // configure passport auth strategy
  const strategy = new OAuth2Strategy(
    {
      clientID: '506919491846-kssvre2d9apfld92uqr7c2uudhlqnslr.apps.googleusercontent.com',
      clientSecret: '13t-aNBrsWvIzt9oJAVryLbN',
      callbackURL: `${HOST}${AUTH_CALLBACK_PATH}`,
    },
    (accessToken, refreshToken, profile, done) => User.findOneAndUpdate(
      {
        email: R.compose(
          R.prop('value'),
          R.head,
          R.prop('emails'),
        )(profile),
      },
      {
        name: R.prop('displayName')(profile),
        photo: R.compose(
          R.prop('value'),
          R.head,
          R.prop('photos'),
        )(profile),
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
      (err, user) => done(err, user),
    ),
  )
  passport.use(strategy)

  // configure session serialization and deserialization
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)))

  // configure the app to use passport and session
  const MongoStore = connectMongo(expressSession)
  app.use(expressSession({
    secret: 'OSI1I+17kTVkvRy9fzoYJwxV1mOgSM1ukmAkw9tTrmE=',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  // configure auth urls
  app.get(AUTH_PATH, passport.authenticate('google', { scope: [ 'email' ] }))
  app.get(
    AUTH_CALLBACK_PATH,
    passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }),
  )
}
