import * as R from 'ramda'

const resolver = {
  Query: {
    me: R.compose(
      R.prop('user'), // retrieve the user from the context
      R.nthArg(2), // third parameter is the context
    ),
  },
}

export default resolver
