import * as RA from 'ramda-adjunct'
import * as R from 'ramda'
import { execute, makePromise } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'

const link = new HttpLink({ uri: '/api' })

export const query = async(query, variables) => {
  const response = await makePromise(execute(link, { query, variables }))

  return response.data
}

export const mutate = query

export const auth = R.compose(
  RA.thenP(R.ifElse(
    R.prop('ok'),
    R.compose(
      R.prop('authToken'),
      R.invoker(0, 'json'),
    ),
    R.compose(
      RA.rejectP,
      R.prop('statusText'),
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
