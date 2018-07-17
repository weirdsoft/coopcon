import * as R from 'ramda'
import passport from 'passport'
import GoogleTokenStrategy from 'passport-google-id-token'
import { User } from 'data/user'

const WEB_AUTH_PATH = '/api/auth/web'

export default (app) => {
  // configure strategy for google token id
  passport.use(new GoogleTokenStrategy(
    {
      clientID: '506919491846-pabq3cpkpl897128hkhcs1ajomli6nqk.apps.googleusercontent.com',
    },
    (parsedToken, googleId, done) => User.findOneAndUpdate(
      {
        email: R.path([ 'payload', 'email' ])(parsedToken),
      },
      {
        name: R.path([ 'payload', 'name' ])(parsedToken),
        photo: R.path([ 'payload', 'picture' ])(parsedToken),
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
      (err, user) => done(err, user),
    ),
  ))

  app.use(passport.initialize())

  // configure auth urls
  app.post(
    WEB_AUTH_PATH,
    passport.authenticate('google-id-token', { session: false }),
    (req, res) => {
      res.send(req.user? 200 : 401)
    },
  )
}
