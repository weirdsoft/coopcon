export const AUTHORIZE_USER_REQUEST = 'AUTHORIZE_USER_REQUEST'
export const AUTHORIZE_USER_SUCCESS = 'AUTHORIZE_USER_SUCCESS'
export const AUTHORIZE_USER_FAILURE = 'AUTHORIZE_USER_FAILURE'

export const authorizeUser = () => ({
  type: AUTHORIZE_USER_REQUEST,
})

export const receiveAuthorizedUserSuccess = (user) => ({
  type: AUTHORIZE_USER_SUCCESS,
  user,
})

export const receiveAuthorizedUserFailure = (reason) => ({
  type: AUTHORIZE_USER_FAILURE,
  reason,
})
