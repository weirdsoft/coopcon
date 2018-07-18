import * as R from 'ramda'
import passport from 'passport'
import jsonwebtoken from 'jsonwebtoken'
import GoogleTokenStrategy from 'passport-google-id-token'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { User } from 'data/user'

const WEB_AUTH_PATH = '/api/auth/web'
const JWT_SECRET = 'atilabestdog'

export default (app, protectedRoutes) => {
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

  // configure strategy for jwt
  passport.use(new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    (payload, done) => User.findOne(
      {
        _id: payload.id,
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
      const payload = { id: req.user._id }
      const authToken = jsonwebtoken.sign(payload, JWT_SECRET)
      res.json({ authToken })
    },
  )

  // configure protected routes
  R.mapObjIndexed(
    (router, route) => app.use(
      route,
      passport.authenticate('jwt', { session: false }),
      router,
    ),
  )(protectedRoutes)
}
