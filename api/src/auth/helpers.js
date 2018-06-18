import * as R from 'ramda'
import { ROLES } from 'data/user'

export class AuthorizationError extends Error {
  constructor(message = 'Permission Denied!') {
    super(message)
    this.message = message
    this.name = 'AuthorizationError'
  }
}

export const withAuth = R.curry((role = ROLES.USER, resolver) => R.compose(
  R.ifElse(
    R.compose(
      R.pathEq([ 'user', 'role' ], role),
      R.nth(2),
    ),
    R.apply(resolver),
    R.always(new AuthorizationError()),
  ),
  R.unapply(R.identity),
))
