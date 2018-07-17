export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'
export const AUTHORIZE_USER_REQUEST = 'AUTHORIZE_USER_REQUEST'
export const AUTHORIZE_USER_SUCCESS = 'AUTHORIZE_USER_SUCCESS'
export const AUTHORIZE_USER_FAILURE = 'AUTHORIZE_USER_FAILURE'

export const fetchUser = () => ({
  type: FETCH_USER_REQUEST,
})

export const receiveUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  user,
})

export const receiveUserFailure = (reason) => ({
  type: FETCH_USER_FAILURE,
  reason,
})

export const authorizeUser = (tokenId) => ({
  type: AUTHORIZE_USER_REQUEST,
  tokenId,
})

export const authorizeUserSuccess = () => ({
  type: AUTHORIZE_USER_SUCCESS,
})

export const authorizeUserFailure = (reason) => ({
  type: AUTHORIZE_USER_FAILURE,
  reason,
})
