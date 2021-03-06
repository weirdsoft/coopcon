import '@babel/polyfill'
import * as R from 'ramda'
import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress } from 'apollo-server-express'
import { MONGO_URL, PORT } from 'config'
import { schema } from 'data'
import { ROLES } from 'data/user'
import { configureAuth } from 'auth'

// mongoose
mongoose.Promise = Promise
const connect = () => (
  mongoose.connect(MONGO_URL, (err) => {
    if (err != null) {
      setTimeout(connect, 5000)
    }
  })
)
connect()

// setup express instance
const app = express()
const port = PORT

// configure app
app.use(bodyParser.json())

// setup auth protected api routes
configureAuth(app, {
  '/api': graphqlExpress((req) => ({
    schema,
    context: {
      user: R.propOr(
        {
          name: 'Guest',
          email: '',
          photo: '',
          role: ROLES.GUEST,
        },
        'user',
      )(req),
    },
  })),
})

// start listening
app.listen(port)
