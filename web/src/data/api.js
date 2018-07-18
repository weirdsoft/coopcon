import * as RA from 'ramda-adjunct'
import * as R from 'ramda'
import { execute, makePromise } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'

export const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY'

const link = new HttpLink({
  uri: '/api',
})

export const query = async(query, variables) => {
  const response = await makePromise(execute(link, {
    context: {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem(AUTH_TOKEN_KEY)}`,
      },
    },
    query,
    variables,
  }))

  return response.data
}

export const mutate = query

export const auth = R.compose(
  RA.thenP(R.ifElse(
    R.prop('ok'),
    R.invoker(0, 'json'),
    R.compose(
      RA.rejectP,
      R.head,
      R.dropWhile(R.isNil),
      R.props([ 'body', 'statusText' ]),
    ),
  )),
  (token) => fetch('/api/auth/web', {
    method: 'POST',
    body: JSON.stringify({ id_token: token }),
    headers:{
      'Content-Type': 'application/json',
    },
  }),
)
