import React from 'react'
import { connect } from 'react-redux'
import { compose, withProps, setDisplayName } from 'recompose'
import { authorizeUser } from 'data/auth/actions'
import GoogleLoginButton, { Auth } from '@iddan/react-google-login'

const mapDispatchToProps = (dispatch) => ({
  onSuccess: (googleUser) => dispatch(authorizeUser(googleUser.getAuthResponse().id_token)),
})

const enhancer = compose(
  connect(null, mapDispatchToProps),
  withProps({
    auth: Auth.init({
      clientId: '506919491846-pabq3cpkpl897128hkhcs1ajomli6nqk.apps.googleusercontent.com',
    }),
  }),
  setDisplayName('Login'),
)
const Login = enhancer(({ auth, onSuccess }) => (
  <main className="d-flex flex-column justify-content-center align-items-center">
    <GoogleLoginButton
      authInstance={auth}
      scope="email"
      onSuccess={onSuccess}
    />
  </main>
))

export default Login
